# AGENTS.md

Guidance for AI coding agents working on **ja-contextmenu** — a vanilla JS / TypeScript
right-click context menu library (no framework, ESM only).

## Project Overview

- **Package name:** `ja-contextmenu`
- **Language:** TypeScript (compiled to ESM and CJS)
- **Runtime:** Browser only. Default `z-index` is `5000`.
- **No runtime dependencies** — everything is hand-written DOM code. Do not add runtime
  dependencies unless explicitly asked.
- **Entry point:** `src/index.ts`
  - default export: `ContextMenu`
  - named exports: `Panel`, `h`

### Source layout

| Path | Purpose |
| --- | --- |
| `src/index.ts` | Public entry / re-exports |
| `src/ContextMenu.ts` | Factory that creates menus and manages global listeners |
| `src/Menu.ts` | A single menu instance (build, position, show/hide) |
| `src/MenuItem.ts` | A single menu item (label, icon, tip, submenu) |
| `src/Panel.ts` | Base panel element wrapper (DOM + position calc) |
| `src/style.ts` | Injected CSS string (inserted via a `<style>` tag) |
| `src/config.ts` | Namespaced class names / ids and default dimensions |
| `src/utils/h.ts` | Tiny hyperscript-like element helper |
| `src/utils/utils.ts` | Misc helpers (`injectCss`, window size, etc.) |
| `src/types/*.ts` | Public option interfaces (`ContextMenuOption`, `MenuOption`, `MenuItemOption`, `common`) |
| `styles/*.css` | Optional themes (`dark.css`, `edge.css`) shipped to consumers |
| `test/*.test.js` + `test/typescriptTest.ts` | Vitest tests (happy-dom environment) |

## Commands

```bash
npm run dev        # Vite dev server (demo: test/demo.js via index.html)
npm run bd         # Build library with rollup -> lib/
npm test           # Vitest in watch mode
npm run coverage   # Vitest single run + v8 coverage
npm run lint       # ESLint over ./src
```

- Build output goes to `lib/` and is **committed** to the repo (it is published to npm).
  After changing `src/`, run `npm run bd` and include the regenerated `lib/` files.
- Prefer running `npm test` (or `npm run coverage`) and `npm run lint` before finishing.

## Code Conventions

- **Formatting / lint:** ESLint is configured via `.eslintrc.cjs` with `eslint-plugin-prettier`.
  Match the existing style: 2-space indent, single quotes, semicolons, trailing commas.
  Do not reformat unrelated code.
- **Types:** `tsconfig.json` has `strict: true` and `noImplicitAny: true`. Keep it strict —
  no `any` unless there is a clear reason (the codebase uses `any` only in a few generic
  storage spots like `Menu<any>[]`).
- **Imports:** relative paths within `src/` (e.g. `import Menu from './Menu'`). A `@/*`
  path alias maps to `./src/*` but is not widely used — prefer relative imports.
- **DOM helper:** use `h()` from `src/utils/h.ts` to create elements rather than raw
  `document.createElement` where practical.
- **Class names:** never hard-code `ja-panel` / `ja-contextmenu` strings — reference
  `src/config.ts` (`config.panelClass`, `config.wrapperClass`, etc.).
- **CSS:** base styles live as a string in `src/style.ts` and are injected by JS. Themes
  are separate files under `styles/`. Keep the `ja-` namespace prefix.
- **Comments:** the codebase uses JSDoc-style `/** ... */` comments on public methods
  and non-obvious logic. Add them for new public APIs.

## Testing

- Tests live in `test/` and run with **Vitest** using the **happy-dom** environment
  (configured in `vite.config.ts`). Add `// @vitest-environment happy-dom` where needed.
- There is no browser: `window`/`document` come from happy-dom. Some tests stub
  `document.documentElement.clientWidth/clientHeight` — follow that pattern when testing
  positioning logic.
- Add a focused test in `test/menu.test.js` for every behavior change. `test/typescriptTest.ts`
  exists to type-check the public API — keep it compiling.

## Change Workflow

1. Update `src/` (and types under `src/types/` if the public API changes).
2. Add / update tests in `test/`.
3. Run `npm run lint`, `npm run coverage`, then `npm run bd`.
4. Update docs:
   - `CHANGELOG.md` — add a version section following the existing format
     (`## vX.Y.Z` then `* fix: ...` / `* feature: ...` bullets).
   - `README.md` and `README.zh.md` — keep both in sync (the project is bilingual).
   - `TODO` — the flat, unchecked list of pending items.

## Versioning Notes

- Version lives in `package.json` (`version`). Bump it manually in the same commit as the
  release changes.
- Be careful with breaking changes: the README warns that minor versions may change usage
  patterns. Mark breaking changes explicitly with `break:` in the CHANGELOG.

## Do Not

- Do not add frameworks, bundlers, or runtime dependencies.
- Do not edit files in `lib/` by hand — they are build artifacts; regenerate with `npm run bd`.
- Do not uncomment the `test/test.ts` include in `tsconfig.json` (it changes the emitted
  declaration path for `lib/`).
- Do not reformat or "clean up" files unrelated to your change.