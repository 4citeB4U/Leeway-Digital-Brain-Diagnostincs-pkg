<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.DEVICE.PACKAGE.CONTRACT
TAG: LEEWAY.DEVICE.DIAGNOSTICS.BRAIN.ACCEPTANCE
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHO = Creator and device-native package maintainers; outside F2 source contribution under owner review.
WHAT = Preserve diagnostics-first permissions, native device exception and installation acceptance boundaries.
WHEN = 2026-11-11, device-exclusive constitutional clarification.
WHERE = docs/ARCHITECTURE.md, Digital Brain + Diagnostics source package.
HOW = Read-only OS facts, device-native identity/paths, explicit consent and independent release gates.
WHY = Prevent cross-device state leakage and false native indexing or sensor claims.
LICENSE: New package docs under package terms; upstream rights unmodified.
AUTHORITY: Source acceptance contract, not runtime permission, Veritas or Receipt.
-->
# Diagnostics-first acceptance contract

**Creator's machine-exclusive exception:** [Device-exclusive constitutional contract](DEVICE-EXCLUSIVE-CONSTITUTIONAL-EXCEPTION.md) binds both installed products to their own physical device, its native paths and measured capabilities; the rest of LeeWay remains hardware agnostic. A device-local identity or path is not a permit to scan, a global machine identity or a substitute for human/OS authorization. Source guard: packages/device/src/device-locality.mjs (candidate only).

REGION: LEEWAY.PACKAGE.CONTRACT | TAG: DIAGNOSTICS_BRAIN_CONTINUUM.V0
WHO: Authorized product maintainer | WHAT: Product stages and access governance
WHEN: Prior to device onboarding | WHERE: Device-local package
WHY: No unauthorized collection | HOW: Explicit states and adapters | LICENSE: MIT

1. **Diagnostics**: OS facts may be gathered at request without file traversal. Platform-specific probes require separately declared capabilities and permissions. Diagnostics readiness is based on a **defined acceptance checklist**, not an invented numeric 90% claim. The Brain stage is enabled after minimum hardware/permission assessment passes; full diagnostics can continue independently.
2. **Device inventory**: distinguish abstract known roots/volumes and OS-provided environment facts from file enumeration. Metadata about an unauthorized file must not be collected. No claim of a full-system index without approved scope.
3. **Brain**: show approved roots and mode (metadata-only or content); require a separate affirmative indexing decision after consent; allow revoke/pause/delete; retain ACLs and preserve provenance. A generated plan **never executes** scanning.
4. **Roles**: personal owner; shared/family (2+ members as desired); business organization with owner/admin approvals. Strict principal/resource scope, departmental isolation, and deny-first authorizations. Membership count alone does not grant business permissions.
5. **Storage**: bind the existing Continuum via its verified consumer transport. Storage allocations/compression must be evidenced; no additional database or service is automatically created here.
6. **Optional ecosystem**: enrollment is independent from local functionality. Never reuse external services' security credentials or imply MCP grants installation permissions.
7. **Release**: verifiable SHA-256, signatures where supported, platform compatibility, uninstall and rollback, per-platform clean-install evidence. GitHub Pages is a static distribution portal, never a device scanner.

## Existing source anchors (not copied)
- [Runtime Fabric native PC Brain](https://github.com/4citeB4U/Leeway-Runtime-Fabric/blob/main/machine-consciousness/pc-brain-view.mjs)
- [Continuum consumer](https://github.com/4citeB4U/LeeWay-Continuum/blob/main/src/integration/ecosystem-consumer.mjs)
- [RapidWebDev projection](https://github.com/4citeB4U/RapidWebDev/blob/main/brain/public/ecosystem-fabric.js)

Source observations from 2026-11-02 (Git blob SHA, not release verification):
- PC Brain: `b87bc2839a168046a94de7094641782e7826492b`
- Continuum consumer: `b2761df0c842e9e362fffef28d95ead9f4267491`
- RapidWebDev fabric: `fc9a17aec3da18c639d81992eacfcefcb343a441`
These are SHA-1 Git object identifiers, not SHA-256 content attestations.
