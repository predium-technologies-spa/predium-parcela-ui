import type { Meta, StoryObj } from '@storybook/vue3'
import { PToast, PButton } from '@parcela/ui'
import { ref } from 'vue'

const meta: Meta<typeof PToast> = {
  title: 'Molecules/Toast',
  component: PToast,
  argTypes: {
    kind: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    duration: { control: 'number' },
    message: { control: 'text' },
    action: { control: 'text' },
  },
  args: {
    message: 'Property has been saved successfully.',
    kind: 'info',
    duration: 5000,
    action: '',
  },
}

export default meta
type Story = StoryObj<typeof PToast>

export const Default: Story = {
  render: (args) => ({
    components: { PToast, PButton },
    setup() {
      const show = ref(false)
      function trigger() { show.value = true }
      function close() { show.value = false }
      return { args, show, trigger, close }
    },
    template: `
      <div>
        <PButton @click="trigger">Show Toast</PButton>
        <div style="margin-top: 16px;">
          <PToast v-bind="args" :visible="show" @close="close" />
        </div>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PToast },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <PToast message="This is an informational message." kind="info" :visible="true" :duration="0" />
        <PToast message="Operation completed successfully!" kind="success" :visible="true" :duration="0" />
        <PToast message="Please review before proceeding." kind="warning" :visible="true" :duration="0" />
        <PToast message="Something went wrong." kind="error" action="Retry" :visible="true" :duration="0" />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PToast, PButton },
    setup() {
      const show = ref(false)
      function trigger() { show.value = true }
      function close() { show.value = false }
      function onAction() { close() }
      return { args, show, trigger, close, onAction }
    },
    template: `
      <div>
        <PButton @click="trigger">Show Toast</PButton>
        <div style="margin-top: 16px;">
          <PToast v-bind="args" :visible="show" @close="close" @action="onAction" />
        </div>
      </div>
    `,
  }),
}
