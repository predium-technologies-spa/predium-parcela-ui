# PDrawer — Multi-side drawer (replaces PRightDrawer)

**Date:** 2026-05-11
**Status:** Draft — pending implementation
**Affected repos:** `predium-parcela-ui` (component), `predium-vue-agent-frontend` (consumers)

## Summary

Replace `PRightDrawer` with a more flexible `PDrawer` that supports all four sides (`right`, `left`, `top`, `bottom`) and an optional full-screen overlay. The new component is built on Headless UI (`Dialog` + `TransitionRoot` + `TransitionChild`), which the design system already depends on.

This is a **breaking change** (major version bump). All consumers in `predium-vue-agent-frontend` are migrated in the same PR.

## Motivation

Today `PRightDrawer` only supports a right-side drawer. It also has a dual-mode behavior (overlay on mobile, inline panel on desktop via `md:relative`), which is inconsistent: some consumers want a floating overlay on every viewport and currently emulate that by wrapping the component in their own `<Teleport to="body">` plus manual backdrop. The new component standardizes behavior and removes the need for those wrappers.

## Component design

### Location

`predium-parcela-ui/packages/ui/src/organisms/Drawer/Drawer.vue`
Exported as `PDrawer` from `packages/ui/src/index.ts`.

### Props

```ts
interface DrawerProps {
  open?: boolean                                   // v-model:open
  side?: 'right' | 'left' | 'top' | 'bottom'      // default 'right'
  overlay?: boolean                                // default true
  size?: number                                    // px; default 460 (left/right), 360 (top/bottom)
  eyebrow?: string
  title?: string
  subtitle?: string
}
```

### Emits

```ts
{
  close: []
  'update:open': [value: boolean]
}
```

### Slots

- `header-extra` — extra content under the title row (kept for parity with `PRightDrawer`)
- `body` — main scrollable content
- `footer` — sticky footer (e.g., action buttons)

### Behavior

Built with Headless UI `<TransitionRoot>` + `<Dialog>` + `<DialogPanel>`. This gives, out of the box:

- Teleport to `<body>`
- Focus trap inside the panel while open
- ESC closes the drawer
- Click outside the panel closes the drawer (via `@close` on `<Dialog>`)
- `role="dialog"` + `aria-modal="true"` + accessible labelling
- Body scroll lock while open

**Overlay (`overlay=true`, default):**
A full-screen `<TransitionChild>` renders `<div class="fixed inset-0 bg-[rgba(23,20,15,0.35)]">` behind the panel with a fade transition (`enter ease-in-out duration-500 from opacity-0 to opacity-100`, mirrored on leave). Click on the overlay closes the drawer.

**Overlay disabled (`overlay=false`):**
No backdrop is rendered. The page remains visible and clickable. The drawer is still a floating overlay (not inline). Used when the consumer wants to keep the underlying context unobscured (e.g., data inspectors).

### Positioning and animation per side

| `side` | container classes | enter-from | enter-to | border |
|---|---|---|---|---|
| `right` | `fixed inset-y-0 right-0` | `translate-x-full` | `translate-x-0` | `border-l` |
| `left` | `fixed inset-y-0 left-0` | `-translate-x-full` | `translate-x-0` | `border-r` |
| `top` | `fixed inset-x-0 top-0` | `-translate-y-full` | `translate-y-0` | `border-b` |
| `bottom` | `fixed inset-x-0 bottom-0` | `translate-y-full` | `translate-y-0` | `border-t` |

Leave transitions are the inverse of enter. Transition timing: `transform transition ease-in-out duration-300` (matches the current `PRightDrawer` 300ms curve, slightly faster than the Tailwind example's 500ms for snappier feel inside an app).

### Sizing

A single `size` prop (px integer):
- For `right`/`left`: applied as `width` on the panel, capped by `max-width: 100vw`.
- For `top`/`bottom`: applied as `height` on the panel, capped by `max-height: 100vh`.

Defaults: `460` for left/right, `360` for top/bottom. On screens narrower than the requested size the panel fills the viewport (already handled by the `max-width: 100vw` cap; mobile remains full-width).

### Header / body / footer structure

Preserved from `PRightDrawer`:

- **Header:** `px-4 py-3 md:px-5 md:py-4 border-b border-line`. Shows optional eyebrow (uppercase, `text-ink3`), close button (Lucide `X`), title (`text-xl font-semibold`), subtitle (`text-base text-ink3`), plus `header-extra` slot.
- **Body:** `flex-1 overflow-auto px-4 py-3 md:px-5 md:py-4` with `body` slot.
- **Footer (optional):** `px-4 py-3 md:px-5 border-t border-line flex flex-wrap items-center gap-2` rendered only when the `footer` slot has content.

### Index exports

```ts
// packages/ui/src/organisms/Drawer/index.ts
export { default as PDrawer } from './Drawer.vue'
export type { DrawerProps } from './Drawer.vue'
```

```ts
// packages/ui/src/index.ts — replace lines 196-197
export { PDrawer } from './organisms/Drawer'
export type { DrawerProps } from './organisms/Drawer'
```

## Migration in `predium-vue-agent-frontend`

`PRightDrawer` is deleted. All 11 consumers are migrated in the same PR.

### Codemod (mechanical)

- `import { PRightDrawer, ... }` → `import { PDrawer, ... }`
- `<PRightDrawer` → `<PDrawer` (the default `side="right"` matches the old behavior; no explicit prop needed)
- `</PRightDrawer>` → `</PDrawer>`
- Test stubs `[data-stub="PRightDrawer"]` → `[data-stub="PDrawer"]`

### Per-file changes

| File | Mechanical rename | Extra work |
|---|---|---|
| `src/appointment/components/AppointmentImportCalendarSheet.vue` | ✅ | — |
| `src/appointment/components/AppointmentFormComponent.vue` | ✅ | — |
| `src/appointment/components/modes/AppointmentMonthMode.vue` | ✅ | **Visual change** — was inline-on-desktop, now floats with backdrop. Acceptable. |
| `src/appointment/widgets/AppointmentCalendarByDate.vue` | ✅ | **Visual change** — same as above. |
| `src/appointment/widgets/__tests__/AppointmentCalendarByDate.spec.ts` | ✅ | Update stub name in comment & assertions if any. |
| `src/property/components/CustomFieldConfigDrawer.vue` | ✅ | — |
| `src/property/components/PropertyAppraisalsSection.vue` | ✅ | — |
| `src/document/components/DocumentPreviewSheet.vue` | ✅ | **Remove** manual `<Teleport to="body">` + backdrop `<div class="hidden md:block fixed inset-0 bg-[rgba(23,20,15,0.35)] z-40">` wrapper (lines 64-72, 146). `PDrawer` with `overlay=true` handles it. |
| `src/document/components/DocumentFormSheet.vue` | ✅ | Check for similar manual wrapper; remove if present. |
| `src/event/components/modes/EventMonthMode.vue` | ✅ | **Remove** manual `<Teleport>` + backdrop wrapper (lines 398-406). |
| `src/owner-bank/components/__tests__/OwnerBankFormComponent.spec.ts` | ✅ | Update reference in comment and `data-stub` assertion. |

### `package.json` bump

`predium-vue-agent-frontend/package.json`: bump `@predium-technologies-spa/predium-ui` to the new `2.0.0`.

## Cleanup in `predium-parcela-ui`

1. Delete folder `packages/ui/src/organisms/RightDrawer/`.
2. Replace exports in `packages/ui/src/index.ts` (lines 196-197).
3. Bump `packages/ui/package.json` version `1.8.1` → `2.0.0`.
4. Publish to GitHub Packages.

## Testing

### Design system

New unit test `packages/ui/src/organisms/Drawer/__tests__/Drawer.spec.ts` covering:

- Renders nothing when `open=false`.
- Renders `header`, `body`, `footer` slots when `open=true`.
- Emits `update:open` with `false` on close button click.
- Emits `update:open` with `false` on ESC.
- Emits `update:open` with `false` on overlay click.
- For each of the four sides: panel has the expected position classes (`right-0`, `left-0`, `top-0`, `bottom-0`).
- `overlay=false`: no backdrop rendered.
- `size` applied as `width` for left/right and `height` for top/bottom.

Run `pnpm --filter @predium-technologies-spa/predium-ui test` and `pnpm --filter @predium-technologies-spa/predium-ui build`.

### Consumer

- `pnpm type-check` in agent-frontend.
- `pnpm test:unit` in agent-frontend — adjust the two test files listed above and confirm no other tests reference `PRightDrawer`.
- Manual smoke (the screens with the most surface area):
  - Document preview drawer (Documents list).
  - Event month detail drawer (Calendar).
  - Appointment month detail drawer.
  - Property appraisals drawer.
  - Custom field config drawer.

## Out of scope

- No nested drawers (we don't have a use case; Headless UI stacks dialogs but the styling for stacked z-index is not covered here).
- No swipe-to-close gesture on mobile.
- No deprecation alias for `PRightDrawer`. The user chose breaking migration (option C) in the brainstorming step.
