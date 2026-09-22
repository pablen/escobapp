# Repository Guidelines

## Project Structure & Module Organization

Escobapp is a React 16 + TypeScript educational card game. Application code lives in `src/`: top-level files such as `Game.tsx`, `store.ts`, `config.ts`, and `utils.ts` hold game state and shared logic, while reusable UI components and their CSS Modules are in `src/components/`. Unit tests are colocated with implementation files and use the `*.test.ts`/`*.test.tsx` naming pattern. Cypress end-to-end tests are in `cypress/integration/`, with shared commands and setup in `cypress/support/`. Static assets and the web app shell are in `public/`; planning material belongs in `docs/`.

## Build, Test, and Development Commands

Use Node.js 16.20.2 (`nvm use`) and install the locked dependency tree with `npm ci`.

- `npm start` runs the development server at `http://localhost:3000`.
- `npm run build` creates the production bundle in `build/`.
- `npm test` runs Jest/React Testing Library tests in watch mode; use `npm test -- --watchAll=false` for a one-shot run.
- `npm run test:e2e` starts the app and runs Cypress headlessly.
- `npm run cypress` opens Cypress interactively; start the app separately first.

## Coding Style & Naming Conventions

Use two-space indentation, TypeScript strictness, single quotes, and no semicolons, as enforced by `.prettierrc.json`. Use PascalCase for React components, camelCase for functions and variables, and keep component styles in matching `*.module.css` files. Run ESLint with `npx eslint src cypress --max-warnings=0` when validating changes. Pre-commit hooks run lint-staged formatting and lint checks for changed files.

## Testing Guidelines

Add unit tests next to the code they cover, using React Testing Library for rendered behavior and Jest assertions for utilities/state. Add user-flow coverage to `cypress/integration/` when behavior crosses routes or browser interactions. Keep tests deterministic and run both `npm test -- --watchAll=false` and `npm run test:e2e` before submitting changes.

## Commit & Pull Request Guidelines

Use concise Conventional Commit-style subjects, such as `feat(fracciones): add implementation plan`, `test: strengthen e2e coverage`, or `chore: update package-lock.json`. Pull requests should explain the user-visible or technical change, link the relevant issue or plan when applicable, and include screenshots or recordings for UI changes. Confirm build, unit tests, and end-to-end tests pass before requesting review.

## Configuration and Security

Do not commit secrets or generated dependency/build artifacts. Keep dependency changes synchronized with `package-lock.json`, and document user-facing configuration or game-rule changes in `README.md` or `docs/` when appropriate.
