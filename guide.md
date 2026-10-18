# Video Production Guide

**Use this guide after the ChatGPT Web Project and your TTS app produce the five input files.** Work from the root of the `codex-video-maker` workspace in VS Code, with the Codex extension open.

The guide lets you pick **horizontal or vertical for every new video**. You never need to type the project name, change a folder path, or manually edit `source.json` to switch formats.

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
Create a new HORIZONTAL (16:9, 1920x1080) faceless tech walkthrough video using the five files in the workspace-root inbox/ folder.

Read and follow the workspace-root guide.md section "Codex production procedure", the root AGENTS.md, and relevant installed motion-design skills. My chosen orientation overrides only format, width, and height in source.json; preserve the original source.json. Do not ask me for a video name or make me edit a command. Finish by rendering final.mp4 and reporting its exact path.
```

### Option B — Vertical video (9:16)

Use this for YouTube Shorts, Facebook Reels, TikTok, and other portrait videos.

| Setting | Value |
|---|---|
| Aspect ratio | 9:16 |
| Resolution | 1080 × 1920 |
| Orientation | Portrait |

```text
Create a new VERTICAL (9:16, 1080x1920) faceless tech walkthrough video using the five files in the workspace-root inbox/ folder.

Read and follow the workspace-root guide.md section "Codex production procedure", the root AGENTS.md, and relevant installed motion-design skills. My chosen orientation overrides only format, width, and height in source.json; preserve the original source.json. Design actual portrait compositions with readable UI close-ups, not a squeezed or letterboxed landscape video. Do not ask me for a video name or make me edit a command. Finish by rendering final.mp4 and reporting its exact path.
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
9. Create a visual plan for the current narration, then navigate and capture relevant pages, README images, feature details, code views, screenshots, or short interactions. Do not present unverified features as working.
10. Build the HyperFrames composition (HTML/CSS/GSAP) at the **chosen orientation and dimensions**, using `render-config.json`. Do not automatically take `source.json`'s aspect ratio if the user selected a different orientation.
11. **For horizontal:** use broad UI compositions and controlled zooms; keep important details readable.
12. **For vertical:** recompose shots for portrait viewing. Use tighter UI crops, larger labels, and safe margins. Where needed, show different parts of a desktop interface in separate shots. Do not stretch, squeeze, or merely add blank bars around a landscape video.
13. Avoid repetitive scrolling, unrelated content, random cursor movements, unnecessary transitions, and dense text overlays. Match visual changes to narration beats.
14. Run HyperFrames `lint` and `inspect`, fix issues, render a draft, inspect the draft, fix weak scenes, and render the final MP4 with `--workers 1` to conserve RAM.
15. Save the video to `jobs/<chosen-slug>/final.mp4`. Report the exact job path, output dimensions/orientation, duration, and important limitations.

Codex may require your approval to run commands or access the browser. It should not need you to manually select a project slug or edit a path.

## 5. Find the finished video

Codex will report a path like:

```text
jobs/photocraft/final.mp4
```

The generated `render-config.json` records whether that job was rendered as horizontal or vertical.

Each job retains its source files, captures, HyperFrames composition, and final output. Once the five inputs are safely copied to the job, `inbox/` should be empty for the next video.

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
Resume the most recently created unfinished video job under jobs/ (ignore _template and _smoke-test). Read the root AGENTS.md, guide.md, that job's inputs, and its render-config.json if present. Keep the previously chosen orientation and output dimensions. Reuse existing captures and the HyperFrames composition; do not create a new job or change the original input files. Finish lint, inspect, draft review, fixes, and final rendering with --workers 1. Save final.mp4 in the same job and report its exact path. If more than one unfinished job is plausible, ask me which one to resume.
```

## Rules to remember

- Choose **one** orientation per job. To produce both formats, create two jobs from the same input package (preserve or re-copy the original five inputs before the next run).
- Do not change or regenerate `vo.mp3` or its timestamps during video production.
- Do not modify any of the five inputs. Put orientation overrides in generated `render-config.json`.
- Never overwrite an existing job.
- Keep `inbox/` for one new job at a time.

For installation, troubleshooting, and full input-file formats, see `README.md`.
