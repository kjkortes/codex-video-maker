# Optional Creative Storyboard Standard

## Purpose

This standard governs ChatGPT-created **creative storyboard references** for Codex Video Maker. They show the intended visual language and story progression, not final video frames, production shot plans, or transcript timing. Codex generates its own production storyboard separately.

## Trigger and orientation checkpoint

After delivering approved `research.md`, `script.txt`, and `source.json`, ask once whether the user wants an optional creative storyboard, **portrait (9:16)** or **landscape (16:9)**. Do not create it before opt-in. A direct request for a storyboard is opt-in; if orientation is already established, proceed without asking again.

If the storyboard changes the **intended video's** format, provide a revised `source.json` with the appropriate `format`, `width`, and `height`; preserve approved narration, research, and all other relevant configuration. Codex's selected output orientation remains authoritative.

## Required deliverables when requested

- `storyboard.png`: a readable visual contact sheet illustrating the narrative progression. Each individual panel must have the selected VIDEO aspect ratio, even if the overall sheet uses a grid.
- `storyboard.md`: approved narration phrases, creative beat concepts, visual design rules, motion possibilities, source links, and factual cautions.
- `storyboard-assets/`: optional individual panels or supporting image references, only when useful for readability or Codex handoff.

The storyboard must be **visual**, not just a text list, when image creation is available. When it is not, provide the written concept and clearly disclose that no image was created. Never pass off empty placeholders as completed images.

## Visual style lock — professional 2D editorial motion graphics

**Default:** modern 2D editorial technology explainer, matching the visual sensibility of a carefully designed motion-graphics storyboard or presentation deck. The goal is **designed visual communication**, not cinematic AI concept art.

### Prefer

- Crisp, flat or lightly shaded 2D vector-like illustrations with controlled highlights, not glossy realism.
- Strong purposeful typography, generous spacing, clear focal points, readable labels, and polished layouts.
- Diagrammatic network routes, flow arrows, modular UI blocks, charts, benchmark comparisons, technical callouts, state changes, and contrasting panels.
- Simplified device illustrations only where they help the explanation; clear visual relationships beat literal environments.
- A restrained coherent palette adapted to the subject (e.g., navy, cyan, lime, off-white for net-merge); stable semantics for colors across panels.
- Purposeful variety: switch between high-level concepts, detailed diagrams, authentic UI, data comparisons, caveats, and a clear final payoff. Vary composition without breaking the design system.
- Animation-ready compositions: simple layers and components with identifiable parts, clear paths, and logical state changes.
- Genuine cropped product screenshots or recordings for evidence; show UI at legible scale.

### Avoid

- Photorealistic or pseudo-photorealistic images, glossy 3D product renders, shiny detailed room scenes.
- Depth-of-field blur, bokeh, dramatic photography lighting, and futuristic neon/sci-fi promo aesthetics.
- Repeating laptops, phones, or Wi-Fi routers on desks in panel after panel.
- Generic floating UI, magic particles, decorative network light trails without explanatory purpose.
- Text-only cards, excessive words, clutter, unreadable small screenshots, and repeated layouts.
- Invented app interfaces or measurements presented as genuine product proof.

**Style decision rule:** If a scene could either be a cinematic 3D image of devices or a clean diagram showing *what the devices actually do*, choose the diagram. If authentic product UI is more informative than either, use or designate a real screenshot and link to its source. Visual polish must not reduce factual clarity.

## Content and narrative rules

- Use the **approved script** and research; do not rewrite narration or facts to fit the graphics.
- Use the current primary repo, official docs, actual screenshots/demos, and real code samples where applicable. Separate confirmed product facts from illustrative mechanisms.
- Build every panel around a specific viewer takeaway connected to a narration phrase.
- Aim for a compelling opening, clear development, meaningful demonstration/comparison, necessary limitation, and a satisfying final payoff.
- Propose actions and motion intent only in broad, creative terms (e.g., independent data flows appear on two routes); never invent exact cuts, durations, synchronized beats, camera keyframes, or frame counts.
- Clearly label conceptual UI/diagrams when they might be mistaken for authentic product screenshots. Never invent product behavior or benchmarks.
- Creative directions are inspiration, **not exact scene specifications**. Codex can reorganize, combine, expand, omit, or redesign panels.

## Panel composition and orientation

Reserve the project's locked LOWER-THIRD VO caption band in every panel: portrait 1080×1920 x108,y1420,w768,h144; landscape 1920×1080 x192,y820,w1536,h144. Default captions are short 2–4-word groups, max 2 lines, bold uppercase white type with dark outline and yellow current-word highlight, with no panel. Keep important UI, diagrams, labels and closing lockups above that band. Do not illustrate VO captions at the top/middle or vary their position across panels. Captions are separate from editorial headlines. Without TTS, reserve the space or show an approved narration phrase as a clearly illustrative caption state; never invent word timing. Codex applies [the full caption standard](../../docs/vo-caption-standard.md) during production unless the user explicitly overrides it.

- Portrait (9:16) panels: designed for 1080 × 1920 video.
- Landscape (16:9) panels: designed for 1920 × 1080 video.
- Preview exports may be smaller, but each scene panel must preserve the selected video ratio.
- In portrait, design a vertical reading flow and readable UI crops; in landscape, exploit horizontal structure. Do not create landscape compositions and merely crop them for portrait.
- Contact-sheet arrangement can differ from the video aspect ratio; scene panels cannot.

## Structure of storyboard.md

# Creative Storyboard Reference

## Project
Project name, primary link, chosen orientation.

## Core Visual Concept
The central visual story and how it helps viewers understand the product.

## Visual Design System
Palette, typography, diagram/illustration language, UI treatment, panel composition, and broad motion principles. Explicitly note the 2D editorial design style and prohibited photoreal/3D defaults.

## Narrative Sequence
Ordered flexible creative beats. For each:
- Approved narration phrase.
- Intended viewer takeaway.
- Proposed panel composition/action.
- General motion possibilities and how they serve the explanation.
- Authentic UI/reference link or accuracy qualifier.

## Creative Flexibility
Codex may add, remove, reorder, combine, split, or redesign shots and use final transcript timings.

## Authentic Visual Sources
Official demos, docs, screenshots, code, and what each confirms.

## Limitations and Handoff
Conceptual placeholders, unverifiable visuals, orientation, filenames, and caveats.

## Review checkpoint

Show the visual contact sheet and provide reference file downloads. Let the user review and request changes. Revise the storyboard only unless they explicitly request a script or research update.

## Codex Video Maker compatibility

Supply `storyboard.md` and `storyboard.png` (or supported `.jpg`, `.jpeg`, `.pdf`) with optional `storyboard-assets/` in Codex Video Maker's `inbox/` alongside the five mandatory inputs. The user's TTS app supplies `vo.mp3` and `transcript.json`.

Codex keeps these references under its `references/`, studies them before planning, and separately generates a production storyboard. Audio/transcript control timing, approved script/research control factual narration, selected output configuration controls format, and the storyboard remains nonbinding creative guidance. No reference is required for ordinary production.
