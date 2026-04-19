import type { Meta, StoryObj } from '@storybook/vue3'
import { PSegmentedButton } from '@parcela/ui'
import { ref } from 'vue'

const meta: Meta<typeof PSegmentedButton> = {
  title: 'Atoms/SegmentedButton',
  component: PSegmentedButton,
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    options: ['A', 'B', 'B+', 'C'],
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof PSegmentedButton>

export const Default: Story = {
  render: (args) => ({
    components: { PSegmentedButton },
    setup() {
      const value = ref('B+')
      return { args, value }
    },
    template: '<PSegmentedButton v-bind="args" v-model="value" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PSegmentedButton },
    setup() {
      const v1 = ref('B+')
      const v2 = ref('Day')
      const v3 = ref('Monthly')
      return { v1, v2, v3 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <PSegmentedButton v-model="v1" :options="['A', 'B', 'B+', 'C', 'D']" />
        <PSegmentedButton v-model="v2" :options="['Day', 'Week', 'Map']" />
        <PSegmentedButton v-model="v3" :options="['Monthly', 'Quarterly']" />
        <PSegmentedButton model-value="X" :options="['X', 'Y']" disabled />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PSegmentedButton },
    setup() {
      const value = ref('B')
      return { args, value }
    },
    template: '<PSegmentedButton v-bind="args" v-model="value" />',
  }),
}
