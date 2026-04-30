import type { Meta, StoryObj } from '@storybook/vue3'
import { PChatBubbleAI, PChatQuickReplies } from '@eddwinpaz/predium-ui'

const meta: Meta<typeof PChatBubbleAI> = {
  title: 'Chat/ChatBubbleAI',
  component: PChatBubbleAI,
  argTypes: {
    sender: { control: 'text' },
    time: { control: 'text' },
    avatarColor: { control: 'color' },
    showActions: { control: 'boolean' },
  },
  args: {
    sender: 'Nora',
    time: '10:42',
    avatarColor: '#8B7355',
    showActions: true,
  },
}

export default meta
type Story = StoryObj<typeof PChatBubbleAI>

export const Default: Story = {
  render: (args) => ({
    components: { PChatBubbleAI, PChatQuickReplies },
    setup: () => ({ args }),
    template: `
      <PChatBubbleAI v-bind="args" @action="(type) => console.log('action:', type)">
        <p>Hola, soy <strong>Nora</strong>. Puedo ayudarte a analizar tus datos y generar reportes.</p>
        <template #quick-replies>
          <PChatQuickReplies
            :replies="['Resumir pantalla', 'Generar reporte']"
            @select="(r) => console.log('reply:', r)"
          />
        </template>
      </PChatBubbleAI>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PChatBubbleAI },
    setup: () => ({ args }),
    template: `
      <PChatBubbleAI v-bind="args" @action="(type) => console.log('action:', type)">
        <p>This is a playground message.</p>
      </PChatBubbleAI>
    `,
  }),
}
