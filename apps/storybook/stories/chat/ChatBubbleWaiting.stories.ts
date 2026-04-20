import type { Meta, StoryObj } from '@storybook/vue3'
import { PChatBubbleWaiting } from '@parcela/ui'

const meta: Meta<typeof PChatBubbleWaiting> = {
  title: 'Chat/ChatBubbleWaiting',
  component: PChatBubbleWaiting,
  argTypes: {
    sender: { control: 'text' },
    avatarColor: { control: 'color' },
  },
  args: {
    sender: 'Nora',
    avatarColor: '#8B7355',
  },
}

export default meta
type Story = StoryObj<typeof PChatBubbleWaiting>

export const Default: Story = {
  render: (args) => ({
    components: { PChatBubbleWaiting },
    setup: () => ({ args }),
    template: '<PChatBubbleWaiting v-bind="args" />',
  }),
}
