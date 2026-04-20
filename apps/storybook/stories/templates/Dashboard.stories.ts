import type { Meta, StoryObj } from '@storybook/vue3'
import {
  PSidebar,
  PTopNav,
  PButton,
  PKpiCard,
  PAgendaItem,
  PTaskItem,
  PMessageItem,
  PKanbanStageBar,
  PBadge,
} from '@parcela/ui'
import { ref } from 'vue'
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
    { key: 'work-orders', icon: Wrench, label: 'Work orders', badge: 14 },
    { key: 'inspections', icon: Search, label: 'Inspections' },
  ]},
  { title: 'System', items: [
    { key: 'settings', icon: Settings, label: 'Settings' },
  ]},
]

const kanbanStages = [
  { label: 'New', count: 7, tone: 'neutral' as const },
  { label: 'Qualifying', count: 6, tone: 'info' as const },
  { label: 'Showing', count: 5, tone: 'info' as const },
  { label: 'Application', count: 3, tone: 'good' as const },
  { label: 'Signed', count: 2, tone: 'good' as const },
]

const meta: Meta = {
  title: 'Templates/Dashboard',
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
      PAgendaItem,
      PTaskItem,
      PMessageItem,
      PKanbanStageBar,
      PBadge,
    },
    setup() {
      const t1 = ref(true)
      const t2 = ref(true)
      const t3 = ref(true)
      const t4 = ref(false)
      const t5 = ref(false)
      const t6 = ref(false)
      const t7 = ref(false)
      return {
        sidebarSections,
        kanbanStages,
        Plus,
        Calendar,
        t1, t2, t3, t4, t5, t6, t7,
      }
    },
    template: `
      <div class="w-full min-h-screen lg:h-[820px] flex font-sans">
        <PSidebar active="dashboard" :sections="sidebarSections" />

        <div class="flex-1 flex flex-col min-w-0">
          <PTopNav :breadcrumb="['Workspace', 'Dashboard']" />

          <div class="flex-1 overflow-auto p-4 sm:p-5 lg:p-6 bg-bg">

            <!-- Greeting header -->
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
              <div>
                <div class="text-xs text-ink3 mb-1">Sunday \u00b7 April 19, 2026</div>
                <h1 class="text-xl sm:text-2xl font-semibold m-0 mb-1 text-ink">Good morning, Elena.</h1>
                <div class="text-sm text-ink3">You have 6 events today.</div>
              </div>
              <div class="hidden sm:flex gap-2">
                <PButton variant="ghost" :icon="Calendar">Today</PButton>
                <PButton variant="ghost">Route</PButton>
                <PButton variant="primary" :icon="Plus">New activity</PButton>
              </div>
              <div class="flex sm:hidden">
                <PButton variant="primary" :icon="Plus" size="sm">New activity</PButton>
              </div>
            </div>

            <!-- KPI strip -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5">
              <PKpiCard label="Showings today" value="4" tone="neutral" />
              <PKpiCard label="Active leads" value="23" delta="+3 this week" tone="good" />
              <PKpiCard label="Rent collected" value="$118,240" tone="good" mono />
              <PKpiCard label="Open tickets" value="14" delta="2 urgent" tone="warn" />
            </div>

            <!-- Main grid -->
            <div class="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-3 sm:gap-4 mb-5">

              <!-- Today's schedule -->
              <div class="bg-surface border border-line rounded-xl overflow-hidden">
                <div class="px-4 pt-4 pb-3 flex justify-between items-center border-b border-line">
                  <span class="font-semibold text-sm text-ink">Today's schedule</span>
                  <PButton variant="ghost" size="sm">View all</PButton>
                </div>
                <div class="p-2 px-3 flex flex-col gap-1">
                  <PAgendaItem time="09:00" duration="30m" type="Showing" label="Unit 4B \u00b7 Harper Hall" tone="info" status="confirmed" />
                  <PAgendaItem time="10:00" duration="45m" type="Inspection" label="Unit 12A \u00b7 Ashford Row" tone="warn" status="pending" />
                  <PAgendaItem time="11:30" duration="30m" type="Showing" label="Unit 7C \u00b7 North Ridge" tone="info" status="confirmed" />
                  <PAgendaItem time="13:30" duration="1h" type="Maintenance" label="HVAC \u00b7 Linden Court" tone="danger" status="flagged" />
                  <PAgendaItem time="15:00" duration="30m" type="Lease signing" label="Unit 2C \u00b7 Briarwood 7" tone="good" status="confirmed" />
                  <PAgendaItem time="16:30" duration="30m" type="Showing" label="Unit 9A \u00b7 Cedar Lofts" tone="info" status="pending" />
                </div>
              </div>

              <!-- Right column -->
              <div class="flex flex-col gap-3 sm:gap-4">

                <!-- Tasks -->
                <div class="bg-surface border border-line rounded-xl overflow-hidden">
                  <div class="px-4 pt-4 pb-3 flex justify-between items-center border-b border-line">
                    <span class="font-semibold text-sm text-ink">Tasks</span>
                    <PButton variant="ghost" size="sm">View all</PButton>
                  </div>
                  <div class="p-2 px-3 flex flex-col gap-1">
                    <PTaskItem label="Send lease docs to M. Delacroix" when="08:00" v-model="t1" />
                    <PTaskItem label="Follow up on maintenance #247" when="09:30" v-model="t2" />
                    <PTaskItem label="Confirm showing with K. Rivera" when="10:00" v-model="t3" />
                    <PTaskItem label="Review tenant application \u2014 Unit 6A" when="11:00" v-model="t4" :urgent="true" />
                    <PTaskItem label="Schedule HVAC inspection" when="14:00" v-model="t5" />
                    <PTaskItem label="Update rent roll for Cedar Lofts" when="15:00" v-model="t6" />
                    <PTaskItem label="Call insurance re: Ashford Row claim" when="16:00" v-model="t7" />
                  </div>
                </div>

                <!-- Messages -->
                <div class="bg-surface border border-line rounded-xl overflow-hidden">
                  <div class="px-4 pt-4 pb-3 flex justify-between items-center border-b border-line">
                    <span class="font-semibold text-sm text-ink">Messages</span>
                    <PButton variant="ghost" size="sm">View all</PButton>
                  </div>
                  <div class="p-1 px-3 flex flex-col gap-0.5">
                    <PMessageItem from="K. Rivera" unit="4B \u00b7 Harper Hall" preview="Sorry for the delay \u2014 I attached the signed addendum to the portal last night." time="08:42" :unread="true" />
                    <PMessageItem from="J. Okonkwo" unit="12A \u00b7 Ashford Row" preview="The kitchen faucet is still dripping after the repair visit yesterday." time="Yesterday" :unread="true" />
                    <PMessageItem from="M. Delacroix" unit="2C \u00b7 Briarwood 7" preview="Thanks for sending over the lease renewal. I'll review it this weekend." time="Mon" :unread="false" />
                    <PMessageItem from="A. Chen" unit="6A \u00b7 Linden Court" preview="Can we schedule the move-in walkthrough for next Friday?" time="Apr 12" :unread="false" />
                  </div>
                </div>

              </div>
            </div>

            <!-- Bottom grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_0.8fr] gap-3 sm:gap-4">

              <!-- Lead pipeline -->
              <div class="bg-surface border border-line rounded-xl overflow-hidden">
                <div class="px-4 pt-4 pb-3 border-b border-line">
                  <span class="font-semibold text-sm text-ink">Lead pipeline</span>
                </div>
                <div class="p-4">
                  <PKanbanStageBar :stages="kanbanStages" />
                </div>
              </div>

              <!-- Work orders -->
              <div class="bg-surface border border-line rounded-xl overflow-hidden">
                <div class="px-4 pt-4 pb-3 flex justify-between items-center border-b border-line">
                  <span class="font-semibold text-sm text-ink">Work orders</span>
                  <PButton variant="ghost" size="sm">View all</PButton>
                </div>
                <div class="p-2 px-3 flex flex-col gap-2">
                  <div class="flex justify-between items-center">
                    <div class="min-w-0">
                      <div class="text-[13px] font-medium text-ink truncate">HVAC repair \u2014 Unit 3A</div>
                      <div class="text-xs text-ink3">Linden Court</div>
                    </div>
                    <PBadge tone="danger">Urgent</PBadge>
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="min-w-0">
                      <div class="text-[13px] font-medium text-ink truncate">Leaking faucet \u2014 Unit 12A</div>
                      <div class="text-xs text-ink3">Ashford Row</div>
                    </div>
                    <PBadge tone="warn">High</PBadge>
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="min-w-0">
                      <div class="text-[13px] font-medium text-ink truncate">Broken window lock \u2014 Unit 5B</div>
                      <div class="text-xs text-ink3">North Ridge</div>
                    </div>
                    <PBadge tone="neutral">Normal</PBadge>
                  </div>
                  <div class="flex justify-between items-center">
                    <div class="min-w-0">
                      <div class="text-[13px] font-medium text-ink truncate">Paint touch-up \u2014 Unit 8D</div>
                      <div class="text-xs text-ink3">Cedar Lofts</div>
                    </div>
                    <PBadge tone="neutral">Low</PBadge>
                  </div>
                </div>
              </div>

              <!-- Needs attention -->
              <div class="bg-surface border border-line rounded-xl overflow-hidden">
                <div class="px-4 pt-4 pb-3 border-b border-line">
                  <span class="font-semibold text-sm text-ink">Needs attention</span>
                </div>
                <div class="p-2 px-3 flex flex-col gap-2">
                  <div class="flex gap-2 items-start">
                    <div class="w-1.5 h-1.5 rounded-full bg-danger mt-1.5 shrink-0"></div>
                    <div class="min-w-0">
                      <div class="text-[13px] font-medium text-ink">Lease expiring in 3 days</div>
                      <div class="text-xs text-ink3">Unit 2C \u00b7 Briarwood 7</div>
                    </div>
                  </div>
                  <div class="flex gap-2 items-start">
                    <div class="w-1.5 h-1.5 rounded-full bg-warn mt-1.5 shrink-0"></div>
                    <div class="min-w-0">
                      <div class="text-[13px] font-medium text-ink">Rent overdue 12 days</div>
                      <div class="text-xs text-ink3">Unit 9A \u00b7 Cedar Lofts</div>
                    </div>
                  </div>
                  <div class="flex gap-2 items-start">
                    <div class="w-1.5 h-1.5 rounded-full bg-warn mt-1.5 shrink-0"></div>
                    <div class="min-w-0">
                      <div class="text-[13px] font-medium text-ink">Insurance cert expired</div>
                      <div class="text-xs text-ink3">Market Square</div>
                    </div>
                  </div>
                  <div class="flex gap-2 items-start">
                    <div class="w-1.5 h-1.5 rounded-full bg-info mt-1.5 shrink-0"></div>
                    <div class="min-w-0">
                      <div class="text-[13px] font-medium text-ink">Inspection due this week</div>
                      <div class="text-xs text-ink3">Unit 7C \u00b7 North Ridge</div>
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
