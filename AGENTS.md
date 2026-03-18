# Repository Guidelines

## Project Structure & Module Organization
This project is a small Next.js App Router app. Core UI files live in `app/`: `layout.js` defines the root shell, `page.js` contains the homepage logic, and `globals.css` holds global Tailwind-backed styles. Static assets belong in `public/` and are referenced by absolute web paths such as `/background-pattern.svg`. Project configuration is kept at the root in files like `next.config.mjs`, `tailwind.config.js`, `postcss.config.mjs`, and `jsconfig.json`.

## Build, Test, and Development Commands
- `npm install`: install dependencies and refresh `package-lock.json`.
- `npm run dev`: start the local development server with hot reload.
- `npm run build`: create a production build and catch build-time issues.
- `npm run start`: serve the production build locally after `npm run build`.
- `npm run lint`: run Next.js/ESLint checks for JavaScript and React code.

Run commands from the repository root.

## Coding Style & Naming Conventions
Use JavaScript with 2-space indentation and semicolons, matching the existing codebase. Prefer functional React components and keep page-specific logic close to the route in `app/`. Use `camelCase` for variables and functions, `PascalCase` for React component names, and clear descriptive names for state such as `foodInput` or `descriptionInput`. Use the `@/*` path alias from `jsconfig.json` when imports would otherwise become noisy.

Tailwind utility classes are the primary styling method. Put global theme or element-level styles in `app/globals.css`; keep one-off visual decisions in component markup.

## Testing Guidelines
There is currently no test framework configured. Until one is added, every change should be verified with `npm run lint` and a manual check in `npm run dev`. If you introduce tests, place them near the feature or under a top-level `__tests__/` directory and use names ending in `.test.js`.

## Commit & Pull Request Guidelines
Recent commits use short, imperative subjects such as `Add homepage background image`. Follow that pattern and keep each commit focused on one change. Pull requests should include a concise summary, note any user-visible behavior changes, link related issues when applicable, and attach screenshots for UI changes.

## Configuration Tips
Keep secrets out of the repository. Use local environment files such as `.env.local` for future API keys, and document any new required variables in `Readme.md`.
