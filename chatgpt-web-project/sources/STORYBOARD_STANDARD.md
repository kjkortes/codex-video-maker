# Optional Creative Storyboard Standard

## Purpose

This document governs **ChatGPT-created visual references**. It does not govern Codex Video Maker's final production storyboard, shot plan, or rendering.

## Trigger and checkpoint

After generating approved `research.md`, `script.txt`, and `source.json`, offer an optional storyboard. Let the user choose **portrait (9:16)** or **landscape (16:9)**. Do not generate until the user opts in. An explicit storyboard request already counts as opt-in. If an orientation is known, do not ask again.

## Required outputs when requested

1. `storyboard.md`: self-contained creative concept, scene descriptions, approved narration phrases, visual references, style/motion intent, and accuracy cautions.
2. `storyboard.png`: one contact sheet showing the intended sequence. Each scene panel must match the selected video orientation. The sheet itself may contain multiple panels in a wider grid.
3. `storyboard-assets/`: optional individual image panels or supporting references if needed for readable handoff.

If image generation is unavailable, provide a useful written reference and explain the limitation; never claim an image was produced without a real file.

## Content expectations

- Use the **approved script without rewriting it**.
- Prefer high-quality generated visual panels over basic programmatic placeholder graphics, when image generation is available.
- Use `research.md`, the primary repository, and credible official visuals.
- Draw visual inspiration from genuine product interfaces, demos, code, and clear technical concepts.
- Make each visual directly support the corresponding narration phrase.
- Aim for one central visual explanation per panel, a strong first panel, coherent graphic language, and a satisfying final payoff.
- Prefer meaningful demonstrations, contrast, interactions, and animated mechanisms over repetitive text cards, small unreadable screenshots, or abstract decoration.
- Distinguish conceptual UI from real product screenshots. Never present invented benchmark figures, menus, or product behavior as documented facts.
- Suggest transitions, animated behavior, and pacing in broad terms; do not prescribe rigid keyframes, exact cuts, scene count, or precise timings.
- Without `transcript.json` and `vo.mp3`, no claimed exact timecodes or transcript synchronization.

## Aspect ratios

- Portrait / 9:16: scene panels 1080 × 1920 in intended composition.
- Landscape / 16:9: scene panels 1920 × 1080 in intended composition.
- Smaller preview exports are acceptable when the panel aspect ratio is preserved.
- When the storyboard orientation changes the **intended video** orientation, provide a revised `source.json`: change `format`, `width`, and `height`; keep approved narration and research unchanged.
- Codex's selected orientation at render time remains authoritative.

## Structure for storyboard.md

# Creative Storyboard Reference

## Project
Project name, source URL, chosen orientation.

## Core Visual Concept
Visual theme and what the viewer should understand.

## Visual Design System
Palette, typography, treatment of UI, diagram style, motion principles, and any visual restraints.

## Narrative Sequence
An ordered series of flexible **creative beats**. For each beat:
- Approved narration phrase (quote or short reference).
- Viewer takeaway.
- Proposed visual composition/action.
- Motion/transition intent.
- Relevant official source material or accuracy qualifier.

## Creative Flexibility
State clearly that Codex may add/remove/reorder/combine/redesign scenes and adapt to actual audio timing.

## Authentic Visual Sources
Official screenshots, docs, demo URLs, and what they verify.

## Limitations and Handoff
Unverified visual claims, conceptual placeholders, orientation, and optional reference filenames.

## Review checkpoint

Show the contact sheet and offer revisions before treating the storyboard as final. Do not regenerate `script.txt` or `research.md` unless explicitly requested.

## Codex compatibility

Use exact supported filenames: `storyboard.md`, `storyboard.png`, or supported jpg/jpeg/pdf alternatives; optional assets in `storyboard-assets/`. All must be placed in the **same** `inbox/` as `research.md`, `script.txt`, `source.json`, `vo.mp3`, and `transcript.json`.

The storyboard is a creative director's reference—not a sixth required input. Codex's internal production storyboard and QA are separate.
