# Visual design and motion system

Copy to `jobs/<job-name>/design.md`. Fill before animation; implement choices as reusable tokens in the HyperFrames composition.

If supplied, inspect `references/` and complete `reference-analysis.md` before generating/finalizing this design. Record adopted creative ideas and deliberate improvements/departures here, translating palette, hierarchy, composition, motion, transitions, and rhythm into feasible reusable tokens. Preserve narration, accuracy, and selected orientation; omit reference notes when absent.

## Intent and frame

- Audience and one visual message supported by the approved narration:
- Tone and energy:
- Effective configuration file, aspect ratio, dimensions, FPS:
- Measured voiceover duration:
- Grid, spacing unit, action-safe and title-safe margins:
- Additional clearance for selected platform UI:
- Horizontal/vertical framing strategy (apply to every shot in shot-plan.md):

## Typography

| Role | Family and local asset if needed | Weight | Size / line height | Maximum line length / lines |
|---|---|---|---|---|
| Hook / key statement | | | | |
| Feature label / callout | | | | |
| Supporting text | | | | |
| Code | | | | |

- Minimum readable size at realistic playback scale:

## VO captions — locked default

Apply [the project standard](../docs/vo-caption-standard.md) unless the user explicitly changes/disables captions. Reserve the LOWER-THIRD band in every shot before composing visuals; never place VO captions in the upper/middle frame or move them between shots.

- Enabled by default; explicit user exception and its source, if any:
- Fixed rectangle: portrait 1080×1920 = x108,y1420,w768,h144; landscape 1920×1080 = x192,y820,w1536,h144; selected row/scaling:
- Local Inter Black 900, 70px/1.02, tracking -1.5px; uppercase CSS, explicit 20px word gaps; max 2 lines, usually 2–4 words:
- White #FFFFFF, active word yellow #FFE34D, 10px outline #101827, shadow 0 5px 0 #101827; transparent background, no panel:
- Inner-text entrance scale 0.97→1, 0.10s, power2.out; fixed container position:
- Original transcript indices/word timings or reliable derived alignment; generated `captions.json` path:
- Yellow from original word onset until next word onset in group or cue close; no white flashes/stale groups:
- Per-shot visual clearance above caption band; authentic UI and essential labels remain readable:

## Palette

Use exact color values. Keep meanings stable and preserve authentic product UI semantics.

| Role | Color value | Use |
|---|---|---|
| Background | | |
| Surface | | |
| Primary text | | |
| Muted text | | |
| Primary / emphasis | | |
| Accent / semantic state, if needed | | |

## Motion language

| Property | Chosen value / rule |
|---|---|
| Main GSAP easing family; exit variation if needed | |
| Base timing unit; UI / hero durations | |
| Transition vocabulary (cuts by default) | |
| Stagger interval and maximum group duration | |
| Movement distance / scale limits | |
| Camera move limits and focal origin | |
| Readable hold rule; result hold | |
| Primary versus supporting movement | |
| Elements kept static | |

Narration timing overrides music grids and stylistic timing defaults. Do not move audio or transcript times to satisfy these values.

## Implementation and storyboard checks

- Relevant skills used and HyperFrames-compatible application:
- Token locations in composition:
- Per-shot layout exceptions and reasons:
- Actual layout stills and contact sheet: `storyboard/`
- Storyboard inspection and fixes recorded in `review.md` before animation completion:
