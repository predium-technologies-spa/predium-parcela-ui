import type { Meta, StoryObj } from '@storybook/vue3'
import { PPinCode } from '@predium-technologies-spa/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PPinCode> = {
  title: 'Atoms/PinCode',
  component: PPinCode,
  argTypes: {
    length: { control: { type: 'number', min: 2, max: 8 } },
    mask: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: {
    length: 4,
    mask: false,
    disabled: false,
    error: false,
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof PPinCode>

export const Default: Story = {
  render: (args) => ({
    components: { PPinCode },
    setup() {
      const code = ref('')
      return { args, code }
    },
    template: '<PPinCode v-bind="args" v-model="code" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PPinCode },
    setup() {
      const v1 = ref('')
      const v2 = ref('')
      const v3 = ref('1234')
      const v4 = ref('')
      const v5 = ref('')
      const v6 = ref('')
      return { v1, v2, v3, v4, v5, v6 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <div style="margin-bottom: 4px; font-size: 13px; color: #888;">Default (4 digits)</div>
          <PPinCode v-model="v1" />
        </div>
        <div>
          <div style="margin-bottom: 4px; font-size: 13px; color: #888;">Masked</div>
          <PPinCode v-model="v2" mask />
        </div>
        <div>
          <div style="margin-bottom: 4px; font-size: 13px; color: #888;">Pre-filled</div>
          <PPinCode v-model="v3" />
        </div>
        <div>
          <div style="margin-bottom: 4px; font-size: 13px; color: #888;">Error state</div>
          <PPinCode v-model="v4" error />
        </div>
        <div>
          <div style="margin-bottom: 4px; font-size: 13px; color: #888;">6-digit code (sm)</div>
          <PPinCode v-model="v5" :length="6" size="sm" />
        </div>
        <div>
          <div style="margin-bottom: 4px; font-size: 13px; color: #888;">Disabled</div>
          <PPinCode v-model="v6" disabled />
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PPinCode },
    setup() {
      const code = ref('')
      return { args, code }
    },
    template: '<PPinCode v-bind="args" v-model="code" />',
  }),
}
