import type { Meta, StoryObj } from '@storybook/vue3'
import { PStepNav } from '@parcela/ui'
import { ref } from 'vue'

const steps = [
  { number: '01', label: 'Identity' },
  { number: '02', label: 'Location' },
  { number: '03', label: 'Units' },
  { number: '04', label: 'Financials' },
  { number: '05', label: 'Documents' },
  { number: '06', label: 'Review' },
]

const meta: Meta<typeof PStepNav> = {
  title: 'Organisms/StepNav',
  component: PStepNav,
}

export default meta
type Story = StoryObj<typeof PStepNav>

export const Vertical: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => ({
    components: { PStepNav },
    setup() {
      const current = ref(3)
      return { steps, current }
    },
    template: `
      <div style="display: flex; height: 500px;">
        <PStepNav
          :steps="steps"
          :current="current"
          :completed="[0, 1, 2]"
          direction="vertical"
          @navigate="current = $event"
        />
        <div class="flex-1 p-6 bg-bg">
          <p class="text-base text-ink2">Click a step on the left to navigate. Current: <strong class="text-ink">{{ steps[current].label }}</strong></p>
        </div>
      </div>
    `,
  }),
}

export const Horizontal: Story = {
  render: () => ({
    components: { PStepNav },
    setup() {
      const current = ref(2)
      return { steps, current }
    },
    template: `
      <div>
        <PStepNav
          :steps="steps"
          :current="current"
          :completed="[0, 1]"
          direction="horizontal"
          @navigate="current = $event"
        />
        <div class="p-6">
          <p class="text-base text-ink2">Click a step above to navigate. Current: <strong class="text-ink">{{ steps[current].label }}</strong></p>
        </div>
      </div>
    `,
  }),
}

export const HorizontalCompact: Story = {
  render: () => ({
    components: { PStepNav },
    setup() {
      const current = ref(1)
      const shortSteps = [
        { number: '01', label: 'Info' },
        { number: '02', label: 'Review' },
        { number: '03', label: 'Done' },
      ]
      return { shortSteps, current }
    },
    template: `
      <div style="max-width: 500px;">
        <PStepNav
          :steps="shortSteps"
          :current="current"
          :completed="[0]"
          direction="horizontal"
          @navigate="current = $event"
        />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: () => ({
    components: { PStepNav },
    setup() {
      const current = ref(3)
      return { steps, current }
    },
    template: `
      <PStepNav
        :steps="steps"
        :current="current"
        :completed="[0, 1, 2]"
        direction="horizontal"
        @navigate="current = $event"
      />
    `,
  }),
}
