import type { Meta, StoryObj } from '@storybook/vue3'
import { PCombobox } from '@parcela/ui'
import { ref } from 'vue'

const propertyTypes = [
  { label: 'Multifamily', value: 'multifamily' },
  { label: 'Retail', value: 'retail' },
  { label: 'Office', value: 'office' },
  { label: 'Industrial', value: 'industrial' },
  { label: 'Mixed-Use', value: 'mixed-use' },
  { label: 'Hospitality', value: 'hospitality' },
  { label: 'Self-Storage', value: 'self-storage' },
  { label: 'Senior Living', value: 'senior-living' },
]

const meta: Meta<typeof PCombobox> = {
  title: 'Molecules/Combobox',
  component: PCombobox,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    placeholder: 'Search property type...',
    disabled: false,
    loading: false,
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof PCombobox>

export const Default: Story = {
  render: (args) => ({
    components: { PCombobox },
    setup() {
      const value = ref('')
      return { args, value, propertyTypes }
    },
    template: `
      <div style="max-width: 320px;">
        <PCombobox v-bind="args" v-model="value" :options="propertyTypes" />
        <p style="margin-top: 8px; font-size: 13px; color: var(--color-ink4);">
          Selected: {{ value || '(none)' }}
        </p>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PCombobox },
    setup() {
      const v1 = ref('retail')
      const v2 = ref('')
      const v3 = ref('')
      return { v1, v2, v3, propertyTypes }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <PCombobox v-model="v1" :options="propertyTypes" placeholder="With selection" />
        <PCombobox v-model="v2" :options="propertyTypes" loading placeholder="Loading..." />
        <PCombobox v-model="v3" :options="propertyTypes" disabled placeholder="Disabled" />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PCombobox },
    setup() {
      const value = ref('')
      return { args, value, propertyTypes }
    },
    template: `
      <div style="max-width: 320px;">
        <PCombobox v-bind="args" v-model="value" :options="propertyTypes" />
      </div>
    `,
  }),
}
