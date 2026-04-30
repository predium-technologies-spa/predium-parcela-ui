import type { Meta, StoryObj } from '@storybook/vue3'
import { PDataTable, PBadge, PProgressBar } from '@eddwinpaz/predium-ui'
import { ref } from 'vue'

const columns = [
  { key: 'property', label: 'Property', sortable: true },
  { key: 'id', label: 'ID', mono: true },
  { key: 'type', label: 'Type', sortable: true },
  { key: 'units', label: 'Units', align: 'right' as const, mono: true, sortable: true },
  { key: 'occupancy', label: 'Occupancy', align: 'right' as const, sortable: true },
  { key: 'rent', label: 'Rent roll', align: 'right' as const, mono: true, sortable: true },
  { key: 'status', label: 'Status' },
]

const rows = [
  { property: 'Ashford Row', id: 'PRP-0128', type: 'Multifamily', units: 24, occupancy: 96, rent: '$52,400', status: 'Active', statusTone: 'good' },
  { property: 'Linden Court', id: 'PRP-0127', type: 'Multifamily', units: 18, occupancy: 89, rent: '$31,200', status: 'Active', statusTone: 'good' },
  { property: 'Harper Hall', id: 'PRP-0126', type: 'Mixed-use', units: 36, occupancy: 78, rent: '$68,100', status: 'Active', statusTone: 'good' },
  { property: 'Vine & Third', id: 'PRP-0125', type: 'Retail', units: 6, occupancy: 100, rent: '$44,800', status: 'Active', statusTone: 'good' },
  { property: 'North Ridge', id: 'PRP-0124', type: 'Multifamily', units: 42, occupancy: 93, rent: '$87,300', status: 'Active', statusTone: 'good' },
]

const meta: Meta<typeof PDataTable> = {
  title: 'Organisms/DataTable',
  component: PDataTable,
}

export default meta
type Story = StoryObj<typeof PDataTable>

export const Default: Story = {
  render: () => ({
    components: { PDataTable, PBadge },
    setup: () => ({ columns, rows }),
    template: `
      <PDataTable :columns="columns" :rows="rows" selectable sortable>
        <template #cell-property="{ row }">
          <div>
            <div class="font-medium text-ink">{{ row.property }}</div>
          </div>
        </template>
        <template #cell-occupancy="{ value }">
          <div class="flex items-center gap-2">
            <PProgressBar :value="value" :tone="value >= 90 ? 'good' : value >= 70 ? 'warn' : 'danger'" size="sm" style="width: 48px;" />
            <span class="font-mono text-sm">{{ value }}%</span>
          </div>
        </template>
        <template #cell-status="{ row }">
          <PBadge :tone="row.statusTone">{{ row.status }}</PBadge>
        </template>
        <template #footer>
          <strong class="text-ink2">5</strong> properties shown
        </template>
      </PDataTable>
    `,
  }),
}

export const WithPagination: Story = {
  render: () => ({
    components: { PDataTable, PBadge },
    setup() {
      const page = ref(1)
      const pageSize = 5
      const allRows = [
        ...rows,
        { property: 'Briarwood 7', id: 'PRP-0123', type: 'Multifamily', units: 12, occupancy: 100, rent: '$21,400', status: 'Active', statusTone: 'good' },
        { property: 'Cedar Lofts', id: 'PRP-0122', type: 'Multifamily', units: 28, occupancy: 82, rent: '$61,800', status: 'Review', statusTone: 'warn' },
        { property: 'Market Square', id: 'PRP-0121', type: 'Mixed-use', units: 19, occupancy: 68, rent: '$33,500', status: 'Review', statusTone: 'warn' },
        { property: 'Oakline', id: 'PRP-0120', type: 'Multifamily', units: 15, occupancy: 0, rent: '$0', status: 'Onboarding', statusTone: 'info' },
      ]
      // Simulate remote pagination
      const pageRows = ref(allRows.slice(0, pageSize))
      function onPageChange(p: number) {
        page.value = p
        const start = (p - 1) * pageSize
        pageRows.value = allRows.slice(start, start + pageSize)
      }
      return { columns, pageRows, page, allRows, onPageChange }
    },
    template: `
      <PDataTable
        :columns="columns"
        :rows="pageRows"
        selectable
        sortable
        :pagination="{ page, pageSize: 5, totalRows: allRows.length }"
        @page-change="onPageChange"
      >
        <template #cell-status="{ row }">
          <PBadge :tone="row.statusTone">{{ row.status }}</PBadge>
        </template>
      </PDataTable>
    `,
  }),
}

export const Playground: Story = {
  render: () => ({
    components: { PDataTable, PBadge },
    setup() {
      const selected = ref<number[]>([])
      return { columns, rows, selected }
    },
    template: `
      <div>
        <PDataTable
          :columns="columns"
          :rows="rows"
          selectable
          sortable
          v-model:selected-rows="selected"
          @sort="(key, dir) => console.log('Sort:', key, dir)"
        >
          <template #cell-status="{ row }">
            <PBadge :tone="row.statusTone">{{ row.status }}</PBadge>
          </template>
        </PDataTable>
        <p class="text-sm text-ink3 mt-3">Selected rows: {{ selected }}</p>
      </div>
    `,
  }),
}
