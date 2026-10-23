# Production Handoff

The downstream system is Codex Video Maker.

The user may independently supply optional storyboard references in Codex Video Maker's `inbox/`; this does not add storyboard creation to ChatGPT's responsibilities. Codex preserves originals in the job's `references/`, visually studies the package before shot planning/design, and interprets its strongest ideas as creative direction. Audio/transcript timing, approved narration/facts, and selected output configuration remain authoritative. Final shots may differ freely; reference-aware QA assesses creative intent while retaining the separate internal production storyboard and all existing checks. See the [input contract](INPUT_CONTRACT.md#optional-downstream-storyboard-references) and [production workflow](../../docs/visual-production-workflow.md). Without references the handoff is unchanged.

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
