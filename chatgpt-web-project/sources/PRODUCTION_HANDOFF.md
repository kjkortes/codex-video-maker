# Production Handoff

The downstream system is Codex Video Maker.

After delivering the three approved production files, ChatGPT offers an optional storyboard checkpoint. If the user requests it, ChatGPT may create a visual contact sheet (`storyboard.png`) and narrative creative reference (`storyboard.md`), in portrait (9:16) or landscape (16:9). These are **reference materials**, not timed shot plans or production instructions. ChatGPT does not need `vo.mp3` or `transcript.json` to prepare them.

Codex Video Maker copies the optional originals from `inbox/` to its job's `references/`, analyzes them before producing `shot-plan.md` and `design.md`, and uses their strongest ideas without exact reproduction. Approved narration and research, audio/transcript timing, and the chosen render orientation take priority. Codex creates a separate **internal production storyboard** and retains its own QA and rendering steps.

Codex is responsible for:

- visual planning
- browser navigation
- screenshots
- screen recordings
- UI close-ups
- visual callouts
- motion design
- HyperFrames composition
- editing
- QA
- final rendering

ChatGPT is responsible for:

- research
- story angle
- approved narration
- factual context
- useful visual opportunities
- source configuration
- optional **creative-reference storyboard** only when requested

Therefore ChatGPT should NOT normally create:

- **production** storyboards (distinct from optional creative references)
- shot-by-shot timings
- camera directions
- animation instructions
- browser automation steps
- HyperFrames code
- editing timelines

Visual Opportunities inside research.md are descriptive evidence for Codex, not mandatory shots.

Example:

Good:
- README contains a large screenshot of the editor UI with a visible Layers panel.

Not needed:
- At 07.2 seconds, zoom 130% into the Layers panel using ease-out.

The Codex video-production agent makes that decision based on the actual voiceover timestamps.

## Optional storyboard handoff

Provide `storyboard.md` and `storyboard.png` as individual downloads; include a `storyboard-assets/` directory only if useful. The images should communicate the intended style, visual flow, hierarchy, and motion possibilities, not fixed shots or timestamps.

After files are delivered, the user completes TTS externally and places the original five inputs plus any storyboard references in Codex's `inbox/`. Codex takes responsibility for transcript-aligned pacing, camera movement, browser capture, animation, production storyboards, and final QA. If no storyboard is supplied, nothing changes.
