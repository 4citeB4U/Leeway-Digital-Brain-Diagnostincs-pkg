/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.DEVICE.DIGITAL_BRAIN.LOCALITY.TEST
TAG: LEEWAY.DEVICE.EXCLUSIVE_LOCALITY_NEGATIVE_TEST_V1
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHO = Device-exclusive source maintainers and outside F2 candidate.
WHAT = Test device-only Brain/Diagnostics source identity, paths and privacy boundaries.
WHEN = 2026-11-11, Node source test cycle, no hardware execution.
WHERE = packages/device/test/device-locality.test.mjs.
HOW = Deterministic fixtures for Windows, Apple, Android, Linux and negative cross-device access.
WHY = Preserve device allegiance without inventing permissions or universal machine identity.
LICENSE: New package tests under package terms.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {buildDeviceLocalityCandidate,classifyDeviceLocalRequest} from '../src/device-locality.mjs';
const sample=(overrides={})=>({product:'digital-brain',deviceId:'device-one',
  observedDeviceId:'device-one',platform:'win32',runtimeScope:'DEVICE_EXCLUSIVE',
  storageResidence:'DEVICE_ONLY',networkExportDefault:false,
  explicitLocalPathObservationConsent:true,
  localPathObservations:[{observedDeviceId:'device-one',nativePath:'C:\\Device\\Brain',
    permission:'OS_GRANTED'}],...overrides});
test('Windows Brain preserves its own native path as nonportable candidate, not access grant',()=>{
 const value=buildDeviceLocalityCandidate(sample());
 assert.equal(value.storageResidence,'DEVICE_ONLY');
 assert.equal(value.pathsPortable,false);
 assert.equal(value.nativeIdentityVerified,false);
 assert.equal(value.canRead,false);
 assert.equal(value.canWrite,false);
 assert.equal(value.localPathObservations[0].nativePath,'C:\\Device\\Brain');
 assert.equal(classifyDeviceLocalRequest(value,{targetDeviceId:'device-one',nativePath:'C:\\Device\\Brain'}).executionAdmitted,false);
});
test('same path is denied for another physical device identity',()=>{
 const b=buildDeviceLocalityCandidate(sample());
 assert.equal(classifyDeviceLocalRequest(b,{targetDeviceId:'device-two',nativePath:'C:\\Device\\Brain'}).scope,'DEVICE_LOCAL_DENIED');
});
test('rejects a root observed for a different device',()=>{
 assert.throws(()=>buildDeviceLocalityCandidate(sample({localPathObservations:[{observedDeviceId:'device-two',nativePath:'C:\\Other\\Brain',permission:'OS_GRANTED'}]})),/CROSS_DEVICE_ROOT_DENIED/);
});
test('rejects a device-ID mismatch',()=>assert.throws(()=>buildDeviceLocalityCandidate(sample({observedDeviceId:'device-two'})),/DEVICE_SCOPE/));
test('rejects source callers claiming global host identity',()=>assert.throws(()=>buildDeviceLocalityCandidate(sample({reusableAsGlobalHostIdentity:true})),/DEVICE_EXCLUSIVITY/));
test('rejects off-device default export',()=>assert.throws(()=>buildDeviceLocalityCandidate(sample({networkExportDefault:true})),/DEVICE_EXCLUSIVITY/));
test('rejects unapproved local path discovery',()=>assert.throws(()=>buildDeviceLocalityCandidate(sample({explicitLocalPathObservationConsent:false})),/CONSENT_REQUIRED/));
test('rejects lexical path escapes and UNC paths',()=>{
 for(const nativePath of ['C:\\Device\\..\\Private','\\\\remote\\share','..\\relative','C:\\Device\\.\\Private']){
  assert.throws(()=>buildDeviceLocalityCandidate(sample({localPathObservations:[{observedDeviceId:'device-one',nativePath,permission:'OS_GRANTED'}]})),/NATIVE_PATH_SYNTAX_INVALID/);
 }
});
test('device-local macOS and iOS paths are valid candidate data only',()=>{
 for(const platform of ['darwin','ios']){
  const b=buildDeviceLocalityCandidate(sample({platform,localPathObservations:[{observedDeviceId:'device-one',nativePath:'/private/var/mobile',permission:'REQUIRES_HUMAN_CONSENT'}]}));
  assert.equal(b.authorization,'NOT_GRANTED_BY_SOURCE_CANDIDATE');
 }
});
test('device-local Android and Linux paths are valid candidate data only',()=>{
 for(const platform of ['android','linux']){
  const b=buildDeviceLocalityCandidate(sample({platform,localPathObservations:[{observedDeviceId:'device-one',nativePath:'/storage/emulated/0/Docs',permission:'OS_DENIED'}]}));
  assert.equal(b.canRead,false);
 }
});
test('cannot use hardware-agnostic Runtime or Formula as a device-exclusive product',()=>{
 for(const product of ['runtime-fabric','formula','machine-consciousness']){
  assert.throws(()=>buildDeviceLocalityCandidate(sample({product})),/PRODUCT_NOT_EXCLUSIVE/);
 }
});
test('system path needs explicit admin approval even as source candidate',()=>{
 assert.throws(()=>buildDeviceLocalityCandidate(sample({localPathObservations:[{observedDeviceId:'device-one',nativePath:'C:\\Windows',permission:'OS_DENIED',systemResource:true}]})),/SYSTEM_ADMIN_REQUIRED/);
});
test('root observations cannot be mutated after candidate construction',()=>{
 const b=buildDeviceLocalityCandidate(sample());
 assert.throws(()=>{b.localPathObservations[0].nativePath='C:\\Other';},TypeError);
});
test('diagnostics may represent zero paths without indexing consent or exporting facts',()=>{
 const b=buildDeviceLocalityCandidate(sample({product:'diagnostics',explicitLocalPathObservationConsent:false,localPathObservations:[]}));
 assert.equal(b.status,'DEVICE_LOCAL_SOURCE_CANDIDATE_NOT_EXECUTED');
 assert.equal(b.localPathObservations.length,0);
 assert.equal(b.externalExportAuthorized,false);
});
