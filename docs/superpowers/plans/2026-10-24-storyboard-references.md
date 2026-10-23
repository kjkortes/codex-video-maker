# Optional storyboard references implementation plan

**Goal:** Preserve and interpret optional creative references without changing the five required inputs or the rendering workflow.

**Architecture:** The repository is an instruction-driven workspace, with no intake application or existing test runner. Add one Node standard-library copy helper to the existing agent-operated intake procedure. Codex performs visual analysis; the helper only detects and preserves bytes. Keep supplied references separate from generated production storyboards.

**Specification:** The user's Optional Storyboard Reference Support requirements.

**Constraints:** No video generation, rendering, new dependencies, input-format changes, narration changes, or extra approval gates. Selected orientation remains authoritative.

## Files and tasks

- [x] Add `tests/storyboard-references.test.mjs` first and observe failure; implement `scripts/copy-storyboard-references.mjs`. CLI: `node scripts/copy-storyboard-references.mjs <inbox> <existing-job>`. Return a JSON inventory and warnings, copy supported root references and all regular supporting assets recursively, retain filenames/bytes/empty directories, never overwrite references, and leave the inbox unchanged. No references creates no artifacts. Test all formats together, nested assets, unchanged required inputs/configuration, missing/unsupported/malformed references, collisions, repeat runs, and symbolic links.
- [x] Update `AGENTS.md`, `guide.md`, `README.md`, `docs/visual-production-workflow.md`, existing plan/design/review templates, and input-contract/handoff instructions. Add `templates/reference-analysis.md`. Require combined visual inspection before planning, including PDF page images, with creative interpretation and factual/timing/orientation priority. Preserve all production gates. Connect QA to overall creative intent rather than panel matching. Keep technique implementation in existing motion skills, without modifying installed third-party skills.
- [x] Validate instruction ordering, local documentation links, unchanged five-file validation/orientation/checkpoints, and the CLI test suite. Review the complete diff. Report changes, limitations of automated checks, and a copy-paste production example. Do not render.

## Review focus

- Optional copy or visual-decoding failures must warn and allow normal five-file production.
- Original references and existing destination files must never be modified or replaced; skip symbolic links rather than importing unrelated files.
- No-reference jobs must not gain reference directories, analysis requirements, or approvals.
- Resumed jobs use preserved job references, not a new inbox package.
- Static automated checks can verify instruction ordering but cannot prove an agent actually inspected images or made good creative decisions.

## Validation record

- Initial detection/copy tests failed because the helper was absent; instruction checks failed before documentation integration.
- Final `node --test tests/*.test.mjs`: 17 passed, 0 failed, 0 skipped on Node 22.11.0/Linux, including a real permission-denied source file.
- `node --check scripts/copy-storyboard-references.mjs` and `git diff --check`: passed.
- Separate reviewer inspected the implementation and workflow changes: no actionable findings. Additional error-path/preservation tests passed afterward; helper implementation unchanged.
- Test development exposed an unnecessary cleanup hook that attempted chmod after fixture deletion; removed that hook and reran the entire suite successfully.
- No production jobs, supplied inputs, videos, or renders were created or modified. Visual interpretation remains an agent workflow requirement, not an automated image-analysis claim.
