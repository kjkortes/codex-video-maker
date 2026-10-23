// Intake only: visual interpretation belongs to the production agent.
import { createHash } from 'node:crypto';
import { lstat, mkdir, readFile, readdir, realpath, writeFile } from 'node:fs/promises';
import path from 'node:path';

const supported = new Set(['storyboard.md', 'storyboard.png', 'storyboard.jpg', 'storyboard.jpeg', 'storyboard.pdf']);
const result = { files: [], warnings: [] };
const warn = (name, reason) => result.warnings.push({ path: name, reason });

async function statIfPresent(target) {
  try {
    return await lstat(target);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

// Check every destination component. Never follow a reference-directory symlink.
async function ensureDirectory(target) {
  const info = await statIfPresent(target);
  if (info) {
    if (!info.isDirectory() || info.isSymbolicLink()) throw new Error('destination is not a regular directory');
  } else {
    await mkdir(target);
  }
}

async function copyEntry(inbox, references, name, directoryExpected = false) {
  const source = path.join(inbox, name);
  const destination = path.join(references, name);
  try {
    const info = await lstat(source);
    if (info.isSymbolicLink()) throw new Error('symbolic links are skipped; supply regular files/directories');
    if (directoryExpected && !info.isDirectory()) throw new Error('expected a directory');
    if (!directoryExpected && !info.isFile()) throw new Error('expected a regular file');
    await ensureDirectory(references);
    if (directoryExpected) {
      await ensureDirectory(destination);
      for (const child of (await readdir(source, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
        await copyEntry(inbox, references, path.join(name, child.name), child.isDirectory());
      }
      return;
    }
    const bytes = await readFile(source);
    const existing = await statIfPresent(destination);
    if (existing) {
      if (!existing.isFile() || existing.isSymbolicLink() || !(await readFile(destination)).equals(bytes)) {
        throw new Error('destination exists with different contents or type; not overwritten');
      }
    } else {
      await writeFile(destination, bytes, { flag: 'wx' });
    }
    if (!(await readFile(destination)).equals(bytes)) throw new Error('copy verification failed; original retained');
    result.files.push({
      path: ['references', ...name.split(path.sep)].join('/'),
      bytes: bytes.length,
      sha256: createHash('sha256').update(bytes).digest('hex'),
    });
  } catch (error) {
    warn(name.split(path.sep).join('/'), error.message);
  }
}

async function main() {
  if (process.argv.length !== 4) throw new Error('Usage: node scripts/copy-storyboard-references.mjs <inbox> <existing-job>');
  const inbox = path.resolve(process.argv[2]);
  const job = path.resolve(process.argv[3]);
  const jobInfo = await statIfPresent(job);
  if (!jobInfo?.isDirectory() || jobInfo.isSymbolicLink()) throw new Error('Job must be an existing regular directory');
  let entries;
  try {
    // Keep inputs and outputs disjoint, including aliases through parent symlinks.
    const sourceRoot = await realpath(inbox);
    const jobRoot = await realpath(job);
    for (const relative of [path.relative(sourceRoot, jobRoot), path.relative(jobRoot, sourceRoot)]) {
      if (relative === '' || (!relative.startsWith(`..${path.sep}`) && relative !== '..' && !path.isAbsolute(relative))) {
        throw new Error('Inbox and job directories must be separate, non-nested directories');
      }
    }
    entries = await readdir(inbox);
  } catch (error) {
    warn('.', `cannot inspect inbox: ${error.message}`);
    return;
  }
  for (const name of entries.sort()) {
    if (supported.has(name) || name === 'storyboard-assets') {
      await copyEntry(inbox, path.join(job, 'references'), name, name === 'storyboard-assets');
    } else if (name.startsWith('storyboard.')) {
      warn(name, 'unsupported storyboard format; skipped');
    }
  }
}

try {
  await main();
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} catch (error) {
  process.stderr.write(`${error.message}\n`);
  process.exitCode = 1;
}
