#!/usr/bin/env node
// Build an editable LaunchMotion scene with your own text.
// Usage: node scripts/create.mjs --out ./launch-scene [--set key=value ...] [--data content.json]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const skillRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectDir = path.join(skillRoot, 'references', 'project');
const defaults = JSON.parse(fs.readFileSync(path.join(skillRoot, 'references', 'defaults.json'), 'utf8'));

function parseArgs(argv) {
  const opts = { out: path.resolve('launch-scene'), values: {} };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--out' || arg === '--output') opts.out = path.resolve(argv[++i]);
    else if (arg === '--data') Object.assign(opts.values, JSON.parse(fs.readFileSync(path.resolve(argv[++i]), 'utf8')));
    else if (arg === '--set') {
      const pair = argv[++i] || '';
      const eq = pair.indexOf('=');
      if (eq > 0) opts.values[pair.slice(0, eq)] = pair.slice(eq + 1);
    } else if (arg === '--help' || arg === '-h') {
      console.log(`Slots: ${Object.keys(defaults.slots).join(', ')}`);
      process.exit(0);
    }
  }
  return opts;
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name), d = path.join(dst, entry.name);
    if (entry.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const opts = parseArgs(process.argv.slice(2));
fs.rmSync(opts.out, { recursive: true, force: true });
copyDir(projectDir, opts.out);

let html = fs.readFileSync(path.join(opts.out, 'index.html'), 'utf8');
const domValues = {};
const warnings = [];
for (let [key, value] of Object.entries(opts.values)) {
  value = String(value);
  const limit = defaults.limits?.[key];
  const localFile = path.resolve(value);
  const isFile = value.length < 1024 && fs.existsSync(localFile) && fs.statSync(localFile).isFile();
  if (isFile) {
    const rel = `assets/user/${path.basename(localFile).replace(/[^A-Za-z0-9._-]/g, '-')}`;
    fs.mkdirSync(path.join(opts.out, 'assets', 'user'), { recursive: true });
    fs.copyFileSync(localFile, path.join(opts.out, rel));
    value = rel;
  } else if (limit && value.replace(/\[\[|\]\]/g, '').length > limit) {
    warnings.push(`"${key}" is ${value.length} characters; the layout is designed for ${limit}.`);
  }
  if (html.includes(`data-slot="${key}"`)) { domValues[key] = value; continue; }
  // script parameter, e.g.  prompt: '...'
  const re = new RegExp(`(\\b${escapeRe(key)}\\s*:\\s*)(['"\`])((?:\\\\.|(?!\\2).)*)\\2`);
  if (re.test(html)) { html = html.replace(re, (m, a, q) => `${a}${q}${value.replace(/\\/g, '\\\\').replace(new RegExp(q, 'g'), '\\' + q)}${q}`); continue; }
  warnings.push(`Unknown slot "${key}" was ignored.`);
}

if (Object.keys(domValues).length) {
  // Runs after the slot elements exist and before the timeline script reads them.
  // A value may mark one highlighted phrase with [[ ]]; it takes the style of the slot's first inner element.
  const inject = `<script>(function(){var v=${JSON.stringify(domValues).replace(/</g, '\\u003c')};
Object.keys(v).forEach(function(k){document.querySelectorAll('[data-slot="'+k+'"]').forEach(function(el){var val=v[k];
if(/^(IMG|VIDEO|SOURCE|IMAGE)$/i.test(el.tagName)){el.setAttribute(el.tagName.toLowerCase()==='image'?'href':'src',val);return;}
var hi=el.firstElementChild,m=val.match(/^([\\s\\S]*?)\\[\\[([\\s\\S]*?)\\]\\]([\\s\\S]*)$/);
if(m&&hi){var s=hi.cloneNode(false);s.textContent=m[2];el.textContent='';el.append(m[1],s,m[3]);}else{el.textContent=val.replace(/\\[\\[|\\]\\]/g,'');}});});})();</script>\n`;
  const bodyAt = html.indexOf('<body');
  const re = /<script(?![^>]*\bsrc=)[^>]*>/g;
  re.lastIndex = bodyAt;
  const m = re.exec(html);
  const at = m ? m.index : html.lastIndexOf('</body>');
  html = html.slice(0, at) + inject + html.slice(at);
}
fs.writeFileSync(path.join(opts.out, 'index.html'), html);

for (const w of warnings) console.warn(`warning: ${w}`);
console.log(`Created ${opts.out} (${defaults.durationSeconds}s, ${defaults.width}x${defaults.height}).`);
console.log(`Preview: npx hyperframes preview ${opts.out}`);
console.log(`Render:  npx hyperframes render ${opts.out} --output ${opts.out}.mp4 --fps 30 --quality high --resolution 1080p   (4K: --resolution 4k)`);
