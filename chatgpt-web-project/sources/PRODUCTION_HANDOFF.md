# Production Handoff

The downstream system is Codex Video Maker.

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

Therefore ChatGPT should NOT normally create:

- storyboards
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