import type { Meta, StoryObj } from '@storybook/vue3'
import { PStepNav } from '@parcela/ui'

const steps = [
  { label: 'Identity' },
  { label: 'Location' },
  { label: 'Units' },
  { label: 'Financials' },
  { label: 'Documents' },
  { label: 'Review' },
]

const meta: Meta<typeof PStepNav> = {
  title: 'Organisms/StepNav',
  component: PStepNav,
  argTypes: {
    current: {
      control: { type: 'number', min: 0, max: 5 },
    },
    completed: { control: 'object' },
  },
  args: {
    steps,
    current: 3,
    completed: [0, 1, 2],
  },
}

export default meta
type Story = StoryObj<typeof PStepNav>

export const Default: Story = {
  render: (args) => ({
    components: { PStepNav },
    setup: () => ({ args }),
    template: '<PStepNav v-bind="args" />',
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PStepNav },
    setup: () => ({ args }),
    template: '<PStepNav v-bind="args" />',
  }),
}
