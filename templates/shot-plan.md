# Shot plan

Copy this template to `jobs/<job-name>/shot-plan.md` and replace the placeholders. This is a generated production artifact, not an input or a revised transcript.

- Job:
- Audio master: `vo.mp3`; measured duration:
- Transcript segment reference convention (existing IDs or array indices):
- Output format, dimensions, FPS; effective configuration file:
- Core visual intent (derived from the approved narration):
- VO captions: [locked standard](../docs/vo-caption-standard.md), enabled by default; selected fixed LOWER-THIRD rectangle and clearance reserved in EVERY shot:
- Original word timing/alignment source and derived `captions.json`; explicit user exception if any:

If supplied, inspect `references/` and complete `reference-analysis.md` before generating/finalizing this plan. Carry the strongest relevant concepts into shot notes and motion intent, adapting to unchanged transcript times and the selected orientation. Exact panel timing, count, order, and composition are not required. Omit reference notes when no references exist.

## Transcript map

Copy exact source text and timestamps. Include every segment; do not overwrite the transcript. Record visual subdivisions only in the shot list below.

| Segment reference | Original start (s) | Original end (s) | Exact spoken text | Shot ID(s) |
|---|---|---|---|---|
| Fill from transcript | | | | |

## Shot list

Use stable IDs such as S01. Visual in/out times cover the full audio, including pauses. Choose the technique per narration beat; no technique quota.

| Shot ID | Visual in/out (s) | Transcript reference(s) | What the viewer must understand | Technique and why | Source URL → capture path / required state | Framing and focal point for selected format | On-screen copy (minimal or none) | Motion / action → result / hold | Why cut here |
|---|---|---|---|---|---|---|---|---|---|
| S01 | | | | | | | | | |

Techniques: real UI, interaction demo, animated technical diagram, code close-up, kinetic typography, focused graphic. Add detailed shot notes below if the table becomes hard to read.

## Source limitations and substitutions

Record unavailable UI, substitute official material, and clearly identified illustrative diagrams/examples. Link captures to the shots that use them. Do not invent product behavior or claims.

## Coverage check

- Every transcript segment maps to a relevant visual.
- Visual intervals cover the measured audio, including pauses and ending; any transition overlap is intentional.
- Source timestamps and narration are unchanged; any discrepancy is reported.
- Every shot has a selected-format framing plan and one focal point.
- Every shot leaves the same lower VO caption band clear of UI, diagrams, callouts, and lockups; reposition/reflow visuals instead of moving captions.
- Caption groups cover all spoken words once in order using unchanged source timing; max 2 lines and the locked style. Plan pause/cut/ending cleanup separately from main-visual typography.
- Adjacent shots add information; typography is selective and holds are readable.
