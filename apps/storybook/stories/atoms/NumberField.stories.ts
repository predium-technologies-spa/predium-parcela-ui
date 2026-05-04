import type { Meta, StoryObj } from '@storybook/vue3'
import { PNumberField } from '@predium-technologies-spa/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PNumberField> = {
  title: 'Atoms/NumberField',
  component: PNumberField,
}
export default meta
type Story = StoryObj<typeof PNumberField>

export const Default: Story = {
  render: () => ({
    components: { PNumberField },
    setup: () => ({ value: ref(5) }),
    template: `<PNumberField v-model="value" :min="0" :max="100" :step="1" />`,
  }),
}
