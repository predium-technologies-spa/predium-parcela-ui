import type { Meta, StoryObj } from '@storybook/vue3'
import { PSpinner } from '@parcela/ui'

const meta: Meta<typeof PSpinner> = {
  title: 'Atoms/Spinner',
  component: PSpinner,
  argTypes: {
    variant: { control: 'select', options: ['spinner', 'empty'] },
    size: { control: { type: 'range', min: 16, max: 48, step: 4 } },
  },
  args: {
    variant: 'spinner',
    size: 24,
    label: 'No data',
  },
}

export default meta
type Story = StoryObj<typeof PSpinner>

export const Default: Story = {
  render: (args) => ({
    components: { PSpinner },
    setup: () => ({ args }),
    template: '<PSpinner v-bind="args" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PSpinner },
    template: `
      <div style="display: flex; gap: 32px; align-items: flex-start;">
        <div style="text-align: center;">
          <p class="text-xs text-ink3 mb-2">Spinner (default)</p>
          <PSpinner />
        </div>
        <div style="text-align: center;">
          <p class="text-xs text-ink3 mb-2">Spinner (large)</p>
          <PSpinner :size="36" />
        </div>
        <div style="text-align: center; width: 200px;">
          <p class="text-xs text-ink3 mb-2">Empty state</p>
          <PSpinner variant="empty" label="No properties found" />
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PSpinner },
    setup: () => ({ args }),
    template: '<PSpinner v-bind="args" />',
  }),
}
