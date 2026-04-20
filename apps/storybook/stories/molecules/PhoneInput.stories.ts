import type { Meta, StoryObj } from '@storybook/vue3'
import { PPhoneInput } from '@parcela/ui'
import { ref } from 'vue'

const meta: Meta<typeof PPhoneInput> = {
  title: 'Molecules/PhoneInput',
  component: PPhoneInput,
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    countryCode: { control: 'select', options: ['+1', '+52', '+44', '+49', '+56', '+54', '+57', '+51'] },
  },
  args: {
    countryCode: '+1',
    disabled: false,
    error: false,
    size: 'md',
  },
}

export default meta
type Story = StoryObj<typeof PPhoneInput>

export const Default: Story = {
  render: (args) => ({
    components: { PPhoneInput },
    setup() {
      const phone = ref('')
      const code = ref(args.countryCode)
      return { args, phone, code }
    },
    template: `
      <div style="max-width: 320px;">
        <PPhoneInput v-bind="args" v-model="phone" v-model:country-code="code" />
        <p style="margin-top: 8px; font-size: 13px; color: var(--color-ink4);">
          Value: {{ code }} {{ phone }}
        </p>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PPhoneInput },
    setup() {
      const v1 = ref('')
      const v2 = ref('')
      const v3 = ref('')
      const v4 = ref('5551234567')
      const v5 = ref('')
      return { v1, v2, v3, v4, v5 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; max-width: 320px;">
        <PPhoneInput v-model="v1" size="sm" />
        <PPhoneInput v-model="v2" size="md" />
        <PPhoneInput v-model="v3" size="lg" />
        <PPhoneInput v-model="v4" error />
        <PPhoneInput v-model="v5" disabled />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PPhoneInput },
    setup() {
      const phone = ref('')
      const code = ref(args.countryCode)
      return { args, phone, code }
    },
    template: `
      <div style="max-width: 320px;">
        <PPhoneInput v-bind="args" v-model="phone" v-model:country-code="code" />
      </div>
    `,
  }),
}
