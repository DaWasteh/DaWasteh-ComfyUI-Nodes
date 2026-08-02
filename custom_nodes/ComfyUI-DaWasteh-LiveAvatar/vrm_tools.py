"""Local VRM0 texture variants and conservative rigged-GLB candidate conversion."""
from __future__ import annotations
import io,json,os,re,tempfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any

MAX_BYTES=32*1024*1024
SAFE_NAME=re.compile(r'^[A-Za-z0-9][A-Za-z0-9_. -]{0,80}$')
REQUIRED=('hips','spine','chest','neck','head','leftUpperArm','leftLowerArm','leftHand','rightUpperArm','rightLowerArm','rightHand','leftUpperLeg','leftLowerLeg','leftFoot','rightUpperLeg','rightLowerLeg','rightFoot')
FINGERS=tuple(f'{side}{finger}{part}' for side in ('left','right') for finger in ('Thumb','Index','Middle','Ring','Little') for part in ('Proximal','Intermediate','Distal'))
ALIASES={
 'hips':('hips','pelvis','mixamorig:hips'),'spine':('spine','mixamorig:spine'),'chest':('chest','spine1','mixamorig:spine1'),'neck':('neck','mixamorig:neck'),'head':('head','mixamorig:head'),
 **{f'{s}{p}':tuple(x.lower() for x in (f'{s}{p}',f'mixamorig:{s}{p}',f'{s}_{p}')) for s in ('left','right') for p in ('UpperArm','LowerArm','Hand','UpperLeg','LowerLeg','Foot')},
}
# Common Mixamo names differ only in capitalization after the prefix.

def model_root():
 try:
  import folder_paths
  return Path(folder_paths.models_dir).resolve()/'live-avatar-vrm'
 except Exception:return Path(__file__).resolve().parents[2]/'models'/'live-avatar-vrm'

def safe_name(name:str)->str:
 raw=str(name)
 if '/' in raw or '\\' in raw or raw in {'.','..'}:raise ValueError('Output name must be a safe .vrm filename')
 name=Path(raw).name
 if not SAFE_NAME.fullmatch(name) or not name.lower().endswith('.vrm'):raise ValueError('Output name must be a safe .vrm filename')
 return name

def parse_glb(data:bytes):
 if len(data)<20 or data[:4]!=b'glTF':raise ValueError('Not a binary glTF/VRM file')
 magic,version,length=__import__('struct').unpack_from('<4sII',data,0)
 if version!=2 or length!=len(data):raise ValueError('Invalid GLB v2 length')
 off=12;chunks=[]
 while off<len(data):
  size,typ=__import__('struct').unpack_from('<I4s',data,off);off+=8
  if size%4 or off+size>len(data):raise ValueError('Invalid GLB chunk')
  chunks.append((typ,data[off:off+size]));off+=size
 if off!=len(data) or not chunks or chunks[0][0]!=b'JSON':raise ValueError('GLB has no JSON chunk')
 try:doc=json.loads(chunks[0][1].decode('utf-8').rstrip(' \t\r\n\0'))
 except Exception as e:raise ValueError('Invalid GLB JSON') from e
 bin_data=next((x for t,x in chunks if t==b'BIN\0'),None)
 if bin_data is None:raise ValueError('VRM requires an embedded binary chunk')
 return doc,bin_data

def build_glb(doc:dict,bin_data:bytes)->bytes:
 jb=json.dumps(doc,ensure_ascii=False,separators=(',',':')).encode();jb+=b' ' *((-len(jb))%4);bin_data+=b'\0' *((-len(bin_data))%4)
 out=b'glTF'+__import__('struct').pack('<II',2,12+8+len(jb)+8+len(bin_data))+__import__('struct').pack('<I4s',len(jb),b'JSON')+jb+__import__('struct').pack('<I4s',len(bin_data),b'BIN\0')+bin_data
 if len(out)>MAX_BYTES:raise ValueError(f'VRM exceeds {MAX_BYTES//1024//1024} MiB server limit')
 return out

def vrm0(doc:dict):
 ext=doc.get('extensions',{}).get('VRM')
 if not isinstance(ext,dict):raise ValueError('Only legacy VRM 0.x is supported; VRMC_vrm/GLB is not accepted')
 return ext

def image_binding(doc:dict):
 materials=doc.get('materials',[]);textures=doc.get('textures',[]);images=doc.get('images',[]);bindings=[]
 for material in materials:
  tex=(material.get('pbrMetallicRoughness') or {}).get('baseColorTexture')
  if not isinstance(tex,dict) or not isinstance(tex.get('index'),int):continue
  ti=tex['index']
  if ti<0 or ti>=len(textures):raise ValueError('VRM base-color texture index is invalid')
  image_index=textures[ti].get('source')
  if not isinstance(image_index,int) or image_index<0 or image_index>=len(images):raise ValueError('VRM base-color image index is invalid')
  bv=images[image_index].get('bufferView')
  if not isinstance(bv,int):raise ValueError('VRM Creator requires every base-color texture to be embedded')
  bindings.append((material.get('name','material'),image_index,bv))
 if not bindings:raise ValueError('No embedded base-color texture was found in this VRM')
 if len({(image,bv) for _,image,bv in bindings})!=1:raise ValueError('VRM Creator supports one distinct embedded base-color image; choose a single-texture VRM0 base')
 return bindings[0]

def texture_bytes(doc,bin_data,bv_index):
 bv=doc['bufferViews'][bv_index];start=int(bv.get('byteOffset',0));end=start+int(bv['byteLength'])
 if start<0 or end>len(bin_data):raise ValueError('Texture bufferView is out of range')
 return bin_data[start:end]

def to_tensor(image):
 import numpy as np,torch
 a=np.asarray(image.convert('RGB'),dtype=np.float32)/255.0
 return torch.from_numpy(a).unsqueeze(0)

def from_tensor(value):
 from PIL import Image
 import numpy as np
 a=value.detach().cpu().numpy() if hasattr(value,'detach') else value
 if getattr(a,'ndim',0)==4:a=a[0]
 if a.ndim!=3 or a.shape[-1] not in (3,4):raise ValueError('Edited texture must be an IMAGE tensor')
 return Image.fromarray((np.clip(a[...,:3],0,1)*255+0.5).astype('uint8'),'RGB')

def vrm_files():return sorted(p.name for p in model_root().glob('*.vrm') if p.is_file() and p.stat().st_size<=MAX_BYTES and SAFE_NAME.fullmatch(p.name))

class DaWastehVRMTextureSource:
 @classmethod
 def INPUT_TYPES(cls):
  names=vrm_files() or ['(install a VRM0 preset first)']
  return {'required':{'vrm_name':(names,)}}
 RETURN_TYPES=('IMAGE','DAWASTEH_VRM_TEXTURE_SOURCE','STRING');RETURN_NAMES=('uv_texture','vrm_texture_source','model_info');FUNCTION='load';CATEGORY='DaWasteh/Live Avatar/VRM Creator'
 def load(self,vrm_name):
  if vrm_name.startswith('('):raise ValueError('Install/select a legacy VRM0 preset first')
  path=model_root()/safe_name(vrm_name);data=path.read_bytes();doc,bin_data=parse_glb(data);ext=vrm0(doc);material,image,bv=image_binding(doc);raw=texture_bytes(doc,bin_data,bv)
  from PIL import Image
  image_obj=Image.open(io.BytesIO(raw));image_obj.load();original=image_obj.size;alpha_png=None
  if 'A' in image_obj.getbands() or 'transparency' in image_obj.info:
   alpha_out=io.BytesIO();image_obj.convert('RGBA').getchannel('A').save(alpha_out,format='PNG',optimize=False,compress_level=9);alpha_png=alpha_out.getvalue()
  work=image_obj.convert('RGB');resized=(work.width-work.width%8,work.height-work.height%8)
  if resized[0]<8 or resized[1]<8:raise ValueError('Texture dimensions are too small')
  if resized!=work.size:work=work.resize(resized,Image.Resampling.LANCZOS)
  handle={'path':str(path),'sha256':__import__('hashlib').sha256(data).hexdigest(),'doc':doc,'bin':bin_data,'bufferView':bv,'image':image,'original':original,'material':material,'alpha_png':alpha_png}
  info=json.dumps({'file':path.name,'material':material,'texture_size':original,'working_size':work.size,'alpha_preserved':alpha_png is not None,'vrm_title':ext.get('meta',{}).get('title','')},ensure_ascii=False)
  return (to_tensor(work),handle,info)

def replace_image_binary(doc,bin_data,bv_index,replacement):
 """Replace one exclusively-owned image range without retaining GLB padding."""
 if not doc.get('buffers'):raise ValueError('VRM has no buffer')
 core=int(doc['buffers'][0].get('byteLength',0))
 if core<0 or core>len(bin_data):raise ValueError('Invalid declared buffer length')
 data=bin_data[:core];views=doc.get('bufferViews',[]);target=views[bv_index];start=int(target.get('byteOffset',0));length=int(target['byteLength']);end=start+length
 if start%4 or start<0 or end>core:raise ValueError('Target image bufferView must be aligned and within buffer core')
 intervals=sorted((int(v.get('byteOffset',0)),int(v.get('byteOffset',0))+int(v['byteLength']),i) for i,v in enumerate(views) if int(v.get('buffer',0))==0)
 for a,b,i in intervals:
  if i!=bv_index and a<end and b>start:raise ValueError('Image bufferView overlaps/shared range and cannot be safely replaced')
 next_offsets=[a for a,b,i in intervals if i!=bv_index and a>=end]
 span=(min(next_offsets) if next_offsets else core)-start
 if span<length:raise ValueError('Invalid replaceable image span')
 allocated=len(replacement)+((-len(replacement))%4);block=replacement+b'\0'*(allocated-len(replacement));delta=allocated-span
 new=data[:start]+block+data[start+span:]
 target['byteLength']=len(replacement)
 for i,v in enumerate(views):
  off=int(v.get('byteOffset',0))
  if i!=bv_index and off>=start+span:
   v['byteOffset']=off+delta
   if v['byteOffset']%4:raise ValueError('Replacement would unalign a later bufferView')
 doc['buffers'][0]['byteLength']=len(new)
 return new

class DaWastehVRMTextureVariant:
 @classmethod
 def INPUT_TYPES(cls):
  return {'required':{'source':('DAWASTEH_VRM_TEXTURE_SOURCE',),'edited_texture':('IMAGE',),'output_name':('STRING',{'default':'my-realistic-wizard-variant.vrm'}),'title':('STRING',{'default':'Local VRM texture variant'}),'author':('STRING',{'default':''}),'allow_overwrite':('BOOLEAN',{'default':False})}}
 RETURN_TYPES=('STRING','STRING');RETURN_NAMES=('vrm_path','report');OUTPUT_NODE=True;FUNCTION='save';CATEGORY='DaWasteh/Live Avatar/VRM Creator'
 def save(self,source,edited_texture,output_name,title,author,allow_overwrite=False):
  if not isinstance(source,dict):raise ValueError('Invalid VRM texture source handle')
  if __import__('hashlib').sha256(Path(source['path']).read_bytes()).hexdigest()!=source['sha256']:raise ValueError('Source VRM changed; reload texture source')
  from PIL import Image
  img=from_tensor(edited_texture).resize(tuple(source['original']),Image.Resampling.LANCZOS)
  if source.get('alpha_png'):
   alpha=Image.open(io.BytesIO(source['alpha_png']));alpha.load();img.putalpha(alpha.convert('L').resize(tuple(source['original']),Image.Resampling.LANCZOS))
  out=io.BytesIO();img.save(out,format='PNG',optimize=False,compress_level=9);replacement=out.getvalue()
  doc=json.loads(json.dumps(source['doc']));vrm0(doc);binary=replace_image_binary(doc,source['bin'],source['bufferView'],replacement)
  # The image bytes are now PNG regardless of the source encoding.
  doc['images'][source['image']]['mimeType']='image/png'
  meta=vrm0(doc).setdefault('meta',{});meta['title']=str(title)[:120]
  if str(author).strip():meta['author']=str(author).strip()[:120]
  data=build_glb(doc,binary);parse_glb(data);vrm0(doc);name=safe_name(output_name);root=model_root();root.mkdir(parents=True,exist_ok=True);target=root/name
  if target.exists() and not allow_overwrite:raise FileExistsError(f'{name} already exists; choose another name or explicitly allow overwrite')
  fd,tmp=tempfile.mkstemp(prefix='.variant-',suffix='.vrm',dir=root)
  try:
   with os.fdopen(fd,'wb') as f:f.write(data);f.flush();os.fsync(f.fileno())
   Path(tmp).replace(target)
  finally:
   Path(tmp).unlink(missing_ok=True)
  return (str(target),json.dumps({'file':name,'bytes':len(data),'texture_size':source['original'],'preserved':'skin, skeleton, morph targets and VRM license metadata'},ensure_ascii=False))

LICENSE_OPTIONS=('Redistribution_Prohibited','CC0','CC_BY','CC_BY_NC','CC_BY_SA','CC_BY_NC_SA','CC_BY_ND','CC_BY_NC_ND','Other')
def normalized(name):return re.sub(r'[^a-z0-9]','',str(name).lower())
def node_name_map(doc):
 result={}
 for i,node in enumerate(doc.get('nodes',[])):
  name=normalized(node.get('name',''))
  if name and name not in result:result[name]=i
 return result
def find_node(names,lookup):
 for name in names:
  found=lookup.get(normalized(name))
  if found is not None:return found
 return None
def aliases_for(key):
 camel=key[0].upper()+key[1:];side='Left' if key.startswith('left') else ('Right' if key.startswith('right') else '')
 base=[key,camel,'mixamorig:'+camel,'mixamorig:'+key]
 mapping={'leftUpperArm':['LeftArm','left_arm'],'rightUpperArm':['RightArm','right_arm'],'leftLowerArm':['LeftForeArm','left_forearm'],'rightLowerArm':['RightForeArm','right_forearm'],'leftUpperLeg':['LeftUpLeg','left_thigh'],'rightUpperLeg':['RightUpLeg','right_thigh'],'leftLowerLeg':['LeftLeg','left_calf'],'rightLowerLeg':['RightLeg','right_calf'],'leftFoot':['LeftFoot','left_foot'],'rightFoot':['RightFoot','right_foot']}
 if key in FINGERS:
  finger=next(x for x in ('Thumb','Index','Middle','Ring','Little') if x in key);part=next(x for x in ('Proximal','Intermediate','Distal') if x in key);number={'Proximal':'1','Intermediate':'2','Distal':'3'}[part]
  mapping[key]=[f'{side}Hand{finger}{number}',f'{side}{finger}{number}',f'mixamorig:{side}Hand{finger}{number}']
 return base+mapping.get(key,[])
def skin_joints(skins):return {int(j) for skin in skins for j in skin.get('joints',[]) if isinstance(j,int)}
def morph_targets(doc):
 found=[]
 for mesh_index,mesh in enumerate(doc.get('meshes',[])):
  for primitive_index,primitive in enumerate(mesh.get('primitives',[])):
   count=len(primitive.get('targets',[]) or [])
   names=(primitive.get('extras') or {}).get('targetNames') or (mesh.get('extras') or {}).get('targetNames') or []
   for index in range(min(count,len(names))):found.append((normalized(names[index]),mesh_index,primitive_index,index,str(names[index])))
 return found
SHAPES={'Blink':('blink','eyeblinkleft','eyeblinkright','blinkleft','blinkright'),'A':('a','aa','vrcvaa','visemea'),'I':('i','ih','vrcvih','visemei'),'U':('u','ou','vrcvou','visemeu'),'E':('e','ee','vrcvee','visemee'),'O':('o','oh','vrcvoh','visemeo')}
def parents(doc):
 out={}
 for i,node in enumerate(doc.get('nodes',[])):
  for child in node.get('children',[]) or []:out[child]=i
 return out
def ancestor(child,parent,up):
 while child in up:
  child=up[child]
  if child==parent:return True
 return False
COMPONENT_BYTES={5120:1,5121:1,5122:2,5123:2,5125:4,5126:4};TYPE_WIDTH={'SCALAR':1,'VEC2':2,'VEC3':3,'VEC4':4,'MAT2':4,'MAT3':9,'MAT4':16}
def accessor_ok(doc,index,typ):
 try:
  if not isinstance(index,int):return False
  a=doc['accessors'][index];count=int(a.get('count',0));component=int(a.get('componentType',0));view_index=a.get('bufferView')
  if a.get('type')!=typ or count<=0 or component not in COMPONENT_BYTES or not isinstance(view_index,int):return False
  view=doc['bufferViews'][view_index];element=COMPONENT_BYTES[component]*TYPE_WIDTH[typ];stride=int(view.get('byteStride',element));offset=int(a.get('byteOffset',0));length=int(view['byteLength'])
  return stride>=element and offset>=0 and offset+(count-1)*stride+element<=length
 except (IndexError,KeyError,TypeError,ValueError):return False
def valid_morph_targets(doc,targets):
 good=[]
 for name,mi,primitive_index,idx,label in targets:
  try:target=doc['meshes'][mi]['primitives'][primitive_index]['targets'][idx]
  except (IndexError,KeyError,TypeError):continue
  if accessor_ok(doc,target.get('POSITION'),'VEC3'):good.append((name,mi,primitive_index,idx,label))
 return good
def strict_audit(doc,mapped,fingers,targets):
 all_bones={**mapped,**{k:v for k,v in fingers.items() if v is not None}};wanted=set(all_bones.values());skins=doc.get('skins',[])
 chosen=next((i for i,s in enumerate(skins) if wanted.issubset(set(s.get('joints',[])))),None)
 if chosen is None:raise ValueError('No single glTF skin contains every mapped bone/finger')
 mesh_nodes=[n for n in doc.get('nodes',[]) if n.get('skin')==chosen and isinstance(n.get('mesh'),int)]
 if not mesh_nodes:raise ValueError('Chosen skin is disconnected from a mesh node')
 for node in mesh_nodes:
  for primitive in doc['meshes'][node['mesh']].get('primitives',[]):
   attrs=primitive.get('attributes',{});j,w=attrs.get('JOINTS_0'),attrs.get('WEIGHTS_0')
   if not (accessor_ok(doc,j,'VEC4') and accessor_ok(doc,w,'VEC4')):raise ValueError('Skinned mesh primitive lacks valid JOINTS_0/WEIGHTS_0 VEC4 accessors')
   ja,wa=doc['accessors'][j],doc['accessors'][w]
   if ja.get('componentType') not in (5121,5123,5125) or wa.get('componentType') not in (5126,5121,5123) or ja['count']!=wa['count']:raise ValueError('Invalid JOINTS_0/WEIGHTS_0 accessor types or counts')
 up=parents(doc);chains=[('spine','hips'),('chest','spine'),('neck','chest'),('head','neck'),('leftLowerLeg','leftUpperLeg'),('leftFoot','leftLowerLeg'),('rightLowerLeg','rightUpperLeg'),('rightFoot','rightLowerLeg'),('leftLowerArm','leftUpperArm'),('leftHand','leftLowerArm'),('rightLowerArm','rightUpperArm'),('rightHand','rightLowerArm')]
 for child,parent in chains:
  if not ancestor(mapped[child],mapped[parent],up):raise ValueError('Required humanoid hierarchy is not connected: '+parent+' -> '+child)
 for side in ('left','right'):
  for finger in ('Thumb','Index','Middle','Ring','Little'):
   a,b,c=(f'{side}{finger}{p}' for p in ('Proximal','Intermediate','Distal'))
   if all(x in fingers and fingers[x] is not None for x in (a,b,c)) and not (ancestor(fingers[a],mapped[f'{side}Hand'],up) and ancestor(fingers[b],fingers[a],up) and ancestor(fingers[c],fingers[b],up)):raise ValueError('Finger hierarchy is not connected: '+side+finger)
 for key,node in all_bones.items():
  n=doc['nodes'][node];rot=n.get('rotation',[0,0,0,1]);scale=n.get('scale',[1,1,1])
  if any(abs(float(x)-v)>1e-5 for x,v in zip(rot,[0,0,0,1])) or any(abs(float(x)-1)>1e-5 for x in scale):raise ValueError('Strict rest transform requires identity rotation/scale: '+key)
 return chosen,valid_morph_targets(doc,targets)
def validate_vrm_extension(doc):
 ext=vrm0(doc)
 if ext.get('exporterVersion')!='DaWasteh LiveAvatar VRM0' or ext.get('specVersion')!='0.0':raise ValueError('VRM extension lacks exporter/spec version')
 if len(ext.get('materialProperties',[]))!=len(doc.get('materials',[])):raise ValueError('VRM materialProperties do not cover all materials')
 if any(x.get('shader')!='VRM_USE_GLTFSHADER' for x in ext['materialProperties']):raise ValueError('VRM material shader envelope invalid')
 return True
class DaWastehRiggedGLBToVRM0:
 @classmethod
 def INPUT_TYPES(cls):
  return {'required':{'rigged_glb':('FILE_3D_GLB',),'output_name':('STRING',{'default':'rigged-vrm-candidate.vrm'}),'title':('STRING',{'default':'Rigged VRM candidate'}),'author':('STRING',{'default':''}),'license_name':(LICENSE_OPTIONS,{'default':'Other'}),'other_license_url':('STRING',{'default':''}),'strict':('BOOLEAN',{'default':True}),'allow_body_only':('BOOLEAN',{'default':False}),'allow_overwrite':('BOOLEAN',{'default':False})}}
 RETURN_TYPES=('STRING','STRING');RETURN_NAMES=('vrm_path','capability_report');OUTPUT_NODE=True;FUNCTION='convert';CATEGORY='DaWasteh/Live Avatar/VRM Creator'
 def convert(self,rigged_glb,output_name,title,author,license_name,other_license_url='',strict=True,allow_body_only=False,allow_overwrite=False):
  if license_name not in LICENSE_OPTIONS:raise ValueError('license_name must be a VRM0 license enum')
  if license_name=='Other' and not str(other_license_url).strip():raise ValueError('Other license requires a truthful other_license_url')
  source=rigged_glb.get_source() if hasattr(rigged_glb,'get_source') else rigged_glb;data=Path(source).read_bytes() if isinstance(source,(str,Path)) else source.read();doc,binary=parse_glb(data);skins=doc.get('skins',[])
  if not skins:raise ValueError('GLB is unrigged: no glTF skin/joints. Use an auto-rigged biped GLB, not a geometry-only mesh.')
  lookup=node_name_map(doc);joints=skin_joints(skins);mapped={k:find_node(aliases_for(k),lookup) for k in REQUIRED};fingers={k:find_node(aliases_for(k),lookup) for k in FINGERS}
  missing=[k for k,v in mapped.items() if v is None];missing_fingers=[k for k,v in fingers.items() if v is None];outside=[k for k,v in {**mapped,**fingers}.items() if v is not None and v not in joints]
  raw_targets=morph_targets(doc);targets=valid_morph_targets(doc,raw_targets);groups={key:[(mi,idx,label) for name,mi,primitive_index,idx,label in targets if name in aliases] for key,aliases in SHAPES.items()};missing_shapes=[key for key,binds in groups.items() if not binds]
  report={'required_missing':missing,'finger_missing':missing_fingers,'face_shapes_missing':missing_shapes,'non_skin_nodes':outside,'has_skin':True,'morph_target_count':len(raw_targets),'valid_position_morph_target_count':len(targets),'orientation_limits':'Strict mode verifies only identity bone rotation/scale; source axis, T-pose and weight quality still require manual QA.'}
  if missing:raise ValueError('Cannot create VRM0: required humanoid bones missing: '+', '.join(missing))
  if outside:raise ValueError('Rejected named nodes outside glTF skin joints: '+', '.join(outside))
  chosen,targets=strict_audit(doc,mapped,fingers,targets);groups={key:[(mi,idx,label) for name,mi,primitive_index,idx,label in targets if name in aliases] for key,aliases in SHAPES.items()};missing_shapes=[key for key,binds in groups.items() if not binds];report['skin_index']=chosen;report['face_shapes_missing']=missing_shapes
  if strict and (missing_fingers or missing_shapes):raise ValueError('Strict VRM candidate rejected: '+json.dumps(report)+'; use a source with actual finger chains and Blink/A/I/U/E/O morph targets.')
  if (missing_fingers or missing_shapes) and not allow_body_only:raise ValueError('Candidate lacks full Workflow 06 capabilities: '+json.dumps(report)+'; strict mode or explicit body-only acknowledgment is required')
  humans=[{'bone':key,'node':value,'useDefaultValues':True} for key,value in mapped.items()]
  complete_fingers=set()
  for side in ('left','right'):
   for finger in ('Thumb','Index','Middle','Ring','Little'):
    chain=[f'{side}{finger}{part}' for part in ('Proximal','Intermediate','Distal')]
    if all(fingers[key] is not None for key in chain):complete_fingers.update(chain)
  humans += [{'bone':key,'node':value,'useDefaultValues':True} for key,value in fingers.items() if key in complete_fingers]
  meta={'title':str(title)[:120],'author':str(author)[:120],'contactInformation':'','reference':'','version':'','allowedUserName':'OnlyAuthor','violentUssageName':'Disallow','sexualUssageName':'Disallow','commercialUssageName':'Disallow','otherPermissionUrl':'','licenseName':license_name,'otherLicenseUrl':str(other_license_url).strip() if license_name=='Other' else ''}
  ext={'meta':meta,'humanoid':{'humanBones':humans},'firstPerson':{'firstPersonBone':mapped['head'],'firstPersonBoneOffset':{'x':0,'y':0,'z':0},'meshAnnotations':[],'lookAtTypeName':'Bone'},'blendShapeMaster':{'blendShapeGroups':[{'name':key,'presetName':key,'binds':[{'mesh':mi,'index':idx,'weight':100.0} for mi,idx,_ in binds],'materialValues':[]} for key,binds in groups.items() if binds]},'secondaryAnimation':{'boneGroups':[],'colliderGroups':[]},'exporterVersion':'DaWasteh LiveAvatar VRM0','specVersion':'0.0','materialProperties':[{'name':str(material.get('name','')),'shader':'VRM_USE_GLTFSHADER','renderQueue':-1,'floatProperties':{},'vectorProperties':{},'textureProperties':{},'keywordMap':{},'tagMap':{}} for material in doc.get('materials',[])]}
  doc.setdefault('extensionsUsed',[])
  if 'VRM' not in doc['extensionsUsed']:doc['extensionsUsed'].append('VRM')
  doc.setdefault('extensions',{})['VRM']=ext;validate_vrm_extension(doc);out=build_glb(doc,binary);vrm0(doc);name=safe_name(output_name);root=model_root();root.mkdir(parents=True,exist_ok=True);target=root/name
  if target.exists() and not allow_overwrite:raise FileExistsError(f'{name} exists')
  fd,tmp=tempfile.mkstemp(prefix='.rig-',suffix='.vrm',dir=root)
  try:
   with os.fdopen(fd,'wb') as f:f.write(out);f.flush();os.fsync(f.fileno())
   Path(tmp).replace(target)
  finally:Path(tmp).unlink(missing_ok=True)
  report.update({'body_only':bool(missing_fingers or missing_shapes),'blink_uses_multiple_targets':len(groups['Blink'])>1,'path':str(target),'bytes':len(out)});return str(target),json.dumps(report,ensure_ascii=False)
