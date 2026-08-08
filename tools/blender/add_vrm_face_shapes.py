"""Add conservative local face shape keys and bind them to VRM0 expressions."""
import bpy
import json
import sys
from pathlib import Path

args = sys.argv[sys.argv.index("--") + 1:]
if len(args) != 4:
    raise SystemExit("expected: input_blend output_blend output_vrm report")
input_blend, output_blend, output_vrm, report_path = map(Path, args)
bpy.ops.wm.open_mainfile(filepath=str(input_blend))
arm = next(o for o in bpy.data.objects if o.type == "ARMATURE")
mesh = max((o for o in bpy.data.objects if o.type == "MESH"), key=lambda o: len(o.data.vertices))

if mesh.data.shape_keys is None:
    mesh.shape_key_add(name="Basis")

def add_key(name, transform):
    key = mesh.shape_key_add(name=name)
    changed = 0
    for index, point in enumerate(key.data):
        if transform(point.co, index):
            changed += 1
    return changed

def eye_transform(side):
    def fn(co, _index):
        if 1.345 < co.z < 1.405 and co.y < -0.075 and abs(co.x) < 0.145 and (side == 0 or co.x * side > 0):
            co.z = 1.375 + (co.z - 1.375) * 0.72
            co.y += 0.002
            return True
        return False
    return fn

def mouth_transform(kind):
    def fn(co, _index):
        if abs(co.x) < 0.105 and 1.255 < co.z < 1.335 and co.y < -0.085:
            if kind == "A":
                if co.z < 1.295: co.z -= 0.020
            elif kind == "O":
                co.x *= 0.82
                if co.z < 1.295: co.z -= 0.012
            elif kind == "I":
                co.x *= 1.10
                if co.z < 1.295: co.z -= 0.006
            elif kind == "U":
                co.x *= 0.88
                if co.z < 1.295: co.z -= 0.008
            elif kind == "E":
                co.x *= 1.06
                if co.z < 1.295: co.z -= 0.010
            co.y -= 0.003
            return True
        return False
    return fn

counts = {
    "Blink": add_key("Blink", eye_transform(0)),
    "Blink_L": add_key("Blink_L", eye_transform(1)),
    "Blink_R": add_key("Blink_R", eye_transform(-1)),
}
for name in ("A", "I", "U", "E", "O"):
    counts[name] = add_key(name, mouth_transform(name))

ext = arm.data.vrm_addon_extension
if ext.spec_version != "0.0":
    raise RuntimeError(f"expected VRM0, got {ext.spec_version}")
groups = {group.name: group for group in ext.vrm0.blend_shape_master.blend_shape_groups}
for name in counts:
    group = groups.get(name)
    if group is None:
        group = ext.vrm0.blend_shape_master.blend_shape_groups.add()
        group.name = name
        group.preset_name = name.lower() if name in {"A", "I", "U", "E", "O"} else ("blink_l" if name == "Blink_L" else "blink_r" if name == "Blink_R" else "blink")
    group.binds.clear()
    bind = group.binds.add()
    bind.mesh.mesh_object_name = mesh.name
    bind.index = name
    bind.weight = 1.0

# Keep the author/license inherited from the validated donor. Adding local
# morphs does not grant permission to relicense user or third-party assets.
meta = ext.vrm0.meta
meta.title = "Local high-realism avatar"

bpy.ops.wm.save_as_mainfile(filepath=str(output_blend))
bpy.ops.export_scene.vrm(filepath=str(output_vrm), armature_object_name=arm.name)
report_path.write_text(json.dumps({
    "mesh": mesh.name,
    "shape_keys": [key.name for key in mesh.data.shape_keys.key_blocks],
    "changed_vertices": counts,
    "output_vrm": str(output_vrm),
}, indent=2), encoding="utf-8")
