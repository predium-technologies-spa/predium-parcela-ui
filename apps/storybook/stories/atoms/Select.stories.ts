import type { Meta, StoryObj } from '@storybook/vue3'
import { PSelect } from '@predium-technologies-spa/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PSelect> = {
  title: 'Atoms/Select',
  component: PSelect,
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: 'Select…',
    options: ['Multifamily', 'Mixed-use', 'Retail', 'Office', 'Industrial'],
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof PSelect>

export const Default: Story = {
  render: (args) => ({
    components: { PSelect },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<div style="width: 280px;"><PSelect v-bind="args" v-model="value" /></div>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PSelect },
    setup() {
      const v1 = ref('Mixed-use')
      const v2 = ref('')
      const v3 = ref('USD — United States Dollar')
      return { v1, v2, v3 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <PSelect v-model="v1" :options="['Multifamily', 'Mixed-use', 'Retail']" />
        <PSelect v-model="v2" placeholder="Choose a state" :options="['New York', 'New Jersey', 'Connecticut']" />
        <PSelect v-model="v3" :options="['USD — United States Dollar', 'CLP — Chilean Peso']" />
        <PSelect model-value="" placeholder="Disabled" :options="['A']" disabled />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PSelect },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<div style="width: 280px;"><PSelect v-bind="args" v-model="value" /></div>',
  }),
}
