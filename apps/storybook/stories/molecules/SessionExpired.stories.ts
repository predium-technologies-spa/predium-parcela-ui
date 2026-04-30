import type { Meta, StoryObj } from '@storybook/vue3'
import { PSessionExpired } from '@eddwinpaz/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PSessionExpired> = {
  title: 'Molecules/SessionExpired',
  component: PSessionExpired,
  argTypes: {
    open: { control: 'boolean' },
  },
  args: {
    open: true,
  },
}

export default meta
type Story = StoryObj<typeof PSessionExpired>

export const Default: Story = {
  render: (args) => ({
    components: { PSessionExpired },
    setup: () => ({ args }),
    template: '<PSessionExpired v-bind="args" @relogin="args.open = false" />',
  }),
}

export const Interactive: Story = {
  render: () => ({
    components: { PSessionExpired },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div>
        <button @click="open = true" style="padding: 8px 16px; background: #17140F; color: white; border-radius: 6px; cursor: pointer;">
          Simular sesion expirada
        </button>
        <PSessionExpired :open="open" @relogin="open = false" />
      </div>
    `,
  }),
}
