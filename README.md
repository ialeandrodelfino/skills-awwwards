<div align="center">

# /awwwards

**An agent skill that builds award-caliber websites from one line.**

<p>
  <a href="https://code.claude.com/docs/en/skills"><img src="https://img.shields.io/badge/Claude_Code-skill-1b1b19?style=flat-square&logo=claude&logoColor=white" alt="Claude Code skill"></a>
  <a href="https://antigravity.google"><img src="https://img.shields.io/badge/Antigravity-CLI%20%7C%20IDE%20%7C%202.0-1b1b19?style=flat-square" alt="Antigravity supported"></a>
  <a href="https://github.com/openai/codex"><img src="https://img.shields.io/badge/Codex-supported-1b1b19?style=flat-square" alt="Codex supported"></a>
  <a href="https://agentskills.io"><img src="https://img.shields.io/badge/Agent_Skills-compatible-1b1b19?style=flat-square" alt="Agent Skills compatible"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-1b1b19?style=flat-square" alt="MIT license"></a>
  <a href="#requirements"><img src="https://img.shields.io/badge/node-%E2%89%A5%2022.20-1b1b19?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node 22.20 or later"></a>
  <a href="https://github.com/juliobsz/skills/actions/workflows/ci.yml"><img src="https://github.com/juliobsz/skills/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
</p>

<p>
  <a href="#install"><img src="https://img.shields.io/badge/Install-npx_skills_add-d7d7d0?style=for-the-badge&labelColor=1b1b19&logo=npm&logoColor=white" alt="Install with npx skills add"></a>
</p>

[Demo](#demo) · [Install](#install) · [Usage](#usage) · [How it works](#how-it-works) · [Limits](#limits) · [/jury](#jury)

</div>

```
> make me a portfolio, my name is Julio
```

That's the whole brief. The agent works as creative director, designer and creative developer
in one, then hands back a site it has already checked in a real browser.

## Quick start

```bash
npx skills add wheresryan22/anatomy -g   # optional: interactive isometric explainer figures
npx skills add juliobsz/skills -g
```

Open a **new** agent session, then type `/awwwards` or just ask for a website.

The same repo has [/jury](#jury), which scores any site the way an Awwwards jury would: yours,
one /awwwards built, or a competitor's.

## Demo

[![Watch the demo on YouTube](https://img.youtube.com/vi/BEcQoDs16IE/maxresdefault.jpg)](https://youtu.be/BEcQoDs16IE)

Click on the thumbnail to watch the demo on YouTube

## Install

Install with the [skills CLI](https://github.com/vercel-labs/skills). It runs through `npx`, so
there's nothing to install first, and it detects your agents (Claude Code, Codex, Cursor,
Gemini CLI, OpenCode, Copilot and more) and lets you pick.

```bash
npx skills add juliobsz/skills -g
```

| Command | Result |
|---|---|
| `npx skills add juliobsz/skills -g -a claude-code` | Claude Code only (use `codex`, `cursor`… for others) |
| `npx skills add juliobsz/skills` | This project only, instead of your user folder |
| `npx skills add juliobsz/skills -g --skill jury` | One skill only (`awwwards` or `jury`) |
| `npx skills add juliobsz/skills -g --copy` | Copy the files instead of linking them |
| `npx skills update -g` | Update to the latest version |
| `npx skills remove awwwards jury -g` | Uninstall |

The CLI collects anonymous usage data. Set `DISABLE_TELEMETRY=1` or `DO_NOT_TRACK=1` to turn
it off.

<details>
<summary>Claude Code plugin</summary>

If you prefer Claude Code's plugin system, which updates the skill for you:

```
/plugin install awwwards --marketplace juliobsz/skills
/plugin install jury --marketplace juliobsz/skills
```

On Claude Code before 2.1.275, run `/plugin marketplace add juliobsz/skills` and then
`/plugin install awwwards@juliobsz` (or `jury@juliobsz`). The skills then run as
`/awwwards:awwwards` and `/jury:jury`. Use the plugin or the skills CLI, not both, or each
skill shows up twice.
</details>

<details>
<summary>Google Antigravity (CLI, IDE & 2.0)</summary>

For Google Antigravity across all surfaces (CLI `agy`, Antigravity IDE, Antigravity 2.0):

- **Workspace**: If working inside this repository, `.agents/skills.json` automatically registers `awwwards` and `jury`. In your own project, copy them into your `.agents/skills/` directory:
  ```bash
  mkdir -p .agents/skills
  cp -r <path-to-repo>/awwwards <path-to-repo>/jury .agents/skills/
  ```
- **Global**: Copy or link the folders to your global Antigravity skills directory:
  ```bash
  mkdir -p ~/.gemini/config/skills
  cp -r awwwards jury ~/.gemini/config/skills/
  ```

Start `agy`, open Antigravity IDE, or launch Antigravity 2.0 Desktop and trigger the skills via `/awwwards` or `/jury`.
</details>

<details>
<summary>Manual install</summary>

Copy the `awwwards/` folder (and `jury/`, if you want it) into your agent's skills directory,
for example `~/.claude/skills/awwwards`, `~/.gemini/config/skills/awwwards` or
`.agents/skills/awwwards`. Any agent that reads `SKILL.md` skills can use them. Each folder
works on its own.
</details>

### Works with /anatomy

[/anatomy](https://github.com/wheresryan22/anatomy) by wheresryan22 is an open-source skill
for detailed, interactive isometric figures that explain an idea as a real physical object.
Install it next to `/awwwards` and the site can get one "how it works" section built as a real
explainer figure, styled to the site's palette and grid.

```bash
npx skills add wheresryan22/anatomy -g
```

It's optional. Without it, `/awwwards` builds that section another way, and tells you at the
end when a figure would have helped.

### Requirements

- **Node 22.20+** for the skills CLI. The helper scripts need Node 20+.
- **Playwright** in the site's project for screenshots and the OG image, and **axe-core** for
  the accessibility pass. `/awwwards` installs both as dev dependencies when it needs them.
  `/jury` leaves the project it reviews alone and installs them once into `~/.cache/jury`.
  Both use a Chromium you already have when they can.
- **A model that can read images**, so the QA loop can look at its own screenshots.
- **A Vercel, Netlify or Cloudflare account** only if you want it to deploy.

<details>
<summary>Troubleshooting</summary>

- **`/awwwards` or `/jury` isn't found.** Start a new session; agents read their skills folder
  at startup. Then run `npx skills list -g` to see where it was installed.
- **It shows up twice.** You installed it two ways (for example the skills CLI and the plugin).
  Remove one with `npx skills remove awwwards -g` or `/plugin uninstall awwwards@juliobsz`.
- **Installed into the wrong agent.** Name the target with `-a`, for example `-a codex`.
- **Screenshots fail with "Playwright not found".** Run `npm i -D playwright` in the site's
  project. If it reports no Chromium, run `npx playwright install chromium` once.
</details>

## Why

Ask an agent for "a portfolio" and you get the same site everyone gets: purple gradient, three
cards, "elevate your brand". This skill replaces that default with a process.

- **A concept that belongs to you.** Three ideas from different territories (your name, your
  craft, your place), scored on originality and fit.
- **A real design system.** Palette by role, curated free fonts, grid and motion language,
  written to `DESIGN.md` and tested against a "genericness check".
- **Motion with intent.** GSAP, Lenis and WebGL (OGL) where they earn their place, with one
  signature moment and everything else quiet.
- **Real copy.** No lorem ipsum, fake awards or invented metrics. Anything made up is marked
  as a placeholder and listed at the end.
- **Verified, not assumed.** A production build, a crawling audit and real-browser screenshots
  on desktop, mobile and reduced motion, scored against a rubric until every category hits 8/10.

Its quality bar is the work that wins [Awwwards](https://www.awwwards.com) Site of the Day. The
site doesn't need to be submitted anywhere; it just has to be that good.

## Usage

Ask in one line and let the agent decide. It writes its assumptions down instead of running a
questionnaire.

```
make me a portfolio, my name is Ana
a site for my architecture studio in Lisbon, we do small houses
launch page for a mechanical keyboard called Kestrel, it should feel insane
redesign this landing page so it could win site of the day
```

Better input gives a better site. Your real name, what you do, where you are and two or three
real projects let the concept come from your story instead of a placeholder.

## How it works

| Phase | What happens |
|---|---|
| **Brief** | Infers who it's for, the audience and the site's job. Missing facts become written assumptions |
| **Concept** | Three concepts from different territories (your name, your craft's materials, your place, how you work, a formal system), scored on originality and fit. The winner becomes a one-line idea with a signature moment |
| **Art direction** | Palette by role, type pairing from a curated free-font library, grid, rhythm and motion language, all written to `DESIGN.md`. Then a "genericness test" kills anything an average model would have produced |
| **Build** | Semantic HTML that looks finished with motion off. Then reveals, page transitions, a loader that tracks real loading, and the signature moment |
| **QA loop** | Production build, a crawling audit (SEO, metadata, accessibility, weight, placeholder copy, AI-copy tells) and real-browser screenshots on desktop, mobile, reduced motion and mid-transition. It also measures LCP and CLS on a throttled phone, runs axe and tabs through every page. The agent reads every frame, a fresh critic subagent that never saw the plan scores the site against the rubric, and the agent fixes things until every category hits 8/10 |
| **Ship** | OG image, favicon, sitemap, robots, then deploy to Vercel, Netlify or Cloudflare (only after you confirm) |

### Stack

- **Next.js** (App Router) by default, and for anything with app features.
- **Astro** for content-only showcases where motion is the product: about 75 KB of JS against
  about 250 KB.
- **Your stack** when you run it inside an existing project.

All three use [GSAP](https://gsap.com) (every plugin is free now), [Lenis](https://lenis.dev)
for smooth scroll and [OGL](https://github.com/oframe/ogl) for WebGL. The motion engine is
framework-agnostic TypeScript, shipped as documented code instead of a template: it runs on
one clock, reverts every effect on navigation, runs transitions in parallel with the next page
loading, and keeps content visible without JavaScript or with reduced motion.

### Principles it won't break

- One idea, one signature moment, everything else quiet.
- Every frame works as a still poster before any motion is added.
- The native cursor stays. Reduced motion gets a complete, calm site. Phones get a composed
  layout, not a shrunken one.
- No fake awards, logos or metrics. No lorem ipsum. No em dashes or "elevate your brand" copy.
- No purple gradients, glassmorphism or three-card grids unless the concept truly calls for
  them.

## Limits

- **It takes a while.** A full run is concept, design system, build and several rounds of
  screenshots and fixes. Expect a long session and heavy token use, not a quick snippet.
- **Results depend on the model.** It was built and tested with Claude Code, Antigravity and Codex. The
  concept and the visual QA are only as good as the model doing them.
- **Content is yours to finish.** Without real projects, photos and copy, the site ships with
  clearly marked placeholders that you replace.
- **8/10 is its own score.** The rubric keeps it honest, but you're the final judge.

## /jury

Scores any website the way an Awwwards jury would. It doesn't have to be a site /awwwards built.

```
/jury https://your-site.com
/jury score this project
/jury https://mine.com vs https://theirs.com
```

It shoots one page of every type on desktop, on a throttled phone, with reduced motion and
from the keyboard. It measures LCP, CLS, FPS, axe and hover feedback, and audits SEO and
metadata. Then a fresh critic that never sees the code, the design notes or your pitch scores
Design, Usability, Creativity and Content, plus the six developer areas. Every number cites a
screenshot or a measurement, and the fixes come ranked by how much score they'd gain.

You get `.jury/<host>/scorecard.md`, next to every screenshot and report behind it. Given a
local project, it builds and scores the production output, never the dev server. Re-scoring
after fixes uses a new critic, so it never anchors on the old numbers.

**Checked against real juries.** Run blind on two October 2026 Sites of the Day, the critic
scored 6.15 and 6.10 where the jury gave 7.28 and 7.24: stricter, by a steady 1.1. So the card
shows the critic's score and a jury estimate, and the band comes from the estimate. The critic
is hardest on what juries rarely check (accessibility, SEO, performance on a throttled phone),
which is why its fix list catches things a jury lets slide.

/awwwards runs the same rubric, scripts and blind critic in its own QA loop, so a site it built
and a site you built are judged the same way.

- **It's an estimate.** /jury isn't affiliated with Awwwards. The criteria and weights are
  theirs, and public. The jury estimate rests on two sites, both winners; how it holds for
  weaker sites isn't measured yet.
- **It judges stills and measurements.** How motion feels, and sound, stay out of the score.
- **It needs a page it can reach.** Anything behind a login can't be scored; give it a local
  build instead.

## Standalone scripts

The helpers work on any site, so you can use them on their own. The QA scripts live in
`jury/scripts/`, and /awwwards carries a copy:

```bash
# Path depends on your agent (e.g. ~/.gemini/config/skills/ or ~/.claude/skills/)
node <skill-path>/jury/scripts/audit.mjs https://your-site.com/
node <skill-path>/jury/scripts/shoot.mjs https://your-site.com/ --crawl --nav
```

| Script | In | Does |
|---|---|---|
| `audit.mjs` | jury, awwwards | Crawl a build: SEO, a11y, weight, placeholders, AI-copy tells |
| `shoot.mjs` | jury, awwwards | Screenshots of every page type: LCP/CLS on a throttled phone, FPS, overflow, tap targets, axe, keyboard focus, rest/hover pairs per pointer target, idle motion, transitions (needs Playwright; axe-core optional) |
| `serve.mjs` | jury, awwwards | Static server for build output |
| `og.mjs` | awwwards | Render the OG image from the live hero (needs Playwright) |
| `font.mjs` | awwwards | Self-host Fontshare / Google fonts (CSS or `next/font` output) |
| `photos.mjs` | awwwards | Contact sheets of free photos for marked placeholders |

<details>
<summary>Repository layout</summary>

```
awwwards/
  SKILL.md            the workflow and the hard rules
  references/
    quality-bar.md    scoring weights, rubric, critic brief  (copied from jury/)
    concepts.md       finding an idea that can't be moved to someone else
    art-direction.md  patterns from recent winners, archetypes, AI defaults to avoid
    typography.md     curated free fonts with sources, scales, setting display type
    layout.md         grids, section families, heroes, mobile composition
    motion.md         choreography and recipes (loader handoff, iris, shared element, index preview…)
    webgl.md          DOM-synced image planes, fullscreen shaders, performance rules  (generated)
    patterns.md       proven structures from test builds (driver module, sticky stage…)
    content.md        voice, honest placeholders, case-study structure
    quality.md        accessibility, performance budgets, bugs found in real builds
    engine.md         framework-agnostic motion engine          (generated)
    nextjs.md         Next.js adapter, layout, metadata, fonts  (generated)
    astro.md          Astro adapter and layout                  (generated)
    ship.md           final checks and deploy
  scripts/            Node helpers; shoot, audit, browser and serve are copied from jury/
jury/
  SKILL.md            the review workflow: target, evidence, blind critic, score card
  references/
    quality-bar.md    scoring weights, rubric, critic brief
    calibration.md    the critic against real juries, for the score card (never shown to the critic)
  scripts/            shoot, audit, browser, serve: no dependencies except Playwright (and axe-core)
tests/
  nexttest/           Next.js app the generated references are copied from
  astrotest/          Astro app, same engine
  _gen/               templates and build.py that write the generated references and copies
  smoke.mjs           browser smoke test run against both fixtures in CI
.claude-plugin/       Claude Code plugin marketplace
.github/              CI workflow, issue and PR templates
```
</details>

## Security

A skill is instructions your agent follows, and these have it run builds and scripts on your
machine. Read each `SKILL.md` before installing, as you would any code you run. Nothing is
deployed without your confirmation.

## Contributing

Issues and pull requests are welcome, especially for bugs found in real builds and new
patterns in `awwwards/references/`.

1. Fork the repo and create a branch.
2. Make the change. A skill is a folder with a `SKILL.md`; the skills CLI finds any top-level
   folder that has one. For the Claude Code plugin, also add an entry to
   `.claude-plugin/marketplace.json`. Engine and stack code lives in `tests/nexttest` and
   `tests/astrotest`, not in the markdown: edit it there and run `python tests/_gen/build.py`
   (see `tests/README.md`). The QA scripts and the rubric live in `jury/`, and the same command
   copies them into `awwwards/`, so edit them in `jury/`.
3. Test it: `npx skills add . -g -a claude-code`, then run the skill in an agent.
4. Open a pull request. The template asks what changed and what you built to check it; CI
   checks script syntax, `SKILL.md` frontmatter, the plugin marketplace and that the skills
   CLI finds every skill, on Linux, macOS and Windows. It also builds and smoke-tests both fixture
   apps and fails if the generated references or copies are out of date.

## Support

Found a bug or have an idea? [Open an issue](https://github.com/juliobsz/skills/issues/new/choose).

## License

[MIT](LICENSE) © juliobsz
