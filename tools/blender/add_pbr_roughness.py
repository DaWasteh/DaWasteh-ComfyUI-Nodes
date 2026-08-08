import bpy,sys,json
from pathlib import Path
args=sys.argv[sys.argv.index('--')+1:]
if len(args)!=5: raise SystemExit('input_blend roughness_png output_blend output_vrm report')
input_blend,roughness_path,output_blend,output_vrm,report_path=map(Path,args)
bpy.ops.wm.open_mainfile(filepath=str(input_blend))
arm=next(o for o in bpy.data.objects if o.type=='ARMATURE')
mesh=max((o for o in bpy.data.objects if o.type=='MESH'),key=lambda o:len(o.data.vertices))
mat=mesh.data.materials[0];mat.use_nodes=True;nodes=mat.node_tree.nodes;links=mat.node_tree.links
bsdf=next(n for n in nodes if n.type=='BSDF_PRINCIPLED')
image=bpy.data.images.load(str(roughness_path),check_existing=False);image.colorspace_settings.name='Non-Color';image.pack()
tex=nodes.new('ShaderNodeTexImage');tex.name='Img00031_Roughness';tex.image=image;tex.interpolation='Linear'
for link in list(bsdf.inputs['Roughness'].links):links.remove(link)
links.new(tex.outputs['Color'],bsdf.inputs['Roughness'])
bsdf.inputs['Metallic'].default_value=0.0;bsdf.inputs['Specular IOR Level'].default_value=0.2
bpy.ops.wm.save_as_mainfile(filepath=str(output_blend));bpy.ops.export_scene.vrm(filepath=str(output_vrm),armature_object_name=arm.name)
report_path.write_text(json.dumps({'mesh':mesh.name,'roughness':str(roughness_path),'output_vrm':str(output_vrm)},indent=2),encoding='utf-8')
