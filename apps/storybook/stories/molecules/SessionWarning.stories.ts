import type { Meta, StoryObj } from '@storybook/vue3'
import { PSessionWarning } from '@predium-technologies-spa/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PSessionWarning> = {
  title: 'Molecules/SessionWarning',
  component: PSessionWarning,
  argTypes: {
    remaining: { control: { type: 'number', min: 0, max: 120 } },
    total: { control: { type: 'number', min: 30, max: 300 } },
    open: { control: 'boolean' },
  },
  args: {
    open: true,
    remaining: 57,
    total: 120,
  },
}

export default meta
type Story = StoryObj<typeof PSessionWarning>

export const Default: Story = {
  render: (args) => ({
    components: { PSessionWarning },
    setup: () => ({ args }),
    template: '<PSessionWarning v-bind="args" @continue="args.open = false" @logout="args.open = false" />',
  }),
}

export const LowTime: Story = {
  args: {
    open: true,
    remaining: 8,
    total: 120,
  },
  render: (args) => ({
    components: { PSessionWarning },
    setup: () => ({ args }),
    template: '<PSessionWarning v-bind="args" />',
  }),
}

export const Interactive: Story = {
  render: () => ({
    components: { PSessionWarning },
    setup() {
      const open = ref(false)
      const remaining = ref(120)
      let interval: number | null = null

      function start() {
        open.value = true
        remaining.value = 120
        interval = window.setInterval(() => {
          remaining.value--
          if (remaining.value <= 0) {
            clearInterval(interval!)
            open.value = false
          }
        }, 1000)
      }

      function stop() {
        if (interval) clearInterval(interval)
        open.value = false
      }

      return { open, remaining, start, stop }
    },
    template: `
      <div>
        <button @click="start" style="padding: 8px 16px; background: #17140F; color: white; border-radius: 6px; cursor: pointer;">
          Simular advertencia de sesion
        </button>
        <PSessionWarning :open="open" :remaining="remaining" :total="120" @continue="stop" @logout="stop" />
      </div>
    `,
  }),
}
