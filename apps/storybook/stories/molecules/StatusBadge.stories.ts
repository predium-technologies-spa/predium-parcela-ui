import type { Meta, StoryObj } from '@storybook/vue3'
import { PStatusBadge } from '@parcela/ui'

const meta: Meta<typeof PStatusBadge> = {
  title: 'Molecules/StatusBadge',
  component: PStatusBadge,
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'good', 'warn', 'danger', 'info'],
    },
    label: { control: 'text' },
  },
  args: {
    tone: 'good',
    label: 'Active',
  },
}

export default meta
type Story = StoryObj<typeof PStatusBadge>

export const Default: Story = {
  render: (args) => ({
    components: { PStatusBadge },
    setup: () => ({ args }),
    template: '<PStatusBadge v-bind="args" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PStatusBadge },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <PStatusBadge tone="neutral" label="Draft" />
        <PStatusBadge tone="good" label="Active" />
        <PStatusBadge tone="warn" label="Pending review" />
        <PStatusBadge tone="danger" label="Overdue" />
        <PStatusBadge tone="info" label="Scheduled" />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PStatusBadge },
    setup: () => ({ args }),
    template: '<PStatusBadge v-bind="args" />',
  }),
}
