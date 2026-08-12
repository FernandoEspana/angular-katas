# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal training rig, not a product. Six timed Angular katas that simulate HackerRank-style technical tests: the user solves a starter component from scratch against a pre-written spec file, under a countdown.

Read `README.md` first — it defines the workflow and the reason every design choice was made.

## Working rules for Claude in this repo

The README states the rule explicitly: **no AI help while the timer runs.** The daily routine is 25 min solo + 25 min review with Claude Code.

- Do not implement a kata's `TODO`s unless the user asks for it directly. If they seem mid-timer, ask before writing code.
- Do not paste or paraphrase anything from `solutions/` unless asked. `npm run solve N` is the user's own mechanism for that.
- The useful contribution is post-kata: reviewing their attempt, explaining a failing spec, comparing their code to `solutions/`.
- **Always respond to the user in Spanish in this repo.** Content (enunciados, comments, test descriptions) is also written in Spanish — keep new content in Spanish.

## Commands

```bash
npm run kata 3        # print ENUNCIADO.md for kata 3 + start countdown (Ctrl+C to abort)
npm run test:one 3    # run only kata 3's specs (ChromeHeadless, no watch)
npm run solve 3       # copy solutions/kata-03/* over src/app/kata-03-*/ starters
npm test              # all specs, watch mode
npm start             # dev server on :4200
npm run build
```

Return to the starter after peeking at a solution: `git checkout -- src/` — the `starters` commit is the baseline.

There is no linter and no formatter configured.

## Architecture

**Legacy-on-purpose Angular 18.** NgModules, not standalone. `*ngFor` / `*ngIf` / `[(ngModel)]`, not `@for` / signals. This mirrors the outdated sandboxes real tests run in — do not modernize.

**One module, one page.** `src/app/app.module.ts` declares every kata component and imports `FormsModule`, `ReactiveFormsModule`, `HttpClientModule` up front. `app.component.ts` renders all six katas stacked on one page via inline template. There is no router.

**Each kata is a directory** `src/app/kata-0N-<slug>/` containing:
- `ENUNCIADO.md` — the requirements, including the exact `data-testid` list. This is the contract.
- starter component(s) with `TODO` markers and stubbed methods that return empty values
- `*.spec.ts` — the grading tests, already written. Never edit them to make code pass.

**`data-testid` attributes are the API.** Specs query `By.css('[data-testid="..."]')` exclusively. Renaming one scores zero even if the app works. Component class/method names are free; testids are not.

**Templates vary by kata.** Katas 1, 2, 3, 6 use `templateUrl` + a `.html` file; katas 4 and 5 use inline `template:` strings. Match whatever the starter uses — `npm run solve` copies files by exact filename.

**`solutions/kata-0N/` mirrors the kata directory.** `scripts/kata.js solve` blindly copies every file in the solutions dir into the src dir by name. Filenames must match exactly, and files not present in solutions (e.g. `user.model.ts` in kata 4) are simply left as-is.

**`scripts/kata.js`** owns the kata registry: number → `{ dir, title, minutes }`. `test:one` filters via `ng test --include=**/<dir>/**`, so the directory name in the map must match the real directory.

Adding a kata means touching all five: the new `src/app/kata-0N-*/` dir, `solutions/kata-0N/`, the `KATAS` map, `app.module.ts` declarations, and `app.component.ts`'s template.

## TypeScript config

`strict: true` plus `strictTemplates`, `strictInjectionParameters`, `strictInputAccessModifiers`. Starters use definite-assignment (`@Input() user!: User`) to satisfy this — expect template type errors to surface at build, not runtime.
