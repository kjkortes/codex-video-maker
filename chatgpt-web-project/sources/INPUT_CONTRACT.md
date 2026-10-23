# Video Input Contract

The ChatGPT Project produces:

- research.md
- script.txt
- source.json

The user's TTS application produces:

- vo.mp3
- transcript.json

The Codex Video Maker consumes all five files.

## Optional downstream storyboard references

The user may also place any combination of `storyboard.md`, `storyboard.png`, `storyboard.jpg`, `storyboard.jpeg`, `storyboard.pdf`, and `storyboard-assets/` in Codex Video Maker's `inbox/`. These are optional creative references, not a sixth required input or a change to any format below. ChatGPT does not need to generate them.

Codex automatically detects and copies them unchanged to the job's `references/`, preserving filenames and supporting directories. After reading narration/research, Codex inspects them together visually (including PDF page images) before creating the shot plan and design. References guide style, composition, motion, transitions, flow, and rhythm; they do not verify product facts or override approved narration, audio/transcript timing, or selected output orientation. Exact scenes and timings are not required. Codex retains its separate generated `storyboard/` and QA gates, comparing overall creative intent rather than frame matches. No references means the existing five-file workflow; unreadable/unsupported optional files are non-blocking. See the [production workflow](../../docs/visual-production-workflow.md).

## research.md

Required structure:

# Research

## Project
<Name>

## Source
<Primary URL>

## Summary
<Concise factual description>

## Key Facts
- Fact
- Fact

## Important Features
### Feature Name
Explanation.

## Visual Opportunities
- Specific page, UI area, screenshot, demo, code sample, or section.

## Limitations / Accuracy Notes
- Caveats, maturity status, uncertainty, limitations.

## Useful Links
- Repository:
- Website:
- Documentation:
- Demo:

Research is factual context, not narration.

## script.txt

Plain UTF-8 text containing only spoken narration.

Must not contain:

- headings
- timestamps
- citations
- visual directions
- notes
- alternate lines
- markdown

This file is sent directly to the TTS application.

## source.json

Default:

{
  "url": "",
  "title": "",
  "format": "16:9",
  "width": 1920,
  "height": 1080,
  "fps": 30,
  "target_duration_seconds": 60,
  "platforms": ["youtube", "facebook"]
}

Optional:

{
  "demo_url": "",
  "repository_url": "",
  "documentation_url": "",
  "preferred_theme": "",
  "notes": ""
}

## Downstream Files

The TTS application creates:

vo.mp3
transcript.json

The transcript timestamps must correspond to the final generated audio.

ChatGPT does not estimate final timestamps.
