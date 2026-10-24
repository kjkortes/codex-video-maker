# Project VO caption standard

Include burned-in voiceover captions in every new video by default. The user approved this style and lower placement on 2026-10-24. Apply it without asking again. A later explicit user instruction can change or disable it for a job; otherwise keep it consistent across subjects, scene palettes, and generations.

This project standard takes precedence over generic caption defaults in installed skills and optional storyboard references. It does not change the five-file input contract, narration, transcript, output orientation, or HyperFrames workflow.

## Locked appearance

| Property | Standard at the reference dimensions below |
|---|---|
| Typeface | Locally packaged Inter Black, weight 900; variable Inter must include weight 900 |
| Size / line height | 70px / 1.02 |
| Letter spacing | -1.5px |
| Case | Uppercase through CSS; preserve original source text and punctuation |
| Inactive words | White `#FFFFFF` |
| Current spoken word | Yellow `#FFE34D` |
| Outline | 10px `#101827`, `paint-order: stroke fill` |
| Shadow | `0 5px 0 #101827` |
| Background | Transparent; no subtitle box, pill, or full-width bar |
| Grouping | Usually 2–4 words per natural spoken burst; maximum 2 lines |
| Word spacing | Explicit 20px between adjacent word spans on a line; do not rely on HTML whitespace surviving compilation |
| Alignment | Centered horizontally and vertically inside one fixed caption rectangle |
| Entrance | Inner text only: scale 0.97 → 1 over 0.10s, `power2.out`; no bounce or position travel |

Do not recolor captions to match each scene, use sentence-length editorial subtitle panels, place VO captions beside titles, or move them around to avoid an object. Main headlines and diagram labels are separate layers and may use the video's visual system.

## Fixed LOWER-THIRD placement

Coordinates are output pixels, measured from the top-left. Every caption group in a video uses the same rectangle, including across cuts and between one-line and two-line groups.

| Output | Left | Top | Width | Height | Center | Clearance below rectangle |
|---|---:|---:|---:|---:|---|---:|
| **Approved portrait: 1080×1920 (9:16)** | **108** | **1420** | **768** | **144** | **492, 1492** | **356** |
| Landscape adaptation: 1920×1080 (16:9) | 192 | 820 | 1536 | 144 | 960, 892 | 116 |

The approved portrait caption center is 77.7% down the frame. Its slightly left-of-center position leaves extra room on the right for social-player controls. Keep VO captions in this lower band; the former upper placement at `y=552` is rejected. Do not use upper or middle placement as a fallback.

For another resolution of the same aspect ratio, scale coordinates, font size, outline, spacing, and shadow uniformly from its reference row. For another aspect ratio, define one lower-third rectangle for that format in `design.md` before layout and inspect it at playback size. Do not silently change the selected orientation. Platform overlays vary; inspect their clearance without moving captions from shot to shot.

Reserve the caption band when planning **every** shot. Keep important UI, diagram nodes, connectors, callouts, and closing lockups above it with a readable gap. Reflow or reposition the visual content to make room; do not squeeze UI, shrink essential text, or cover evidence. The approved video's 180px upward body shift was a job-specific correction, not an offset to apply blindly to future layouts.

## Text, timing, and HyperFrames implementation

- Use the current job's `vo.mp3` and `transcript.json`. Preserve all original words, punctuation, order, and source timestamps. Never regenerate TTS, retime narration, or overwrite an input to fit captions.
- Match repeated words by transcript index/ID, not text search. Display each spoken word exactly once in order across the groups. Choose groups for this narration; the approved example's 53 groups and 131 words are not fixed counts for future videos.
- Start a group at its original first-word onset. Keep it through its last spoken word; a short tail up to 0.18s may follow, capped at the next group start and the video ending. Clear it at its end, including at pauses; never overlap groups or leave stale text across cuts.
- Switch the active word to yellow at its original onset. Retain its highlight until the next word starts in that group, or until the group closes, then return it to white. This avoids all-white flashes between words. Original word end timestamps remain unchanged in the input.
- Prefer externally supplied word timings. Phrase/sentence-level transcripts remain valid inputs: obtain reliable word alignment against the unchanged VO as **derived job data**, constrained by the supplied segments and exact source words. Verify it against the audio and record timing limitations. Never invent word onsets by evenly dividing a segment or estimating from word counts, and never claim word-accurate highlighting without reliable alignment.
- Author timed groups and word spans statically in the HTML. Use one HyperFrames captions host with `data-track-kind="captions"` and one paused, seekable GSAP timeline per composition. The runtime owns clip visibility; animate the inner text, not `.clip` display/visibility. No clocks, timers, or realtime animation loops.
- Keep the caption container absolute and sized, with the fixed rectangle from the table. Center the text inside it; one-line/two-line changes must not reflow or move the container. Use explicit line breaks via block line spans, visible overflow for the outline, and measured line widths. Re-group or wrap an overlong phrase rather than reducing the locked type size or moving the caption.
- Package fonts and generated caption data inside the current job. Use the approved job only as a visual reference, never as a runtime dependency or a source of another video's narration/assets.
- Retain generated `captions.json` in the job: source indices/IDs, original text/timing references, cue start/end, and line grouping. Record the fixed rectangle and style tokens in `design.md`. SRT/VTT sidecars may accompany the MP4 but do not replace its burned-in VO captions.

## Review requirements

Before completing animation, inspect actual storyboard stills with captions visible in every shot, including long/two-line groups on light and dark scenes and a phone-sized portrait view. Confirm the same lower rectangle, outline/spacing, readability, and clearance from UI, diagrams, labels, lockups, and player controls. Recompose visuals and regenerate the sheet when needed.

During complete draft playback, check spoken-word highlights, phrase boundaries, pauses, neighboring cuts, first/last words, and the ending. Verify all words once in order, original timing preserved, one group visible, no highlight flashes, no stale cues, and no position jumps. Record findings and rechecks in `review.md`, run applicable HyperFrames checks, and verify the final export as part of the normal review-and-fix workflow. An explicit user exception must be recorded in `design.md` and `review.md`.
