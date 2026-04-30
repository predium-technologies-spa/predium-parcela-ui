import type { Meta, StoryObj } from '@storybook/vue3'
import { PToggle } from '@eddwinpaz/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PToggle> = {
  title: 'Atoms/Toggle',
  component: PToggle,
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    label: 'Enable notifications',
    disabled: false,
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof PToggle>

export const Default: Story = {
  render: (args) => ({
    components: { PToggle },
    setup() {
      const on = ref(false)
      return { args, on }
    },
    template: '<PToggle v-bind="args" v-model="on" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PToggle },
    setup() {
      const v1 = ref(false)
      const v2 = ref(true)
      const v3 = ref(true)
      const v4 = ref(false)
      const v5 = ref(true)
      const v6 = ref(false)
      return { v1, v2, v3, v4, v5, v6 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <PToggle v-model="v1" label="Off state" />
        <PToggle v-model="v2" label="On state" />
        <PToggle v-model="v3" label="Dark mode" description="Switch between light and dark themes" />
        <PToggle v-model="v4" label="Disabled (off)" disabled />
        <PToggle v-model="v5" label="Disabled (on)" disabled />
        <PToggle v-model="v6" label="Small toggle" size="sm" />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PToggle },
    setup() {
      const on = ref(true)
      return { args, on }
    },
    template: '<PToggle v-bind="args" v-model="on" />',
  }),
}
