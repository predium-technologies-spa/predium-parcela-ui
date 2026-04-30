import type { Meta, StoryObj } from '@storybook/vue3'
import { PChatDateSeparator } from '@eddwinpaz/predium-ui'

const meta: Meta<typeof PChatDateSeparator> = {
  title: 'Chat/ChatDateSeparator',
  component: PChatDateSeparator,
  args: {
    label: 'HOY · 10:42',
  },
}

export default meta
type Story = StoryObj<typeof PChatDateSeparator>

export const Default: Story = {
  render: (args) => ({
    components: { PChatDateSeparator },
    setup: () => ({ args }),
    template: '<PChatDateSeparator v-bind="args" />',
  }),
}
