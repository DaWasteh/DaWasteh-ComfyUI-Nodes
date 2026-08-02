"""Run inside pinned Blender. Builds a conservative Olivia-derived VRM0 candidate.
Arguments after --: source texture output blend report."""
from __future__ import annotations
import bpy,json,sys
from pathlib import Path
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
if len(args)!=5:raise SystemExit('expected: source texture output blend report')
source,texture,output,blend,report=map(Path,args)
if not hasattr(bpy.ops.import_scene,'vrm'):raise RuntimeError('VRM Blender extension is not enabled')
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
bpy.ops.import_scene.vrm(filepath=str(source))
arm=next(o for o in bpy.data.objects if o.type=='ARMATURE');body=next(o for o in bpy.data.objects if o.type=='MESH')
# Preserve imported armature/weights/shape keys. Replace only the packed base texture.
mat=body.data.materials[0];node=next(n for n in mat.node_tree.nodes if n.type=='TEX_IMAGE');image=bpy.data.images.load(str(texture),check_existing=False);node.image=image
# A small real tongue behind the closed lips, parented to head. Its shape key moves +Y/down.
bpy.ops.mesh.primitive_uv_sphere_add(segments=16, ring_count=8, location=(-0.0017,0.070,1.358), scale=(0.014,0.010,0.0055))
tongue=bpy.context.object;tongue.name='Tongue';tongue.data.name='TongueMesh'
# Flattened front cap reads as a tongue in the VRM's +Y forward coordinate system.
mat_t=bpy.data.materials.new('TongueMaterial');mat_t.diffuse_color=(0.78,0.16,0.23,1);mat_t.use_nodes=True
bs=mat_t.node_tree.nodes.get('Principled BSDF');bs.inputs['Base Color'].default_value=(0.78,0.16,0.23,1);bs.inputs['Roughness'].default_value=.55
tongue.data.materials.append(mat_t)
tongue.parent=arm;tongue.parent_type='BONE';tongue.parent_bone=next(b.name for b in arm.data.bones if b.name.endswith(':Head'));tongue.matrix_world.translation=(-0.0017,0.070,1.358)
bpy.context.view_layer.objects.active=tongue;tongue.select_set(True)
basis=tongue.shape_key_add(name='Basis');out=tongue.shape_key_add(name='TongueOut')
for point in out.data:
 point.co.y-=0.145;point.co.z-=0.010
# Register custom VRM0 group. Existing A/E/I/O/U/Blink groups stay untouched.
ext=arm.data.vrm_addon_extension
if ext.spec_version!='0.0':raise RuntimeError(f'expected VRM0 import, got {ext.spec_version}')
g=ext.vrm0.blend_shape_master.blend_shape_groups.add();g.name='TongueOut';g.preset_name='unknown';bind=g.binds.add();bind.mesh.mesh_object_name=tongue.name;bind.index='TongueOut';bind.weight=1.0
# VRM0 metadata: CC0-derived, not a likeness claim.
meta=ext.vrm0.meta;meta.title='Olivia portrait-style local derivative';meta.author='DaWasteh local Blender builder';meta.license_name='CC0'
# Pack edited texture so output is self-contained.
bpy.context.view_layer.objects.active=body
for im in bpy.data.images:
 if im.filepath==str(texture):im.pack()
bpy.ops.wm.save_as_mainfile(filepath=str(blend))
bpy.ops.export_scene.vrm(filepath=str(output),armature_object_name=arm.name)
report.write_text(json.dumps({'source':str(source),'output':str(output),'armature':arm.name,'body':body.name,'tongue':tongue.name,'existing_shape_keys':len(body.data.shape_keys.key_blocks),'tongue_shape_keys':[k.name for k in tongue.data.shape_keys.key_blocks]},indent=2),encoding='utf8')
