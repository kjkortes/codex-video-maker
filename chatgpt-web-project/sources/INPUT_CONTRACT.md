# Video Input Contract

The ChatGPT Project produces:

- research.md
- script.txt
- source.json

The user's TTS application produces:

- vo.mp3
- transcript.json

The Codex Video Maker consumes all five files.

## Optional ChatGPT-created storyboard references

After delivering the approved `research.md`, `script.txt`, and `source.json`, ChatGPT offers a separate optional checkpoint: **Create a storyboard? Portrait (9:16) or landscape (16:9)?**

Only when the user opts in, ChatGPT prepares:
- `storyboard.md`: creative notes tied to approved narration phrases, with no invented precise timestamps.
- `storyboard.png`: visual storyboard contact sheet; each scene panel follows the selected video aspect ratio.
- `storyboard-assets/`: optional individual panels or supporting images when useful.

The storyboard is created from approved narration and verified research, without waiting for TTS. It is a creative reference for Codex, **not** a frame-accurate production storyboard, a timed shot plan, or a sixth required input. If the user changes the intended format at the storyboard checkpoint, ChatGPT supplies an updated `source.json` with the selected video dimensions and leaves the approved narration/research unchanged. Codex's chosen render orientation still controls final output.

Codex Video Maker accepts any combination of `storyboard.md`, `storyboard.png`, `storyboard.jpg`, `storyboard.jpeg`, `storyboard.pdf`, and `storyboard-assets/` in `inbox/`. Codex copies originals to its job's `references/`, inspects them visually before shot planning/design, and treats them as creative guidance. It can redesign, reorder, combine, or remove shots. Its own generated `storyboard/` remains separate.

If the user declines a storyboard, the workflow remains the existing three ChatGPT files plus two TTS files. Exact synchronization belongs to `vo.mp3` and `transcript.json`, not the creative storyboard. See `STORYBOARD_STANDARD.md` for reference creation rules.

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
