import type { Meta, StoryObj } from '@storybook/vue3'
import { PFilterPill } from '@predium-technologies-spa/predium-ui'
import { Filter } from 'lucide-vue-next'

const meta: Meta<typeof PFilterPill> = {
  title: 'Molecules/FilterPill',
  component: PFilterPill,
  argTypes: {
    label: { control: 'text' },
    active: { control: 'boolean' },
    count: { control: 'text' },
  },
  args: {
    label: 'All',
    active: true,
    count: '48',
  },
}

export default meta
type Story = StoryObj<typeof PFilterPill>

export const Default: Story = {
  render: (args) => ({
    components: { PFilterPill },
    setup: () => ({ args }),
    template: '<PFilterPill v-bind="args" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PFilterPill },
    setup: () => ({ Filter }),
    template: `
      <div style="display: flex; gap: 8px; align-items: center;">
        <PFilterPill label="All" active count="48" />
        <PFilterPill label="Active" count="32" />
        <PFilterPill label="Pending" count="8" />
        <PFilterPill label="Archived" />
        <PFilterPill label="Region: All" :icon="Filter" />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PFilterPill },
    setup: () => ({ args }),
    template: '<PFilterPill v-bind="args" />',
  }),
}
