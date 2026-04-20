import type { Meta, StoryObj } from '@storybook/vue3'
import {
  PSidebar,
  PTopNav,
  PRightDrawer,
  PFormField,
  PInput,
  PSegmentedButton,
  PSelect,
  PButton,
  PDataTable,
  PBadge,
  PProgressBar,
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
  Calendar,
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

const tableColumns = [
  { key: 'name', label: 'Property' },
  { key: 'type', label: 'Type' },
  { key: 'units', label: 'Units', align: 'right' as const, mono: true },
  { key: 'rent', label: 'Rent roll', align: 'right' as const, mono: true },
  { key: 'status', label: 'Status' },
]

const tableRows = [
  { name: 'Ashford Row', type: 'Multifamily', units: 24, rent: '$52,400', status: 'Active', tone: 'good' },
  { name: 'Linden Court', type: 'Multifamily', units: 18, rent: '$31,200', status: 'Active', tone: 'good' },
  { name: 'Harper Hall', type: 'Mixed-use', units: 36, rent: '$68,100', status: 'Active', tone: 'good' },
  { name: 'Vine & Third', type: 'Retail', units: 6, rent: '$44,800', status: 'Active', tone: 'good' },
  { name: 'North Ridge', type: 'Multifamily', units: 42, rent: '$87,300', status: 'Active', tone: 'good' },
  { name: 'Cedar Lofts', type: 'Multifamily', units: 28, rent: '$61,800', status: 'Review', tone: 'warn' },
]

const meta: Meta = {
  title: 'Templates/FormDrawer',
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => ({
    components: {
      PSidebar, PTopNav, PRightDrawer, PFormField, PInput,
      PSegmentedButton, PSelect, PButton, PDataTable, PBadge, PProgressBar,
    },
    setup() {
      const sidebarExpanded = ref(true)
      const drawerOpen = ref(true)
      const propertyClass = ref('B+')
      return {
        sidebarSections, tableColumns, tableRows, Calendar,
        sidebarExpanded, drawerOpen, propertyClass,
      }
    },
    template: `
      <div class="w-full max-w-[1280px] min-h-screen lg:h-[820px] flex font-sans text-ink bg-bg">
        <PSidebar :sections="sidebarSections" active="property" v-model:expanded="sidebarExpanded" />

        <div class="flex-1 flex flex-col min-w-0">
          <PTopNav :breadcrumb="['Portfolio', 'Properties', 'New property']" />

          <div class="flex-1 flex overflow-hidden">
            <!-- Left: dimmed property table -->
            <div class="hidden lg:flex flex-1 flex-col overflow-auto p-6 bg-bg opacity-50">
              <PDataTable :columns="tableColumns" :rows="tableRows">
                <template #cell-status="{ row }">
                  <PBadge :tone="row.tone">{{ row.status }}</PBadge>
                </template>
              </PDataTable>
            </div>

            <!-- Right: form drawer -->
            <PRightDrawer
              v-model:open="drawerOpen"
              :width="460"
              eyebrow="New record"
              title="Add property"
              subtitle="Draft will autosave · 3 of 4 sections complete"
            >
              <template #header-extra>
                <!-- Stepper progress bars -->
                <div class="flex gap-1 mt-4">
                  <div v-for="(step, i) in ['Identity', 'Address', 'Financials', 'Team']" :key="step" class="flex-1">
                    <PProgressBar :value="i <= 2 ? 100 : 0" :tone="i === 2 ? 'neutral' : 'neutral'" size="sm" />
                    <div :class="['text-xs mt-1', i === 2 ? 'text-ink font-medium' : 'text-ink4']">
                      {{ String(i + 1).padStart(2, '0') }} · {{ step }}
                    </div>
                  </div>
                </div>
              </template>

              <template #body>
                <h3 class="text-base font-semibold text-ink mb-4">Financials</h3>

                <div class="flex flex-col gap-4">
                  <PFormField label="Acquisition price" required hint="USD">
                    <PInput model-value="4,280,000" mono suffix="USD" />
                  </PFormField>

                  <PFormField label="Acquisition date" required>
                    <PInput model-value="Mar 14, 2021" :icon="Calendar" />
                  </PFormField>

                  <PFormField label="Property class" required>
                    <PSegmentedButton v-model="propertyClass" :options="['A', 'B', 'B+', 'C']" />
                  </PFormField>

                  <PFormField label="Base rent estimate" hint="Blended average">
                    <PInput model-value="1,890.00" mono suffix="/ unit / mo" />
                  </PFormField>

                  <PFormField label="Expense ratio" hint="Of gross revenue">
                    <PInput model-value="38" mono suffix="%" />
                  </PFormField>

                  <div class="grid grid-cols-2 gap-3">
                    <PFormField label="Cap rate">
                      <PInput model-value="5.4" mono suffix="%" />
                    </PFormField>
                    <PFormField label="Tax assessment">
                      <PInput model-value="3,710,000" mono suffix="USD" />
                    </PFormField>
                  </div>

                  <PFormField label="Reporting currency">
                    <PSelect model-value="USD — United States Dollar" :options="['USD — United States Dollar', 'CLP — Chilean Peso']" />
                  </PFormField>

                  <PFormField label="Internal notes">
                    <div class="bg-surface rounded-xl p-3 text-base text-ink2 min-h-[68px] leading-relaxed" style="border: 1px solid var(--color-line-soft);">
                      Seller financing 20% of purchase. Roof replaced 2023. Legal review pending for unit 3A conversion.
                    </div>
                  </PFormField>
                </div>
              </template>

              <template #footer>
                <PButton variant="ghost" @click="drawerOpen = false">Back</PButton>
                <div class="flex-1 text-center text-sm text-ink4">Saved 14s ago</div>
                <PButton variant="ghost">Save draft</PButton>
                <PButton variant="primary">Continue →</PButton>
              </template>
            </PRightDrawer>
          </div>
        </div>
      </div>
    `,
  }),
}
