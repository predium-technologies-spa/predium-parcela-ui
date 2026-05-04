import type { Meta, StoryObj } from '@storybook/vue3'
import { PChatQuickReplies } from '@predium-technologies-spa/predium-ui'

const meta: Meta<typeof PChatQuickReplies> = {
  title: 'Chat/ChatQuickReplies',
  component: PChatQuickReplies,
  args: {
    replies: ['Resumir pantalla', 'Generar reporte', 'Ver detalles'],
  },
}

export default meta
type Story = StoryObj<typeof PChatQuickReplies>

export const Default: Story = {
  render: (args) => ({
    components: { PChatQuickReplies },
    setup: () => ({ args }),
    template: '<PChatQuickReplies v-bind="args" @select="(r) => console.log(\'selected:\', r)" />',
  }),
}
