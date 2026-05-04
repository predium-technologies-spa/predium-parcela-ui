import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { PWeekPicker } from '@predium-technologies-spa/predium-ui'

const sampleDays = [
  { date: 14, month: 'Jan', price: '$120' },
  { date: 15, price: '$95' },
  { date: 16, price: '$110' },
  { date: 17, price: '$130', label: 'Peak' },
  { date: 18, price: '$105' },
  { date: 19, price: '$140' },
  { date: 20, price: '$90', disabled: true },
]

const meta: Meta<typeof PWeekPicker> = {
  title: 'Molecules/WeekPicker',
  component: PWeekPicker,
  argTypes: {
    modelValue: { control: 'number' },
  },
  args: {
    days: sampleDays,
    modelValue: 15,
  },
}

export default meta
type Story = StoryObj<typeof PWeekPicker>

export const Default: Story = {
  render: (args) => ({
    components: { PWeekPicker },
    setup() {
      const selected = ref(args.modelValue)
      return { args, selected }
    },
    template: `
      <div style="max-width: 700px;">
        <PWeekPicker v-bind="args" v-model="selected" />
        <p class="text-sm text-ink3 mt-3">Selected: {{ selected }}</p>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PWeekPicker },
    setup() {
      const selected = ref(args.modelValue)
      return { args, selected }
    },
    template: `
      <div style="max-width: 700px;">
        <PWeekPicker v-bind="args" v-model="selected" />
      </div>
    `,
  }),
}
