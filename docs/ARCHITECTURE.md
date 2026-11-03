# Diagnostics-first acceptance contract

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
