import type { Meta, StoryObj } from '@storybook/vue3'
import { PStepperItem } from '@eddwinpaz/predium-ui'

const meta: Meta<typeof PStepperItem> = {
  title: 'Molecules/StepperItem',
  component: PStepperItem,
  argTypes: {
    number: { control: 'text' },
    label: { control: 'text' },
    status: {
      control: 'select',
      options: ['done', 'current', 'upcoming'],
    },
  },
  args: {
    number: '01',
    label: 'Identity',
    status: 'done',
  },
}

export default meta
type Story = StoryObj<typeof PStepperItem>

export const Default: Story = {
  render: (args) => ({
    components: { PStepperItem },
    setup: () => ({ args }),
    template: '<div style="width: 220px;"><PStepperItem v-bind="args" /></div>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PStepperItem },
    template: `
      <div style="display: flex; flex-direction: column; gap: 2px; width: 220px;">
        <PStepperItem number="01" label="Identity" status="done" />
        <PStepperItem number="02" label="Location" status="done" />
        <PStepperItem number="03" label="Units" status="done" />
        <PStepperItem number="04" label="Financials" status="current" />
        <PStepperItem number="05" label="Team" status="upcoming" />
        <PStepperItem number="06" label="Review" status="upcoming" />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PStepperItem },
    setup: () => ({ args }),
    template: '<div style="width: 220px;"><PStepperItem v-bind="args" /></div>',
  }),
}
