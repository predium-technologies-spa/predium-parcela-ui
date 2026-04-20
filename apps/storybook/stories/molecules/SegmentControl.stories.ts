import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { PSegmentControl } from '@parcela/ui'

const meta: Meta<typeof PSegmentControl> = {
  title: 'Molecules/SegmentControl',
  component: PSegmentControl,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    rounded: { control: 'boolean' },
  },
  args: {
    modelValue: 'day',
    options: [
      { label: 'Day', value: 'day' },
      { label: 'Week', value: 'week' },
      { label: 'Month', value: 'month' },
    ],
    size: 'md',
    rounded: true,
  },
}

export default meta
type Story = StoryObj<typeof PSegmentControl>

export const Default: Story = {
  render: (args) => ({
    components: { PSegmentControl },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<PSegmentControl v-bind="args" v-model="value" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PSegmentControl },
    setup() {
      const sm = ref('a')
      const md = ref('a')
      const lg = ref('a')
      const square = ref('a')
      const opts = [
        { label: 'Alpha', value: 'a' },
        { label: 'Beta', value: 'b' },
        { label: 'Gamma', value: 'c' },
      ]
      return { sm, md, lg, square, opts }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <p class="text-sm text-ink3 mb-2">Small</p>
          <PSegmentControl v-model="sm" :options="opts" size="sm" />
        </div>
        <div>
          <p class="text-sm text-ink3 mb-2">Medium (default)</p>
          <PSegmentControl v-model="md" :options="opts" size="md" />
        </div>
        <div>
          <p class="text-sm text-ink3 mb-2">Large</p>
          <PSegmentControl v-model="lg" :options="opts" size="lg" />
        </div>
        <div>
          <p class="text-sm text-ink3 mb-2">Square (rounded=false)</p>
          <PSegmentControl v-model="square" :options="opts" :rounded="false" />
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PSegmentControl },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<PSegmentControl v-bind="args" v-model="value" />',
  }),
}
