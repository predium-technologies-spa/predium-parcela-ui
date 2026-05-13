import type { Meta, StoryObj } from '@storybook/vue3'
import { PCountryPhoneInput } from '@predium-technologies-spa/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PCountryPhoneInput> = {
  title: 'Molecules/CountryPhoneInput',
  component: PCountryPhoneInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { PCountryPhoneInput },
    setup() {
      const phone = ref('')
      const countryCode = ref('+56')
      return { args, phone, countryCode }
    },
    template: `
      <div class="w-80">
        <PCountryPhoneInput
          v-model="phone"
          v-model:country-code="countryCode"
          :disabled="args.disabled"
          :error="args.error"
          :size="args.size"
        />
        <p class="mt-2 text-sm text-gray-500">
          Phone: {{ phone }} | Country: {{ countryCode }}
        </p>
      </div>
    `,
  }),
  args: {
    size: 'md',
    disabled: false,
    error: false,
  },
}

export const WithValue: Story = {
  render: (args) => ({
    components: { PCountryPhoneInput },
    setup() {
      const phone = ref('912345678')
      const countryCode = ref('+56')
      return { args, phone, countryCode }
    },
    template: `
      <div class="w-80">
        <PCountryPhoneInput
          v-model="phone"
          v-model:country-code="countryCode"
          :disabled="args.disabled"
          :error="args.error"
          :size="args.size"
        />
      </div>
    `,
  }),
  args: {
    size: 'md',
    disabled: false,
    error: false,
  },
}

export const ErrorState: Story = {
  render: (args) => ({
    components: { PCountryPhoneInput },
    setup() {
      const phone = ref('')
      const countryCode = ref('+56')
      return { args, phone, countryCode }
    },
    template: `
      <div class="w-80">
        <PCountryPhoneInput
          v-model="phone"
          v-model:country-code="countryCode"
          :disabled="args.disabled"
          :error="args.error"
          :size="args.size"
        />
        <p class="mt-1 text-sm text-red-500">El teléfono es requerido</p>
      </div>
    `,
  }),
  args: {
    size: 'md',
    disabled: false,
    error: true,
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { PCountryPhoneInput },
    setup() {
      const phone = ref('912345678')
      const countryCode = ref('+56')
      return { args, phone, countryCode }
    },
    template: `
      <div class="w-80">
        <PCountryPhoneInput
          v-model="phone"
          v-model:country-code="countryCode"
          :disabled="args.disabled"
          :error="args.error"
          :size="args.size"
        />
      </div>
    `,
  }),
  args: {
    size: 'md',
    disabled: true,
    error: false,
  },
}

export const Sizes: Story = {
  render: () => ({
    components: { PCountryPhoneInput },
    setup() {
      const phone = ref('')
      const countryCode = ref('+56')
      return { phone, countryCode }
    },
    template: `
      <div class="w-80 space-y-4">
        <PCountryPhoneInput v-model="phone" v-model:country-code="countryCode" size="sm" placeholder="Small" />
        <PCountryPhoneInput v-model="phone" v-model:country-code="countryCode" size="md" placeholder="Medium" />
        <PCountryPhoneInput v-model="phone" v-model:country-code="countryCode" size="lg" placeholder="Large" />
      </div>
    `,
  }),
}

export const DifferentCountries: Story = {
  render: () => ({
    components: { PCountryPhoneInput },
    setup() {
      const phones = ref({
        cl: { phone: '912345678', code: '+56' },
        mx: { phone: '5512345678', code: '+52' },
        co: { phone: '3001234567', code: '+57' },
        us: { phone: '2125551234', code: '+1' },
      })
      return { phones }
    },
    template: `
      <div class="w-80 space-y-4">
        <PCountryPhoneInput v-model="phones.cl.phone" v-model:country-code="phones.cl.code" />
        <PCountryPhoneInput v-model="phones.mx.phone" v-model:country-code="phones.mx.code" />
        <PCountryPhoneInput v-model="phones.co.phone" v-model:country-code="phones.co.code" />
        <PCountryPhoneInput v-model="phones.us.phone" v-model:country-code="phones.us.code" />
      </div>
    `,
  }),
}
