<!--
LEEWAY HEADER — DO NOT REMOVE
REGION: LEEWAY.DEVICE.PACKAGE
TAG: LEEWAY.DEVICE.DIAGNOSTICS.BRAIN.DISTRIBUTION
DISCOVERY_PIPELINE: Voice → Intent → Location → Vertical → Ranking → Render
5WH:
WHO = Creator constitutional amendment and outside F2 source contributor; owner review required.
WHAT = Public distribution/source boundary for device-exclusive Brain and Diagnostics packages.
WHEN = 2026-11-11, device attachment amendment to existing PR #1.
WHERE = README.md, 4citeB4U/Leeway-Digital-Brain-Diagnostincs-pkg.
HOW = Preserve original product description; add the device-specific exception and verified source contract.
WHY = Let each machine retain its own native intelligence without imposing local paths on portable LeeWay services.
LICENSE: New package terms declared MIT; upstream component licenses independently controlled.
AUTHORITY: Documentation/source candidate only; no native device enrollment.
-->
# LeeWay Digital Brain + Diagnostics Package

REGION: LEEWAY.DEVICE.PACKAGE | TAG: DISTRIBUTION.CANONICAL.V0
WHO: LeeWay creator and authorized maintainers
WHAT: Independent distribution and integration boundary for Diagnostics, Digital Brain, and Continuum
WHEN: 2026-11-02 | WHERE: This repository
WHY: Ship device-local products without cloning the existing Runtime Fabric, Brain, or Continuum authority
HOW: Permission-gated local adapters, independently verified release artifacts, and a public download portal
LICENSE: MIT (new package files only; upstream licensing must be independently checked)

## Constitutional ownership exception

**Digital Brain and Diagnostics are dedicated exclusively to the physical device on which each instance is installed.** Their runtime identity, native paths, optional local index and hardware/permission observations are device-local and not a portable LeeWay/user-wide profile. LeeWay remains the software creator; no new filesystem or device grant follows from device dedication. All other LeeWay ecosystem authority and runtime components remain hardware-agnostic. See [device-exclusive constitutional contract](docs/DEVICE-EXCLUSIVE-CONSTITUTIONAL-EXCEPTION.md). A source-only [locality validator](packages/device/src/device-locality.mjs) checks structural device/path boundaries without pretending to attest real hardware or grant access.

## Product boundary

1. **Diagnostics first.** Read-only, limited device discovery, no directory traversal or file-content access. Capability and permission findings are explicit.
2. **Brain second.** The Brain is dormant until a user selects allowed roots, provides consent, and confirms an indexing plan. Only explicitly granted user/business resources are eligible. System paths are denied by default. No upload by default.
3. **Continuum third.** A single optional, owner-scoped storage adapter using the canonical [Continuum consumer](https://github.com/4citeB4U/LeeWay-Continuum/blob/main/src/integration/ecosystem-consumer.mjs). No promised remote capacity, compression ratios, storage containers, or provider connections until proven.
4. **Standalone products.** Diagnostics and Brain may be installed separately; the combined package includes both and the Continuum integration adapter. Neither requires ecosystem enrollment.
5. **Authority.** Runtime Fabric remains the original device binding / Brain authority; this repository provides distribution, contracts, consent and adapters. [Existing PC Brain](https://github.com/4citeB4U/Leeway-Runtime-Fabric/blob/main/machine-consciousness/pc-brain-view.mjs).

## Rollout and gates

- G1: inspect upstream implementation and immutable version hashes.
- G2: diagnostics collector and evidence schema + read-only tests.
- G3: clear consent / identity / tiered access plans before Brain indexing.
- G4: real native Brain and Continuum bindings, storage verification and cross-platform adapters.
- G5: signed installers, clean installs, performance/security acceptance and GitHub Releases.

**Current state:** source-stage prototype; no signed installers, no live storage allocation, no full-device scan, and no claimed production certification.

Run `node --test` for package contract tests. Run `node packages/diagnostics/bin/diagnose.mjs` to emit current local runtime-reported diagnostics (read-only). The GitHub Pages site explains package readiness; it does not fabricate download URLs.

Do not equate the optional **device inventory** with an authorized scan of files. A file record is only eligible for content processing when its own effective access policy allows it. Family/team/business roles must be evaluated against each resource with deny-by-default rules.
