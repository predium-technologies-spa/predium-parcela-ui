import type { Meta, StoryObj } from '@storybook/vue3'
import { PCommand } from '@eddwinpaz/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PCommand> = {
  title: 'Organisms/Command',
  component: PCommand,
}
export default meta
type Story = StoryObj<typeof PCommand>

export const Default: Story = {
  render: () => ({
    components: { PCommand },
    setup: () => ({
      query: ref(''),
      groups: [
        {
          heading: 'Navigation',
          items: [
            { id: 'home', label: 'Go home', hint: '⌘ H' },
            { id: 'invoices', label: 'Open invoices', hint: '⌘ I' },
          ],
        },
        {
          heading: 'Actions',
          items: [{ id: 'new-invoice', label: 'Create invoice', hint: '⌘ N' }],
        },
      ],
      onSelect: (id: string) => console.log('selected', id),
    }),
    template: `<PCommand v-model="query" :groups="groups" @select="onSelect" />`,
  }),
}
