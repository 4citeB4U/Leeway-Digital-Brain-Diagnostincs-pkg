/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.DEVICE.DIGITAL_BRAIN.LOCALITY
TAG: LEEWAY.DEVICE.EXCLUSIVE_LOCALITY_SOURCE_BOUNDARY.V1
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHO = Device-exclusive Digital Brain/Diagnostics source contributors, outside F2 candidate.
WHAT = Reject cross-device and portable-global path declarations in a device-local source candidate.
WHEN = 2026-11-11; candidate engineering cycle; not a verified native runtime.
WHERE = packages/device/src/device-locality.mjs, device-local product boundary.
HOW = Deterministic structural checks for product, device reference and native path dialect; no I/O.
WHY = Keep each installed Brain and Diagnostics dedicated solely to its own physical device.
LICENSE: New package source under package terms; upstream rights separately retained.
AUTHORITY: SOURCE CANDIDATE ONLY; never a device, OS, person or Receipt/Veritas permission grant.
*/
const PRODUCT=new Set(['digital-brain','diagnostics']);
const PLATFORMS=new Set(['win32','linux','darwin','android','ios']);
const PERMISSION=new Set(['NOT_REQUESTED','OS_GRANTED','OS_DENIED','REQUIRES_HUMAN_CONSENT']);
const DEVICE_ID=/^[a-zA-Z0-9][a-zA-Z0-9._:-]{2,159}$/;
function deny(code){throw Object.assign(new Error('DEVICE_LOCALITY_'+code),{code:'DEVICE_LOCALITY_'+code});}
function localPath(platform,value){
 if(typeof value!=='string'||value.length<2||value.length>2048||
    value.includes('\0')||value.includes('\n')||value.includes('\r'))return false;
 const windows=platform==='win32';
 if(windows){
   if(!/^[a-zA-Z]:[\\/]/.test(value)||value.startsWith('\\\\')||value.startsWith('//'))return false;
 }else if(!value.startsWith('/')||value.startsWith('//')||value.includes('\\'))return false;
 // Lexical-only rejection; trusted native resolver must later prevent symlinks/mount escapes.
 const parts=windows?value.split(/[\\/]+/):value.split('/');
 const checked=windows?parts.slice(1):parts.slice(1);
 return !checked.some(p=>p==='..'||p==='.'||p==='');
}
/**
 * Candidate records may contain native device paths, but stay on-device.
 * Claimed device ID and consent boolean never prove real device, human grant or OS authorization.
 */
export function buildDeviceLocalityCandidate(input){
 if(!input||!PRODUCT.has(input.product))deny('PRODUCT_NOT_EXCLUSIVE');
 if(!DEVICE_ID.test(input.deviceId||'')||
    input.observedDeviceId!==input.deviceId||
    !PLATFORMS.has(input.platform))deny('DEVICE_SCOPE_UNVERIFIED_OR_MISMATCH');
 if(input.runtimeScope!=='DEVICE_EXCLUSIVE'||input.storageResidence!=='DEVICE_ONLY'||
    input.networkExportDefault!==false||input.reusableAsGlobalHostIdentity===true)
   deny('DEVICE_EXCLUSIVITY_REQUIRED');
 const roots=input.localPathObservations??[];
 if(!Array.isArray(roots)||roots.length>128)deny('ROOTS_INVALID');
 if(roots.length&&input.explicitLocalPathObservationConsent!==true)
   deny('PATH_OBSERVATION_CONSENT_REQUIRED');
 const seen=new Set();
 const localPathObservations=roots.map(root=>{
  if(!root||!DEVICE_ID.test(root.observedDeviceId||'')||root.observedDeviceId!==input.deviceId)
   deny('CROSS_DEVICE_ROOT_DENIED');
  if(!localPath(input.platform,root.nativePath))deny('NATIVE_PATH_SYNTAX_INVALID');
  if(!PERMISSION.has(root.permission))deny('PERMISSION_LABEL_INVALID');
  if(seen.has(root.nativePath))deny('DUPLICATE_DEVICE_ROOT');
  seen.add(root.nativePath);
  if(root.systemResource===true&&root.adminApproved!==true)deny('SYSTEM_ADMIN_REQUIRED');
  // Source locality never grants read/write, even if a caller labels OS permission GRANTED.
  return Object.freeze({observedDeviceId:root.observedDeviceId,
    nativePath:root.nativePath,permission:root.permission,
    systemResource:root.systemResource===true});
 });
 return Object.freeze({schema:'leeway.device.locality-candidate.v1',
   product:input.product,deviceId:input.deviceId,platform:input.platform,
   runtimeScope:'DEVICE_EXCLUSIVE',storageResidence:'DEVICE_ONLY',
   pathsPortable:false,externalExportAuthorized:false,canRead:false,canWrite:false,
   nativeIdentityVerified:false,authorization:'NOT_GRANTED_BY_SOURCE_CANDIDATE',
   status:'DEVICE_LOCAL_SOURCE_CANDIDATE_NOT_EXECUTED',
   localPathObservations:Object.freeze(localPathObservations)});
}
export function classifyDeviceLocalRequest(candidate,{targetDeviceId,nativePath}={}){
 const matched=candidate?.schema==='leeway.device.locality-candidate.v1' &&
   candidate?.deviceId===targetDeviceId &&
   candidate?.localPathObservations?.some(x=>x.observedDeviceId===targetDeviceId&&x.nativePath===nativePath);
 return Object.freeze({scope:matched?'DEVICE_LOCAL_CANDIDATE_MATCH':'DEVICE_LOCAL_DENIED',
   canRead:false,canWrite:false,executionAdmitted:false,
   reason:matched?'REQUIRES_NATIVE_IDENTITY_OS_PERMISSION_AND_HUMAN_CONSENT':'CROSS_DEVICE_OR_UNKNOWN_PATH_DENIED'});
}
