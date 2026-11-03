/* REGION: LEEWAY.DIAGNOSTICS.TEST; TAG: REAL_FACT_CONTRACT.V0
WHO: Maintainers. WHAT: Test read-only collector schema.
WHEN: CI. WHERE: Test harness. WHY: No fabricated health status.
HOW: Inject deterministic OS read API. LICENSE: MIT */
import test from 'node:test';
import assert from 'node:assert/strict';
import {collectDiagnostics} from '../src/collect.mjs';
test('records source and marks file access unrequested',()=>{
 const h={cpus:()=>[{model:'test cpu'}],platform:()=> 'linux',arch:()=> 'x64',release:()=> 'test',hostname:()=> 'test-host',totalmem:()=> 2048,freemem:()=>1024,uptime:()=>1};
 const r=collectDiagnostics(h);
 assert.equal(r.source,'node:os');assert.equal(r.facts.logicalCpuCount,1);
 assert.equal(r.permissions.systemFiles,'DENIED_BY_DEFAULT');
 assert.equal(r.permissions.userFiles,'NOT_REQUESTED');
});
