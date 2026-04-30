import type { Meta, StoryObj } from '@storybook/vue3'
import { PInput } from '@eddwinpaz/predium-ui'
import { Search, Calendar } from 'lucide-vue-next'
import { ref } from 'vue'

const meta: Meta<typeof PInput> = {
  title: 'Atoms/Input',
  component: PInput,
  argTypes: {
    type: { control: 'select', options: ['text', 'number', 'email', 'password'] },
    mono: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
  args: {
    placeholder: 'Enter value…',
    mono: false,
    disabled: false,
    error: false,
  },
}

export default meta
type Story = StoryObj<typeof PInput>

export const Default: Story = {
  render: (args) => ({
    components: { PInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<PInput v-bind="args" v-model="value" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PInput },
    setup() {
      const v1 = ref('Harper Hall')
      const v2 = ref('4,280,000')
      const v3 = ref('Mar 14, 2021')
      const v4 = ref('')
      const v5 = ref('38')
      return { v1, v2, v3, v4, v5, Search, Calendar }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <PInput v-model="v1" placeholder="Property name" />
        <PInput v-model="v2" mono suffix="USD" placeholder="Amount" />
        <PInput v-model="v3" :icon="Calendar" placeholder="Select date" />
        <PInput v-model="v4" :icon="Search" placeholder="Search properties…" />
        <PInput v-model="v5" mono suffix="%" placeholder="Percentage" />
        <PInput model-value="" placeholder="Disabled" disabled />
        <PInput model-value="" placeholder="Error state" error />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PInput },
    setup() {
      const value = ref('Test value')
      return { args, value }
    },
    template: '<div style="width: 280px;"><PInput v-bind="args" v-model="value" /></div>',
  }),
}
