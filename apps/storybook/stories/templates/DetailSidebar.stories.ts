import type { Meta, StoryObj } from '@storybook/vue3'
import {
  PSidebar,
  PTopNav,
  PButton,
  PBadge,
  PDataTable,
  PRightDrawer,
  PKpiCard,
  PStatusBadge,
} from '@parcela/ui'
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
  ChevronRight,
  Pencil,
} from 'lucide-vue-next'
import { ref } from 'vue'

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
    { key: 'tickets', icon: Wrench, label: 'Work orders', badge: 14 },
    { key: 'inspect', icon: Search, label: 'Inspections' },
  ]},
  { title: 'System', items: [
    { key: 'settings', icon: Settings, label: 'Settings' },
  ]},
]

const columns = [
  { key: 'property', label: 'Property' },
  { key: 'type', label: 'Type' },
  { key: 'units', label: 'Units', align: 'right' as const, mono: true },
  { key: 'occupancy', label: 'Occ.', align: 'right' as const, mono: true },
  { key: 'rent', label: 'Rent', align: 'right' as const, mono: true },
  { key: 'status', label: 'Status' },
]

const rows = [
  { property: 'Ashford Row', type: 'Multifamily', units: 24, occupancy: '96%', rent: '$52,400', status: 'Active', statusTone: 'good' },
  { property: 'Linden Court', type: 'Multifamily', units: 18, occupancy: '89%', rent: '$31,200', status: 'Active', statusTone: 'good' },
  { property: 'Harper Hall', type: 'Mixed-use', units: 36, occupancy: '78%', rent: '$68,100', status: 'Active', statusTone: 'good' },
  { property: 'Vine & Third', type: 'Retail', units: 6, occupancy: '100%', rent: '$44,800', status: 'Active', statusTone: 'good' },
  { property: 'North Ridge', type: 'Multifamily', units: 42, occupancy: '93%', rent: '$87,300', status: 'Active', statusTone: 'good' },
  { property: 'Briarwood 7', type: 'Multifamily', units: 12, occupancy: '100%', rent: '$21,400', status: 'Active', statusTone: 'good' },
  { property: 'Cedar Lofts', type: 'Multifamily', units: 28, occupancy: '82%', rent: '$61,800', status: 'Review', statusTone: 'warn' },
]

const meta: Meta = {
  title: 'Templates/DetailSidebar',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => ({
    components: {
      PSidebar, PTopNav, PButton, PBadge, PDataTable,
      PRightDrawer, PKpiCard, PStatusBadge,
    },
    setup() {
      const sidebarExpanded = ref(true)
      const drawerOpen = ref(true)
      return {
        sidebarSections, columns, rows,
        ChevronRight, Pencil,
        sidebarExpanded, drawerOpen,
      }
    },
    template: `
      <div class="w-full max-w-[1280px] min-h-screen lg:h-[820px] flex font-sans text-ink bg-bg">
        <PSidebar :sections="sidebarSections" active="property" v-model:expanded="sidebarExpanded" />

        <div class="flex-1 flex flex-col min-w-0">
          <PTopNav :breadcrumb="['Portfolio', 'Properties']" />

          <div class="flex-1 flex overflow-hidden">
            <!-- Left: property table -->
            <div class="hidden lg:flex flex-1 flex-col overflow-auto p-6 bg-bg">
              <div class="flex items-center justify-between mb-4">
                <h1 class="text-xl font-semibold text-ink tracking-tight">Properties</h1>
                <PButton variant="primary" v-if="!drawerOpen" @click="drawerOpen = true">
                  Select property
                </PButton>
              </div>

              <PDataTable :columns="columns" :rows="rows" selectable>
                <template #cell-property="{ row }">
                  <button
                    type="button"
                    class="text-left cursor-pointer hover:text-accent transition-colors"
                    @click="drawerOpen = true"
                  >
                    <span class="font-medium text-ink">{{ row.property }}</span>
                  </button>
                </template>
                <template #cell-status="{ row }">
                  <PBadge :tone="row.statusTone">{{ row.status }}</PBadge>
                </template>
              </PDataTable>
            </div>

            <!-- Right: detail drawer (uses PRightDrawer) -->
            <PRightDrawer
              v-model:open="drawerOpen"
              :width="440"
              title="Harper Hall"
              subtitle="402 Harper St, Bronx NY 10457"
              eyebrow="PRP-0126"
            >
              <template #header-extra>
                <div class="flex gap-1.5 mt-2">
                  <PBadge tone="good">Active</PBadge>
                  <PBadge tone="info">Mixed-use</PBadge>
                  <PBadge tone="neutral">36 units</PBadge>
                </div>
              </template>

              <template #body>
                <!-- Overview -->
                <div class="mb-6">
                  <h3 class="text-xs font-semibold text-ink3 uppercase tracking-wide mb-3">Overview</h3>
                  <div class="grid grid-cols-2 gap-3">
                    <div v-for="[k, v] in [
                      ['Property ID', 'PRP-0126'],
                      ['Type', 'Mixed-use'],
                      ['Units', '36'],
                      ['Occupancy', '78%'],
                      ['Year built', '1962'],
                      ['Manager', 'D. Okafor'],
                    ]" :key="k">
                      <div class="text-xs text-ink4">{{ k }}</div>
                      <div class="text-sm text-ink font-medium">{{ v }}</div>
                    </div>
                  </div>
                </div>

                <!-- Financial snapshot -->
                <div class="mb-6">
                  <h3 class="text-xs font-semibold text-ink3 uppercase tracking-wide mb-3">Financial snapshot</h3>
                  <div class="grid grid-cols-2 gap-2">
                    <PKpiCard label="Gross rent" value="$68,100" mono />
                    <PKpiCard label="Collected" value="$64,420" tone="good" mono />
                    <PKpiCard label="Outstanding" value="$3,680" tone="warn" mono />
                    <PKpiCard label="NOI" value="$41,210" mono />
                  </div>
                </div>

                <!-- Recent activity -->
                <div>
                  <h3 class="text-xs font-semibold text-ink3 uppercase tracking-wide mb-3">Recent activity</h3>
                  <div class="flex flex-col gap-3">
                    <div v-for="[dot, title, time] in [
                      ['good', 'Lease signed — Unit 14B', '2 hours ago'],
                      ['info', 'Inspection completed — Unit 8A', 'Yesterday'],
                      ['warn', 'Work order — Plumbing, Unit 3C', '2 days ago'],
                      ['danger', 'Rent overdue — Unit 11A', '3 days ago'],
                    ]" :key="title" class="flex gap-2 items-start">
                      <PStatusBadge :tone="dot" :label="title" />
                      <span class="text-xs text-ink4 shrink-0 ml-auto">{{ time }}</span>
                    </div>
                  </div>
                </div>
              </template>

              <template #footer>
                <PButton variant="ghost" @click="drawerOpen = false">Close</PButton>
                <div class="flex-1" />
                <PButton variant="ghost" :icon="ChevronRight">Open full page</PButton>
                <PButton variant="primary" :icon="Pencil">Edit property</PButton>
              </template>
            </PRightDrawer>
          </div>
        </div>
      </div>
    `,
  }),
}
