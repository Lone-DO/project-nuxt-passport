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

## Utilities

### Eslint

`eslint`, `eslint-plugin-format`, `@antfu/eslint-config`, `@nuxt/eslint`

### Husky

Git Hooks for validating code before allowing user to commit/push changes to server

### lint-staged

Hook to validate **only modified files** for linting problems

### ZOD

Schema Validation, currently used for validating `.env` keys before allowing application to initialize.
