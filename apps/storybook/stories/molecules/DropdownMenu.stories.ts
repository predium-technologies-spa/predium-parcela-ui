import type { Meta, StoryObj } from '@storybook/vue3'
import { PDropdownMenu, PButton } from '@predium-technologies-spa/predium-ui'
import { Pencil, Trash2 } from 'lucide-vue-next'

const meta: Meta<typeof PDropdownMenu> = {
  title: 'Molecules/DropdownMenu',
  component: PDropdownMenu,
}
export default meta
type Story = StoryObj<typeof PDropdownMenu>

export const Default: Story = {
  render: () => ({
    components: { PDropdownMenu, PButton },
    setup: () => ({
      items: [
        { id: 'edit', label: 'Edit', icon: Pencil },
        { id: 'sep', separator: true },
        { id: 'delete', label: 'Delete', icon: Trash2, danger: true },
      ],
      onSelect: (id: string) => console.log('selected', id),
    }),
    template: `
      <PDropdownMenu :items="items" @select="onSelect">
        <template #trigger><PButton variant="ghost">Actions</PButton></template>
      </PDropdownMenu>
    `,
  }),
}
