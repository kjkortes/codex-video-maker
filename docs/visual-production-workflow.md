# Visual production workflow

Use this procedure for every new video and when resuming unfinished production. The root [AGENTS.md](../AGENTS.md) defines the production rules; [guide.md](../guide.md) defines job creation and orientation selection.

The five input files, their priority, and the research → approved script → external TTS/transcript handoff stay unchanged. All files described below are generated inside `jobs/<job-name>/`. Do not edit the approved voiceover, transcript timestamps, script, research, or source configuration. Keep HyperFrames as the composition and rendering engine.

## 1. Plan from the supplied narration

Read all inputs and measure `vo.mp3`. Map the supplied transcript to the audio without changing either. Flag meaningful mismatches before proceeding. Never estimate final timestamps from word counts or fit narration to `target_duration_seconds`.

Copy [shot-plan.md](../templates/shot-plan.md) into the job and fill it before capture. Cover the audio from start to end, including pauses. Reference transcript segments by array index or existing ID and preserve their exact text and times. Record visual cut times separately; splitting a visual beat does not create new transcript segments. Keep a useful visual through any narration gap and finish within the audio duration, allowing only render frame rounding.

For every shot, decide what the viewer must understand, what evidence supports it, and why that visual technique serves the current words. Choose among real UI, an interaction demo, animated technical diagram, code close-up, kinetic typography, and focused graphic. Do not impose a technique quota or change shots simply to fill time.

| Narration need | Useful treatment | Direction |
|---|---|---|
| Identify the product or show a feature | Authentic screen or official screenshot | Establish context, then isolate the relevant region. |
| Explain an action and its outcome | Short interaction demo | Show initial state, one purposeful action, and the observed result. |
| Explain a relationship or mechanism | Technical diagram in HTML/SVG/GSAP | Reveal relevant nodes, connections, and state in spoken order. |
| Explain implementation or automation | Authentic code close-up | Crop to the few relevant lines; highlight the operation and its supported result. |
| Emphasize a hook or key statement | Kinetic typography | Use brief words or a phrase, one restrained reveal, then a readable hold. |
| Simplify an approved concept or comparison | Focused graphic | Use minimal labels and supported relationships; identify illustrative material. |

Typography is emphasis, not a substitute for product evidence. Never reproduce the full narration as successive text cards. Do not add unsupported metrics, benefits, architecture, calls to action, or factual claims to graphics.

## 2. Define the visual system

Copy [design.md](../templates/design.md) into the job. Resolve the selected format from `render-config.json` if present, otherwise `source.json`; preserve FPS and the audio timing master.

Record a small reusable system before animation:

- Creative intent and visual hierarchy: one primary subject per shot.
- Motion: easing, timing unit, transition vocabulary, stagger, distance/scale limits, and readable holds. Cuts are the default; a transition needs a narrative reason.
- Typography: actual font assets/families, weights, sizes, line lengths, and headline/label/code roles.
- Palette: exact colors for background, surface, text, muted text, emphasis, and any semantic states. Keep color meaning consistent.
- Layout: grid, spacing, safe areas, output-size readability, and format-specific framing for every shot.

Use the installed HyperFrames entry, composition, animation, and CLI skills. Apply motion-art-direction, shot-composition, animation-principles, color-motion, and explainer-video where useful. Add diagram-animation or kinetic-typography/animate-text only for shots that need them. Adapt renderer-independent advice to seekable HyperFrames HTML/CSS/SVG/GSAP; skip any skill defaults for writing narration, generating TTS, or switching renderers. Music-grid timing must never move supplied narration or timestamps. Music and effects remain optional and secondary.

For horizontal output, use contextual UI framing with readable feature details. For vertical output, restack relationships, reflow labels, and show separate UI regions sequentially when necessary. Treat the selected orientation as a new composition for every shot, even when reusing the same source image. Never squeeze or letterbox a landscape composition to make portrait output.

## 3. Capture evidence and build layouts

Navigate directly to the planned feature. Prefer authentic product screens, official demos, repository images, and real code. Save captures under the current job's `captures/`; record the source URL, local path, and relevant product state in the shot plan. Use short recordings only when interaction explains something a still cannot.

If a live product is unavailable, use an official screenshot or demo where possible. Otherwise choose an identified conceptual diagram or graphic within the approved research and narration. Record the limitation and revise the plan. Do not simulate a successful product interaction or invent a product UI as evidence.

Build each shot's static, final visible layout in the job's HyperFrames composition. Use one focal point, purposeful crops, readable code, and minimal callouts. Keep source context where needed to understand the feature. Package required assets and fonts inside the composition according to HyperFrames conventions.

## 4. Inspect the storyboard before completing animation

Export at least one representative still of every shot from the actual HyperFrames layouts. Include additional before/after or mechanism states when a single still cannot show the intended explanation. Use the installed CLI's still/snapshot workflow; consult its help for supported options rather than guessing flags. Store stills in `storyboard/` and combine them into `storyboard/contact-sheet.jpg` in narration order, labeled with shot ID and visual time range. Paginate large sheets if necessary while retaining that entry file.

Open the contact sheet to assess sequence, visual variety, repeated framing, and narrative coverage. Open the full-size stills to assess text, code, UI crops, hierarchy, safe areas, and overlaps at realistic playback size. For vertical output, also inspect a phone-sized view. A contact sheet alone cannot prove small text is readable.

Copy [review.md](../templates/review.md) into the job. Record concrete findings and corrections in its storyboard section. Fix the layouts and regenerate affected stills and the contact sheet. This is a producer review gate; do not require an extra user approval unless requested. Finish the animation only after the storyboard inspection and layout fixes.

## 5. Animate, check, and render the draft

Animate only what explains a change, guides attention, or emphasizes a key beat. For UI demos, connect context → action → observed result and hold the result. Reveal diagram relationships in spoken order. Use selective code highlights rather than scrolling entire files. Avoid repeated push-ins, cursor wandering, unrelated footage, and ornamental transitions.

Build deterministic paused timelines using HyperFrames conventions. Apply the job's typography, color, and motion tokens consistently. Leave enough stillness to read and understand each result; shorten visual complexity when the narration affords less time. Keep the supplied voiceover at its original speed and position.

Run HyperFrames `lint`, then `inspect`, from the composition directory. Fix reported layout problems and run applicable checks again after changes. Follow any additional checks required by the installed HyperFrames skills. Render `../draft.mp4` with draft quality and `--workers 1`, as documented in the [README QA commands](../README.md#hyperframes-qa-workflow).

## 6. Review, fix, and deliver

Watch the entire draft with narration. Check whether every visual supports the words currently spoken, actions and results are understandable, type can be read in its hold, pacing leaves room to understand technical detail, and visual variety avoids repeated information. Inspect transitions and detailed frames; lint and a sheet of stills cannot establish pacing or audio sync.

Record findings by shot ID and timecode in `review.md`: clarity, repetition, readability, pacing, visual variety, framing, and audio. For each issue, record the correction and recheck result. Fix weak sections, rerun applicable checks, render an updated draft, and review changed sections with their neighboring cuts. Repeat as needed. If the first draft has no defects, explicitly record that review result rather than making arbitrary changes. Report unavoidable source limitations.

Render `jobs/<job-name>/final.mp4` through HyperFrames with `--workers 1`. Verify the final file plays with full narration and the intended dimensions, FPS, and audio-controlled duration, allowing only frame/codec rounding. Keep the shot plan, design, captures, storyboard, review record, draft, and editable composition in that job. Report the exact final path, format, duration, and material limitations.

When resuming a job, reuse these artifacts and check which gates are complete. Produce or update missing plans, storyboard inspection, and draft review before final rendering; do not reset the inputs or selected format.
