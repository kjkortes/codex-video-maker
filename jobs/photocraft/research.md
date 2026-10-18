# Research

## Project
PhotoCraft

## Source
https://github.com/storytold/photocraft

## Summary
PhotoCraft is an open-source, clean-room reimplementation of Adobe Photoshop built in pure Rust. It provides a native desktop image editor with familiar Photoshop-style workflows, layered PSD support, a command-driven editing engine, and automation interfaces for scripts and AI agents.

The strongest video angle is its architecture: the desktop UI, CLI, JSON control channel, and MCP server all drive the same command registry. This makes PhotoCraft useful not only as a conventional image editor, but also as an example of an agent-ready creative application.

## Key Facts
- PhotoCraft describes itself as an open-source, clean-room reimplementation of Adobe Photoshop rebuilt in pure Rust.
- The desktop application uses an egui-based interface and a wgpu GPU compositor.
- The project supports layered PSD documents and includes layers, masks, adjustment layers, type, brushes, smart objects, smart filters, and selection tools.
- Smart subject and object selection runs locally, without requiring a cloud account.
- Every action is exposed through a shared command registry used by the GUI, CLI, JSON control channel, and MCP server.
- The generated Photoshop menu parity report currently shows 627 of 627 menu items connected to live commands.
- Menu coverage measures command wiring, not complete Photoshop behavioral or rendering parity.
- PhotoCraft is explicitly described by the project as early alpha and not yet a replacement for Photoshop in daily professional work.
- The latest listed GitHub release at research time is PhotoCraft v0.5.0, released October 8, 2026.

## Important Features

### Native Rust Editing Engine
PhotoCraft uses a pure-data document model and command engine with a thin egui UI layer. Its GPU compositor is built on wgpu, while a CPU compositor is also used as a reference implementation.

### Real Layered Editing
The project supports layered PSD workflows including masks, adjustment layers, editable type, brushes, smart objects, and smart filters. Adjustment layers remain editable and can be reordered, masked, disabled, or changed later.

### Local Smart Selection
Object Selection, Quick Selection, and Select Subject are available. The project states that smart selection runs locally with no cloud account.

### Agent-Ready Command Architecture
The GUI, CLI, JSON control channel, and MCP server call the same command registry. This lets scripts and AI agents drive the same editing engine used by the desktop application.

### Photoshop Menu Coverage
The generated parity report currently lists 627 of 627 Photoshop menu items as live commands. The project warns that this reflects command coverage, not full behavioral fidelity.

## Visual Opportunities
- README hero section showing the PhotoCraft editor and its Photoshop-style interface.
- README screenshots showing Curves, Vibrance, and other adjustment layers.
- Layers panel screenshots that demonstrate layered PSD editing and live effects.
- Selection examples showing Object Selection, Quick Selection, Select Subject, and Select and Mask.
- Type editing and layer-style screenshots from the README.
- Smart-object and smart-filter examples showing non-destructive filters.
- README “Built for agents” section with CLI command examples and MCP usage.
- `docs/parity.md` table showing 627 of 627 menu items connected to live commands.
- `docs/development.md` MCP section showing the available agent tools.
- GitHub Releases page showing PhotoCraft v0.5.0.

## Limitations / Accuracy Notes
- PhotoCraft is early alpha.
- The project explicitly says it is not yet a Photoshop replacement for daily professional work.
- 627 of 627 menu items being live means those menu entries dispatch commands; it does not mean full Photoshop behavioral, rendering, or workflow parity.
- The project's own parity assessment says remaining work is primarily depth and fidelity, especially in advanced professional workflows and AI/generative features.
- Some roadmap and assessment documents can lag behind the generated parity report, so the generated `docs/parity.md` should be treated as the source of truth for current menu-command coverage.
- Claims about performance, compatibility, or Photoshop parity should be presented as project measurements or project claims unless independently benchmarked.

## Useful Links
- Repository: https://github.com/storytold/photocraft
- README: https://github.com/storytold/photocraft/blob/main/README.md
- Photoshop menu parity: https://github.com/storytold/photocraft/blob/main/docs/parity.md
- Development / MCP documentation: https://github.com/storytold/photocraft/blob/main/docs/development.md
- Architecture: https://github.com/storytold/photocraft/blob/main/docs/architecture.md
- Roadmap: https://github.com/storytold/photocraft/blob/main/docs/roadmap.md
- Releases: https://github.com/storytold/photocraft/releases
