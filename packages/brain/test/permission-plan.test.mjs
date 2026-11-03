/* REGION: LEEWAY.BRAIN.TEST; TAG: PERMISSION_ACCEPTANCE.V0
WHO: Package maintainers. WHAT: Validate denial boundaries.
WHEN: CI. WHERE: Node test runner. WHY: Prevent unauthorized scans.
HOW: Deterministic input tests. LICENSE: MIT */
import test from 'node:test';
import assert from 'node:assert/strict';
import {buildIndexPlan,mayAccess} from '../src/permission-plan.mjs';
const owner={profile:'personal',consent:true,grants:[{id:'documents',mode:'metadata',ownerApproved:true}]};
test('denies missing consent',()=>assert.throws(()=>buildIndexPlan({...owner,consent:false}),/CONSENT/));
test('denies unapproved system resource',()=>assert.throws(()=>buildIndexPlan({...owner,grants:[{id:'system',mode:'content',ownerApproved:true,systemResource:true}]}),/ADMIN/));
test('limits file contents and unknown roots',()=>{
 const p=buildIndexPlan(owner);assert.equal(p.status,'PLANNED_NOT_EXECUTED');
 assert.equal(mayAccess(p,'documents','owner','metadata'),true);
 assert.equal(mayAccess(p,'documents','owner','content'),false);
 assert.equal(mayAccess(p,'other','owner'),false);
});
test('business principals cannot see other departments',()=>{
 const p=buildIndexPlan({profile:'business',consent:true,grants:[{id:'finance',mode:'content',ownerApproved:true,allowedPrincipals:['accounting']}]});
 assert.equal(mayAccess(p,'finance','logistics','content'),false);
 assert.equal(mayAccess(p,'finance','accounting','content'),true);
});
test('family/business ACL is mandatory',()=>assert.throws(()=>buildIndexPlan({profile:'family',consent:true,grants:[{id:'photos',mode:'content',ownerApproved:true}]}),/ACL/));
