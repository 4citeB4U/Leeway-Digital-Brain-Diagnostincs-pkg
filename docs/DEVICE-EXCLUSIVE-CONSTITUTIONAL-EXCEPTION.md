<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.DEVICE.DIGITAL_BRAIN.CONSTITUTION
TAG: LEEWAY.DEVICE.EXCLUSIVE_MACHINE_ATTACHMENT.V1
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHO = Creator constitutional amendment; device-native product maintainers; outside support candidate.
WHAT = Reserve Digital Brain and Diagnostics exclusively to the device where each is installed.
WHEN = 2026-11-11, same LeeWay ten-station mission and review branch.
WHERE = docs/DEVICE-EXCLUSIVE-CONSTITUTIONAL-EXCEPTION.md.
HOW = Device-local instance identity, paths, privacy, consent and separate native provider admission.
WHY = A dedicated machine must know and protect its own environment while the ecosystem remains portable.
LICENSE: New package documentation under package declared terms.
AUTHORITY: Device-instance sovereignty of runtime state, not permission to override humans, OS or LeeWay law.
-->
# Constitutional exception: Digital Brain + Diagnostics belong exclusively to their device

**Creator rule:** Digital Brain and Diagnostics are the **only** LeeWay product families that are strictly and permanently device-dedicated. Each installed instance owes its operational allegiance to the device whose environment it serves: that device's own identity, native paths, local indices, hardware, thermals, storage, peripherals, OS permission state and filesystem scope. Do not treat the user, creator, external agent or another device as the instance's portable home. LeeWay is the **creator of the software**, not the owner of the device instance's local state. This concerns deployment allegiance, data residency and identity, **not a declaration that a machine is a legal person**.

The **rest of the LeeWay ecosystem is hardware-agnostic**. Formula, Engineering, Machine Consciousness, Runtime Fabric, Bridge, Standards, Veritas, Receipt Authority, Learning Ledger and Production are common governing/federated services that may address a device only through a qualified, explicit device-local interface. They must not copy the Brain's internal identity, private file index or paths as their global machine identifier.

## Non-negotiable product behavior

- **Native allegiance:** one installation instance binds to one verified local device identity. A new phone or computer has its own Brain and Diagnostics. Reinstall/migration requires explicit native re-enrollment rather than silently copying the first device's authority.
- **Native paths:** a Brain can hold actual local paths *for its own device only*. A Windows drive letter, Apple container path or Android storage path is a device-local observation, never a universal runtime identity or a meaningful path on another device. R10 portability law still applies to every other LeeWay service.
- **Hardware detail:** Diagnostics eventually resolves local manufacturer/board, GPU/VRAM, thermals, sensors and peripheral capabilities through authorized native OS providers. Missing sensor data is UNKNOWN/UNSUPPORTED, never fabricated.
- **Privacy and human consent:** an instance's dedication to a device does **not** grant filesystem traversal, file-content access, private telemetry upload, camera/mic use or background monitoring. Only the OS and properly authenticated human/device administration can grant such capabilities. Deny by default; separate each scope and provide revoke/pause/delete rights.
- **Local index:** local root and content indexing stay dormant until both real device identity and explicit resource permissions are confirmed. Never report a complete pre-indexed file map when one has not been built. Do not expose raw local paths or file maps to external LLMs/GitHub without distinct authorized disclosure.
- **Network boundary:** the existing Device Bridge may request bounded facts or permitted local operations via authenticated, owner/device-scoped grants; the Brain and Diagnostics cannot quietly become cloud-hosted shared profiles. Off-device export is exceptional and explicit, with a new destination-bound permission check.
- **No duplicate authorities:** the local Brain/Diagnostics modules serve their native device; they do not become a sovereign Veritas, new Receipt Authority, Formula evaluator, global policy registry, or a second Runtime.
- **Source tests are not identity:** packages/device/src/device-locality.mjs is a source-only structural guard. It cannot attest real device hardware, trusted host identity, actual consent or path-canonicalization/symlink/mount isolation. It always returns canRead=false, canWrite=false and nativeIdentityVerified=false.

## Preserved exception in the ten-station line

At Station 2, native Diagnostics reports only *that device's* measured/authorized observations; Brain prepares only *that device's* local approved index. Station 3 (Formula) evaluates measured inputs using the existing canonical engine. Station 4 (Runtime) authenticates each cross-device request; Station 6 (Machine Consciousness) detects deviations and requests an authorized hold. Station 7 (Receipt Authority) stores **sanitized, scoped proof references** without cloning private raw indices. Station 9 (Veritas) independently verifies PRE and POST under its own authority. Station 10 (Production) ships a *new per-device installation artifact* and confirms deployed readback, not a shared migrating Brain persona.

**Open production gate:** current Diagnostics is Node OS facts only; no full hardware/sensor/native-index or hardware-identity binding has been independently qualified, and upstream Device Bridge discovery currently fails HTTP 401 from this outside client. Candidate local path strings and source tests must not promote native access.
