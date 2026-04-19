# Parcela Design System — Phase 1: Foundations

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up the monorepo skeleton, design tokens, global styles, and Storybook so that Phase 2 (Atoms) can start building components immediately.

**Architecture:** pnpm workspace monorepo with two packages — `packages/ui` (component library built with Vite) and `apps/storybook` (Storybook 8 using `@storybook/vue3-vite`). TailwindCSS v4 uses the CSS-first `@theme` directive (no `tailwind.config.js`). All design tokens live in `packages/ui/src/styles/tokens.css` and are consumed both by Tailwind utilities and raw CSS custom properties.

**Tech Stack:** Vue 3, TypeScript (strict), TailwindCSS v4, Storybook 8, Vitest, pnpm workspaces, lucide-vue-next

---

## File Structure

```
predium-ds-ui/
├── package.json                          # workspace root — scripts: storybook, build, test
├── pnpm-workspace.yaml                   # declares packages/* and apps/*
├── tsconfig.json                         # base tsconfig shared by all packages
├── .gitignore
├── packages/
│   └── ui/
│       ├── package.json                  # name: @parcela/ui
│       ├── tsconfig.json                 # extends root, includes src/**
│       ├── vite.config.ts                # lib mode build config
│       └── src/
│           ├── index.ts                  # barrel export (empty for now)
│           └── styles/
│               ├── tokens.css            # @theme + CSS custom properties
│               └── global.css            # font imports, resets, font-smoothing
├── apps/
│   └── storybook/
│       ├── package.json                  # name: @parcela/storybook
│       ├── tsconfig.json                 # extends root
│       ├── .storybook/
│       │   ├── main.ts                   # framework + story globs
│       │   ├── preview.ts                # global decorators, backgrounds, CSS imports
│       │   └── theme.ts                  # custom Storybook manager theme
│       └── stories/
│           └── Welcome.stories.ts        # smoke-test story to verify setup
└── Template/                             # existing reference files (untouched)
```

---

## Task 1: Initialize pnpm workspace root

**Files:**
- Create: `package.json`
- Create: `pnpm-workspace.yaml`
- Create: `.gitignore`

- [ ] **Step 1: Create root `package.json`**

```json
{
  "name": "predium-ds-ui",
  "private": true,
  "scripts": {
    "dev:storybook": "pnpm --filter @parcela/storybook dev",
    "build:storybook": "pnpm --filter @parcela/storybook build",
    "build:ui": "pnpm --filter @parcela/ui build",
    "test": "pnpm --filter @parcela/ui test"
  },
  "engines": {
    "node": ">=20"
  }
}
```

- [ ] **Step 2: Create `pnpm-workspace.yaml`**

```yaml
packages:
  - "packages/*"
  - "apps/*"
```

- [ ] **Step 3: Create `.gitignore`**

```gitignore
node_modules
dist
.turbo
*.local
.DS_Store
storybook-static
```

- [ ] **Step 4: Initialize git and commit**

```bash
cd /Users/eddwinpaz/Documents/work/predium-ds-ui
git init
git add package.json pnpm-workspace.yaml .gitignore
git commit -m "chore: init pnpm workspace root"
```

---

## Task 2: Set up `packages/ui` with Vue 3, TypeScript, TailwindCSS v4

**Files:**
- Create: `packages/ui/package.json`
- Create: `packages/ui/tsconfig.json`
- Create: `packages/ui/vite.config.ts`
- Create: `packages/ui/src/index.ts`
- Create: `tsconfig.json` (root)

- [ ] **Step 1: Create root `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "jsx": "preserve",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,
    "noEmit": true,
    "paths": {
      "@parcela/ui": ["./packages/ui/src"],
      "@parcela/ui/*": ["./packages/ui/src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```

- [ ] **Step 2: Create `packages/ui/package.json`**

```json
{
  "name": "@parcela/ui",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "main": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts",
    "./styles/*": "./src/styles/*"
  },
  "scripts": {
    "build": "vite build",
    "test": "vitest run"
  },
  "peerDependencies": {
    "vue": "^3.5.0"
  },
  "dependencies": {
    "lucide-vue-next": "^0.474.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.2.0",
    "tailwindcss": "^4.1.0",
    "@tailwindcss/vite": "^4.1.0",
    "typescript": "^5.7.0",
    "vite": "^6.3.0",
    "vue": "^3.5.0",
    "vue-tsc": "^2.2.0",
    "vitest": "^3.1.0"
  }
}
```

- [ ] **Step 3: Create `packages/ui/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.json",
  "include": ["src/**/*.ts", "src/**/*.vue"],
  "compilerOptions": {
    "composite": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 4: Create `packages/ui/vite.config.ts`**

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue'],
    },
  },
})
```

- [ ] **Step 5: Create `packages/ui/src/index.ts`**

```typescript
// @parcela/ui — barrel export
// Components will be exported here as they are built.
```

- [ ] **Step 6: Install dependencies**

```bash
cd /Users/eddwinpaz/Documents/work/predium-ds-ui
pnpm install
```

- [ ] **Step 7: Commit**

```bash
git add packages/ui tsconfig.json
git commit -m "chore: add packages/ui with Vue 3, TS, TailwindCSS v4"
```

---

## Task 3: Create design tokens (`tokens.css`)

**Files:**
- Create: `packages/ui/src/styles/tokens.css`

All token values come from `1-design-tokens.md`. No invented values.

- [ ] **Step 1: Create `packages/ui/src/styles/tokens.css`**

```css
@import "tailwindcss";

/*
 * Parcela Design System — Tokens
 * All custom properties defined via @theme so Tailwind generates utilities.
 * Usage: bg-surface, text-ink, border-line, text-good, etc.
 */

@theme {
  /* ── Surfaces ── */
  --color-bg: #FAFAF7;
  --color-surface: #FFFFFF;
  --color-chip-bg: #F3F1EB;

  /* ── Ink (foreground) ── */
  --color-ink: #17140F;
  --color-ink2: #3A3631;
  --color-ink3: #6E6A63;
  --color-ink4: #9C978F;

  /* ── Lines ── */
  --color-line: #E8E5DE;
  --color-line-soft: #F0EDE6;

  /* ── Status foregrounds ── */
  --color-good: #5A6B3E;
  --color-warn: #8A6A1F;
  --color-danger: #8B3A2E;
  --color-info: #34495E;

  /* ── Status backgrounds ── */
  --color-good-bg: #EEF0E5;
  --color-warn-bg: #F5EDD9;
  --color-danger-bg: #F5E3DE;
  --color-info-bg: #E6EAEE;

  /* ── Typography ── */
  --font-sans: "Inter", -apple-system, "Segoe UI", sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace;

  /* ── Font sizes ── */
  --text-xs: 0.625rem;
  --text-sm: 0.6875rem;
  --text-base: 0.75rem;
  --text-md: 0.8125rem;
  --text-lg: 0.9375rem;
  --text-xl: 1.125rem;
  --text-2xl: 1.375rem;
  --text-3xl: 1.5rem;

  /* ── Border radii ── */
  --radius-sm: 3px;
  --radius-md: 4px;
  --radius-lg: 5px;
  --radius-xl: 6px;
  --radius-2xl: 8px;

  /* ── Shadows ── */
  --shadow-card: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-modal: 0 20px 60px rgba(23, 20, 15, 0.25), 0 4px 12px rgba(23, 20, 15, 0.12);
  --shadow-sticky: 0 1px 3px rgba(23, 20, 15, 0.06);

  /* ── Layout ── */
  --spacing-sidebar: 240px;
  --spacing-topnav: 56px;
  --spacing-right-panel: 440px;
}
```

- [ ] **Step 2: Verify token utilities resolve**

```bash
cd /Users/eddwinpaz/Documents/work/predium-ds-ui
echo '<div class="bg-surface text-ink border-line rounded-xl shadow-card font-sans text-md">test</div>' > /tmp/tw-test.html
```

No build needed yet — we verify in Storybook (Task 5).

- [ ] **Step 3: Commit**

```bash
git add packages/ui/src/styles/tokens.css
git commit -m "feat: add Parcela design tokens via TailwindCSS v4 @theme"
```

---

## Task 4: Create global styles (`global.css`)

**Files:**
- Create: `packages/ui/src/styles/global.css`

- [ ] **Step 1: Create `packages/ui/src/styles/global.css`**

```css
/*
 * Parcela Design System — Global Styles
 * Font imports, resets, and base typography.
 */

/* Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

/* Base resets */
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-sans);
  color: var(--color-ink);
  background: var(--color-bg);
  font-size: var(--text-md);
  line-height: 1.5;
}

/* Mono elements */
code,
kbd,
pre,
samp {
  font-family: var(--font-mono);
}

/* Table resets */
table {
  border-spacing: 0;
  border-collapse: collapse;
}

/* Focus ring */
:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

- [ ] **Step 2: Commit**

```bash
git add packages/ui/src/styles/global.css
git commit -m "feat: add global styles — fonts, resets, focus ring"
```

---

## Task 5: Set up Storybook 8

**Files:**
- Create: `apps/storybook/package.json`
- Create: `apps/storybook/tsconfig.json`
- Create: `apps/storybook/.storybook/main.ts`
- Create: `apps/storybook/.storybook/preview.ts`
- Create: `apps/storybook/.storybook/theme.ts`
- Create: `apps/storybook/stories/Welcome.stories.ts`

- [ ] **Step 1: Create `apps/storybook/package.json`**

```json
{
  "name": "@parcela/storybook",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "storybook dev -p 6006",
    "build": "storybook build"
  },
  "dependencies": {
    "@parcela/ui": "workspace:*"
  },
  "devDependencies": {
    "@storybook/vue3-vite": "^8.6.0",
    "@storybook/addon-essentials": "^8.6.0",
    "@storybook/blocks": "^8.6.0",
    "@storybook/manager-api": "^8.6.0",
    "@storybook/theming": "^8.6.0",
    "storybook": "^8.6.0",
    "vue": "^3.5.0",
    "tailwindcss": "^4.1.0",
    "@tailwindcss/vite": "^4.1.0"
  }
}
```

- [ ] **Step 2: Create `apps/storybook/tsconfig.json`**

```json
{
  "extends": "../../tsconfig.json",
  "include": [
    ".storybook/**/*.ts",
    "stories/**/*.ts",
    "stories/**/*.vue"
  ]
}
```

- [ ] **Step 3: Create `apps/storybook/.storybook/theme.ts`**

Custom Storybook manager theme with warm Parcela aesthetic.

```typescript
import { create } from '@storybook/theming'

export default create({
  base: 'light',

  // Brand
  brandTitle: 'Parcela Design System',
  brandUrl: '/',

  // Colors
  colorPrimary: '#17140F',
  colorSecondary: '#5A6B3E',

  // UI
  appBg: '#FAFAF7',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FAFAF7',
  appBorderColor: '#E8E5DE',
  appBorderRadius: 6,

  // Text
  textColor: '#17140F',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#6E6A63',

  // Toolbar
  barTextColor: '#6E6A63',
  barSelectedColor: '#17140F',
  barHoverColor: '#3A3631',
  barBg: '#FFFFFF',

  // Form
  inputBg: '#FFFFFF',
  inputBorder: '#E8E5DE',
  inputTextColor: '#17140F',
  inputBorderRadius: 5,

  // Font
  fontBase: '"Inter", -apple-system, "Segoe UI", sans-serif',
  fontCode: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
})
```

- [ ] **Step 4: Create `apps/storybook/.storybook/main.ts`**

```typescript
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: 'vue-component-meta',
    },
  },
}

export default config
```

- [ ] **Step 5: Create `apps/storybook/.storybook/preview.ts`**

```typescript
import type { Preview } from '@storybook/vue3'
import '@parcela/ui/styles/tokens.css'
import '@parcela/ui/styles/global.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'parcela',
      values: [
        { name: 'parcela', value: '#FAFAF7' },
        { name: 'surface', value: '#FFFFFF' },
        { name: 'dark', value: '#17140F' },
      ],
    },
    layout: 'centered',
  },
}

export default preview
```

- [ ] **Step 6: Create `apps/storybook/.storybook/manager.ts`**

```typescript
import { addons } from '@storybook/manager-api'
import parcelaTheme from './theme'

addons.setConfig({
  theme: parcelaTheme,
})
```

- [ ] **Step 7: Create smoke-test story `apps/storybook/stories/Welcome.stories.ts`**

```typescript
import type { Meta, StoryObj } from '@storybook/vue3'
import { h } from 'vue'

const meta: Meta = {
  title: 'Welcome',
}

export default meta

type Story = StoryObj

export const Tokens: Story = {
  render: () => ({
    setup() {
      const colors = [
        ['bg', 'var(--color-bg)'],
        ['surface', 'var(--color-surface)'],
        ['chip-bg', 'var(--color-chip-bg)'],
        ['ink', 'var(--color-ink)'],
        ['ink2', 'var(--color-ink2)'],
        ['ink3', 'var(--color-ink3)'],
        ['ink4', 'var(--color-ink4)'],
        ['line', 'var(--color-line)'],
        ['line-soft', 'var(--color-line-soft)'],
        ['good', 'var(--color-good)'],
        ['good-bg', 'var(--color-good-bg)'],
        ['warn', 'var(--color-warn)'],
        ['warn-bg', 'var(--color-warn-bg)'],
        ['danger', 'var(--color-danger)'],
        ['danger-bg', 'var(--color-danger-bg)'],
        ['info', 'var(--color-info)'],
        ['info-bg', 'var(--color-info-bg)'],
      ]
      return { colors }
    },
    template: `
      <div style="font-family: var(--font-sans); max-width: 640px;">
        <h1 class="text-2xl font-semibold text-ink mb-4">Parcela Design Tokens</h1>
        <p class="text-md text-ink3 mb-6">All color tokens from the design system.</p>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
          <div
            v-for="[name, value] in colors"
            :key="name"
            style="display: flex; align-items: center; gap: 8px; padding: 8px; border-radius: 5px; border: 1px solid var(--color-line);"
          >
            <div
              :style="{ width: '28px', height: '28px', borderRadius: '4px', background: value, border: '1px solid var(--color-line)' }"
            />
            <div>
              <div class="text-sm font-medium text-ink">{{ name }}</div>
              <div class="text-xs font-mono text-ink3">{{ value }}</div>
            </div>
          </div>
        </div>

        <h2 class="text-xl font-semibold text-ink mt-8 mb-4">Typography</h2>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <p class="font-sans text-xs text-ink3">xs (10px) — Eyebrow labels, badges</p>
          <p class="font-sans text-sm text-ink3">sm (11px) — Metadata, captions</p>
          <p class="font-sans text-base text-ink2">base (12px) — Labels</p>
          <p class="font-sans text-md text-ink2">md (13px) — Body, table cells</p>
          <p class="font-sans text-lg text-ink">lg (15px) — Large body</p>
          <p class="font-sans text-xl text-ink">xl (18px) — Card title</p>
          <p class="font-sans text-2xl text-ink font-semibold">2xl (22px) — Page title</p>
          <p class="font-sans text-3xl text-ink font-semibold">3xl (24px) — Hero title</p>
        </div>

        <h2 class="text-xl font-semibold text-ink mt-8 mb-4">Mono Font</h2>
        <p class="font-mono text-md text-ink2">IBM Plex Mono — $68,100.00 · PRP-0126</p>

        <h2 class="text-xl font-semibold text-ink mt-8 mb-4">Shadows</h2>
        <div style="display: flex; gap: 16px;">
          <div class="shadow-card bg-surface rounded-xl p-4 text-sm text-ink2 border border-line">shadow-card</div>
          <div class="shadow-sticky bg-surface rounded-xl p-4 text-sm text-ink2 border border-line">shadow-sticky</div>
          <div class="shadow-modal bg-surface rounded-2xl p-4 text-sm text-ink2">shadow-modal</div>
        </div>
      </div>
    `,
  }),
}
```

- [ ] **Step 8: Install all dependencies**

```bash
cd /Users/eddwinpaz/Documents/work/predium-ds-ui
pnpm install
```

- [ ] **Step 9: Run Storybook and verify it starts**

```bash
pnpm dev:storybook
```

Expected: Storybook opens at `http://localhost:6006` and shows the "Welcome / Tokens" story with all design token swatches, typography scale, and shadow examples rendered correctly with the warm #FAFAF7 background.

- [ ] **Step 10: Commit**

```bash
git add apps/storybook
git commit -m "feat: add Storybook 8 with custom Parcela theme and token showcase"
```

---

## Verification Checklist

After all tasks are complete, verify:

1. `pnpm install` succeeds with no errors
2. `pnpm dev:storybook` starts Storybook on port 6006
3. The Storybook sidebar shows "Welcome" with the Parcela brand title
4. The manager UI uses warm colors (bg #FAFAF7, olive accent)
5. The "Tokens" story renders all 17 color swatches correctly
6. Typography scale shows 8 sizes from 10px to 24px using Inter
7. Mono text uses IBM Plex Mono
8. Tailwind utilities like `bg-surface`, `text-ink`, `rounded-xl`, `shadow-card` all resolve
9. The `@theme` directive generates proper CSS custom properties
10. All CSS custom properties are accessible via `var(--color-*)`, `var(--font-*)`, etc.
