# Video Production Guide

**Use this guide after the ChatGPT Web Project and your TTS app produce the five input files.** Work from the root of the `codex-video-maker` workspace in VS Code, with the Codex extension open.

The guide lets you pick **horizontal or vertical for every new video**. You never need to type the project name, change a folder path, or manually edit `source.json` to switch formats.

Production uses transcript-synchronized shots, authentic UI where practical, and selective motion graphics. Every job includes a visual system, an inspected storyboard/contact sheet before animation completion, and a draft review with fixes before final rendering. See [the visual production workflow](docs/visual-production-workflow.md) for technique selection and [reusable templates](templates/shot-plan.md).

## 1. One-time preparation

Run this once in the VS Code terminal from the workspace root:

```bash
mkdir -p inbox
```

Keep the workspace root open so Codex can read `AGENTS.md`, this `guide.md`, and `.agents/skills/`.

## 2. Put one video's five files in `inbox/`

Copy the three ChatGPT Web Project outputs and the two TTS app outputs into `inbox/`:

```text
codex-video-maker/
├── inbox/
│   ├── research.md        # ChatGPT Web Project
│   ├── script.txt         # ChatGPT Web Project
│   ├── source.json        # ChatGPT Web Project
│   ├── transcript.json    # TTS app
│   └── vo.mp3             # TTS app
├── jobs/
│   └── _template/
├── .agents/
│   └── skills/
├── AGENTS.md
└── guide.md
```

Names must match exactly. Keep inputs for **only one new video** in `inbox/` at a time.

You do **not** need to edit the `title` in commands or choose a folder name. Codex derives the job name from `source.json`, with a numbered suffix if that name is already in use.

## 3. Choose the video orientation and paste ONE prompt

Pick one of the following two options. Paste the entire corresponding block into the **VS Code Codex extension**. No placeholders need to be filled in.

### Option A — Horizontal video (16:9)

Use this for standard landscape YouTube and Facebook videos.

| Setting | Value |
|---|---|
| Aspect ratio | 16:9 |
| Resolution | 1920 × 1080 |
| Orientation | Landscape |

```text
Create a new HORIZONTAL (16:9, 1920x1080) faceless technology explainer video using the five files in the workspace-root inbox/ folder.

Read and follow the workspace-root guide.md section "Codex production procedure", the root AGENTS.md, docs/visual-production-workflow.md, and relevant installed HyperFrames and motion-design skills. Create a transcript-synchronized shot plan and consistent visual system; use authentic product screens and purposeful motion graphics. Produce and inspect a storyboard/contact sheet before completing animation, then review and fix the draft before final rendering. Preserve the approved voiceover, transcript timestamps, and all five inputs. My chosen orientation overrides only format, width, and height in source.json; preserve the original source.json. Do not ask me for a video name or make me edit a command. Finish by rendering final.mp4 with HyperFrames and reporting its exact path.
```

### Option B — Vertical video (9:16)

Use this for YouTube Shorts, Facebook Reels, TikTok, and other portrait videos.

| Setting | Value |
|---|---|
| Aspect ratio | 9:16 |
| Resolution | 1080 × 1920 |
| Orientation | Portrait |

```text
Create a new VERTICAL (9:16, 1080x1920) faceless technology explainer video using the five files in the workspace-root inbox/ folder.

Read and follow the workspace-root guide.md section "Codex production procedure", the root AGENTS.md, docs/visual-production-workflow.md, and relevant installed HyperFrames and motion-design skills. Create a transcript-synchronized shot plan and consistent visual system; use authentic product screens and purposeful motion graphics. Produce and inspect a storyboard/contact sheet before completing animation, then review and fix the draft before final rendering. Preserve the approved voiceover, transcript timestamps, and all five inputs. My chosen orientation overrides only format, width, and height in source.json; preserve the original source.json. Recompose every shot for portrait with readable UI crops, restacked diagrams, reflowed typography, and safe margins. Do not ask me for a video name or make me edit a command. Finish by rendering final.mp4 with HyperFrames and reporting its exact path.
```

**Important:** `source.json` might say `16:9` because that is the ChatGPT Web Project's default. That is fine. Your explicit orientation selection in the Codex prompt wins. The source URL, title, FPS, duration target, platforms, and other input values remain unchanged. Codex records the resolved settings in a new file inside the job, without altering the supplied input files.

## 4. Codex production procedure

**These are instructions for Codex.** The two short prompts in section 3 are enough to start a video; you do not need to copy this long procedure each time.

### Validate and create the job

1. Read `AGENTS.md` and the five files in the workspace-root `inbox/`: `research.md`, `script.txt`, `source.json`, `transcript.json`, and `vo.mp3`.
2. Validate required fields, URL, audio, script, and transcript consistency. Do not invent timestamps. If a required input is missing or seriously inconsistent, stop before making a job and report the problem.
3. Use the orientation **explicitly selected by the latest user prompt**. The selected orientation takes precedence over only `source.json`'s `format`, `width`, and `height`. Keep all other valid source settings unchanged. If no orientation is specified, ask the user to choose horizontal or vertical before starting.
4. Derive a safe lowercase kebab-case job slug from `source.json`'s title (or the URL if no title is available). Never ask the user to type a slug. If `jobs/<slug>/` already exists, choose a new suffix such as `-02`; never overwrite an existing job.
5. Copy `jobs/_template/` to the new `jobs/<slug>/`. Copy the five validated files from `inbox/` into the job **without modifying their contents**. After successfully copying and validating the copies, clear the five inputs from `inbox/`. Never delete or overwrite inputs belonging to another job.
6. Write a **generated** `jobs/<slug>/render-config.json` containing the effective `format`, `width`, `height`, and `fps`, along with the rest of the source configuration as relevant. This records the chosen orientation while keeping the input `source.json` unchanged. For example:

   **Horizontal:** `"format": "16:9", "width": 1920, "height": 1080`

   **Vertical:** `"format": "9:16", "width": 1080, "height": 1920`

7. Initialize HyperFrames inside `jobs/<slug>/composition/` with `npx hyperframes init ... --non-interactive`. If the template's `composition/` directory is empty and initialization requires the path not to exist, remove **only that empty directory** before initializing; do not delete existing work. HyperFrames, not Remotion, is the required renderer.

### Direct and produce the video

8. Use research as factual context, `script.txt` as approved narration, `transcript.json` for segment timing, and `vo.mp3` as the actual audio timing master. Do not rewrite narration or regenerate TTS.
9. Follow `docs/visual-production-workflow.md`. Copy the reusable `templates/shot-plan.md`, `templates/design.md`, and `templates/review.md` into the job, then fill them during production. These are generated outputs; no additional user inputs are required.
10. Complete `shot-plan.md` before capture. Map every narration beat to transcript references with exact source text/timestamps and separate visual in/out times. Choose real UI, an interaction demo, animated technical diagram, code close-up, selective kinetic typography, or focused graphic based on what the viewer needs to understand. Record the reason, source, crop, focal point, minimal copy, motion intent, and cut motivation. Cover pauses and the full audio ending without changing transcript times.
11. Define `design.md`: consistent easing/timing/transitions, movement limits and holds, font roles and sizes, exact palette and color meanings, grid, and safe areas. Use relevant installed skills through HyperFrames-compatible techniques. Do not apply narration-writing, TTS, or other-renderer defaults.
12. Capture authentic product screens, official demo/README images, real code, or short interactions as planned. Record source URLs and local capture paths in the shot plan. Show context → action → observed result for demos. Document unavailable features and use sourced material or an identified conceptual diagram rather than inventing working UI.
13. Build static HyperFrames layouts (HTML/CSS/SVG/GSAP) at the **chosen orientation and dimensions**, using `render-config.json`. **For horizontal:** balance contextual UI with readable feature details. **For vertical:** recompose every shot with tighter UI views, restacked diagrams, reflowed type, larger labels, and safe margins. Do not stretch, squeeze, letterbox, or blindly crop a landscape composition.
14. Export representative stills for every shot, plus action/result states where useful, into `storyboard/`. Assemble `storyboard/contact-sheet.jpg` labeled with shot IDs and visual time ranges. Open and inspect the sheet and full-size stills at realistic playback size, including phone-sized vertical views. Record findings in `review.md`, fix layouts, and refresh the affected stills/sheet **before completing animation**.
15. Complete deterministic HyperFrames animation synchronized to narration. Use kinetic typography only for hooks, key statements, and transitions; do not repeat the entire voiceover as text. Avoid repetitive scrolling, excessive zooming, unrelated footage, random cursor movement, dense overlays, and decorative transitions. Prefer purposeful cuts and useful visual variety.
16. Run HyperFrames `lint`, then `inspect`; fix issues and rerun applicable checks after changes. Render `draft.mp4` with `--workers 1`. Watch the complete draft with narration and inspect detailed frames for clarity, repetition, readability, pacing, visual variety, framing, and audio. Record issues by shot/timecode in `review.md`.
17. Fix weak scenes, rerun applicable checks, render an updated draft, and re-review changed shots and adjacent cuts until resolved. If no defects are found, record the review result. Report unavoidable source limitations. Do not skip this review-and-fix pass.
18. Render `jobs/<chosen-slug>/final.mp4` with HyperFrames and `--workers 1`. Verify final playback, full narration, dimensions, FPS, and duration against `vo.mp3`, allowing only frame/codec rounding. Report the exact job path, output dimensions/orientation, duration, and important limitations.

Codex may require your approval to run commands or access the browser. It should not need you to manually select a project slug or edit a path.

## 5. Find the finished video

Codex will report a path like:

```text
jobs/photocraft/final.mp4
```

The generated `render-config.json` records whether that job was rendered as horizontal or vertical.

Each job retains its source files, captures, HyperFrames composition, and final output. Once the five inputs are safely copied to the job, `inbox/` should be empty for the next video.

The job also retains generated `shot-plan.md`, `design.md`, `storyboard/` stills and `contact-sheet.jpg`, `review.md`, and `draft.mp4` so the visual decisions and inspections can be reviewed later.

## 6. Start another video

1. Use a new chat in your existing **Tech Video Research & Script** ChatGPT Project.
2. Approve the script and obtain `research.md`, `script.txt`, and `source.json`.
3. Use your TTS app to generate `vo.mp3` and `transcript.json`.
4. Copy all five files into `inbox/`.
5. Return to **section 3** and paste either the **Horizontal** or **Vertical** prompt.

You keep one ChatGPT Project, one Codex workspace, and one job folder per video.

## Optional — Resume an interrupted job

If a job already exists and Codex stopped partway through, do **not** use either new-video prompt. Instead paste this:

```text
Resume the most recently created unfinished video job under jobs/ (ignore _template and _smoke-test). Read the root AGENTS.md, guide.md, docs/visual-production-workflow.md, that job's inputs, and its render-config.json if present. Keep the previously chosen orientation and output dimensions. Reuse existing plans, storyboard, captures, and HyperFrames composition; do not create a new job or change the original input files. Complete any missing transcript-synchronized shot plan, visual system, and storyboard inspection before completing animation. Finish lint, inspect, full draft review with narration, recorded fixes and rechecks, and final rendering with --workers 1. Save final.mp4 in the same job and verify its playback, dimensions, FPS, duration, and full narration. Report its exact path. If more than one unfinished job is plausible, ask me which one to resume.
```

## Rules to remember

- Choose **one** orientation per job. To produce both formats, create two jobs from the same input package (preserve or re-copy the original five inputs before the next run).
- Do not change or regenerate `vo.mp3` or its timestamps during video production.
- Do not modify any of the five inputs. Put orientation overrides in generated `render-config.json`.
- Never overwrite an existing job.
- Keep `inbox/` for one new job at a time.

For installation, troubleshooting, and full input-file formats, see `README.md`.
