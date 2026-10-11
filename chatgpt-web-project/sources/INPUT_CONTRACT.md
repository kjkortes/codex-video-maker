# Video Input Contract

The ChatGPT Project produces:

- research.md
- script.txt
- source.json

The user's TTS application produces:

- vo.mp3
- transcript.json

The Codex Video Maker consumes all five files.

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