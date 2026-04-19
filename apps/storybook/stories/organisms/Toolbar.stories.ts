import type { Meta, StoryObj } from '@storybook/vue3'
import { PToolbar, PButton } from '@parcela/ui'
import { Filter, ArrowUpDown, MoreVertical } from 'lucide-vue-next'

const meta: Meta<typeof PToolbar> = {
  title: 'Organisms/Toolbar',
  component: PToolbar,
  argTypes: {
    activeTab: {
      control: 'select',
      options: ['All', 'Active', 'Review', 'Onboarding', 'Archived'],
    },
  },
  args: {
    tabs: ['All', 'Active', 'Review', 'Onboarding', 'Archived'],
    activeTab: 'All',
  },
}

export default meta
type Story = StoryObj<typeof PToolbar>

export const Default: Story = {
  render: (args) => ({
    components: { PToolbar, PButton },
    setup: () => ({ args, Filter, ArrowUpDown, MoreVertical }),
    template: `
      <PToolbar v-bind="args">
        <template #actions>
          <PButton variant="ghost" size="sm" :icon="Filter">Filter</PButton>
          <PButton variant="ghost" size="sm" :icon="ArrowUpDown">Sort</PButton>
          <PButton variant="ghost" size="sm" :icon="MoreVertical" />
        </template>
      </PToolbar>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PToolbar, PButton },
    setup: () => ({ args, Filter, ArrowUpDown, MoreVertical }),
    template: `
      <PToolbar v-bind="args">
        <template #actions>
          <PButton variant="ghost" size="sm" :icon="Filter">Filter</PButton>
          <PButton variant="ghost" size="sm" :icon="ArrowUpDown">Sort</PButton>
          <PButton variant="ghost" size="sm" :icon="MoreVertical" />
        </template>
      </PToolbar>
    `,
  }),
}
