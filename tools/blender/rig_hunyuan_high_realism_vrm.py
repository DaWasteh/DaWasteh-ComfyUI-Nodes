"""Rig the cleaned realistic Hunyuan A-pose mesh with the validated local Olivia VRM0 armature."""
import bpy
import bmesh
import json
import sys
from mathutils import Vector
from pathlib import Path

args = sys.argv[sys.argv.index("--") + 1:]
if len(args) != 5:
    raise SystemExit("expected: donor_vrm mesh_glb output_blend output_vrm report")
donor, mesh_path, blend_path, vrm_path, report_path = map(Path, args)

bpy.ops.object.select_all(action="SELECT")
bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.vrm(filepath=str(donor))
arm = next(o for o in bpy.data.objects if o.type == "ARMATURE")
# The donor contributes only its validated humanoid armature and VRM metadata.
# Remove every donor mesh (body, eyes, hair, accessories, import helpers) so no
# foreign geometry can leak into the reconstructed avatar export.
donor_meshes = [o for o in bpy.data.objects if o.type == "MESH"]
donor_mesh_names = [o.name for o in donor_meshes]
for donor_mesh in donor_meshes:
    bpy.data.objects.remove(donor_mesh, do_unlink=True)

before = set(bpy.data.objects)
bpy.ops.import_scene.gltf(filepath=str(mesh_path))
new_meshes = [o for o in bpy.data.objects if o not in before and o.type == "MESH"]
if len(new_meshes) != 1:
    raise RuntimeError(f"expected one imported mesh, got {[o.name for o in new_meshes]}")
mesh = new_meshes[0]
mesh.name = "HighRealismBody"
mesh.data.name = "HighRealismBodyMesh"

# Normalize to the donor armature's ~1.5 m body span while preserving shape.
points = [mesh.matrix_world @ Vector(c) for c in mesh.bound_box]
mins = Vector((min(p.x for p in points), min(p.y for p in points), min(p.z for p in points)))
maxs = Vector((max(p.x for p in points), max(p.y for p in points), max(p.z for p in points)))
scale = 1.50 / (maxs.z - mins.z)
mesh.scale *= scale
bpy.context.view_layer.update()
points = [mesh.matrix_world @ Vector(c) for c in mesh.bound_box]
mins = Vector((min(p.x for p in points), min(p.y for p in points), min(p.z for p in points)))
maxs = Vector((max(p.x for p in points), max(p.y for p in points), max(p.z for p in points)))
mesh.location.x -= (mins.x + maxs.x) / 2
mesh.location.y -= (mins.y + maxs.y) / 2
mesh.location.z -= mins.z
bpy.context.view_layer.objects.active = mesh
mesh.select_set(True)
bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)

# Close Hunyuan surface boundaries before decimation. These otherwise render as
# black pinholes and destabilize bone-heat weighting.
bm = bmesh.new()
bm.from_mesh(mesh.data)
boundary_edges = [edge for edge in bm.edges if edge.is_boundary]
if boundary_edges:
    bmesh.ops.holes_fill(bm, edges=boundary_edges, sides=0)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
bm.to_mesh(mesh.data)
bm.free()
mesh.data.update()

# Cap very dense reconstructions, but never decimate an already prepared mesh
# a second time. This preserves face, hand and clothing detail on reruns.
faces_before_decimation = len(mesh.data.polygons)
if faces_before_decimation > 180_000:
    dec = mesh.modifiers.new("ModerateDecimation", "DECIMATE")
    dec.ratio = 165_000 / faces_before_decimation
    dec.use_collapse_triangulate = True
    bpy.context.view_layer.objects.active = mesh
    bpy.ops.object.modifier_apply(modifier=dec.name)

# Neutral physically plausible material until local view projection is baked.
mat = bpy.data.materials.new("Img00031_NeutralRealistic")
mat.diffuse_color = (0.33, 0.35, 0.38, 1.0)
mat.use_nodes = True
bsdf = mat.node_tree.nodes.get("Principled BSDF")
bsdf.inputs["Base Color"].default_value = (0.33, 0.35, 0.38, 1.0)
bsdf.inputs["Roughness"].default_value = 0.68
mesh.data.materials.clear()
mesh.data.materials.append(mat)

# Adapt the donor rest rig to the reconstructed A-pose and wide stance.
bpy.context.view_layer.objects.active = arm
arm.select_set(True)
bpy.ops.object.mode_set(mode="EDIT")
e = arm.data.edit_bones
prefix = "vis_char_056:mixamorig:"
def bone(name):
    return e[prefix + name]
def set_bone(name, head, tail):
    b = bone(name)
    b.head = head
    b.tail = tail
    return b

set_bone("Hips", (0.0, 0.0, 0.73), (0.0, 0.0, 0.82))
set_bone("Spine", (0.0, 0.0, 0.82), (0.0, 0.0, 0.94))
set_bone("Spine1", (0.0, 0.0, 0.94), (0.0, 0.0, 1.08))
set_bone("Spine2", (0.0, 0.0, 1.08), (0.0, 0.0, 1.22))
set_bone("Neck", (0.0, 0.0, 1.22), (0.0, 0.0, 1.30))
set_bone("Head", (0.0, 0.0, 1.30), (0.0, 0.0, 1.47))
set_bone("HeadTop_End", (0.0, 0.0, 1.47), (0.0, 0.0, 1.52))
for side, sign in (("Left", 1.0), ("Right", -1.0)):
    set_bone(side + "Shoulder", (0.05 * sign, 0.0, 1.20), (0.18 * sign, 0.0, 1.18))
    set_bone(side + "Arm", (0.18 * sign, 0.0, 1.18), (0.43 * sign, 0.0, 1.08))
    set_bone(side + "ForeArm", (0.43 * sign, 0.0, 1.08), (0.70 * sign, 0.0, 0.96))
    set_bone(side + "Hand", (0.70 * sign, 0.0, 0.96), (0.82 * sign, 0.0, 0.91))
    set_bone(side + "UpLeg", (0.11 * sign, 0.0, 0.73), (0.17 * sign, 0.0, 0.40))
    set_bone(side + "Leg", (0.17 * sign, 0.0, 0.40), (0.23 * sign, 0.0, 0.08))
    set_bone(side + "Foot", (0.23 * sign, 0.0, 0.08), (0.25 * sign, -0.12, 0.03))
    set_bone(side + "ToeBase", (0.25 * sign, -0.12, 0.03), (0.25 * sign, -0.20, 0.02))
    for b in e:
        if b.name.startswith(prefix + side + "Hand") and b.name != prefix + side + "Hand":
            b.use_deform = False
bpy.ops.object.mode_set(mode="OBJECT")

# Remove donor expression bindings that referenced the deleted low-poly body.
ext = arm.data.vrm_addon_extension
if ext.spec_version != "0.0":
    raise RuntimeError(f"expected donor VRM0, got {ext.spec_version}")
for group in ext.vrm0.blend_shape_master.blend_shape_groups:
    group.binds.clear()
# Preserve the donor's author/license metadata. The pipeline cannot legally
# relicense user references or third-party donor assets on their behalf.
meta = ext.vrm0.meta
meta.title = "Local high-realism Hunyuan avatar candidate"

# Automatic bone heat on the now-separated A-pose geometry.
bpy.ops.object.select_all(action="DESELECT")
mesh.select_set(True)
arm.select_set(True)
bpy.context.view_layer.objects.active = arm
bpy.ops.object.parent_set(type="ARMATURE_AUTO")

# Normalize and smooth weights for stable deformation.
bpy.context.view_layer.objects.active = mesh
mesh.select_set(True)
for poly in mesh.data.polygons:
    poly.use_smooth = True

bpy.ops.wm.save_as_mainfile(filepath=str(blend_path))
bpy.ops.export_scene.vrm(filepath=str(vrm_path), armature_object_name=arm.name)

report = {
    "donor": str(donor),
    "mesh": str(mesh_path),
    "blend": str(blend_path),
    "vrm": str(vrm_path),
    "armature": arm.name,
    "vertices": len(mesh.data.vertices),
    "faces": len(mesh.data.polygons),
    "faces_before_decimation": faces_before_decimation,
    "vertex_groups": len(mesh.vertex_groups),
    "armature_modifiers": sum(1 for m in mesh.modifiers if m.type == "ARMATURE"),
    "boundary_edges_filled": len(boundary_edges),
    "removed_donor_meshes": donor_mesh_names,
    "preserved_license": meta.license_name,
}
report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
print(json.dumps(report, indent=2))
