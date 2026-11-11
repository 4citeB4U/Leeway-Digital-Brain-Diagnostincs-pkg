# Digital Brain source evidence → independent Veritas → Receipt Authority

REGION: LEEWAY.DIGITAL_BRAIN.EVIDENCE
TAG: LEEWAY.DIGITAL_BRAIN.EVIDENCE_HANDOFF.V1
WHO: Owning package maintainers and authorized Veritas/Receipt custodians.
WHAT: Preserve reproducible CI evidence and transfer only independently qualified outcomes.
WHEN: After each source qualification run.
WHERE: docs/EVIDENCE-CUSTODY-HANDOFF.md
WHY: Completed successful work must not be lost, unlinked, or misrepresented as a production certificate.
HOW: Hash-bounded GitHub run identifiers, sanitized artifact, review intake, independent approval, Receipt readback.
LICENSE: MIT (package documentation only).

## Retained evidence

Historical CI source evidence for exact commit `8580e3d53cc14fddc43b941597fba071f3241f0c` is indexed at [historical source evidence](../evidence/source-qualification/history-2026-11-11.v1.json). Six original job logs were read through GitHub, all six show 14/14 passing tests and successful local Diagnostics steps. SHA-256 digests are of decoded UTF-8 job log contents and are not claims of signed attestation. No original workflow artifact existed for these historical runs; do not manufacture one.

## Continuous test evidence acquisition

The `Source qualification` GitHub workflow runs the original Node test suite and read-only `collectDiagnostics()` smoke on Linux, Windows and macOS. Every matrix job writes `.local-evidence/source-evidence.json` and `.sha256` (including failures), then uploads an artifact even when tests fail; GitHub PR runs also add a sanitized idempotent source-evidence pointer to PR #1. No user files, private hostnames, raw OS facts, or credentials belong in this public source evidence.

The artifacts request 90-day retention and therefore remain **time-limited CI custody**, not a permanent Receipt Authority append. GitHub run URLs and PR pointers preserve discovery of source-scope results. If a run has no artifact or uploaded bytes cannot be read back, mark custody **INCOMPLETE**; do not promote it.

## Explicit independent admission route

1. Match the evidence packet's repository, commit, run, job, outcome, test count and SHA-256 to the original GitHub job source; preserve negative tests and failed attempts.
2. Authorized **LEEWAY-VERITAS** reviewer receives a bounded candidate packet via the existing owner-approved review-intake adapter and performs readback. Intake status alone is **PENDING_INDEPENDENT_REVIEW** and never a signed decision.
3. Only a separately enrolled, independent custodian may sign a scoped source evaluation. Physical device PRE/POST needs additional real target execution and does not follow from CI.
4. After independent verification and the correct owner/tenant/capability admission, append the accepted evidence through the **existing Receipt Authority runtime** and read back the exact original record/hash. GitHub must hold *sanitized references only*. Its repository, workflow artifacts, and comments are not a duplicate receipt ledger.
5. Learning Ledger processes only independently verified eligible receipt obligations; prove delivery and readback. Record failures distinctly.
6. Full Diagnostics, Digital Brain indexing, native installers, owner authorization, and Device Bridge discovery have **separate** acceptance gates; source-only passing results must never close them.

## Open execution blockers

Independent Veritas review host and approved signer are unobserved from this client. Tenant-scoped Receipt writer/readback and Learning adapter are not available in this source workflow. Bridge discovery returned `LEEWAY_BRIDGE_DISCOVERY_HTTP_401` on the previous authorized probe; the failing upstream authentication boundary remains open. No bypass or simulated signatures/receipts are permitted.

## Evidence recovery

Original historical work is **preserved as source evidence**, not retroactively certified. Future CI tests produce actual candidate artifacts; production custody requires the above approved provider and signed/readback evidence. If any stage is denied, preserve denial and resume at the original gate.