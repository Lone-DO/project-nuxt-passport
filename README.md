# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

# Dependencies

## Pending Migration

- `better-auth@1.2.x`
  - v1.3.x relies on zod@4, which currently is not compatible with current dependencies
- `zod@3.x.x`
  - v4 clashes with current schema verifications

## Nuxt Plugins

### @nuxt/icon

Extensive Icon Library, referenced via `<Icon name='host:iconName'`

### @nuxtjs/color-mode

Used for Toggling Page Theme automatically based on toggle state. Modifies root `HTML` attribute `data-theme`

## Tailwind/UI Libraries

### tailwind

`@tailwindcss`, `@tailwindcss/vite` are used for registering Tailwind with vscode intellisense and vite compiler.

```
  // .vscode/settings.json for tailwindcss extension
  "tailwindCSS.experimental.configFile": "./app/assets/css/main.css",
```

### daisyui

Tailwind UI Theme based library (Class based dumb components)

## MabLibre

- `maplibre-gl`: Core Module
- `nuxt-maplibre`: Adds autocomplete
- `@indoorequal/vue-maplibre-gl`: Vue Wrapper

## Utilities

### Eslint

`eslint`, `eslint-plugin-format`, `@antfu/eslint-config`, `@nuxt/eslint`

### Husky

Git Hooks for validating code before allowing user to commit/push changes to server

### lint-staged

Hook to validate **only modified files** for linting problems

### ZOD

Schema Validation, currently used for validating `.env` keys before allowing application to initialize.

### Drizzle

#### Requirements

Dev must have a local Turso DB running locally while in `development`

- https://docs.turso.tech/cli/installation

For Windows Users you'll need to have WSL installed, and Virtualization enabled in your BIOS.

1. Launch Ubuntu
2. Run `turso dev --db-file local.db`
3. In your Terminal (VsCode, Bash, Ect.) Run `drizzle-kit studio` to open Drizzle studio and directly interact with local database at `https://local.drizzle.studio/`

- https://learn.microsoft.com/en-us/windows/wsl/
- https://orm.drizzle.team/docs/drizzle-kit-studio
