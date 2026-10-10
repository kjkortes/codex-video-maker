# Codex Video Maker

A reusable Codex workspace for creating professional faceless walkthrough videos of GitHub repositories and websites.

The workflow separates **content preparation** from **video production**:

1. Research and script are prepared in ChatGPT Web.
2. Voiceover audio and timestamps are prepared outside Codex.
3. Codex acts as the visual director, browser operator, editor, and renderer.
4. HyperFrames is the required video composition and rendering engine.
5. Installed motion-design skills guide composition, pacing, animation, and visual polish.

---

## Project Structure

```text
codex-video-maker/
├── .agents/
│   └── skills/                 # Installed Codex-compatible video skills
├── assets/                     # Shared branding, music, SFX, etc.
├── docs/                       # Shared video style and production docs
├── templates/                  # Reusable supporting templates
├── jobs/
│   ├── _template/              # Copy this for every new video
│   │   ├── captures/
│   │   ├── composition/
│   │   ├── research.md
│   │   ├── script.txt
│   │   ├── source.json
│   │   └── transcript.json
│   └── <video-name>/
│       ├── captures/
│       ├── composition/        # HyperFrames project
│       ├── research.md
│       ├── script.txt
│       ├── source.json
│       ├── transcript.json
│       ├── vo.mp3
│       └── final.mp4
├── AGENTS.md                   # Permanent production rules for Codex
├── skills-lock.json
└── README.md
```


# Input File Formats

Every video job must follow the same input contract.

Required input files:

```text
jobs/<video-name>/
├── research.md
├── script.txt
├── transcript.json
├── source.json
└── vo.mp3
```

Do not rename these files unless the project rules are updated.

---

## `research.md`

Purpose:

Provide factual context and visual guidance for Codex.

This file is **not** the narration. It helps Codex understand what the video is about and what visuals are worth showing.

Recommended format:

```md
# Research

## Project
PhotoCraft

## Source
https://github.com/storytold/photocraft

## Summary
PhotoCraft is an open-source image editor written in Rust. It is designed as a clean-room Photoshop-style editor with non-destructive editing features and automation support.

## Key Facts
- Written in Rust.
- Open source.
- Supports non-destructive adjustment layers.
- Includes local smart-selection features.
- Supports scripting and AI-agent automation.
- Still in early alpha.

## Important Features
### Adjustment Layers
Adjustment layers can be reordered, disabled, and masked without permanently changing the original image.

### Smart Selection
Object and subject selection can run locally.

### Automation
Scripts and AI agents can perform editing actions available through the interface.

## Visual Opportunities
- GitHub repository title and description.
- README hero screenshot.
- Main editor interface.
- Layers panel.
- Adjustment layers.
- Smart-selection tools.
- Automation or scripting section.
- Relevant code or architecture view if useful.

## Limitations / Accuracy Notes
- Do not present PhotoCraft as a full Photoshop replacement.
- It is still early alpha.

## Useful Links
- Repository: https://github.com/storytold/photocraft
- Demo: <optional>
- Documentation: <optional>
```

### Rules

- Use headings.
- Keep facts concise.
- Include visual opportunities.
- Include limitations or claims that must not be overstated.
- Add useful URLs when relevant.
- Do not put production instructions here.
- Do not duplicate the full narration.

---

## `script.txt`

Purpose:

Store the **final approved voiceover script**.

Format:

Plain UTF-8 text only.

Example:

```text
What if Photoshop were rebuilt from scratch in Rust?

That's essentially what PhotoCraft is trying to do.

It's an open-source image editor with non-destructive adjustment layers, local smart selection, and automation support.

But the most interesting part is that scripts and AI agents can perform many of the same actions available through the interface.

It's still early alpha, so it isn't a Photoshop replacement yet. But it's an interesting look at what a modern programmable image editor could become.
```

### Rules

- This is the narration source of truth.
- Do not include timestamps.
- Do not include scene directions.
- Do not include Markdown headings.
- Do not include notes to Codex.
- Do not include alternate versions.
- The text should match the generated voiceover.

---

## `transcript.json`

Purpose:

Provide timestamped narration segments so Codex can synchronize visuals to the voiceover.

Required format:

```json
[
  {
    "start": 0.0,
    "end": 3.8,
    "text": "What if Photoshop were rebuilt from scratch in Rust?"
  },
  {
    "start": 3.8,
    "end": 7.2,
    "text": "That's essentially what PhotoCraft is trying to do."
  }
]
```

Each item must contain:

| Field | Type | Description |
|---|---|---|
| `start` | number | Segment start time in seconds |
| `end` | number | Segment end time in seconds |
| `text` | string | Exact spoken text for the segment |

### Rules

- Times are in seconds.
- Use decimal values when needed.
- `start` must be lower than `end`.
- Segments must be in chronological order.
- Segments should not overlap.
- `text` should match the actual spoken audio.
- Prefer sentence or phrase-level segments.
- Do not create one entry per word unless explicitly needed.
- The final `end` time should approximately match the voiceover duration.

Recommended segment size:

```text
2–6 seconds per segment
```

This gives Codex enough timing precision without creating excessive scene fragmentation.

---

## `source.json`

Purpose:

Define the target source and video configuration.

Required format:

```json
{
  "url": "https://github.com/storytold/photocraft",
  "title": "PhotoCraft",
  "format": "16:9",
  "width": 1920,
  "height": 1080,
  "fps": 30,
  "target_duration_seconds": 60,
  "platforms": ["youtube", "facebook"]
}
```

Fields:

| Field | Type | Required | Description |
|---|---|---:|---|
| `url` | string | yes | Primary GitHub repo or website URL |
| `title` | string | yes | Human-readable project/video title |
| `format` | string | yes | Aspect ratio such as `16:9` or `9:16` |
| `width` | number | yes | Output width in pixels |
| `height` | number | yes | Output height in pixels |
| `fps` | number | yes | Output frame rate |
| `target_duration_seconds` | number | yes | Intended maximum or approximate duration |
| `platforms` | string[] | yes | Target publishing platforms |

Recommended defaults for landscape walkthroughs:

```json
{
  "format": "16:9",
  "width": 1920,
  "height": 1080,
  "fps": 30,
  "target_duration_seconds": 60,
  "platforms": ["youtube", "facebook"]
}
```

Recommended defaults for vertical short-form:

```json
{
  "format": "9:16",
  "width": 1080,
  "height": 1920,
  "fps": 30,
  "target_duration_seconds": 60,
  "platforms": ["youtube-shorts", "facebook-reels", "tiktok"]
}
```

### Optional fields

You may add these when useful:

```json
{
  "demo_url": "https://example.com/demo",
  "repository_url": "https://github.com/example/project",
  "preferred_theme": "dark",
  "notes": "Focus on the live demo more than the README."
}
```

Codex must not assume optional fields exist.

---

## `vo.mp3`

Purpose:

Provide the final approved narration audio.

Requirements:

```text
Filename: vo.mp3
Format: MP3
Recommended sample rate: 44.1 kHz or 48 kHz
Recommended channels: mono or stereo
```

### Rules

- This file controls the real video duration.
- Do not regenerate it inside Codex.
- Do not change playback speed unless explicitly requested.
- The spoken words must match `script.txt`.
- `transcript.json` timing must correspond to this exact file.

If the duration of `vo.mp3` differs from `target_duration_seconds`, the voiceover duration takes priority.

---

## Input Priority

When files disagree, use this order:

```text
1. vo.mp3
2. transcript.json
3. script.txt
4. research.md
5. source.json
```

Meaning:

- `vo.mp3` controls actual timing.
- `transcript.json` controls narration segment timing.
- `script.txt` controls approved wording.
- `research.md` provides factual and visual context.
- `source.json` provides source and output configuration.

If there is a meaningful conflict between the files, Codex should stop and report it instead of silently changing the narration or facts.

---

## Minimal Valid Job

A ready-to-produce job should look like this:

```text
jobs/photocraft/
├── captures/
├── composition/
├── research.md
├── script.txt
├── transcript.json
├── source.json
└── vo.mp3
```

Once these inputs are complete, the job is ready for Codex video production.


# One-Time Setup

## 1. Requirements

Required:

- Node.js 22+
- FFmpeg
- Chrome/Chromium supported by HyperFrames
- VS Code with the Codex extension

Check Node:

```bash
node -v
```

Check FFmpeg:

```bash
ffmpeg -version
```

HyperFrames can be run through `npx`, so a global installation is not required.

## 2. Install the Motion Skills

From the project root:

```bash
npx skills add iart-ai/motion-design-skills
npx skills add iart-ai/explainer-video-skills
```

The most important skills for this project are:

- `motion-art-direction`
- `shot-composition`
- `animation-principles`
- `color-motion`
- `beat-sync-editing`
- `explainer-video`

Specialized skills such as diagram, isometric, or whiteboard animation should only be used when they clearly improve the explanation.

Do not use Remotion unless explicitly requested. HyperFrames is the required renderer.

## 3. Verify HyperFrames

Run:

```bash
npx hyperframes doctor
```

The important checks are:

- Node.js
- FFmpeg
- FFprobe
- Chrome
- available disk space

TTS and MusicGen are optional for this project because voiceover audio is provided as an input.

Docker is also optional.

### Memory note

Use one render worker by default:

```text
--workers 1
```

Close unnecessary browser tabs and memory-heavy applications before final renders.

## 4. Optional Smoke Test

To verify rendering:

```bash
npx hyperframes init jobs/_smoke-test --non-interactive
cd jobs/_smoke-test
npx hyperframes lint
npx hyperframes inspect
npx hyperframes render --quality draft --workers 1 --output smoke-test.mp4
```

If the MP4 renders successfully, the environment is ready. The smoke-test directory can then be deleted.

# Creating a New Video

## Step 1 — Prepare the Content in ChatGPT Web

Do not ask Codex to research the topic or write the narration unless explicitly needed.

Prepare:

```text
research.md
script.txt
```

The research should contain:

- what the project/site is
- important features
- useful facts
- limitations
- visual opportunities
- specific pages, sections, screenshots, or features worth showing

The script should contain only the final approved narration.

## Step 2 — Generate the Voiceover

Generate the final narration with your preferred TTS tool.

Save it as:

```text
vo.mp3
```

Do not ask Codex to regenerate or rewrite the narration.

## Step 3 — Create the Timestamped Transcript

Create `transcript.json`.

Example:

```json
[
  {
    "start": 0.0,
    "end": 3.8,
    "text": "What if Photoshop were rebuilt from scratch in Rust?"
  },
  {
    "start": 3.8,
    "end": 7.2,
    "text": "That's essentially what PhotoCraft is trying to do."
  }
]
```

The voiceover timing is the master timeline for the video.

## Step 4 — Create the Video Job

From the project root:

```bash
cp -r jobs/_template jobs/photocraft
```

Replace `photocraft` with a short slug for the video.

Then place the prepared files inside it:

```text
jobs/photocraft/
├── research.md
├── script.txt
├── transcript.json
├── source.json
└── vo.mp3
```

## Step 5 — Configure `source.json`

Example:

```json
{
  "url": "https://github.com/storytold/photocraft",
  "title": "PhotoCraft",
  "format": "16:9",
  "width": 1920,
  "height": 1080,
  "fps": 30,
  "target_duration_seconds": 60,
  "platforms": ["youtube", "facebook"]
}
```

The actual video duration should follow the supplied voiceover.

## Step 6 — Initialize HyperFrames for the Job

HyperFrames lives inside the job's `composition/` directory.

Run:

```bash
npx hyperframes init jobs/photocraft/composition --non-interactive
```

The result will look similar to:

```text
jobs/photocraft/
├── captures/
├── composition/
│   ├── AGENTS.md
│   ├── CLAUDE.md
│   ├── hyperframes.json
│   ├── index.html
│   ├── meta.json
│   └── package.json
├── research.md
├── script.txt
├── source.json
├── transcript.json
└── vo.mp3
```

The root `AGENTS.md` contains the permanent production rules for all videos.

# Starting Codex

Open the full `codex-video-maker` workspace in VS Code.

Then give Codex a production request such as:

```text
Create the video for jobs/photocraft.

Use the provided research, script, transcript, VO audio, and source configuration.

Build the HyperFrames implementation inside jobs/photocraft/composition.

Follow the root AGENTS.md and the installed motion-design skills.

Render the final video to jobs/photocraft/final.mp4.
```

Codex should handle the visual-production phase:

```text
Read inputs
    ↓
Create shot plan
    ↓
Determine the best visual for each narration beat
    ↓
Navigate the website/repository
    ↓
Capture screenshots and short interactions
    ↓
Build HyperFrames composition
    ↓
Lint
    ↓
Inspect
    ↓
Draft render
    ↓
Visual review
    ↓
Fix weak scenes
    ↓
Final render
```

# Visual Production Rules

The video should feel like a professionally edited technology explainer, not an automated screen recording.

Prefer:

- direct navigation
- element-level captures
- deliberate crops
- UI close-ups
- slow controlled camera moves
- static screenshots with motion
- short browser interactions
- purposeful cuts
- feature-specific visual callouts

Avoid:

- repetitive scrolling
- long continuous screen recordings
- random cursor movement
- unrelated page content
- excessive transitions
- excessive zooming
- decorative motion without purpose
- large blocks of on-screen text
- repeating the full narration as text

For every narration beat, determine **what the viewer needs to see first**, then choose the best capture type.

# HyperFrames QA Workflow

For every video, Codex must follow:

```text
lint
→ inspect
→ draft render
→ visual review
→ fix
→ final render
```

Useful manual commands from the composition directory:

```bash
npx hyperframes lint
npx hyperframes inspect
```

Draft render:

```bash
npx hyperframes render \
  --quality draft \
  --workers 1 \
  --output ../draft.mp4
```

Final render:

```bash
npx hyperframes render \
  --quality high \
  --workers 1 \
  --output ../final.mp4
```

# Final Output

The final deliverable for each video must be:

```text
jobs/<video-name>/final.mp4
```

Do not overwrite the original research, script, transcript, voiceover, or source configuration.

# Starting the Next Video

For every new video:

```bash
cp -r jobs/_template jobs/<video-name>
```

Add:

```text
research.md
script.txt
transcript.json
source.json
vo.mp3
```

Initialize HyperFrames:

```bash
npx hyperframes init jobs/<video-name>/composition --non-interactive
```

Then ask Codex:

```text
Create the video for jobs/<video-name>.
```

The same workspace, skills, production rules, and shared assets are reused for every video.
