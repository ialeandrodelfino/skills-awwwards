# Tests

The code in `awwwards/references/{engine,astro,nextjs,webgl}.md` is not written by hand. It is
copied out of two small apps that build and run:

- `nexttest/`: Next.js fixture. Source of `engine.md`, `nextjs.md` and `webgl.md`.
- `astrotest/`: Astro fixture. Source of `astro.md`. Its `src/engine/` must stay identical to
  `nexttest/src/engine/`.
- `_gen/`: the prose templates (`*.tpl.md`, `engine_head.md`) and `build.py`, which fills them.
  `{{file:app/path}}` (on its own line) inserts a fixture file; `{{major:app/package}}` inserts
  the major version from that fixture's `package.json`, so "built under Next 16" stays true.
- `smoke.mjs`: loads a running fixture in Chromium and checks the loader finishes, the GL canvas
  mounts, a page transition into a project and the back button work, and a missing URL returns
  404, with no console or page errors.
- `audit/`: a tiny static site and `check.mjs`, which runs `jury/scripts/audit.mjs` on it. The
  pages carry the same metadata minified (unquoted attributes), quoted, and missing, so the audit
  must pass the first two and still flag the third: `node tests/audit/check.mjs`.

To change engine or stack code, edit the fixture, check it still builds, then regenerate:

```bash
cd tests/nexttest && npm ci && npm run build
cd ../astrotest && npm ci && npm run build && npx astro check
cd ../.. && python tests/_gen/build.py
```

To run the smoke test, serve a built fixture and point `smoke.mjs` at it from inside the fixture
folder (Playwright resolves from there):

```bash
cd tests/nexttest && npx next start -p 4400 &
node ../smoke.mjs http://127.0.0.1:4400
cd ../astrotest && node ../../awwwards/scripts/serve.mjs dist --port 4401 &
node ../smoke.mjs http://127.0.0.1:4401
```

`build.py` fails instead of writing a wrong reference when the engine (TS or CSS) differs between
the fixtures, a placeholder is left unfilled, or one of its text substitutions no longer matches.

`build.py` also copies files that a smaller skill owns into `awwwards/`, so /awwwards still works
when it is installed alone. The list is `COPIES` in `build.py`: today `jury/scripts/{shoot,audit,
browser,serve}.mjs` and `jury/references/quality-bar.md`. Edit the file in `jury/`, then run
`build.py`; each copy starts with a line saying where it came from.

CI runs `build.py --check`, then builds, lints or type-checks, and smoke-tests both fixtures on
every push. Every Monday it repeats the build and smoke test against the latest framework and
library releases, which is what a fresh scaffold installs, and opens an issue if that fails.
