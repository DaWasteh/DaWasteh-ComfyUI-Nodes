"""Project four normalized A-pose views onto a rigged mesh and bake a portable PBR albedo."""
import bpy
import json
import math
import sys
from pathlib import Path

args = sys.argv[sys.argv.index("--") + 1:]
if len(args) != 10:
    raise SystemExit("expected: input_blend front left back right face texture_png output_blend output_vrm report")
input_blend, front_path, left_path, back_path, right_path, face_path, texture_path, output_blend, output_vrm, report_path = map(Path, args)
bpy.ops.wm.open_mainfile(filepath=str(input_blend))
arm = next(o for o in bpy.data.objects if o.type == "ARMATURE")
mesh = max((o for o in bpy.data.objects if o.type == "MESH"), key=lambda o: len(o.data.vertices))

def load_pixels(path):
    image = bpy.data.images.load(str(path), check_existing=False)
    width, height = image.size
    return width, height, list(image.pixels[:])

views = {name: load_pixels(path) for name, path in {
    "front": front_path, "left": left_path, "back": back_path, "right": right_path
}.items()}
sizes = {(v[0], v[1]) for v in views.values()}
if len(sizes) != 1:
    raise RuntimeError(f"projection image sizes differ: {sizes}")
width, height = next(iter(sizes))
face_width, face_height, face_pixels = load_pixels(face_path)

def sample_raw(w, h, pixels, u, v):
    x = max(0, min(w - 1, round(u * (w - 1))))
    y = max(0, min(h - 1, round(v * (h - 1))))
    i = (y * w + x) * 4
    return pixels[i], pixels[i + 1], pixels[i + 2], pixels[i + 3]

def sample(view, u, v):
    w, h, pixels = views[view]
    return sample_raw(w, h, pixels, u, v)

xs = [v.co.x for v in mesh.data.vertices]
ys = [v.co.y for v in mesh.data.vertices]
zs = [v.co.z for v in mesh.data.vertices]
xmin, xmax, ymin, ymax, zmin, zmax = min(xs), max(xs), min(ys), max(ys), min(zs), max(zs)
colors = mesh.data.color_attributes.get("HighRealismMultiview")
if colors is None:
    colors = mesh.data.color_attributes.new(name="HighRealismMultiview", type="BYTE_COLOR", domain="CORNER")
for loop in mesh.data.loops:
    vertex = mesh.data.vertices[loop.vertex_index]
    u_x = (vertex.co.x - xmin) / max(1e-8, xmax - xmin)
    u_y = (vertex.co.y - ymin) / max(1e-8, ymax - ymin)
    v = (vertex.co.z - zmin) / max(1e-8, zmax - zmin)
    samples = {
        "front": sample("front", u_x, v),
        "back": sample("back", 1.0 - u_x, v),
        "left": sample("left", 1.0 - u_y, v),
        "right": sample("right", u_y, v),
    }
    n = vertex.normal.normalized()
    weights = {
        "front": max(0.0, -n.y) ** 2.2,
        "back": max(0.0, n.y) ** 2.2,
        "left": max(0.0, -n.x) ** 2.2,
        "right": max(0.0, n.x) ** 2.2,
    }
    for name in list(weights):
        if samples[name][3] < 0.08:
            weights[name] = 0.0
    valid = [name for name in ("front", "back", "left", "right") if samples[name][3] >= 0.08]
    if not valid:
        colors.data[loop.index].color = (0.025, 0.028, 0.035, 1.0)
        continue
    # Do not blend independently generated views: averaging misaligned eyes,
    # logos and seams creates ghosting. Choose one dominant orthographic view.
    if vertex.co.y < 0.0 and vertex.co.z > 0.68 and "front" in valid:
        dominant = "front"
    elif vertex.co.y >= 0.0 and vertex.co.z > 0.68 and "back" in valid:
        dominant = "back"
    else:
        dominant = max(valid, key=lambda name: weights[name])
        if weights[dominant] <= 1e-8:
            dominant = valid[0]
    rgb = samples[dominant][:3]
    # Replace the low-resolution generated face projection with the original
    # 1080p source face. Feather it into the surrounding generated hair/neck.
    if vertex.co.y < -0.055 and abs(vertex.co.x) < 0.17 and 1.20 < vertex.co.z < 1.49:
        fu = (vertex.co.x + 0.17) / 0.34
        fv = (vertex.co.z - 1.20) / 0.29
        face = sample_raw(face_width, face_height, face_pixels, fu, fv)
        edge = max(0.0, min(1.0, min(fu, 1.0 - fu) / 0.16, min(fv, 1.0 - fv) / 0.14))
        rgb = tuple(rgb[i] * (1.0 - edge) + face[i] * edge for i in range(3))
    colors.data[loop.index].color = (*rgb, 1.0)

# Smart atlas for the final portable texture.
bpy.ops.object.select_all(action="DESELECT")
mesh.select_set(True)
bpy.context.view_layer.objects.active = mesh
bpy.ops.object.mode_set(mode="EDIT")
bpy.ops.mesh.select_all(action="SELECT")
bpy.ops.uv.smart_project(angle_limit=math.radians(66.0), island_margin=0.003, area_weight=0.25, correct_aspect=True, scale_to_bounds=True)
bpy.ops.object.mode_set(mode="OBJECT")

mat = bpy.data.materials.get("HighRealismPBR") or bpy.data.materials.new("HighRealismPBR")
mat.use_nodes = True
nodes = mat.node_tree.nodes
links = mat.node_tree.links
for node in list(nodes):
    nodes.remove(node)
out_node = nodes.new("ShaderNodeOutputMaterial")
emission = nodes.new("ShaderNodeEmission")
vcol = nodes.new("ShaderNodeVertexColor")
vcol.layer_name = "HighRealismMultiview"
links.new(vcol.outputs["Color"], emission.inputs["Color"])
links.new(emission.outputs["Emission"], out_node.inputs["Surface"])
mesh.data.materials.clear()
mesh.data.materials.append(mat)
for poly in mesh.data.polygons:
    poly.material_index = 0

image = bpy.data.images.new("HighRealismAlbedo", width=3072, height=3072, alpha=False, float_buffer=False)
image.generated_color = (0.02, 0.022, 0.028, 1.0)
target = nodes.new("ShaderNodeTexImage")
target.image = image
nodes.active = target
target.select = True

scene = bpy.context.scene
scene.render.engine = "CYCLES"
scene.cycles.device = "CPU"
scene.cycles.samples = 1
scene.render.bake.margin = 12
bpy.ops.object.bake(type="EMIT")
image.filepath_raw = str(texture_path)
image.file_format = "PNG"
image.save()
image.pack()

# Replace bake shader with physically plausible, non-metallic PBR.
for node in list(nodes):
    nodes.remove(node)
out_node = nodes.new("ShaderNodeOutputMaterial")
bsdf = nodes.new("ShaderNodeBsdfPrincipled")
tex = nodes.new("ShaderNodeTexImage")
tex.image = image
tex.interpolation = "Linear"
bsdf.inputs["Metallic"].default_value = 0.0
bsdf.inputs["Roughness"].default_value = 0.74
bsdf.inputs["Specular IOR Level"].default_value = 0.22
links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
links.new(bsdf.outputs["BSDF"], out_node.inputs["Surface"])

bpy.ops.wm.save_as_mainfile(filepath=str(output_blend))
bpy.ops.export_scene.vrm(filepath=str(output_vrm), armature_object_name=arm.name)
report_path.write_text(json.dumps({
    "mesh": mesh.name,
    "vertices": len(mesh.data.vertices),
    "faces": len(mesh.data.polygons),
    "views": {"front": str(front_path), "left": str(left_path), "back": str(back_path), "right": str(right_path), "face": str(face_path)},
    "texture": str(texture_path),
    "texture_size": list(image.size),
    "output_vrm": str(output_vrm),
}, indent=2), encoding="utf-8")
