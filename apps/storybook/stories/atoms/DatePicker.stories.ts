import type { Meta, StoryObj } from '@storybook/vue3'
import { PDatePicker } from '@parcela/ui'
import { ref } from 'vue'

const meta: Meta<typeof PDatePicker> = {
  title: 'Atoms/DatePicker',
  component: PDatePicker,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: 'Select date',
    size: 'md',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof PDatePicker>

export const Default: Story = {
  render: () => ({
    components: { PDatePicker },
    setup() {
      const date = ref('')
      return { date }
    },
    template: `
      <div style="width: 280px;">
        <PDatePicker v-model="date" placeholder="Select date" />
        <p v-if="date" class="text-sm text-ink3 mt-2">Selected: {{ date }}</p>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PDatePicker },
    setup() {
      const d1 = ref('2026-04-19')
      const d2 = ref('')
      const d3 = ref('2021-03-14')
      return { d1, d2, d3 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 300px;">
        <div>
          <label class="text-sm font-medium text-ink2 mb-1 block">Pre-selected date</label>
          <PDatePicker v-model="d1" />
        </div>
        <div>
          <label class="text-sm font-medium text-ink2 mb-1 block">Empty (sm)</label>
          <PDatePicker v-model="d2" placeholder="Pick a date" size="sm" />
        </div>
        <div>
          <label class="text-sm font-medium text-ink2 mb-1 block">Acquisition date (lg)</label>
          <PDatePicker v-model="d3" size="lg" />
        </div>
        <div>
          <label class="text-sm font-medium text-ink2 mb-1 block">Disabled</label>
          <PDatePicker model-value="2026-01-15" disabled />
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PDatePicker },
    setup() {
      const date = ref('2026-04-19')
      return { args, date }
    },
    template: `
      <div style="width: 280px;">
        <PDatePicker v-bind="args" v-model="date" />
        <p class="text-sm text-ink3 mt-2">Value: {{ date }}</p>
      </div>
    `,
  }),
}
