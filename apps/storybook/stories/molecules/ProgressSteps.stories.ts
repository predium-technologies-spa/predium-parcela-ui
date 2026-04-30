import type { Meta, StoryObj } from '@storybook/vue3'
import { PProgressSteps } from '@eddwinpaz/predium-ui'

const meta: Meta<typeof PProgressSteps> = {
  title: 'Molecules/ProgressSteps',
  component: PProgressSteps,
  argTypes: {
    currentStep: { control: { type: 'number', min: 0, max: 5 } },
  },
  args: {
    steps: [
      { title: 'Account details', description: 'Enter your email and password' },
      { title: 'Personal info', description: 'Name, phone, address' },
      { title: 'Payment', description: 'Add a payment method' },
      { title: 'Confirmation', description: 'Review and submit' },
    ],
    currentStep: 1,
  },
}

export default meta
type Story = StoryObj<typeof PProgressSteps>

export const Default: Story = {
  render: (args) => ({
    components: { PProgressSteps },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 400px;">
        <PProgressSteps v-bind="args">
          <div class="bg-accent-bg text-accent rounded-lg p-3 text-sm">
            Active step content goes here.
          </div>
        </PProgressSteps>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PProgressSteps },
    template: `
      <div style="display: flex; gap: 48px; max-width: 900px;">
        <div>
          <p class="text-sm text-ink3 mb-3">All completed</p>
          <PProgressSteps
            :steps="[
              { title: 'Step 1', description: 'Done' },
              { title: 'Step 2', description: 'Done' },
              { title: 'Step 3', description: 'Done' },
            ]"
            :currentStep="3"
          />
        </div>
        <div>
          <p class="text-sm text-ink3 mb-3">In progress (step 2)</p>
          <PProgressSteps
            :steps="[
              { title: 'Account', description: 'Complete' },
              { title: 'Profile', description: 'Fill in your info' },
              { title: 'Review' },
              { title: 'Submit' },
            ]"
            :currentStep="1"
          >
            <div class="bg-accent-bg text-accent rounded-lg p-3 text-sm">
              Form content for the active step.
            </div>
          </PProgressSteps>
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PProgressSteps },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 400px;">
        <PProgressSteps v-bind="args" />
      </div>
    `,
  }),
}
