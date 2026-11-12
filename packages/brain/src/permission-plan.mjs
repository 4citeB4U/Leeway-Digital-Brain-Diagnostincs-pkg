/* REGION: LEEWAY.BRAIN.PERMISSION; TAG: DENY_BY_DEFAULT.V0
WHO: Resource owner and authorized organizational administrators.
WHAT: Validate explicit scope and consent for future user-file indexing.
WHEN: Before native indexing is enabled. WHERE: Device local.
WHY: Separate device discovery from file access, enforce least privilege.
HOW: Exact resource grants, consent and deny-first policy. LICENSE: MIT */
const PROFILES=new Set(['personal','family','business']);
const MODES=new Set(['metadata','content']);
const RESOURCE_ID=/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;
// Prototype plans are valid only within the creating process; production needs a signed, device-bound authorization artifact.
const issuedPlans=new WeakSet();
export function buildIndexPlan(input) {
  if (!input || !PROFILES.has(input.profile)) throw Error('PROFILE_INVALID');
  if (input.consent!==true) throw Error('EXPLICIT_CONSENT_REQUIRED');
  if (!Array.isArray(input.grants)||input.grants.length===0) throw Error('NO_GRANTED_ROOTS');
  const ids=new Set();
  const grants=input.grants.map(g=>{
    if (!g || typeof g.id!=='string'||!RESOURCE_ID.test(g.id) || ids.has(g.id)) throw Error('RESOURCE_ID_INVALID');
    ids.add(g.id);
    if (g.ownerApproved!==true) throw Error('RESOURCE_OWNER_APPROVAL_REQUIRED');
    if (g.systemResource===true && g.adminApproved!==true) throw Error('SYSTEM_ADMIN_APPROVAL_REQUIRED');
    if (!MODES.has(g.mode)) throw Error('MODE_INVALID');
    if (input.profile!=='personal' && (!Array.isArray(g.allowedPrincipals)||g.allowedPrincipals.length===0 || !g.allowedPrincipals.every(x=>typeof x==='string'&&x.trim()))) throw Error('PRINCIPAL_ACL_REQUIRED');
    return Object.freeze({id:g.id,mode:g.mode,systemResource:g.systemResource===true,allowedPrincipals:Object.freeze(input.profile==='personal'?['owner']:[...g.allowedPrincipals])});
  });
  const plan=Object.freeze({schema:'leeway.brain.index-plan.v0',profile:input.profile,status:'PLANNED_NOT_EXECUTED',uploaded:false,grants:Object.freeze(grants)});
  issuedPlans.add(plan);
  return plan;
}
export function mayAccess(plan,resourceId,principal,mode='metadata') {
  if (!plan || !issuedPlans.has(plan) || !MODES.has(mode)) return false;
  const grant=plan.grants.find(x=>x.id===resourceId);
  return Boolean(grant && grant.allowedPrincipals.includes(principal) && (mode==='metadata'||grant.mode==='content'));
}
