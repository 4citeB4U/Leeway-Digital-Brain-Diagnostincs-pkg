/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.DIGITAL_BRAIN.CONTINUUM.TEST
TAG: LEEWAY.DIGITAL_BRAIN.CONTINUUM.READ_ONLY_ADAPTER_TEST_V1
WHAT: Test consumer wiring, owner binding and fail-closed behavior using a deterministic local fake.
WHY: Prevent accidental duplication of canonical Continuum storage and write access.
WHO: LeeWay package maintainers and independent reviewers.
WHERE: packages/brain/test/continuum-adapter.test.mjs
WHEN: 2026-11-11
HOW: Node test runner with an injected test double, never a simulated live deployment claim.
LICENSE: MIT (candidate package implementation).
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {createBrainContinuumAdapter} from '../src/continuum-adapter.mjs';

const settings = () => ({ownerId:'owner-1', bodyId:'body-1', authorize:async()=>true,
  transport:{status:async()=>({ok:true}), search:async()=>[], getContent:async()=>null}});

test('rejects missing owner identity or canonical consumer factory',()=>{
  assert.throws(()=>createBrainContinuumAdapter({...settings()}),/BINDING_REQUIRED/);
  assert.throws(()=>createBrainContinuumAdapter({...settings(),createContinuumConsumer:()=>null}),/CONSUMER_INVALID/);
});
test('requests canonical digital-brain scope and never enables writes',async()=>{
  let opts;
  const factory = input => {
    opts=input;
    return {descriptor:{consumerId:input.consumerId,ownerId:input.ownerId,
      bodyId:input.bodyId,writeEnabled:input.writeEnabled},
      status:async c=>c, search:async (q,c)=>({q,c}), getContent:async (id,c)=>({id,c})};
  };
  const adapter=createBrainContinuumAdapter({...settings(),createContinuumConsumer:factory});
  assert.equal(opts.consumerId,'digital-brain');
  assert.equal(opts.writeEnabled,false);
  assert.equal(adapter.descriptor.connected,'NOT_PROBED');
  assert.deepEqual(await adapter.status({id:1}),{id:1});
  assert.deepEqual(await adapter.search('needle',{id:2}),{q:'needle',c:{id:2}});
  assert.deepEqual(await adapter.getContent('rec-1',{id:3}),{id:'rec-1',c:{id:3}});
  assert.equal('ingestFile' in adapter,false);
});
test('refuses a mismatched or write-enabled provider',()=>{
  const s=settings();
  for(const descriptor of [{consumerId:'other',ownerId:s.ownerId,bodyId:s.bodyId,writeEnabled:false},
    {consumerId:'digital-brain',ownerId:'foreign',bodyId:s.bodyId,writeEnabled:false},
    {consumerId:'digital-brain',ownerId:s.ownerId,bodyId:s.bodyId,writeEnabled:true}]){
    assert.throws(()=>createBrainContinuumAdapter({...s,createContinuumConsumer:()=>({
      descriptor,status:async()=>{},search:async()=>{},getContent:async()=>{}})}),/CONSUMER_INVALID/);
  }
});
