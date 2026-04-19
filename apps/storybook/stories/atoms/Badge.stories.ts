import type { Meta, StoryObj } from '@storybook/vue3'
import { PBadge } from '@parcela/ui'

const meta: Meta<typeof PBadge> = {
  title: 'Atoms/Badge',
  component: PBadge,
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'good', 'warn', 'danger', 'info'],
    },
  },
  args: {
    tone: 'good',
  },
}

export default meta
type Story = StoryObj<typeof PBadge>

export const Default: Story = {
  render: (args) => ({
    components: { PBadge },
    setup: () => ({ args }),
    template: '<PBadge v-bind="args">Active</PBadge>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PBadge },
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <PBadge tone="neutral">Neutral</PBadge>
        <PBadge tone="good">Active</PBadge>
        <PBadge tone="warn">Pending</PBadge>
        <PBadge tone="danger">Failed</PBadge>
        <PBadge tone="info">Scheduled</PBadge>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PBadge },
    setup: () => ({ args }),
    template: '<PBadge v-bind="args">Custom label</PBadge>',
  }),
}
