import type { Meta, StoryObj } from '@storybook/vue3'
import { PCheckbox } from '@predium-technologies-spa/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PCheckbox> = {
  title: 'Atoms/Checkbox',
  component: PCheckbox,
  argTypes: {
    disabled: { control: 'boolean' },
  },
  args: {
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof PCheckbox>

export const Default: Story = {
  render: (args) => ({
    components: { PCheckbox },
    setup() {
      const checked = ref(false)
      return { args, checked }
    },
    template: '<PCheckbox v-bind="args" v-model="checked">Notify tenants</PCheckbox>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PCheckbox },
    setup() {
      const c1 = ref(true)
      const c2 = ref(false)
      const c3 = ref(true)
      const c4 = ref(false)
      return { c1, c2, c3, c4 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 10px;">
        <PCheckbox v-model="c1">Elevator</PCheckbox>
        <PCheckbox v-model="c2">Laundry room</PCheckbox>
        <PCheckbox v-model="c3">Rooftop access</PCheckbox>
        <PCheckbox v-model="c4" disabled>Gym (disabled)</PCheckbox>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PCheckbox },
    setup() {
      const checked = ref(true)
      return { args, checked }
    },
    template: '<PCheckbox v-bind="args" v-model="checked">Toggle me</PCheckbox>',
  }),
}
