import type { Meta, StoryObj } from '@storybook/vue3'
import { PSnackbar, useSnackbar } from '@predium-technologies-spa/predium-ui'
import { defineComponent } from 'vue'

const SnackbarDemo = defineComponent({
  name: 'SnackbarDemo',
  setup() {
    const { enqueue } = useSnackbar()

    function showDefault() {
      enqueue({ message: 'Settings have been saved.' })
    }
    function showSuccess() {
      enqueue({ message: 'Changes published successfully!', kind: 'success' })
    }
    function showError() {
      enqueue({ message: 'Failed to save changes.', kind: 'error', actionText: 'Retry' })
    }

    return { showDefault, showSuccess, showError }
  },
  template: `
    <div style="display: flex; gap: 12px;">
      <button
        class="px-4 py-2 bg-accent text-white rounded-lg text-sm font-medium cursor-pointer"
        @click="showDefault"
      >Default</button>
      <button
        class="px-4 py-2 bg-good text-white rounded-lg text-sm font-medium cursor-pointer"
        @click="showSuccess"
      >Success</button>
      <button
        class="px-4 py-2 bg-danger text-white rounded-lg text-sm font-medium cursor-pointer"
        @click="showError"
      >Error</button>
    </div>
  `,
})

const meta: Meta<typeof PSnackbar> = {
  title: 'Molecules/Snackbar',
  component: PSnackbar,
  argTypes: {
    placement: { control: 'select', options: ['top', 'bottom'] },
  },
  args: {
    placement: 'top',
  },
}

export default meta
type Story = StoryObj<typeof PSnackbar>

export const Default: Story = {
  render: (args) => ({
    components: { PSnackbar, SnackbarDemo },
    setup: () => ({ args }),
    template: `
      <PSnackbar v-bind="args">
        <SnackbarDemo />
      </PSnackbar>
    `,
  }),
}
