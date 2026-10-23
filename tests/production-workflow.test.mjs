// Instruction-contract checks, not a substitute for visual inspection by Codex.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const read = name => readFileSync(new URL(`../${name}`, import.meta.url), 'utf8');

test('reference inspection is specified before visual planning, with visual PDF review', () => {
  const workflow = read('docs/visual-production-workflow.md');
  assert.ok(workflow.indexOf('## 0. Inspect optional storyboard references') > 0);
  assert.ok(workflow.indexOf('## 0. Inspect optional storyboard references') < workflow.indexOf('## 1. Plan'));
  assert.match(workflow, /PDF[\s\S]*page images/);
  assert.match(workflow, /reference-analysis\.md/);
  assert.match(workflow, /before[\s\S]*shot-plan\.md[\s\S]*design\.md/);
});

test('intake connects detection before cleanup and both orientation prompts preserve references', () => {
  const guide = read('guide.md');
  const intake = guide.slice(guide.indexOf('### Validate and create the job'), guide.indexOf('### Direct and produce'));
  assert.ok(intake.indexOf('copy-storyboard-references.mjs') > 0);
  assert.ok(intake.indexOf('copy-storyboard-references.mjs') < intake.indexOf('clear the five inputs'));
  assert.match(intake, /Do not delete[\s\S]*references/);
  assert.equal((guide.match(/Inspect any optional storyboard references before visual planning\./g) || []).length, 2);
  assert.match(guide, /"format": "16:9", "width": 1920, "height": 1080/);
  assert.match(guide, /"format": "9:16", "width": 1080, "height": 1920/);
  assert.match(intake, /required input is missing or seriously inconsistent, stop/);
});

test('production gates and distinction between external references and internal storyboard remain explicit', () => {
  const agents = read('AGENTS.md');
  for (const phrase of ['Run lint.', 'Run inspect.', 'draft.mp4 with --workers 1', 'Watch the complete draft with narration', 'final.mp4 with --workers 1', 'Do not skip the review-and-fix pass.']) {
    assert.ok(agents.includes(phrase), phrase);
  }
  assert.match(agents, /references\/[\s\S]*storyboard\//);
  assert.match(read('templates/review.md'), /overall creative direction/);
  assert.match(read('templates/reference-analysis.md'), /page \/ panel \/ asset/);
  assert.match(read('templates/design.md'), /reference-analysis\.md/);
  assert.match(read('templates/shot-plan.md'), /reference-analysis\.md/);
});

test('documented priority keeps references subordinate and absence adds no gate', () => {
  const agents = read('AGENTS.md');
  const priority = agents.slice(agents.indexOf('# Source of Truth'), agents.indexOf('# Video Engine'));
  const ordered = ['vo.mp3', 'transcript.json', 'script.txt', 'research.md', 'source.json', 'Storyboard references'];
  let previous = -1;
  for (const item of ordered) {
    const index = priority.indexOf(item);
    assert.ok(index > previous, item);
    previous = index;
  }
  assert.match(agents, /selected orientation[\s\S]*takes priority/);
  assert.match(read('docs/visual-production-workflow.md'), /If no references[\s\S]*no extra approval/);
});

test('local documentation links in changed production instructions resolve', () => {
  const files = ['README.md', 'guide.md', 'AGENTS.md', 'docs/visual-production-workflow.md', 'templates/reference-analysis.md', 'chatgpt-web-project/sources/INPUT_CONTRACT.md', 'chatgpt-web-project/sources/PRODUCTION_HANDOFF.md'];
  for (const file of files) {
    const base = new URL(`../${file}`, import.meta.url);
    for (const [, target] of read(file).matchAll(/\]\(([^)]+)\)/g)) {
      if (/^(https?:|#)/.test(target)) continue;
      const local = new URL(target.split('#')[0], base);
      assert.doesNotThrow(() => readFileSync(local), `${file} → ${target}`);
    }
  }
});
