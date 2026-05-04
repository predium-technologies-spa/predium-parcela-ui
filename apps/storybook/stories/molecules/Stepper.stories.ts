import type { Meta, StoryObj } from '@storybook/vue3'
import { PStepper } from '@predium-technologies-spa/predium-ui'

const meta: Meta<typeof PStepper> = {
  title: 'Molecules/Stepper',
  component: PStepper,
  argTypes: {
    activeStep: { control: { type: 'number', min: 0, max: 6 } },
  },
  args: {
    steps: [
      { label: 'Account' },
      { label: 'Profile' },
      { label: 'Payment' },
      { label: 'Review' },
      { label: 'Confirm' },
    ],
    activeStep: 2,
  },
}

export default meta
type Story = StoryObj<typeof PStepper>

export const Default: Story = {
  render: (args) => ({
    components: { PStepper },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 600px;">
        <PStepper v-bind="args" />
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PStepper },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; max-width: 600px;">
        <div>
          <p class="text-sm text-ink3 mb-3">All complete</p>
          <PStepper
            :steps="[{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }]"
            :activeStep="3"
          />
        </div>
        <div>
          <p class="text-sm text-ink3 mb-3">First step</p>
          <PStepper
            :steps="[{ label: 'Info' }, { label: 'Details' }, { label: 'Review' }, { label: 'Submit' }]"
            :activeStep="0"
          />
        </div>
        <div>
          <p class="text-sm text-ink3 mb-3">Middle step</p>
          <PStepper
            :steps="[{ label: 'Account' }, { label: 'Profile' }, { label: 'Payment' }, { label: 'Review' }, { label: 'Confirm' }]"
            :activeStep="2"
          />
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PStepper },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 600px;">
        <PStepper v-bind="args" />
      </div>
    `,
  }),
}
