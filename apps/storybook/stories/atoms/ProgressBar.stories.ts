import type { Meta, StoryObj } from '@storybook/vue3'
import { PProgressBar } from '@parcela/ui'

const meta: Meta<typeof PProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: PProgressBar,
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    tone: { control: 'select', options: ['neutral', 'good', 'warn', 'danger'] },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    value: 42,
    tone: 'neutral',
    size: 'sm',
  },
}

export default meta
type Story = StoryObj<typeof PProgressBar>

export const Default: Story = {
  render: (args) => ({
    components: { PProgressBar },
    setup: () => ({ args }),
    template: '<div style="width: 200px;"><PProgressBar v-bind="args" /></div>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PProgressBar },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <div>
          <p class="text-xs text-ink3 mb-1">Storage 42% · neutral sm</p>
          <PProgressBar :value="42" tone="neutral" size="sm" />
        </div>
        <div>
          <p class="text-xs text-ink3 mb-1">Occupancy 96% · good sm</p>
          <PProgressBar :value="96" tone="good" size="sm" />
        </div>
        <div>
          <p class="text-xs text-ink3 mb-1">Occupancy 68% · warn md</p>
          <PProgressBar :value="68" tone="warn" size="md" />
        </div>
        <div>
          <p class="text-xs text-ink3 mb-1">Delinquency · danger md</p>
          <PProgressBar :value="25" tone="danger" size="md" />
        </div>
        <div>
          <p class="text-xs text-ink3 mb-1">Completion 50%</p>
          <PProgressBar :value="50" tone="neutral" size="md" />
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PProgressBar },
    setup: () => ({ args }),
    template: '<div style="width: 200px;"><PProgressBar v-bind="args" /></div>',
  }),
}
