import type { Meta, StoryObj } from '@storybook/vue3'
import {
  PSidebar,
  PTopNav,
  PToolbar,
  PDataTable,
  PKpiCard,
  PSparkline,
  PBadge,
  PButton,
  PAvatar,
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
  Filter,
  ArrowUpDown,
  Download,
  MoreVertical,
  Calendar,
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
    { key: 'tickets', icon: Wrench, label: 'Work orders', badge: 14 },
    { key: 'inspect', icon: Search, label: 'Inspections' },
  ]},
  { title: 'System', items: [
    { key: 'settings', icon: Settings, label: 'Settings' },
  ]},
]

const paymentColumns = [
  { key: 'date', label: 'Date', mono: true },
  { key: 'paymentId', label: 'Payment ID', mono: true },
  { key: 'tenant', label: 'Tenant' },
  { key: 'unit', label: 'Unit' },
  { key: 'amount', label: 'Amount', align: 'right' as const, mono: true },
  { key: 'method', label: 'Method' },
  { key: 'reference', label: 'Reference', mono: true },
  { key: 'status', label: 'Status' },
]

const paymentRows = [
  { date: '2026-04-18', paymentId: 'PAY-104928', tenant: 'K. Rivera', initials: 'KR', unit: 'Harper Hall \u00b7 4B', amount: '$2,150.00', method: 'ACH', reference: 'ch_7Q42A', status: 'posted', statusTone: 'good' },
  { date: '2026-04-18', paymentId: 'PAY-104927', tenant: 'M. Delacroix', initials: 'MD', unit: 'Harper Hall \u00b7 7C', amount: '$2,380.00', method: 'Card', reference: 'ch_7Q41K', status: 'posted', statusTone: 'good' },
  { date: '2026-04-17', paymentId: 'PAY-104926', tenant: 'A. Nakamura', initials: 'AN', unit: 'Cedar Lofts \u00b7 12', amount: '$3,100.00', method: 'Wire', reference: 'wr_55812', status: 'posted', statusTone: 'good' },
  { date: '2026-04-17', paymentId: 'PAY-104925', tenant: 'T. Wickramasinghe', initials: 'TW', unit: 'Linden Court \u00b7 3A', amount: '$1,850.00', method: 'ACH', reference: 'ch_7Q40F', status: 'pending', statusTone: 'warn' },
  { date: '2026-04-15', paymentId: 'PAY-104924', tenant: 'S. Hoffmann', initials: 'SH', unit: 'North Ridge \u00b7 18', amount: '$2,620.00', method: 'ACH', reference: 'ch_7Q3ZP', status: 'posted', statusTone: 'good' },
  { date: '2026-04-14', paymentId: 'PAY-104923', tenant: 'R. Albright', initials: 'RA', unit: 'Ashford Row \u00b7 2', amount: '$1,990.00', method: 'Check', reference: '#4418', status: 'posted', statusTone: 'good' },
  { date: '2026-04-12', paymentId: 'PAY-104922', tenant: 'J. Chen', initials: 'JC', unit: 'Harper Hall \u00b7 2A', amount: '$2,150.00', method: 'Card', reference: 'ch_7Q3XB', status: 'failed', statusTone: 'danger' },
  { date: '2026-04-11', paymentId: 'PAY-104921', tenant: 'L. Petrov', initials: 'LP', unit: 'Waverly Place \u00b7 5', amount: '$1,780.00', method: 'ACH', reference: 'ch_7Q3W1', status: 'posted', statusTone: 'good' },
  { date: '2026-04-10', paymentId: 'PAY-104920', tenant: 'F. Okafor', initials: 'FO', unit: 'Greystone \u00b7 22A', amount: '$2,450.00', method: 'ACH', reference: 'ch_7Q3V8', status: 'posted', statusTone: 'good' },
  { date: '2026-04-09', paymentId: 'PAY-104919', tenant: 'D. Martinez', initials: 'DM', unit: 'Cedar Lofts \u00b7 8', amount: '$2,900.00', method: 'Wire', reference: 'wr_55798', status: 'posted', statusTone: 'good' },
  { date: '2026-04-08', paymentId: 'PAY-104918', tenant: 'W. Thompson', initials: 'WT', unit: 'North Ridge \u00b7 3', amount: '$2,310.00', method: 'ACH', reference: 'ch_7Q3U2', status: 'refunded', statusTone: 'info' },
  { date: '2026-04-07', paymentId: 'PAY-104917', tenant: 'B. Johansson', initials: 'BJ', unit: 'Ashford Row \u00b7 11', amount: '$2,050.00', method: 'Card', reference: 'ch_7Q3T9', status: 'posted', statusTone: 'good' },
  { date: '2026-04-05', paymentId: 'PAY-104916', tenant: 'C. Park', initials: 'CP', unit: 'Harper Hall \u00b7 9D', amount: '$2,150.00', method: 'ACH', reference: 'ch_7Q3S5', status: 'failed', statusTone: 'danger' },
  { date: '2026-04-03', paymentId: 'PAY-104915', tenant: 'E. Rosenberg', initials: 'ER', unit: 'Linden Court \u00b7 7B', amount: '$1,920.00', method: 'Check', reference: '#4412', status: 'posted', statusTone: 'good' },
]

const meta: Meta = {
  title: 'Templates/PaymentHistory',
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
      PToolbar,
      PDataTable,
      PKpiCard,
      PSparkline,
      PBadge,
      PButton,
      PAvatar,
    },
    setup() {
      return {
        sidebarSections,
        paymentColumns,
        paymentRows,
        Filter,
        ArrowUpDown,
        Download,
        MoreVertical,
        Calendar,
      }
    },
    template: `
      <div class="flex w-full min-h-screen lg:h-[820px] overflow-hidden bg-bg">
        <!-- Sidebar -->
        <PSidebar :sections="sidebarSections" active="payments" />

        <!-- Main area -->
        <div class="flex-1 flex flex-col min-w-0">
          <PTopNav :breadcrumb="['Operations', 'Payments', 'History']" />

          <!-- Content -->
          <div class="flex-1 overflow-y-auto p-4 sm:p-5 lg:p-6 bg-bg">
            <!-- Header -->
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-5">
              <div>
                <div class="text-[11px] uppercase tracking-wide text-ink3 mb-1">Operations</div>
                <div class="text-xl sm:text-[22px] font-semibold text-ink mb-1">Payment history</div>
                <div class="text-[13px] text-ink3">All ledger entries across your portfolio &middot; last 30 days</div>
              </div>
              <div class="flex gap-2">
                <PButton variant="ghost" size="sm" :icon="Download" class="hidden sm:inline-flex">Export</PButton>
                <PButton variant="primary" size="sm">New payment</PButton>
              </div>
            </div>

            <!-- KPI row -->
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-5">
              <PKpiCard label="Collected" value="$41,090" tone="good" mono>
                <template #sparkline>
                  <PSparkline :points="[3,4,3,5,4,6,5]" variant="line" tone="good" :height="28" />
                </template>
              </PKpiCard>
              <PKpiCard label="Processed" value="214" tone="neutral" />
              <PKpiCard label="Failed" value="3" tone="danger" />
              <PKpiCard label="Refunded" value="1" tone="neutral" />
              <PKpiCard label="Avg settle" value="1.8d" tone="neutral" />
            </div>

            <!-- Toolbar -->
            <PToolbar
              :tabs="['All', 'Posted', 'Pending', 'Failed', 'Refunded', 'Disputed']"
              activeTab="All"
            >
              <template #actions>
                <PButton variant="ghost" size="sm" :icon="Calendar">Apr 1 – 18, 2026</PButton>
                <PButton variant="ghost" size="sm" :icon="Filter">Filter</PButton>
                <PButton variant="ghost" size="sm" :icon="ArrowUpDown">Sort</PButton>
                <PButton variant="ghost" size="sm" :icon="MoreVertical" />
              </template>
            </PToolbar>

            <!-- Data table -->
            <div>
              <PDataTable :columns="paymentColumns" :rows="paymentRows" selectable sortable>
                <template #cell-tenant="{ row }">
                  <div class="flex items-center gap-2">
                    <PAvatar :initials="row.initials" size="sm" />
                    <span>{{ row.tenant }}</span>
                  </div>
                </template>
                <template #cell-method="{ row }">
                  <span class="text-[11px] px-2 py-0.5 rounded bg-bg-hover text-ink3 font-medium">{{ row.method }}</span>
                </template>
                <template #cell-status="{ row }">
                  <PBadge :tone="row.statusTone">{{ row.status }}</PBadge>
                </template>
              </PDataTable>
            </div>

            <!-- Footer totals & pagination -->
            <div class="flex flex-col sm:flex-row justify-between items-center gap-3 py-3 border-t border-line mt-0">
              <div class="text-[13px] text-ink3">
                Showing 1&ndash;14 of 214 payments
              </div>
              <div class="flex items-center gap-1">
                <span class="text-[13px] font-semibold text-ink3">Total visible:</span>
                <span class="text-[13px] font-semibold font-mono text-ink">$31,800.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
