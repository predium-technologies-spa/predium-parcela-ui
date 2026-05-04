import type { Meta, StoryObj } from '@storybook/vue3'
import {
  PSidebar,
  PTopNav,
  PButton,
  PKpiCard,
  PToolbar,
  PDataTable,
  PBadge,
} from '@predium-technologies-spa/predium-ui'
import {
  LayoutDashboard,
  BarChart3,
  Building,
  Grid3X3,
  Users,
  FileText,
  CreditCard,
  Wrench,
  Search,
  Settings,
  Plus,
  Download,
  Upload,
  Filter,
  ArrowUpDown,
  MoreVertical,
} from 'lucide-vue-next'

const sidebarSections = [
  { title: 'Workspace', items: [
    { key: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { key: 'reports', icon: BarChart3, label: 'Reports' },
  ]},
  { title: 'Portfolio', items: [
    { key: 'property', icon: Building, label: 'Properties', badge: 48 },
    { key: 'units', icon: Grid3X3, label: 'Units', badge: 312 },
    { key: 'tenants', icon: Users, label: 'Tenants', badge: 287 },
    { key: 'leases', icon: FileText, label: 'Leases', badge: 287 },
  ]},
  { title: 'Operations', items: [
    { key: 'payments', icon: CreditCard, label: 'Payments' },
    { key: 'work-orders', icon: Wrench, label: 'Work orders', badge: 14 },
    { key: 'inspections', icon: Search, label: 'Inspections' },
  ]},
  { title: 'System', items: [
    { key: 'settings', icon: Settings, label: 'Settings' },
  ]},
]

const columns = [
  { key: 'property', label: 'Property' },
  { key: 'id', label: 'ID', mono: true },
  { key: 'type', label: 'Type' },
  { key: 'units', label: 'Units', align: 'right' as const, mono: true },
  { key: 'occupancy', label: 'Occupancy', align: 'right' as const },
  { key: 'rentRoll', label: 'Rent roll', align: 'right' as const, mono: true },
  { key: 'manager', label: 'Manager' },
  { key: 'status', label: 'Status' },
]

const rows = [
  { property: 'Ashford Row', address: '214 Ashford St, Brooklyn NY', id: 'PRP-0128', type: 'Multifamily', units: 24, occupancy: '96%', rentRoll: '$52,400', manager: 'L. Moreno', status: 'Active', statusTone: 'good' },
  { property: 'Linden Court', address: '88 Linden Blvd, Queens NY', id: 'PRP-0127', type: 'Multifamily', units: 18, occupancy: '89%', rentRoll: '$31,200', manager: 'L. Moreno', status: 'Active', statusTone: 'good' },
  { property: 'Harper Hall', address: '402 Harper St, Bronx NY', id: 'PRP-0126', type: 'Mixed-use', units: 36, occupancy: '78%', rentRoll: '$68,100', manager: 'D. Okafor', status: 'Active', statusTone: 'good' },
  { property: 'Vine & Third', address: '1290 3rd Ave, Manhattan NY', id: 'PRP-0125', type: 'Retail', units: 6, occupancy: '100%', rentRoll: '$44,800', manager: 'D. Okafor', status: 'Active', statusTone: 'good' },
  { property: 'North Ridge', address: '55 Ridge Rd, Jersey City NJ', id: 'PRP-0124', type: 'Multifamily', units: 42, occupancy: '93%', rentRoll: '$87,300', manager: 'A. Petrov', status: 'Active', statusTone: 'good' },
  { property: 'Briarwood 7', address: '7 Briarwood Ln, Yonkers NY', id: 'PRP-0123', type: 'Multifamily', units: 12, occupancy: '100%', rentRoll: '$21,400', manager: 'A. Petrov', status: 'Active', statusTone: 'good' },
  { property: 'Cedar Lofts', address: '330 Cedar St, Hoboken NJ', id: 'PRP-0122', type: 'Multifamily', units: 28, occupancy: '82%', rentRoll: '$61,800', manager: 'L. Moreno', status: 'Review', statusTone: 'warn' },
  { property: 'Market Square', address: '12 Market Sq, Newark NJ', id: 'PRP-0121', type: 'Mixed-use', units: 19, occupancy: '68%', rentRoll: '$33,500', manager: 'D. Okafor', status: 'Review', statusTone: 'warn' },
  { property: 'Oakline', address: '901 Oakline Dr, Flushing NY', id: 'PRP-0120', type: 'Multifamily', units: 15, occupancy: '0%', rentRoll: '$0', manager: '\u2014', status: 'Onboarding', statusTone: 'info' },
]

const meta: Meta = {
  title: 'Templates/ListPage',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => ({
    components: {
      PSidebar,
      PTopNav,
      PButton,
      PKpiCard,
      PToolbar,
      PDataTable,
      PBadge,
    },
    setup() {
      return {
        sidebarSections,
        columns,
        rows,
        Plus,
        Download,
        Upload,
        Filter,
        ArrowUpDown,
        MoreVertical,
      }
    },
    template: `
      <div class="w-full min-h-screen lg:h-[820px] flex font-sans">
        <PSidebar active="property" :sections="sidebarSections" />

        <div class="flex-1 flex flex-col min-w-0">
          <PTopNav :breadcrumb="['Portfolio', 'Properties']" />

          <div class="flex-1 overflow-auto p-4 sm:p-5 lg:p-6 bg-bg">

            <!-- Page header -->
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
              <div>
                <div class="text-xs text-ink3 mb-1">Portfolio</div>
                <h1 class="text-xl sm:text-2xl font-semibold m-0 text-ink">Properties</h1>
              </div>
              <div class="flex flex-wrap gap-2">
                <PButton variant="ghost" :icon="Upload" class="hidden sm:inline-flex">Import</PButton>
                <PButton variant="ghost" :icon="Download" class="hidden sm:inline-flex">Export</PButton>
                <PButton variant="primary" :icon="Plus">New property</PButton>
              </div>
            </div>

            <!-- KPI bar -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5">
              <PKpiCard label="Properties" value="48" delta="+2 this qtr" tone="good" />
              <PKpiCard label="Units" value="312" delta="0 change" tone="neutral" />
              <PKpiCard label="Monthly rent" value="$612,840" delta="+4.2%" tone="good" mono />
              <PKpiCard label="Delinquencies" value="7" delta="3 tenants" tone="warn" mono />
            </div>

            <!-- Toolbar -->
            <PToolbar :tabs="['All', 'Active', 'Review', 'Onboarding', 'Archived']" activeTab="All">
              <template #actions>
                <PButton variant="ghost" size="sm" :icon="Filter">Filter</PButton>
                <PButton variant="ghost" size="sm" :icon="ArrowUpDown">Sort</PButton>
                <PButton variant="ghost" size="sm" :icon="MoreVertical" />
              </template>
            </PToolbar>

            <!-- Data table -->
            <PDataTable :columns="columns" :rows="rows" selectable sortable>
              <template #cell-property="{ row }">
                <div>
                  <div class="font-medium">{{ row.property }}</div>
                  <div class="text-xs text-ink3">{{ row.address }}</div>
                </div>
              </template>
              <template #cell-status="{ row }">
                <PBadge :tone="row.statusTone">{{ row.status }}</PBadge>
              </template>
            </PDataTable>

            <!-- Pagination footer -->
            <div class="flex flex-col sm:flex-row justify-between items-center gap-3 py-3 text-[13px] text-ink3">
              <span>Showing 1\u20139 of 48 properties</span>
              <div class="flex gap-1">
                <button class="w-8 h-8 rounded-md border border-line bg-accent text-white text-[13px] cursor-pointer">1</button>
                <button class="w-8 h-8 rounded-md border border-line bg-surface text-ink text-[13px] cursor-pointer">2</button>
                <button class="w-8 h-8 rounded-md border border-line bg-surface text-ink text-[13px] cursor-pointer">3</button>
                <button class="hidden sm:block w-8 h-8 rounded-md border border-line bg-surface text-ink text-[13px] cursor-pointer">4</button>
                <button class="hidden sm:block w-8 h-8 rounded-md border border-line bg-surface text-ink text-[13px] cursor-pointer">5</button>
                <button class="hidden sm:block w-8 h-8 rounded-md border border-line bg-surface text-ink text-[13px] cursor-pointer">6</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    `,
  }),
}
