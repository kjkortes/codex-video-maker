# Visual design and motion system

Copy to `jobs/<job-name>/design.md`. Fill before animation; implement choices as reusable tokens in the HyperFrames composition.

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
- Caption placement and hierarchy, only if requested:

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
