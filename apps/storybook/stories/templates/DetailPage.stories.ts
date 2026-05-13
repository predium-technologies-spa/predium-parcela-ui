import type { Meta, StoryObj } from '@storybook/vue3'
import {
  PSidebar,
  PTopNav,
  PButton,
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
  Download,
  MoreVertical,
  MapPin,
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

const tabs = ['Overview', 'Units', 'Leases', 'Payments', 'Work orders', 'Documents', 'Activity']

const meta: Meta = {
  title: 'Templates/DetailPage',
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
      PBadge,
    },
    setup() {
      return {
        sidebarSections,
        tabs,
        Download,
        MoreVertical,
        MapPin,
      }
    },
    template: `
      <div class="w-full min-h-screen lg:h-[820px] flex font-sans">
        <PSidebar active="property" :sections="sidebarSections" />

        <div class="flex-1 flex flex-col min-w-0">
          <PTopNav :breadcrumb="['Portfolio', 'Properties', 'Harper Hall']" />

          <!-- Header section -->
          <div class="bg-surface border-b border-line px-4 sm:px-5 lg:px-6 pt-4 sm:pt-5">
            <div class="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-4">
              <!-- Property thumbnail placeholder -->
              <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center flex-shrink-0 bg-bg border border-line">
                <div class="w-8 h-8 rounded-md bg-line"></div>
              </div>
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-2 mb-1">
                  <span class="text-xs font-sans text-ink3">PRP-0126</span>
                  <PBadge tone="good">Active</PBadge>
                  <PBadge tone="neutral">Mixed-use</PBadge>
                </div>
                <h1 class="text-xl sm:text-[28px] font-semibold m-0 mb-1 text-ink">Harper Hall</h1>
                <div class="text-[13px] text-ink3 flex items-center gap-1">
                  402 Harper St, Bronx NY 10451
                </div>
              </div>
              <div class="flex gap-2 self-start">
                <PButton variant="ghost" :icon="Download" class="hidden sm:inline-flex">Export</PButton>
                <PButton variant="ghost" :icon="MoreVertical" />
                <PButton variant="primary">Edit property</PButton>
              </div>
            </div>

            <!-- Tab bar -->
            <div class="flex overflow-x-auto flex-nowrap -mx-4 sm:-mx-5 lg:-mx-6 px-4 sm:px-5 lg:px-6 scrollbar-none">
              <button
                v-for="(tab, i) in tabs"
                :key="tab"
                class="whitespace-nowrap cursor-pointer shrink-0"
                :style="{
                  padding: '10px 16px',
                  fontSize: '13px',
                  fontWeight: i === 0 ? '600' : '400',
                  color: i === 0 ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  background: 'none',
                  border: 'none',
                  borderBottom: i === 0 ? '2px solid var(--color-primary)' : '2px solid transparent',
                }"
              >{{ tab }}</button>
            </div>
          </div>

          <!-- Scrollable content -->
          <div class="flex-1 overflow-auto p-4 sm:p-5 lg:p-6 bg-bg">

            <!-- Overview section -->
            <div class="mb-6">
              <h2 class="text-base font-semibold mb-3 text-ink">Overview</h2>
              <div class="bg-surface border border-line rounded-xl p-4 sm:p-5">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-4 sm:gap-y-5">
                  <div>
                    <div class="text-xs text-ink3 mb-1">Property ID</div>
                    <div class="text-sm font-medium font-sans text-ink">PRP-0126</div>
                  </div>
                  <div>
                    <div class="text-xs text-ink3 mb-1">Type</div>
                    <div class="text-sm font-medium text-ink">Mixed-use</div>
                  </div>
                  <div>
                    <div class="text-xs text-ink3 mb-1">Year built</div>
                    <div class="text-sm font-medium text-ink">1962</div>
                  </div>
                  <div>
                    <div class="text-xs text-ink3 mb-1">Class</div>
                    <div class="text-sm font-medium text-ink">B</div>
                  </div>
                  <div>
                    <div class="text-xs text-ink3 mb-1">Total units</div>
                    <div class="text-sm font-medium text-ink">36</div>
                  </div>
                  <div>
                    <div class="text-xs text-ink3 mb-1">Occupancy</div>
                    <div class="text-sm font-medium text-ink">78%</div>
                  </div>
                  <div>
                    <div class="text-xs text-ink3 mb-1">Manager</div>
                    <div class="text-sm font-medium text-ink">D. Okafor</div>
                  </div>
                  <div>
                    <div class="text-xs text-ink3 mb-1">Acquired</div>
                    <div class="text-sm font-medium text-ink">Mar 2019</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Financial snapshot -->
            <div class="mb-6">
              <h2 class="text-base font-semibold mb-3 text-ink">Financial snapshot</h2>
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div class="bg-surface border border-line rounded-xl p-3 sm:p-4">
                  <div class="text-xs text-ink3 mb-1">Gross rent</div>
                  <div class="text-lg sm:text-xl font-semibold font-sans text-ink">$68,100</div>
                </div>
                <div class="bg-surface border border-line rounded-xl p-3 sm:p-4">
                  <div class="text-xs text-ink3 mb-1">Collected</div>
                  <div class="text-lg sm:text-xl font-semibold font-sans text-good">$64,420</div>
                </div>
                <div class="bg-surface border border-line rounded-xl p-3 sm:p-4">
                  <div class="text-xs text-ink3 mb-1">Outstanding</div>
                  <div class="text-lg sm:text-xl font-semibold font-sans text-warn">$3,680</div>
                </div>
                <div class="bg-surface border border-line rounded-xl p-3 sm:p-4">
                  <div class="text-xs text-ink3 mb-1">NOI</div>
                  <div class="text-lg sm:text-xl font-semibold font-sans text-ink">$41,210</div>
                </div>
              </div>
            </div>

            <!-- Recent activity -->
            <div>
              <h2 class="text-base font-semibold mb-3 text-ink">Recent activity</h2>
              <div class="bg-surface border border-line rounded-xl overflow-hidden">
                <div class="p-3 sm:p-4 flex flex-col gap-3">
                  <div class="flex gap-2.5 items-start">
                    <div class="w-2 h-2 rounded-full bg-good mt-1 shrink-0"></div>
                    <div class="flex-1 min-w-0">
                      <div class="text-[13px] font-medium text-ink">Lease signed \u2014 Unit 14B</div>
                      <div class="text-xs text-ink3">T. Nakamura \u00b7 2 hours ago</div>
                    </div>
                  </div>
                  <div class="flex gap-2.5 items-start">
                    <div class="w-2 h-2 rounded-full bg-info mt-1 shrink-0"></div>
                    <div class="flex-1 min-w-0">
                      <div class="text-[13px] font-medium text-ink">Inspection completed \u2014 Unit 8A</div>
                      <div class="text-xs text-ink3">D. Okafor \u00b7 Yesterday</div>
                    </div>
                  </div>
                  <div class="flex gap-2.5 items-start">
                    <div class="w-2 h-2 rounded-full bg-warn mt-1 shrink-0"></div>
                    <div class="flex-1 min-w-0">
                      <div class="text-[13px] font-medium text-ink">Work order created \u2014 Plumbing, Unit 3C</div>
                      <div class="text-xs text-ink3">System \u00b7 2 days ago</div>
                    </div>
                  </div>
                  <div class="flex gap-2.5 items-start">
                    <div class="w-2 h-2 rounded-full bg-danger mt-1 shrink-0"></div>
                    <div class="flex-1 min-w-0">
                      <div class="text-[13px] font-medium text-ink">Rent overdue \u2014 Unit 11A</div>
                      <div class="text-xs text-ink3">System \u00b7 3 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    `,
  }),
}
