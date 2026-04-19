import type { Meta, StoryObj } from '@storybook/vue3'
import { PDataTable, PBadge } from '@parcela/ui'

const columns = [
  { key: 'property', label: 'Property' },
  { key: 'id', label: 'ID', mono: true },
  { key: 'type', label: 'Type' },
  { key: 'units', label: 'Units', align: 'right' as const, mono: true },
  { key: 'occupancy', label: 'Occupancy', align: 'right' as const },
  { key: 'rentRoll', label: 'Rent roll', align: 'right' as const, mono: true },
  { key: 'status', label: 'Status' },
]

const rows = [
  {
    property: 'Ashford Row',
    address: '401 Ashford Ave, Austin TX',
    id: 'PRP-0118',
    type: 'Multi-family',
    units: 24,
    occupancy: '96%',
    rentRoll: '$38,400',
    status: 'Active',
    statusTone: 'good',
  },
  {
    property: 'Linden Court',
    address: '820 Linden Blvd, Denver CO',
    id: 'PRP-0122',
    type: 'Multi-family',
    units: 18,
    occupancy: '89%',
    rentRoll: '$27,900',
    status: 'Active',
    statusTone: 'good',
  },
  {
    property: 'Harper Hall',
    address: '36 Harper St, Portland OR',
    id: 'PRP-0126',
    type: 'Multi-family',
    units: 36,
    occupancy: '92%',
    rentRoll: '$54,000',
    status: 'Active',
    statusTone: 'good',
  },
  {
    property: 'Waverly Place',
    address: '12 Waverly Pl, Seattle WA',
    id: 'PRP-0131',
    type: 'Townhome',
    units: 8,
    occupancy: '100%',
    rentRoll: '$14,800',
    status: 'Review',
    statusTone: 'warn',
  },
  {
    property: 'Greystone Terrace',
    address: '900 Greystone Dr, Chicago IL',
    id: 'PRP-0134',
    type: 'Multi-family',
    units: 42,
    occupancy: '85%',
    rentRoll: '$63,000',
    status: 'Onboarding',
    statusTone: 'info',
  },
]

const meta: Meta<typeof PDataTable> = {
  title: 'Organisms/DataTable',
  component: PDataTable,
  argTypes: {
    selectable: { control: 'boolean' },
    sortable: { control: 'boolean' },
  },
  args: {
    columns,
    rows,
    selectable: true,
    sortable: true,
  },
}

export default meta
type Story = StoryObj<typeof PDataTable>

export const Default: Story = {
  render: (args) => ({
    components: { PDataTable },
    setup: () => ({ args }),
    template: '<PDataTable v-bind="args" />',
  }),
}

export const Composition: Story = {
  render: () => ({
    components: { PDataTable, PBadge },
    setup: () => ({ columns, rows }),
    template: `
      <PDataTable :columns="columns" :rows="rows" selectable sortable>
        <template #cell-property="{ row }">
          <div>
            <div style="font-weight: 500;">{{ row.property }}</div>
            <div style="font-size: 12px; color: var(--color-text-secondary);">{{ row.address }}</div>
          </div>
        </template>
        <template #cell-status="{ row }">
          <PBadge :tone="row.statusTone">{{ row.status }}</PBadge>
        </template>
      </PDataTable>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PDataTable, PBadge },
    setup: () => ({ args }),
    template: `
      <PDataTable v-bind="args">
        <template #cell-status="{ row }">
          <PBadge :tone="row.statusTone">{{ row.status }}</PBadge>
        </template>
      </PDataTable>
    `,
  }),
}
