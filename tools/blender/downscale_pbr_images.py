import bpy,sys,json
from pathlib import Path
args=sys.argv[sys.argv.index('--')+1:]
if len(args)!=4:raise SystemExit('input_blend output_blend output_vrm report')
input_blend,output_blend,output_vrm,report_path=map(Path,args)
bpy.ops.wm.open_mainfile(filepath=str(input_blend));arm=next(o for o in bpy.data.objects if o.type=='ARMATURE');scaled=[]
for image in bpy.data.images:
    width,height=image.size
    if max(width,height)>2048:
        factor=2048.0/max(width,height);new_size=(max(1,round(width*factor)),max(1,round(height*factor)))
        image.scale(*new_size);image.pack();scaled.append({'name':image.name,'from':[width,height],'to':list(new_size)})
bpy.ops.wm.save_as_mainfile(filepath=str(output_blend));bpy.ops.export_scene.vrm(filepath=str(output_vrm),armature_object_name=arm.name)
report_path.write_text(json.dumps({'scaled':scaled,'max_edge':2048,'output_vrm':str(output_vrm)},indent=2),encoding='utf-8')
