import type { Meta, StoryObj } from '@storybook/vue3'
import { PChatSuggestions } from '@predium-technologies-spa/predium-ui'

const meta: Meta<typeof PChatSuggestions> = {
  title: 'Chat/ChatSuggestions',
  component: PChatSuggestions,
  args: {
    suggestions: ['Resumir esta pantalla', 'Generar reporte', 'Explicar indicador'],
  },
}

export default meta
type Story = StoryObj<typeof PChatSuggestions>

export const Default: Story = {
  render: (args) => ({
    components: { PChatSuggestions },
    setup: () => ({ args }),
    template: '<PChatSuggestions v-bind="args" @select="(s) => console.log(\'selected:\', s)" />',
  }),
}
