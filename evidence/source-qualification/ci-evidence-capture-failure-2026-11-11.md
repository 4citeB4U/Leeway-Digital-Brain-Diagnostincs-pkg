# CI evidence capture defect — November 11, 2026

REGION: LEEWAY.DIGITAL_BRAIN.EVIDENCE
TAG: LEEWAY.DIGITAL_BRAIN.CUSTODY_FAILURE_REPAIR.V1
WHO: LeeWay Digital Brain source maintainers.
WHAT: Preserve negative CI execution evidence before retest.
WHEN: November 11, 2026.
WHERE: evidence/source-qualification/ci-evidence-capture-failure-2026-11-11.md
WHY: Never erase a failed custody checkpoint even if test code passed.
HOW: Original GitHub run and job links, bounded error signatures, minimally scoped repair.
LICENSE: MIT (sanitized source evidence, not a production receipt).

- Source commit: `363bb517841c02db748220fae66f3cc94f673d42`.
- [PR run 43115868187](https://github.com/4citeB4U/Leeway-Digital-Brain-Diagnostincs-pkg/actions/runs/43115868187): three OS matrix jobs executed **17 tests, all passed**, but `actions/upload-artifact@v4` failed each job: `No files were found with the provided path: .local-evidence/`. The upload action excluded files under the hidden dot-prefixed directory. Original failed job IDs: 130843575156, 130843575234, 130843575344.
- Same run: evidence-index job 130843711103 returned `Resource not accessible by integration` (GitHub API 403) when attempting an automatic PR comment. No GitHub comment was written by that workflow.
- [Push run 43115859772](https://github.com/4citeB4U/Leeway-Digital-Brain-Diagnostincs-pkg/actions/runs/43115859772): same matrix artifact omission; three 17/17 test results remained source-pass but custody failed; indexing job skipped.
- **Diagnosis:** Hidden artifact path omission and denied bot comment authorization. No underlying source-unit regression is evidenced.
- **Repair:** Set `include-hidden-files: true` only for the scoped `.local-evidence/` upload; replace comment-writer with read-only artifact-metadata verification and job summary. Do not escalate GitHub token permissions or invent Veritas/Receipt authority.
- **Retest gate:** Source tests pass on all 3 OS runners; each produces one nonempty artifact; artifact list is independently readable through the GitHub API; workflow completes successfully; no raw hostname or device file content in sanitized packet. GitHub artifact metadata is **not** canonical Receipt custody or byte-level independent Veritas.
- No original source-test failure was hidden; these are custody failures and must remain discoverable after repair.
