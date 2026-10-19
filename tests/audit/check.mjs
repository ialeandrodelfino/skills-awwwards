// Runs jury/scripts/audit.mjs on tests/audit/site and checks the head and link checks read HTML
// the way a browser does: minified (unquoted) and quoted pages pass, a page that really lacks
// the tags still fails.
//   node tests/audit/check.mjs
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const audit = path.join(here, '..', '..', 'jury', 'scripts', 'audit.mjs');
let out;
try { out = execFileSync(process.execPath, [audit, path.join(here, 'site')], { encoding: 'utf8' }); }
catch (e) { out = e.stdout || ''; } // audit exits 1 on FAIL, which the bare page is meant to cause

const HEAD = ['<html> has no lang', 'missing meta description', 'missing viewport meta', 'no canonical link',
  'missing og:title', 'missing og:description', 'missing og:image', 'missing twitter:card', 'no favicon link'];
const findings = out.split('\n').map((l) => l.match(/^(FAIL|WARN)\s+(\S+)\s+(.*)$/)).filter(Boolean).map((m) => ({ where: m[2], msg: m[3] }));
const has = (where, msg) => findings.some((f) => f.where === where && f.msg.startsWith(msg));
const errors = [];
for (const where of ['/', '/quoted/']) {
  for (const f of findings) if (f.where === where && !f.msg.startsWith('only ')) errors.push(`unexpected on ${where}: ${f.msg}`);
}
for (const msg of HEAD) if (!has('/bare/', msg)) errors.push(`missing on /bare/: ${msg}`);
if (!/^3 pages crawled/m.test(out)) errors.push('expected 3 pages crawled (unquoted hrefs must be followed)');
if (has('site', 'og:image')) errors.push('og:image reported as not loading');

if (errors.length) { console.log(out); for (const e of errors) console.error(`FAIL ${e}`); process.exit(1); }
console.log(`ok audit reads quoted, unquoted and bare attributes (${findings.length} findings as expected)`);
