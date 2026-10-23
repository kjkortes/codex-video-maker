import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import { chmodSync, mkdtempSync, mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync, symlinkSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const script = fileURLToPath(new URL('../scripts/copy-storyboard-references.mjs', import.meta.url));
const required = ['research.md', 'script.txt', 'source.json', 'vo.mp3', 'transcript.json'];
const supported = ['storyboard.md', 'storyboard.png', 'storyboard.jpg', 'storyboard.jpeg', 'storyboard.pdf'];

function fixture(t) {
  const root = mkdtempSync(path.join(tmpdir(), 'storyboard-test-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const inbox = path.join(root, 'inbox');
  const job = path.join(root, 'jobs', 'example');
  mkdirSync(inbox);
  mkdirSync(job, { recursive: true });
  return { root, inbox, job };
}

function run(inbox, job) {
  return JSON.parse(execFileSync(process.execPath, [script, inbox, job], { encoding: 'utf8' }));
}

test('all supported formats form one package; original names and bytes survive', t => {
  const { inbox, job } = fixture(t);
  for (const [i, name] of supported.entries()) writeFileSync(path.join(inbox, name), Buffer.from([0, 255, i, 13, 10]));
  mkdirSync(path.join(inbox, 'storyboard-assets'));
  writeFileSync(path.join(inbox, 'storyboard-assets/panel.png'), 'support');
  const result = run(inbox, job);
  assert.equal(result.files.length, supported.length + 1);
  assert.deepEqual(result.warnings, []);
  for (const name of supported) {
    const bytes = readFileSync(path.join(inbox, name));
    assert.deepEqual(readFileSync(path.join(job, 'references', name)), bytes);
    const entry = result.files.find(file => file.path === `references/${name}`);
    assert.equal(entry.sha256, createHash('sha256').update(bytes).digest('hex'));
    assert.equal(entry.bytes, bytes.length);
  }
});

test('assets alone work, preserving nested paths, spaces, arbitrary supporting files and empty directories', t => {
  const { inbox, job } = fixture(t);
  const assets = path.join(inbox, 'storyboard-assets');
  mkdirSync(path.join(assets, 'panels', 'empty'), { recursive: true });
  writeFileSync(path.join(assets, 'panels', 'frame 01.png'), 'image bytes');
  writeFileSync(path.join(assets, 'notes.txt'), 'supporting notes');
  const result = run(inbox, job);
  assert.equal(result.files.length, 2);
  assert.equal(readFileSync(path.join(job, 'references/storyboard-assets/panels/frame 01.png'), 'utf8'), 'image bytes');
  assert.ok(existsSync(path.join(job, 'references/storyboard-assets/panels/empty')));
  assert.deepEqual(readdirSync(assets).sort(), ['notes.txt', 'panels']);
});

test('no references is a no-op; intake with references also leaves required inputs, orientation and internal storyboard untouched', t => {
  const { inbox, job } = fixture(t);
  for (const name of required) {
    writeFileSync(path.join(inbox, name), `original ${name}`);
    writeFileSync(path.join(job, name), `copied ${name}`);
  }
  writeFileSync(path.join(job, 'render-config.json'), '{"format":"9:16","width":1080,"height":1920}');
  mkdirSync(path.join(job, 'storyboard'));
  writeFileSync(path.join(job, 'storyboard/contact-sheet.jpg'), 'internal');
  const before = readdirSync(job).sort();
  assert.deepEqual(run(inbox, job), { files: [], warnings: [] });
  assert.deepEqual(readdirSync(job).sort(), before);
  // A reference asking for conflicting settings cannot change production inputs.
  writeFileSync(path.join(inbox, 'storyboard.md'), 'Landscape 16:9, rewrite narration and use a different duration.');
  assert.equal(run(inbox, job).files.length, 1);
  for (const name of required) {
    assert.equal(readFileSync(path.join(inbox, name), 'utf8'), `original ${name}`);
    assert.equal(readFileSync(path.join(job, name), 'utf8'), `copied ${name}`);
  }
  assert.equal(readFileSync(path.join(job, 'render-config.json'), 'utf8'), '{"format":"9:16","width":1080,"height":1920}');
  assert.equal(readFileSync(path.join(job, 'storyboard/contact-sheet.jpg'), 'utf8'), 'internal');
});

test('missing inbox and unsupported references do not break intake', t => {
  const { inbox, job } = fixture(t);
  const missing = run(path.join(inbox, 'missing'), job);
  assert.deepEqual(missing.files, []);
  assert.ok(missing.warnings.length);
  writeFileSync(path.join(inbox, 'storyboard.gif'), 'unsupported');
  writeFileSync(path.join(inbox, 'unrelated.png'), 'unrelated');
  const result = run(inbox, job);
  assert.deepEqual(result.files, []);
  assert.ok(result.warnings.some(w => w.path === 'storyboard.gif'));
  assert.ok(!existsSync(path.join(job, 'references')));
});

test('wrong file types warn while readable references still copy', t => {
  const { inbox, job } = fixture(t);
  mkdirSync(path.join(inbox, 'storyboard.pdf'));
  writeFileSync(path.join(inbox, 'storyboard-assets'), 'not a directory');
  writeFileSync(path.join(inbox, 'storyboard.md'), 'valid');
  const result = run(inbox, job);
  assert.equal(result.files.length, 1);
  assert.equal(result.warnings.length, 2);
});

test('identical reruns are safe, differing destinations are never overwritten', t => {
  const { inbox, job } = fixture(t);
  writeFileSync(path.join(inbox, 'storyboard.md'), 'first');
  const first = run(inbox, job);
  assert.deepEqual(run(inbox, job), first);
  writeFileSync(path.join(inbox, 'storyboard.md'), 'second');
  const result = run(inbox, job);
  assert.equal(result.files.length, 0);
  assert.ok(result.warnings.length);
  assert.equal(readFileSync(path.join(job, 'references/storyboard.md'), 'utf8'), 'first');
  assert.equal(readFileSync(path.join(inbox, 'storyboard.md'), 'utf8'), 'second');
});

test('source symbolic links are skipped, including links inside asset directories', t => {
  const { inbox, job, root } = fixture(t);
  const outside = path.join(root, 'outside');
  writeFileSync(outside, 'do not import');
  symlinkSync(outside, path.join(inbox, 'storyboard.png'));
  mkdirSync(path.join(inbox, 'storyboard-assets'));
  symlinkSync(inbox, path.join(inbox, 'storyboard-assets/loop'));
  const result = run(inbox, job);
  assert.equal(result.files.length, 0);
  assert.equal(result.warnings.length, 2);
  assert.ok(!existsSync(path.join(job, 'references/storyboard.png')));
});

test('destination symbolic links and blocked directories cannot redirect writes', t => {
  const { inbox, job, root } = fixture(t);
  const outside = path.join(root, 'outside');
  mkdirSync(outside);
  writeFileSync(path.join(inbox, 'storyboard.md'), 'reference');
  symlinkSync(outside, path.join(job, 'references'));
  const result = run(inbox, job);
  assert.equal(result.files.length, 0);
  assert.ok(result.warnings.length);
  assert.deepEqual(readdirSync(outside), []);
});

test('invalid CLI usage fails without creating a job or touching inbox', t => {
  const { inbox, root } = fixture(t);
  const absentJob = path.join(root, 'absent');
  const result = spawnSync(process.execPath, [script, inbox, absentJob], { encoding: 'utf8' });
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Job must be an existing regular directory/);
  assert.ok(!existsSync(absentJob));
  assert.deepEqual(readdirSync(inbox), []);
  const usage = spawnSync(process.execPath, [script], { encoding: 'utf8' });
  assert.notEqual(usage.status, 0);
  assert.match(usage.stderr, /Usage:/);
});

test('unreadable optional files warn without blocking readable material', { skip: process.platform === 'win32' || process.getuid?.() === 0 }, t => {
  const { inbox, job } = fixture(t);
  const unreadable = path.join(inbox, 'storyboard.pdf');
  writeFileSync(unreadable, 'original unreadable reference');
  chmodSync(unreadable, 0);
  writeFileSync(path.join(inbox, 'storyboard.md'), 'readable');
  const result = run(inbox, job);
  assert.equal(result.files.length, 1);
  assert.ok(result.warnings.some(w => w.path === 'storyboard.pdf' && /EACCES/.test(w.reason)));
  assert.ok(!existsSync(path.join(job, 'references/storyboard.pdf')));
});

test('blocked nested asset directories preserve existing files while other references copy', t => {
  const { inbox, job } = fixture(t);
  mkdirSync(path.join(inbox, 'storyboard-assets/panels'), { recursive: true });
  writeFileSync(path.join(inbox, 'storyboard-assets/panels/frame.png'), 'frame');
  writeFileSync(path.join(inbox, 'storyboard.md'), 'reference');
  mkdirSync(path.join(job, 'references/storyboard-assets'), { recursive: true });
  writeFileSync(path.join(job, 'references/storyboard-assets/panels'), 'keep');
  const result = run(inbox, job);
  assert.equal(result.files.length, 1);
  assert.equal(result.warnings.length, 1);
  assert.equal(readFileSync(path.join(job, 'references/storyboard-assets/panels'), 'utf8'), 'keep');
});

test('overlapping inbox and job paths do not write into the original package', t => {
  const { inbox } = fixture(t);
  writeFileSync(path.join(inbox, 'storyboard.md'), 'original');
  for (const job of [inbox, path.join(inbox, 'nested-job')]) {
    mkdirSync(job, { recursive: true });
    const result = run(inbox, job);
    assert.equal(result.files.length, 0);
    assert.ok(result.warnings.length);
    assert.ok(!existsSync(path.join(job, 'references')));
  }
  assert.equal(readFileSync(path.join(inbox, 'storyboard.md'), 'utf8'), 'original');
});
