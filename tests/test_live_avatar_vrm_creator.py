import hashlib,importlib.util,io,json,tempfile,unittest
from pathlib import Path
try:
 from PIL import Image
except ImportError:
 Image=None
ROOT=Path(__file__).resolve().parents[1];S=importlib.util.spec_from_file_location('vrm_tools',ROOT/'custom_nodes/ComfyUI-DaWasteh-LiveAvatar/vrm_tools.py');m=importlib.util.module_from_spec(S);S.loader.exec_module(m)
def png(color=(200,80,60),fmt='PNG',alpha=False,palette_alpha=False):
 if Image is None:return b'\0\0\0\0'
 if palette_alpha:
  image=Image.new('P',(16,16));image.putpalette([value for i in range(256) for value in (i,i,i)]);image.putdata([x for _ in range(16) for x in range(16)]);image.info['transparency']=bytes(range(0,256,17))
 else:
  image=Image.new('RGB',(16,16),color)
  if alpha:image.putalpha(Image.frombytes('L',(16,16),bytes(x*17 for _ in range(16) for x in range(16))))
 b=io.BytesIO();image.save(b,fmt);return b.getvalue()
def doc(rig=False,face=False,jpeg=False,mixamo=False,alpha=False,palette_alpha=False):
 raw=png(fmt='JPEG' if jpeg else 'PNG',alpha=alpha,palette_alpha=palette_alpha);nodes=[];bones=[]
 if rig:
  names=list(m.REQUIRED)+list(m.FINGERS)
  if mixamo:
   def mn(n):
    if n in m.FINGERS:
     side='Left' if n.startswith('left') else 'Right';finger=next(x for x in ('Thumb','Index','Middle','Ring','Little') if x in n);part=next(x for x in ('Proximal','Intermediate','Distal') if x in n);return f'mixamorig:{side}Hand{finger}'+{'Proximal':'1','Intermediate':'2','Distal':'3'}[part]
    return 'mixamorig:'+n[0].upper()+n[1:]
   names=[mn(n) for n in names]
  nodes=[{'name':n} for n in names];index={key:i for i,key in enumerate(list(m.REQUIRED)+list(m.FINGERS))};bones=[{'bone':n,'node':i,'useDefaultValues':True} for i,n in enumerate(m.REQUIRED)]
  def link(parent,child):nodes[index[parent]].setdefault('children',[]).append(index[child])
  for a,b in [('hips','spine'),('spine','chest'),('chest','neck'),('neck','head'),('hips','leftUpperLeg'),('leftUpperLeg','leftLowerLeg'),('leftLowerLeg','leftFoot'),('hips','rightUpperLeg'),('rightUpperLeg','rightLowerLeg'),('rightLowerLeg','rightFoot'),('chest','leftUpperArm'),('leftUpperArm','leftLowerArm'),('leftLowerArm','leftHand'),('chest','rightUpperArm'),('rightUpperArm','rightLowerArm'),('rightLowerArm','rightHand')]:link(a,b)
  for side in ('left','right'):
   for finger in ('Thumb','Index','Middle','Ring','Little'):
    a,b,c=(f'{side}{finger}{p}' for p in ('Proximal','Intermediate','Distal'));link(f'{side}Hand',a);link(a,b);link(b,c)
  nodes.append({'name':'SkinnedMesh','skin':0,'mesh':0})
 binary=bytearray(raw);binary.extend(b'\0'*((-len(binary))%4));joints_offset=len(binary);binary.extend(b'\0'*8);weights_offset=len(binary);binary.extend(b'\0'*16);position_offset=len(binary);binary.extend(b'\0'*12)
 views=[{'buffer':0,'byteOffset':0,'byteLength':len(raw)},{'buffer':0,'byteOffset':joints_offset,'byteLength':8},{'buffer':0,'byteOffset':weights_offset,'byteLength':16},{'buffer':0,'byteOffset':position_offset,'byteLength':12}]
 d={'asset':{'version':'2.0'},'buffers':[{'byteLength':len(binary)}],'bufferViews':views,'images':[{'bufferView':0,'mimeType':'image/jpeg' if jpeg else 'image/png'}],'textures':[{'source':0}],'materials':[{'name':'skin','pbrMetallicRoughness':{'baseColorTexture':{'index':0}}}],'accessors':[{'bufferView':1,'componentType':5123,'count':1,'type':'VEC4'},{'bufferView':2,'componentType':5126,'count':1,'type':'VEC4'},{'bufferView':3,'componentType':5126,'count':1,'type':'VEC3'}],'meshes':[{'primitives':[{'attributes':{'JOINTS_0':0,'WEIGHTS_0':1},'targets':[{'POSITION':2} for _ in range(6)]}],'extras':{'targetNames':['blink','a','i','u','e','o'] if face else []}}],'nodes':nodes,'skins':[{'joints':list(range(len(nodes)-1))}] if rig else [],'extensionsUsed':['VRM'],'extensions':{'VRM':{'meta':{'title':'base','author':'original','licenseName':'CC0'},'humanoid':{'humanBones':bones},'blendShapeMaster':{'blendShapeGroups':[]}}}}
 return d,bytes(binary)
class Creator(unittest.TestCase):
 def setUp(self):self.old=m.model_root
 def tearDown(self):m.model_root=self.old
 @unittest.skipIf(Image is None,'Pillow is required for texture test')
 def test_texture_roundtrip_preserves_vrm_rig_morph_and_atomic_safety(self):
  with tempfile.TemporaryDirectory() as td:
   root=Path(td);m.model_root=lambda:root;d,b=doc(True,True);(root/'base.vrm').write_bytes(m.build_glb(d,b));source=m.DaWastehVRMTextureSource().load('base.vrm')[1]
   import torch
   out,report=m.DaWastehVRMTextureVariant().save(source,torch.ones((1,16,16,3))*0.5,'variant.vrm','new title','new author',False);nd,nb=m.parse_glb(Path(out).read_bytes());self.assertEqual(m.vrm0(nd)['humanoid']['humanBones'],d['extensions']['VRM']['humanoid']['humanBones']);self.assertEqual(nd['meshes'][0]['extras']['targetNames'],d['meshes'][0]['extras']['targetNames']);self.assertEqual(m.vrm0(nd)['meta']['licenseName'],'CC0');self.assertIn('variant.vrm',m.vrm_files())
   with self.assertRaises(FileExistsError):m.DaWastehVRMTextureVariant().save(source,torch.ones((1,16,16,3)),'variant.vrm','x','',False)
   with self.assertRaises(ValueError):m.safe_name('../escape.vrm')
 def test_rig_converter_rejects_unrigged_and_strict_gaps(self):
  with tempfile.TemporaryDirectory() as td:
   root=Path(td);m.model_root=lambda:root;d,b=doc(False,False);p=root/'plain.glb';p.write_bytes(m.build_glb(d,b))
   with self.assertRaisesRegex(ValueError,'unrigged'):m.DaWastehRiggedGLBToVRM0().convert(str(p),'x.vrm','x','','CC0','',True,False,False)
   d,b=doc(True,False);p.write_bytes(m.build_glb(d,b))
   with self.assertRaisesRegex(ValueError,'Strict'):m.DaWastehRiggedGLBToVRM0().convert(str(p),'x.vrm','x','','CC0','',True,False,False)
 def test_strict_audit_rejects_disconnected_attributes_hierarchy_morph_and_transform(self):
  with tempfile.TemporaryDirectory() as td:
   root=Path(td);m.model_root=lambda:root
   for label,mutate,needle in [('disconnected',lambda d:d['nodes'][-1].pop('skin'),'disconnected'),('weights',lambda d:d['meshes'][0]['primitives'][0]['attributes'].pop('WEIGHTS_0'),'WEIGHTS'),('flat',lambda d:d['nodes'][0].pop('children'),'hierarchy'),('morph',lambda d:d['meshes'][0]['primitives'][0]['targets'][0].clear(),'Strict'),('transform',lambda d:d['nodes'][0].update({'scale':[2,1,1]}),'Strict rest')]:
    d,b=doc(True,True);mutate(d);p=root/(label+'.glb');p.write_bytes(m.build_glb(d,b))
    with self.assertRaisesRegex(ValueError,needle):m.DaWastehRiggedGLBToVRM0().convert(str(p),label+'.vrm','x','','CC0','',True,False,False)
 def test_rig_converter_rejects_named_nodes_outside_skin(self):
  with tempfile.TemporaryDirectory() as td:
   root=Path(td);m.model_root=lambda:root;d,b=doc(True,True);d['skins'][0]['joints']=d['skins'][0]['joints'][1:];p=root/'outside.glb';p.write_bytes(m.build_glb(d,b))
   with self.assertRaisesRegex(ValueError,'outside glTF skin joints'):m.DaWastehRiggedGLBToVRM0().convert(str(p),'x.vrm','x','','CC0','',True,False,False)
 def test_rig_converter_maps_valid_synthetic_rig_and_shapes(self):
  with tempfile.TemporaryDirectory() as td:
   root=Path(td);m.model_root=lambda:root;d,b=doc(True,True,mixamo=True);p=root/'rig.glb';p.write_bytes(m.build_glb(d,b));out,rep=m.DaWastehRiggedGLBToVRM0().convert(str(p),'rigged.vrm','candidate','artist','CC_BY','',True,False,False);nd,_=m.parse_glb(Path(out).read_bytes());e=m.vrm0(nd);self.assertEqual(len(e['humanoid']['humanBones']),len(m.REQUIRED)+len(m.FINGERS));self.assertIn('leftThumbProximal',{x['bone'] for x in e['humanoid']['humanBones']});self.assertEqual(e['meta']['licenseName'],'CC_BY');self.assertEqual({x['name'] for x in e['blendShapeMaster']['blendShapeGroups']},{'Blink','A','I','U','E','O'});self.assertTrue(m.validate_vrm_extension(nd))
 @unittest.skipIf(Image is None,'Pillow is required for texture test')
 def test_jpeg_texture_replacement_updates_mime_length_and_offsets(self):
  with tempfile.TemporaryDirectory() as td:
   root=Path(td);m.model_root=lambda:root;d,b=doc(True,True,jpeg=True);d['bufferViews'].append({'buffer':0,'byteOffset':len(b),'byteLength':4});d['buffers'][0]['byteLength']=len(b)+4;b+=b'next';(root/'jpeg.vrm').write_bytes(m.build_glb(d,b));source=m.DaWastehVRMTextureSource().load('jpeg.vrm')[1]
   import torch
   out,_=m.DaWastehVRMTextureVariant().save(source,torch.zeros((1,16,16,3)),'jpeg-variant.vrm','x','',False);nd,nb=m.parse_glb(Path(out).read_bytes());self.assertEqual(nd['images'][0]['mimeType'],'image/png');self.assertEqual(nd['buffers'][0]['byteLength'],max(x.get('byteOffset',0)+x['byteLength'] for x in nd['bufferViews']));self.assertLessEqual(len(nb)-nd['buffers'][0]['byteLength'],3);self.assertTrue(all(x.get('byteOffset',0)%4==0 for x in nd['bufferViews']));tail=nd['bufferViews'][-1];self.assertEqual(nb[tail['byteOffset']:tail['byteOffset']+tail['byteLength']],b'next')
 @unittest.skipIf(Image is None,'Pillow is required for texture test')
 def test_texture_variant_preserves_original_alpha_channel(self):
  with tempfile.TemporaryDirectory() as td:
   root=Path(td);m.model_root=lambda:root;d,b=doc(True,True,alpha=True);(root/'alpha.vrm').write_bytes(m.build_glb(d,b));source=m.DaWastehVRMTextureSource().load('alpha.vrm')[1]
   import torch
   out,_=m.DaWastehVRMTextureVariant().save(source,torch.ones((1,16,16,3))*0.25,'alpha-variant.vrm','x','',False);nd,nb=m.parse_glb(Path(out).read_bytes());_,_,bv=m.image_binding(nd);saved=Image.open(io.BytesIO(m.texture_bytes(nd,nb,bv)));self.assertEqual(saved.mode,'RGBA');self.assertEqual(saved.getchannel('A').getextrema(),(0,255))
 @unittest.skipIf(Image is None,'Pillow is required for texture test')
 def test_texture_variant_preserves_palette_trns_transparency(self):
  with tempfile.TemporaryDirectory() as td:
   root=Path(td);m.model_root=lambda:root;d,b=doc(True,True,palette_alpha=True);(root/'palette.vrm').write_bytes(m.build_glb(d,b));source=m.DaWastehVRMTextureSource().load('palette.vrm')[1]
   import torch
   out,_=m.DaWastehVRMTextureVariant().save(source,torch.ones((1,16,16,3))*0.75,'palette-variant.vrm','x','',False);nd,nb=m.parse_glb(Path(out).read_bytes());_,_,bv=m.image_binding(nd);saved=Image.open(io.BytesIO(m.texture_bytes(nd,nb,bv)));self.assertEqual(saved.mode,'RGBA');self.assertEqual(saved.getchannel('A').getextrema(),(0,255))
 def test_texture_creator_rejects_multiple_distinct_base_color_images(self):
  d,_=doc();d['images'].append({'bufferView':0,'mimeType':'image/png'});d['textures'].append({'source':1});d['materials'].append({'name':'second','pbrMetallicRoughness':{'baseColorTexture':{'index':1}}})
  with self.assertRaisesRegex(ValueError,'one distinct embedded base-color image'):m.image_binding(d)
 def test_workflow08_three_reference_batch_and_uv_wiring_are_conservative(self):
  for path in (ROOT/'assets/live-avatar-v072/workflow-08.template.json',ROOT/'workflows/Live Avatar/LiveAvatar-08-Local-VRM-Texture-Creator-Realistic+Stylized.json'):
   graph=json.loads(path.read_text(encoding='utf8'));nodes={n['id']:n for n in graph['nodes']};links={x[0]:x for x in graph['links']}
   references=[n for n in graph['nodes'] if n['type']=='LoadImage'];self.assertEqual(len(references),3,path.name)
   self.assertEqual({n['title'] for n in references},{'Referenz 1 · Frontalansicht','Referenz 2 · Dreiviertelansicht','Referenz 3 · Seitenansicht'})
   batch=next(n for n in graph['nodes'] if n['type']=='BatchImagesNode');self.assertEqual(len(batch['inputs']),3)
   self.assertEqual({links[item['link']][1] for item in batch['inputs']},{n['id'] for n in references})
   self.assertEqual(nodes[2]['widgets_values'][0],'olivia.vrm');self.assertEqual(nodes[14]['widgets_values'][0],0.35);self.assertEqual(nodes[14]['widgets_values'][2],'average');self.assertEqual(nodes[15]['widgets_values'][-1],0.20);self.assertEqual(nodes[35]['mode'],2)
   self.assertEqual(links[nodes[10]['inputs'][0]['link']][1:3],[2,0]);self.assertEqual(links[nodes[14]['inputs'][2]['link']][1:3],[batch['id'],0])
   text=json.dumps(graph,ensure_ascii=False);self.assertIn('keine zuverlässige Identitätsrekonstruktion',text);self.assertIn('Modellliste aktualisieren',text)
 def test_workflow09_requires_truthful_license_and_strict_capabilities(self):
  for path in (ROOT/'assets/live-avatar-v072/workflow-09.template.json',ROOT/'workflows/Live Avatar/LiveAvatar-09-Meshy-AutoRig-to-VRM-Candidate-Optional-Cloud.json'):
   graph=json.loads(path.read_text(encoding='utf8'));node=next(n for n in graph['nodes'] if n['type']=='DaWastehRiggedGLBToVRM0')
   self.assertEqual(node['widgets_values'][3:7],['Other','',True,False])
 def test_live_avatar_workflows_and_templates_have_no_run_timers(self):
  paths=list((ROOT/'workflows/Live Avatar').glob('*.json'))+list((ROOT/'assets/live-avatar-v072').glob('workflow-*.template.json'))
  self.assertGreaterEqual(len(paths),13)
  for path in paths:
   graph=json.loads(path.read_text(encoding='utf8'));self.assertFalse(any(n['type']=='PixaromaRunTimer' for n in graph['nodes']),path.name)
 def test_dynamic_list_is_safe(self):
  with tempfile.TemporaryDirectory() as td:
   root=Path(td);m.model_root=lambda:root;(root/'ok.vrm').write_bytes(b'x');(root/'bad.txt').write_bytes(b'x');self.assertEqual(m.vrm_files(),['ok.vrm'])
if __name__=='__main__':unittest.main()
