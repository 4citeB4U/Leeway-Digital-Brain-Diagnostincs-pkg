/*
REGION: LEEWAY.BRAIN.TEST
TAG: PERMISSION_PLAN_NEGATIVE_BOUNDARIES.V1
WHAT: Detect mutable ACLs, unsupported modes, forged plans, and untrusted raw filesystem roots.
WHY: Keep untrusted requests from gaining plan-stage authorization by source object manipulation.
WHO: External support engineering candidate; canonical source owner review required.
WHERE: packages/brain/test/permission-hardening.test.mjs
WHEN: 2026-11-11
HOW: Node's deterministic test runner with positive and negative security assertions.
LICENSE: MIT candidate, subject to repository owner approval.
*/
import test from 'node:test';
import assert from 'node:assert/strict';
import {buildIndexPlan,mayAccess} from '../src/permission-plan.mjs';
const plan=()=>buildIndexPlan({profile:'business',consent:true,grants:[{id:'finance',mode:'content',ownerApproved:true,allowedPrincipals:['accounting']}]});
test('ACL cannot be expanded after plan construction',()=>{
 const p=plan();
 assert.throws(()=>p.grants[0].allowedPrincipals.push('outsider'),TypeError);
 assert.equal(mayAccess(p,'finance','outsider','content'),false);
});
test('unknown access modes always deny',()=>assert.equal(mayAccess(plan(),'finance','accounting','execute'),false));
test('externally forged plan is not locally issued',()=>{
 const forged={grants:[{id:'finance',mode:'content',allowedPrincipals:['outsider']}]};
 assert.equal(mayAccess(forged,'finance','outsider','content'),false);
});
test('filesystem paths are not opaque resource identifiers',()=>{
 assert.throws(()=>buildIndexPlan({profile:'personal',consent:true,grants:[{id:'/etc',mode:'content',ownerApproved:true}]}),/RESOURCE_ID_INVALID/);
});
test('existing denial semantics are preserved',()=>{
 const p=buildIndexPlan({profile:'business',consent:true,grants:[{id:'finance',mode:'metadata',ownerApproved:true,allowedPrincipals:['accounting']}]});
 assert.equal(mayAccess(p,'finance','outsider','metadata'),false);
 assert.equal(mayAccess(p,'finance','accounting','content'),false);
});
