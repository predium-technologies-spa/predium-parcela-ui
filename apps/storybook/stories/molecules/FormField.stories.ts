import type { Meta, StoryObj } from '@storybook/vue3'
import { PFormField, PInput, PSelect } from '@eddwinpaz/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PFormField> = {
  title: 'Molecules/FormField',
  component: PFormField,
  argTypes: {
    label: { control: 'text' },
    required: { control: 'boolean' },
    hint: { control: 'text' },
    error: { control: 'text' },
    cols: { control: 'select', options: [1, 2] },
  },
  args: {
    label: 'Property name',
    required: true,
    hint: '',
    error: '',
    cols: 1,
  },
}

export default meta
type Story = StoryObj<typeof PFormField>

export const Default: Story = {
  render: (args) => ({
    components: { PFormField, PInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div style="max-width: 320px;">
        <PFormField v-bind="args">
          <PInput v-model="value" placeholder="Enter property name" />
        </PFormField>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PFormField, PInput, PSelect },
    setup() {
      const v1 = ref('')
      const v2 = ref('')
      const v3 = ref('')
      const v4 = ref('')
      return { v1, v2, v3, v4 }
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 640px;">
        <PFormField label="Property name" required>
          <PInput v-model="v1" placeholder="Enter name" />
        </PFormField>
        <PFormField label="City" hint="Optional">
          <PInput v-model="v2" placeholder="Enter city" />
        </PFormField>
        <PFormField label="Email" required error="Please enter a valid email address">
          <PInput v-model="v3" placeholder="name@example.com" error />
        </PFormField>
        <PFormField label="Full address" :cols="2">
          <PInput v-model="v4" placeholder="Street, city, state, ZIP" />
        </PFormField>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PFormField, PInput },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: `
      <div style="max-width: 320px;">
        <PFormField v-bind="args">
          <PInput v-model="value" placeholder="Enter value" />
        </PFormField>
      </div>
    `,
  }),
}
