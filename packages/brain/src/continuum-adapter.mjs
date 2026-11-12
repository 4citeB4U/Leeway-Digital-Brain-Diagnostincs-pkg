/*
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.DIGITAL_BRAIN.CONTINUUM.ADAPTER
TAG: LEEWAY.DIGITAL_BRAIN.CONTINUUM.READ_ONLY_V1
WHAT: Bind a device-local Digital Brain reader to the existing Continuum consumer, without cloning storage authority.
WHY: Keep durable records under canonical owner/body-scoped Continuum authorization.
WHO: LeeWay authorized package maintainers and host-provided Continuum authority.
WHERE: packages/brain/src/continuum-adapter.mjs
WHEN: 2026-11-11
HOW: Require the canonical consumer factory and authenticated host bindings; pass through read-only methods.
LICENSE: MIT (candidate package implementation; upstream license separately verified).
AUTHORITY: Source adapter only; no live storage, device enrollment or independent Veritas claim.
*/
const fail = code => { throw Object.assign(new Error(code), {code}); };
const identityOk = value => typeof value === 'string' && /^[A-Za-z0-9_.:@/-]{1,256}$/.test(value);

export function createBrainContinuumAdapter({createContinuumConsumer, ownerId, bodyId, authorize, transport} = {}) {
  if (typeof createContinuumConsumer !== 'function' || !identityOk(ownerId) ||
    !identityOk(bodyId) || typeof authorize !== 'function' || !transport ||
    typeof transport.status !== 'function' || typeof transport.search !== 'function' ||
    typeof transport.getContent !== 'function') fail('BRAIN_CONTINUUM_BINDING_REQUIRED');
  // This is the original LeeWay-Continuum factory supplied by an authorized host.
  // Never create another database, authority, network transport or verifier here.
  const consumer = createContinuumConsumer({consumerId:'digital-brain', ownerId, bodyId,
    authorize, transport, writeEnabled:false});
  if (consumer?.descriptor?.consumerId !== 'digital-brain' ||
    consumer.descriptor.ownerId !== ownerId || consumer.descriptor.bodyId !== bodyId ||
    consumer.descriptor.writeEnabled !== false ||
    !['status','search','getContent'].every(name => typeof consumer[name] === 'function')) {
    fail('BRAIN_CONTINUUM_CONSUMER_INVALID');
  }
  return Object.freeze({
    descriptor: Object.freeze({consumerId:'digital-brain', ownerId, bodyId,
      writeEnabled:false, connected:'NOT_PROBED', createsDatabase:false}),
    status(context) { return consumer.status(context); },
    search(query, context) { return consumer.search(query, context); },
    getContent(recordId, context) { return consumer.getContent(recordId, context); }
  });
}
