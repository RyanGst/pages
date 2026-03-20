# AGENTS.md

Purpose
- This repository is an Astro + Starlight documentation site.
- Content lives under `src/content/docs/` and is deployed to Cloudflare Pages.
- Favor edits that keep the site buildable with `astro build`.

Quick Facts
- Package manager: `pnpm` (see `pnpm-lock.yaml`).
- Framework: Astro with Starlight, deployed via Wrangler.
- TypeScript: strict config via `astro/tsconfigs/strict`.
- Styling: global overrides in `src/styles/custom.css`.

Repository Layout
- `src/content/docs/`: MD/MDX content for guides.
- `src/content/docs/pt-br/`: localized Portuguese content.
- `src/content.config.ts`: content collections + schemas.
- `src/pages/`: Astro routes (small utilities and redirects).
- `src/config.js`: site metadata and social links.
- `astro.config.mjs`: Starlight + Cloudflare config.
- `public/`: static assets, icons, and site manifest.
- `dist/`: build output (do not edit by hand).

Build, Dev, and Deploy Commands
- Install deps: `pnpm install`.
- Start dev server: `pnpm dev` (serves at `localhost:4321`).
- Build production site: `pnpm build`.
- Preview build: `pnpm preview`.
- Astro CLI: `pnpm astro <command>`.
- Deploy (Cloudflare Pages): `pnpm deploy`.

Linting and Tests
- No lint or test scripts are configured in `package.json`.
- There is no test runner in this repo; single-test commands are not applicable.
- If validation is needed, prefer `pnpm astro check` for Astro diagnostics.
- The build step is the main gate (`pnpm build`).

Single-File or Single-Page Checks
- For a content change, run `pnpm build` to validate all routes.
- For local validation, use `pnpm dev` and open the relevant page.
- For schema validation, use `pnpm astro check` if available in your Astro version.

Code Style Guidelines
- Use ES modules (`import`/`export`) everywhere.
- Prefer named exports in shared modules.
- Keep module boundaries small; avoid re-export barrels unless needed.
- Use double quotes for strings (consistent with existing files).
- End statements with semicolons.
- Indentation:
  - `src/` code typically uses 2 spaces.
  - `astro.config.mjs` currently uses 4 spaces; preserve local style.
- Keep line length readable; wrap long objects or arrays.
- Avoid unnecessary comments; add only if logic is non-obvious.

TypeScript and Types
- TypeScript is strict (inherits `astro/tsconfigs/strict`).
- Prefer explicit types at module boundaries or public APIs.
- Use `zod` schemas where the project already does (`src/content.config.ts`).
- Avoid `any`; use unions or `unknown` with narrowing.
- Use optional chaining and nullish coalescing where appropriate.

Astro and Starlight Conventions
- Content collections are defined in `src/content.config.ts`.
- Docs content lives under `src/content/docs/` and is routed by filename.
- Localized content mirrors the same path under `pt-br/`.
- Keep i18n structure aligned between locales.
- Use MDX for richer content (components/JSX) and Markdown for simple docs.
- Keep frontmatter minimal and aligned with Starlight defaults.

Content and Writing Style
- Headings should be in sentence case unless a title is a proper noun.
- Keep paragraphs concise; prefer lists for steps or enumerations.
- Code blocks should specify language fences.
- Avoid trailing whitespace; keep blank lines intentional.
- When editing translations, keep structure and headings aligned with source.

Imports and Module Organization
- Group imports by source:
  - External packages first.
  - Local modules after.
- Keep import lists minimal; avoid unused imports.
- Use relative paths for local modules within `src/`.

Naming Conventions
- Files: kebab-case for content files; preserve existing structure.
- Variables: `camelCase`.
- Constants: `camelCase` or `UPPER_SNAKE_CASE` only for true constants.
- Functions: verbs or verb phrases (e.g., `defineRouteMiddleware`).
- Collections: use descriptive keys (`docs`, `i18n`).

Error Handling
- Favor early returns and clear error messages.
- For async code, prefer `try/catch` with actionable messages.
- Avoid swallowing errors; surface them where possible.
- Keep runtime checks near boundaries (parsing inputs, env, content).

Styling
- Global style overrides live in `src/styles/custom.css`.
- Follow existing CSS variable naming and structure.
- Keep color palettes in CSS variables; avoid hardcoding colors elsewhere.
- Use standard CSS; no CSS-in-JS in this project.

Asset Handling
- Images used in docs should go in `src/assets/`.
- Static public assets go in `public/`.
- Prefer referencing assets with relative paths in MD/MDX.

Deployment Notes
- Cloudflare Pages deploy uses `wrangler` via `pnpm deploy`.
- The site URL is configured in `src/config.js` and `astro.config.mjs`.

Cursor and Copilot Rules
- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` found.
- If these files are added later, incorporate them here.

Working Practices for Agents
- Keep changes scoped to the requested task.
- Avoid editing generated files in `dist/` or `.astro/`.
- Do not add new tooling unless requested.
- If you must introduce a new script, document it in this file.

Verification Checklist
- `pnpm dev` runs after changes (for local spot-checks).
- `pnpm build` completes for production validation.
- Content renders correctly in both locales where applicable.
