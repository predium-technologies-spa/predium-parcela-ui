import type { Meta, StoryObj } from '@storybook/vue3'
import { PChatBubbleUser } from '@eddwinpaz/predium-ui'

const meta: Meta<typeof PChatBubbleUser> = {
  title: 'Chat/ChatBubbleUser',
  component: PChatBubbleUser,
  argTypes: {
    time: { control: 'text' },
    status: {
      control: 'select',
      options: ['sent', 'delivered', 'read'],
    },
  },
  args: {
    time: '10:44',
    status: 'read',
  },
}

export default meta
type Story = StoryObj<typeof PChatBubbleUser>

export const Default: Story = {
  render: (args) => ({
    components: { PChatBubbleUser },
    setup: () => ({ args }),
    template: `
      <PChatBubbleUser v-bind="args">
        Hola Nora, necesito un resumen del proyecto actual.
      </PChatBubbleUser>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PChatBubbleUser },
    setup: () => ({ args }),
    template: `
      <PChatBubbleUser v-bind="args">
        Playground message content.
      </PChatBubbleUser>
    `,
  }),
}
