import type { Meta, StoryObj } from '@storybook/vue3'
import { PKanbanStageBar } from '@eddwinpaz/predium-ui'

const stages = [
  { label: 'New', count: 7, tone: 'neutral' as const },
  { label: 'Qualifying', count: 6, tone: 'info' as const },
  { label: 'Showing', count: 5, tone: 'info' as const },
  { label: 'Application', count: 3, tone: 'good' as const },
  { label: 'Signed', count: 2, tone: 'good' as const },
]

const meta: Meta<typeof PKanbanStageBar> = {
  title: 'Organisms/KanbanStageBar',
  component: PKanbanStageBar,
  argTypes: {
    stages: { control: 'object' },
  },
  args: {
    stages,
  },
}

export default meta
type Story = StoryObj<typeof PKanbanStageBar>

export const Default: Story = {
  render: (args) => ({
    components: { PKanbanStageBar },
    setup: () => ({ args }),
    template: '<PKanbanStageBar v-bind="args" />',
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PKanbanStageBar },
    setup: () => ({ args }),
    template: '<PKanbanStageBar v-bind="args" />',
  }),
}
