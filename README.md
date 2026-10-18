# Codex Video Maker

A reusable Codex workspace for creating professional faceless walkthrough videos of GitHub repositories, developer tools, software products, and websites.

This project separates the workflow into three stages:

1. **ChatGPT Web Project** — research, story angle, script, and source configuration
2. **TTS App** — narration audio and timestamped transcript
3. **Codex Video Maker** — visual planning, browser capture, motion design, HyperFrames composition, QA, and final rendering

The goal is to keep Codex focused on video production instead of spending credits on research, script writing, and TTS.

---

## Quick start after preparing the input files

See **[`guide.md`](guide.md)** for the copy-paste-ready production workflow. After putting the five input files in `inbox/`, choose either the **Horizontal (16:9, 1920×1080)** or **Vertical (9:16, 1080×1920)** Codex prompt in that guide.

The selected orientation overrides the aspect ratio and dimensions in `source.json` **without changing the original file**. Codex saves the effective settings as `render-config.json` in the new job. This lets you use the same approved script and TTS output for either format.

---

# End-to-End Workflow

```text
Target URL
   │
   ▼
ChatGPT Web Project
"Tech Video Research & Script"
   │
   ├── research.md
   ├── script.txt
   └── source.json
   │
   ▼
TTS App
   │
   ├── vo.mp3
   └── transcript.json
   │
   ▼
Codex Video Maker
   │
   ├── visual planning
   ├── browser navigation
   ├── screenshots / short recordings
   ├── motion design
   ├── HyperFrames composition
   ├── QA
   └── rendering
   │
   ▼
final.mp4
```

---

# Project Structure

```text
codex-video-maker/
├── .agents/
│   └── skills/                 # Installed Codex-compatible video skills
│
├── assets/                     # Shared branding, music, SFX, etc.
├── docs/                       # Shared production references
├── templates/                  # Reusable supporting templates
│
├── jobs/
│   ├── _template/              # Copy this for every new video
│   │   ├── captures/
│   │   ├── composition/
│   │   ├── research.md
│   │   ├── script.txt
│   │   ├── source.json
│   │   └── transcript.json
│   │
│   └── <video-name>/
│       ├── captures/
│       ├── composition/        # HyperFrames project
│       ├── research.md
│       ├── script.txt
│       ├── source.json
│       ├── transcript.json
│       ├── vo.mp3
│       └── final.mp4
│
├── AGENTS.md                   # Permanent production rules for Codex
├── skills-lock.json
└── README.md
```

---

# One-Time Setup

## 1. Requirements

Required:

- Node.js 22+
- FFmpeg
- Chrome/Chromium supported by HyperFrames
- VS Code
- Codex VS Code extension

Check Node:

```bash
node -v
```

Check FFmpeg:

```bash
ffmpeg -version
```

HyperFrames can run through `npx`, so a global installation is not required.

---

## 2. Install Motion Skills

From the project root:

```bash
npx skills add iart-ai/motion-design-skills
npx skills add iart-ai/explainer-video-skills
```

The most useful skills for this project are:

- `motion-art-direction`
- `shot-composition`
- `animation-principles`
- `color-motion`
- `beat-sync-editing`
- `explainer-video`

Specialized skills such as diagram, isometric, or whiteboard animation should only be used when they clearly improve the explanation.

HyperFrames is the required renderer.

Do not use Remotion unless explicitly requested.

---

## 3. Verify HyperFrames

Run:

```bash
npx hyperframes doctor
```

Important checks:

- Node.js
- FFmpeg
- FFprobe
- Chrome
- disk space

TTS and MusicGen are optional because narration audio is supplied as an input.

Docker is also optional.

### Memory note

Use one render worker by default:

```text
--workers 1
```

Close unnecessary browser tabs and memory-heavy applications before final renders.

---

## 4. Optional Smoke Test

Create a temporary test project:

```bash
npx hyperframes init jobs/_smoke-test --non-interactive
cd jobs/_smoke-test
npx hyperframes lint
npx hyperframes inspect
npx hyperframes render --quality draft --workers 1 --output smoke-test.mp4
```

If the MP4 renders successfully, the environment is ready.

You can then delete:

```text
jobs/_smoke-test/
```

---

# ChatGPT Web Project

Use one reusable ChatGPT Project for all video research and scripting.

Project name:

```text
Codex Video Maker
```

Create a **new chat inside the same project for each new video**.

Do not create a separate ChatGPT Project for every repo or website.

The ChatGPT Project is responsible for:

- researching the target
- identifying the strongest story angle
- proposing the hook
- writing the voiceover
- revising the voiceover with you
- producing the approved production package

It should not normally create:

- TTS audio
- final timestamps
- storyboards
- shot lists
- browser automation
- HyperFrames code
- video edits

Those belong to later stages.

---

# How to Use the ChatGPT Web Project

## Step 1 — Start a New Chat

Inside the `Codex Video Maker` project, start a new conversation.

Give it the target URL.

Example:

```text
Research and prepare a video about:

https://github.com/storytold/photocraft
```

For a website:

```text
Research and prepare a video about:

https://example.com
```

---

## Step 2 — Review the Story Angle

The ChatGPT Project should research the target and propose the strongest angle before producing final files.

Review:

- the central idea
- the hook
- which features are worth mentioning
- important limitations
- whether the angle is interesting enough for a short video

You can refine it conversationally.

Examples:

```text
Give me 5 stronger hooks.
```

```text
Make the angle more developer-focused.
```

```text
Focus less on the feature list and more on what makes this project unusual.
```

```text
Keep it under 50 seconds.
```

```text
Make the narration more engaging but keep every claim factual.
```

---

## Step 3 — Approve the Voiceover

Do not generate the production package until the script is ready.

Keep revising until the narration is approved.

When satisfied, say:

```text
Approved. Generate the production package.
```

The ChatGPT Project should then produce:

```text
research.md
script.txt
source.json
```

These are the only files needed from ChatGPT Web.

---

# Input File Formats

Every video job uses the same input contract.

The full job inputs are:

```text
jobs/<video-name>/
├── research.md
├── script.txt
├── source.json
├── vo.mp3
└── transcript.json
```

ChatGPT Web creates:

```text
research.md
script.txt
source.json
```

Your TTS app creates:

```text
vo.mp3
transcript.json
```

---

## `research.md`

Purpose:

Provide factual context and visual guidance for Codex.

This is not the narration.

Recommended format:

```md
# Research

## Project
PhotoCraft

## Source
https://github.com/storytold/photocraft

## Summary
PhotoCraft is an open-source image editor written in Rust.

## Key Facts
- Open source.
- Written in Rust.
- Supports non-destructive editing.
- Includes local smart-selection features.
- Supports scripting and automation.

## Important Features

### Adjustment Layers
Adjustment layers can be reordered, disabled, and masked without permanently changing the source image.

### Smart Selection
Object and subject selection can run locally.

### Automation
Scripts and AI agents can perform editing actions through the application.

## Visual Opportunities
- GitHub repository title and description.
- README hero screenshot.
- Main editor interface.
- Layers panel.
- Adjustment layer controls.
- Smart-selection section.
- Automation or scripting section.

## Limitations / Accuracy Notes
- Early alpha.
- Do not present it as a full Photoshop replacement.

## Useful Links
- Repository: https://github.com/storytold/photocraft
```

Rules:

- keep facts concise
- include visual opportunities
- include limitations
- use useful primary links
- do not add production instructions
- do not duplicate the full narration

---

## `script.txt`

Purpose:

Store the final approved narration.

Format:

Plain UTF-8 text.

Example:

```text
What if Photoshop were rebuilt from scratch in Rust?

That's essentially what PhotoCraft is trying to do.

It's an open-source image editor with non-destructive adjustment layers, local smart selection, and automation support.

But the most interesting part is that scripts and AI agents can perform many of the same actions available through the interface.

It's still early alpha, so it isn't a Photoshop replacement yet. But it's an interesting look at what a modern programmable image editor could become.
```

Rules:

- narration only
- no timestamps
- no headings
- no citations
- no notes
- no visual instructions
- no alternate versions

This file should be ready to paste directly into the TTS app.

---

## `source.json`

Purpose:

Define the source and output configuration.

Default landscape format:

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

Optional fields:

```json
{
  "demo_url": "https://example.com/demo",
  "repository_url": "https://github.com/example/project",
  "documentation_url": "https://example.com/docs",
  "preferred_theme": "dark",
  "notes": "Focus on the live demo more than the README."
}
```

Recommended vertical format:

```json
{
  "url": "https://example.com",
  "title": "Example",
  "format": "9:16",
  "width": 1080,
  "height": 1920,
  "fps": 30,
  "target_duration_seconds": 60,
  "platforms": ["youtube-shorts", "facebook-reels", "tiktok"]
}
```

---

## `vo.mp3`

Generated by the TTS app.

Requirements:

```text
Filename: vo.mp3
Format: MP3
Recommended sample rate: 44.1 kHz or 48 kHz
```

Rules:

- this is the final approved narration audio
- do not regenerate it inside Codex
- do not change playback speed unless explicitly requested
- audio duration is the real video duration

---

## `transcript.json`

Generated by the TTS app from the final script and audio.

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

Each item contains:

| Field | Type | Description |
|---|---|---|
| `start` | number | Segment start in seconds |
| `end` | number | Segment end in seconds |
| `text` | string | Spoken text |

Rules:

- chronological order
- no overlapping segments
- timestamps match the actual audio
- phrase or sentence-level segments are preferred
- final `end` should approximately match the audio duration

---

# Input Priority

If files disagree, use this order:

```text
1. vo.mp3
2. transcript.json
3. script.txt
4. research.md
5. source.json
```

Meaning:

- `vo.mp3` controls actual timing
- `transcript.json` controls narration timing
- `script.txt` controls approved wording
- `research.md` provides factual and visual context
- `source.json` provides source and output configuration

If a meaningful conflict exists, Codex should report it instead of silently changing the narration or facts.

---

# Create the TTS Files

Take `script.txt` from the ChatGPT Web Project and load it into your TTS application.

The TTS application should generate:

```text
vo.mp3
transcript.json
```

Use the final approved script only.

Do not edit the script after generating the TTS files unless you regenerate both the audio and transcript.

---

# Create a New Video Job

From the root of `codex-video-maker`:

```bash
cp -r jobs/_template jobs/photocraft
```

Replace `photocraft` with a short slug.

Example:

```text
jobs/photocraft/
```

Copy the ChatGPT Web outputs into the job:

```text
research.md
script.txt
source.json
```

Then add the TTS outputs:

```text
vo.mp3
transcript.json
```

The job should now look like:

```text
jobs/photocraft/
├── captures/
├── composition/
├── research.md
├── script.txt
├── source.json
├── transcript.json
└── vo.mp3
```

---

# Initialize HyperFrames for the Job

HyperFrames belongs inside the job's `composition/` directory.

Run:

```bash
npx hyperframes init jobs/photocraft/composition --non-interactive
```

After initialization:

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

---

# Start Codex

Open the full `codex-video-maker` folder in VS Code.

Use the Codex extension.

Give Codex a production request such as:

```text
Create the video for jobs/photocraft.

Use the provided research, script, transcript, VO audio, and source configuration.

Build the HyperFrames implementation inside jobs/photocraft/composition.

Follow the root AGENTS.md and the installed motion-design skills.

Render the final video to jobs/photocraft/final.mp4.
```

Codex should handle:

```text
Read inputs
    ↓
Create visual plan
    ↓
Determine the best visual for each narration beat
    ↓
Navigate the repo/site
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

---

# Visual Production Rules

The video should feel like a professionally edited technology explainer, not an automated browser recording.

Prefer:

- direct navigation
- element-level captures
- deliberate crops
- UI close-ups
- slow controlled camera movement
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
- repeating the narration as text

For each narration beat, first decide:

```text
What does the viewer need to see right now?
```

Then choose the best visual source.

---

# HyperFrames QA Workflow

Every video should follow:

```text
lint
→ inspect
→ draft render
→ visual review
→ fix
→ final render
```

From the composition directory:

```bash
npx hyperframes lint
```

Then:

```bash
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

---

# Final Output

The final deliverable must be:

```text
jobs/<video-name>/final.mp4
```

Example:

```text
jobs/photocraft/final.mp4
```

Do not overwrite:

- `research.md`
- `script.txt`
- `source.json`
- `transcript.json`
- `vo.mp3`

---

# Starting the Next Video

For each new video:

1. Start a new chat inside the existing ChatGPT Web Project.
2. Give it the repo or website URL.
3. Review and refine the story angle and script.
4. Approve the script.
5. Generate:
   - `research.md`
   - `script.txt`
   - `source.json`
6. Load `script.txt` into the TTS app.
7. Generate:
   - `vo.mp3`
   - `transcript.json`
8. Create a new job:

```bash
cp -r jobs/_template jobs/<video-name>
```

9. Copy all five inputs into the job.
10. Initialize HyperFrames:

```bash
npx hyperframes init jobs/<video-name>/composition --non-interactive
```

11. Ask Codex:

```text
Create the video for jobs/<video-name>.
```

The same ChatGPT Project, Codex workspace, skills, production rules, and shared assets are reused for every video.
