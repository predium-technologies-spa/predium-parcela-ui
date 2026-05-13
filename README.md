# @predium-technologies-spa/predium-ui

Design system and component library for the Predium property management platform. Built with Vue 3, TypeScript, Tailwind CSS v4, and Storybook.

## Quick Start

```bash
pnpm install
pnpm dev:storybook   # Storybook at http://localhost:6006
pnpm build:ui        # Build the UI library
pnpm test            # Run unit tests
```

## Workspace Structure

```
predium-parcela-ui/
├── packages/ui/               # Component library (published package)
│   ├── src/
│   │   ├── atoms/             # Primitive components (Button, Input, Badge...)
│   │   ├── molecules/         # Composite components (Card, FormField, Combobox...)
│   │   ├── organisms/         # Complex components (DataTable, Sidebar, Modal...)
│   │   ├── chat/              # Chat-specific components (ChatBubbleAI, ChatPanel...)
│   │   ├── composables/       # Shared composables (useReducedMotion, vAutoAnimate)
│   │   └── styles/            # Design tokens and global CSS
│   └── dist/                  # Build output
├── apps/storybook/            # Storybook documentation app
│   ├── stories/               # Component stories organized by atomic level
│   └── .storybook/            # Storybook configuration
├── 1-design-tokens.md         # Color, typography, spacing, radii reference
└── 2-components-catalog.md    # Component catalog and status
```

## Architecture

Components follow the **Atomic Design** methodology:

| Level | Description | Examples |
|---|---|---|
| **Atoms** | Primitive UI elements | `PButton`, `PInput`, `PBadge`, `PIcon`, `PCheckbox` |
| **Molecules** | Groups of atoms working together | `PCard`, `PFormField`, `PCombobox`, `PKpiCard` |
| **Organisms** | Complex UI sections | `PDataTable`, `PSidebar`, `PModal`, `PToolbar` |
| **Chat** | AI chat interface components | `PChatBubbleAI`, `PChatPanel`, `PChatInput` |

All components are prefixed with `P` and exported from `@predium-technologies-spa/predium-ui`.

## Using the Library

### Installation

Add to your project's `package.json`:

```json
{
  "dependencies": {
    "@predium-technologies-spa/predium-ui": "^2.3.1"
  }
}
```

Configure `.npmrc` for GitHub Packages authentication:

```
@predium-technologies-spa:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

### Import Components

```vue
<script setup lang="ts">
import { PButton, PFormField, PInput, PModal } from '@predium-technologies-spa/predium-ui'
import type { ButtonProps, ModalProps } from '@predium-technologies-spa/predium-ui'
</script>
```

### Import Styles

Include the design tokens and global styles in your app entry point:

```ts
import '@predium-technologies-spa/predium-ui/style.css'
// or individual files:
import '@predium-technologies-spa/predium-ui/styles/tokens.css'
import '@predium-technologies-spa/predium-ui/styles/global.css'
```

## Design Tokens

The design system uses a warm, minimal palette with OKLCH-derived colors. See `1-design-tokens.md` for the full reference.

### Colors

| Category | Tokens |
|---|---|
| Surfaces | `bg` (#FAFAF7), `surface` (#FFFFFF), `chipBg` (#F3F1EB) |
| Ink | `ink` (#17140F), `ink2` (#3A3631), `ink3` (#6E6A63), `ink4` (#9C978F) |
| Lines | `line` (#E8E5DE), `lineSoft` (#F0EDE6) |
| Status | `good`/`goodBg`, `warn`/`warnBg`, `danger`/`dangerBg`, `info`/`infoBg` |

### Typography

- **Sans**: Inter, -apple-system, "Segoe UI", sans-serif
- **Mono**: IBM Plex Mono, ui-monospace, SFMono-Regular, Menlo
- **Sizes**: xs(10), sm(11), base(12), md(13), lg(15), xl(18), 2xl(22), 3xl(24)

### Spacing & Radii

- **Spacing**: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28 (px)
- **Radii**: sm(3), md(4), lg(5), xl(6), 2xl(8) (px)

## Storybook

Storybook is the primary way to browse, develop, and document components.

### Running Storybook

```bash
pnpm dev:storybook
```

Opens at `http://localhost:6006`.

### Features

- **Theme toggle**: Switch between light/dark mode via the toolbar
- **Viewport presets**: Mobile (375px), Mobile Large (428px), Tablet (768px), Desktop (1280px)
- **Addon Essentials**: Controls, Actions, Viewport, Backgrounds, Docs

### Writing Stories

Stories live in `apps/storybook/stories/` organized by atomic level:

```
stories/
├── atoms/         # Button.stories.ts, Input.stories.ts, ...
├── molecules/     # Card.stories.ts, FormField.stories.ts, ...
├── organisms/     # DataTable.stories.ts, Sidebar.stories.ts, ...
├── chat/          # ChatBubbleAI.stories.ts, ChatPanel.stories.ts, ...
└── templates/     # Dashboard.stories.ts, ListPage.stories.ts, ...
```

Example story:

```ts
import type { Meta, StoryObj } from '@storybook/vue3'
import { PButton } from '@predium-technologies-spa/predium-ui'

const meta: Meta<typeof PButton> = {
  component: PButton,
  argTypes: {
    variant: { control: 'select', options: ['primary', 'ghost', 'subtle', 'danger'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
}
export default meta

type Story = StoryObj<typeof PButton>

export const Primary: Story = {
  args: { variant: 'primary', size: 'md', default: 'Click me' },
}
```

### Building Storybook for Static Deploy

```bash
pnpm build:storybook
```

Output goes to `apps/storybook/storybook-static/`.

## Adding a New Component

1. Create the component in the appropriate atomic folder under `packages/ui/src/`
2. Export it from the folder's `index.ts`
3. Add the export to `packages/ui/src/index.ts` (barrel file)
4. Write a `.stories.ts` file in `apps/storybook/stories/<level>/`
5. Write unit tests in a `__tests__/` directory alongside the component
6. Run `pnpm test` and `pnpm build:ui` to verify

## Releasing a New Version

The package is published to **GitHub Packages** (`npm.pkg.github.com`). Releases are triggered by pushing a version tag.

### Step-by-Step Release Process

1. **Bump the version** in `packages/ui/package.json`:

   ```json
   {
     "name": "@predium-technologies-spa/predium-ui",
     "version": "2.3.1"  // <-- update this
   }
   ```

   Follow [semantic versioning](https://semver.org/):
   - **MAJOR**: Breaking changes
   - **MINOR**: New features (backward compatible)
   - **PATCH**: Bug fixes only

2. **Commit and push to `develop`**:

   ```bash
   git add packages/ui/package.json
   git commit -m "chore: bump version to X.Y.Z"
   git push origin develop
   ```

3. **Merge `develop` into `main`** and push:

   ```bash
   git checkout main
   git merge develop
   git push origin main
   ```

4. **Create and push a git tag** matching the version:

   ```bash
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```

   The tag **must** start with `v` (e.g., `v2.4.0`). This triggers the GitHub Actions workflow in `.github/workflows/publish.yml`.

5. **Verify the publish**: Check the [Actions tab](https://github.com/eddwinpaz/predium-parcela-ui/actions) for the "Publish @predium-technologies-spa/predium-ui" workflow. Once complete, the new version is available on GitHub Packages.

### Consuming the New Version

In the consuming project (e.g., `predium-vue-agent-frontend`), update the dependency:

```bash
pnpm add @predium-technologies-spa/predium-ui@^X.Y.Z
```

## Commands Reference

| Command | Description |
|---|---|
| `pnpm install` | Install all workspace dependencies |
| `pnpm dev:storybook` | Start Storybook dev server (port 6006) |
| `pnpm build:storybook` | Build Storybook as static site |
| `pnpm build:ui` | Build the UI library to `dist/` |
| `pnpm test` | Run unit tests (vitest) |

## Tech Stack

- **Vue 3.5+** with Composition API
- **TypeScript 5.7+**
- **Tailwind CSS v4** with Vite plugin
- **Storybook 8.6** (vue3-vite framework)
- **Vitest** for unit testing
- **Vite 6** for bundling with `vite-plugin-dts` for type declarations
- **Headless UI Vue** for accessible primitives
- **Lucide Vue Next** for icons
- **TanStack Vue Table** for data tables
- **Unovis** for charts
- **Motion** for animations

## Requirements

- Node.js >= 20
- pnpm >= 9
