import bpy
import json
import math
import sys
from mathutils import Vector
from pathlib import Path

source = Path(sys.argv[sys.argv.index("--") + 1])
render_path = Path(sys.argv[sys.argv.index("--") + 2])
report_path = Path(sys.argv[sys.argv.index("--") + 3])

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=str(source))
mesh_objects = [obj for obj in bpy.context.scene.objects if obj.type == "MESH"]
if not mesh_objects:
    raise RuntimeError("GLB contains no mesh objects")

all_points = [obj.matrix_world @ Vector(corner) for obj in mesh_objects for corner in obj.bound_box]
mins = Vector((min(p.x for p in all_points), min(p.y for p in all_points), min(p.z for p in all_points)))
maxs = Vector((max(p.x for p in all_points), max(p.y for p in all_points), max(p.z for p in all_points)))
center = (mins + maxs) / 2
extent = maxs - mins
scale = 3.0 / max(extent)
for obj in mesh_objects:
    obj.location = (obj.location - center) * scale
    obj.scale *= scale
    for poly in obj.data.polygons:
        poly.use_smooth = True

report = {
    "source": str(source),
    "bytes": source.stat().st_size,
    "objects": len(mesh_objects),
    "vertices": sum(len(obj.data.vertices) for obj in mesh_objects),
    "faces": sum(len(obj.data.polygons) for obj in mesh_objects),
    "bounds_min": list(mins),
    "bounds_max": list(maxs),
    "extent": list(extent),
}
report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
print(json.dumps(report, indent=2))

material = bpy.data.materials.new("Neutral")
material.diffuse_color = (0.46, 0.52, 0.62, 1.0)
material.metallic = 0.0
material.roughness = 0.72
for obj in mesh_objects:
    obj.data.materials.clear()
    obj.data.materials.append(material)

world = bpy.context.scene.world or bpy.data.worlds.new("World")
bpy.context.scene.world = world
world.color = (0.025, 0.025, 0.035)

def add_area(name, location, energy, size):
    data = bpy.data.lights.new(name, "AREA")
    data.energy = energy
    data.shape = "DISK"
    data.size = size
    obj = bpy.data.objects.new(name, data)
    obj.location = location
    bpy.context.collection.objects.link(obj)
    direction = Vector((0, 0, 0.2)) - obj.location
    obj.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()

add_area("Key", (4.5, -4.0, 5.0), 1100, 4.0)
add_area("Fill", (-4.0, -2.0, 2.5), 700, 3.0)
add_area("Rim", (1.5, 4.0, 4.0), 900, 3.0)

camera_data = bpy.data.cameras.new("Camera")
camera = bpy.data.objects.new("Camera", camera_data)
bpy.context.collection.objects.link(camera)
bpy.context.scene.camera = camera
camera.location = (4.2, -6.5, 2.4)
direction = Vector((0, 0, 0.1)) - camera.location
camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
camera_data.lens = 58

scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE_NEXT"
scene.render.resolution_x = 640
scene.render.resolution_y = 640
scene.render.resolution_percentage = 100
scene.render.image_settings.file_format = "PNG"
scene.render.filepath = str(render_path)
scene.render.film_transparent = False
bpy.ops.render.render(write_still=True)
