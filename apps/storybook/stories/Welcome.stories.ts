import type { Meta, StoryObj } from '@storybook/vue3'

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
