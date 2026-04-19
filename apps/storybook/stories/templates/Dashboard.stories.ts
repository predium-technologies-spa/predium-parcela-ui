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
  {
    label: 'Workspace',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { key: 'reports', label: 'Reports', icon: BarChart3 },
    ],
  },
  {
    label: 'Portfolio',
    items: [
      { key: 'property', label: 'Properties', icon: Building, count: 48 },
      { key: 'units', label: 'Units', icon: Grid3X3, count: 312 },
      { key: 'tenants', label: 'Tenants', icon: Users, count: 287 },
      { key: 'leases', label: 'Leases', icon: FileText, count: 287 },
    ],
  },
  {
    label: 'Operations',
    items: [
      { key: 'payments', label: 'Payments', icon: CreditCard },
      { key: 'work-orders', label: 'Work orders', icon: Wrench, count: 14 },
      { key: 'inspections', label: 'Inspections', icon: Search },
    ],
  },
  {
    label: 'System',
    items: [
      { key: 'settings', label: 'Settings', icon: Settings },
    ],
  },
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
      <div style="width: 1280px; height: 820px; display: flex; font-family: var(--font-sans);">
        <PSidebar active="dashboard" :sections="sidebarSections" />

        <div style="flex: 1; display: flex; flex-direction: column; min-width: 0;">
          <PTopNav :breadcrumb="['Workspace', 'Dashboard']" />

          <div style="flex: 1; overflow: auto; padding: 20px 24px; background: var(--color-bg);">

            <!-- Greeting header -->
            <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px;">
              <div>
                <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Sunday \u00b7 April 19, 2026</div>
                <h1 style="font-size: 24px; font-weight: 600; margin: 0 0 4px 0; color: var(--color-text);">Good morning, Elena.</h1>
                <div style="font-size: 14px; color: var(--color-text-secondary);">You have 6 events today.</div>
              </div>
              <div style="display: flex; gap: 8px;">
                <PButton variant="ghost" :icon="Calendar">Today</PButton>
                <PButton variant="ghost">Route</PButton>
                <PButton variant="primary" :icon="Plus">New activity</PButton>
              </div>
            </div>

            <!-- KPI strip -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px;">
              <PKpiCard label="Showings today" value="4" tone="neutral" />
              <PKpiCard label="Active leads" value="23" delta="+3 this week" tone="good" />
              <PKpiCard label="Rent collected" value="$118,240" tone="good" mono />
              <PKpiCard label="Open tickets" value="14" delta="2 urgent" tone="warn" />
            </div>

            <!-- Main grid -->
            <div style="display: grid; grid-template-columns: 1.6fr 1fr; gap: 16px; margin-bottom: 20px;">

              <!-- Today's schedule -->
              <div style="background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 12px; overflow: hidden;">
                <div style="padding: 16px 16px 12px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-line);">
                  <span style="font-weight: 600; font-size: 14px; color: var(--color-text);">Today's schedule</span>
                  <PButton variant="ghost" size="sm">View all</PButton>
                </div>
                <div style="padding: 8px 12px; display: flex; flex-direction: column; gap: 4px;">
                  <PAgendaItem time="09:00" duration="30m" type="Showing" label="Unit 4B \u00b7 Harper Hall" tone="info" status="confirmed" />
                  <PAgendaItem time="10:00" duration="45m" type="Inspection" label="Unit 12A \u00b7 Ashford Row" tone="warn" status="pending" />
                  <PAgendaItem time="11:30" duration="30m" type="Showing" label="Unit 7C \u00b7 North Ridge" tone="info" status="confirmed" />
                  <PAgendaItem time="13:30" duration="1h" type="Maintenance" label="HVAC \u00b7 Linden Court" tone="danger" status="flagged" />
                  <PAgendaItem time="15:00" duration="30m" type="Lease signing" label="Unit 2C \u00b7 Briarwood 7" tone="good" status="confirmed" />
                  <PAgendaItem time="16:30" duration="30m" type="Showing" label="Unit 9A \u00b7 Cedar Lofts" tone="info" status="pending" />
                </div>
              </div>

              <!-- Right column -->
              <div style="display: flex; flex-direction: column; gap: 16px;">

                <!-- Tasks -->
                <div style="background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 12px; overflow: hidden;">
                  <div style="padding: 16px 16px 12px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-line);">
                    <span style="font-weight: 600; font-size: 14px; color: var(--color-text);">Tasks</span>
                    <PButton variant="ghost" size="sm">View all</PButton>
                  </div>
                  <div style="padding: 8px 12px; display: flex; flex-direction: column; gap: 4px;">
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
                <div style="background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 12px; overflow: hidden;">
                  <div style="padding: 16px 16px 12px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-line);">
                    <span style="font-weight: 600; font-size: 14px; color: var(--color-text);">Messages</span>
                    <PButton variant="ghost" size="sm">View all</PButton>
                  </div>
                  <div style="padding: 4px 12px; display: flex; flex-direction: column; gap: 2px;">
                    <PMessageItem from="K. Rivera" unit="4B \u00b7 Harper Hall" preview="Sorry for the delay \u2014 I attached the signed addendum to the portal last night." time="08:42" :unread="true" />
                    <PMessageItem from="J. Okonkwo" unit="12A \u00b7 Ashford Row" preview="The kitchen faucet is still dripping after the repair visit yesterday." time="Yesterday" :unread="true" />
                    <PMessageItem from="M. Delacroix" unit="2C \u00b7 Briarwood 7" preview="Thanks for sending over the lease renewal. I'll review it this weekend." time="Mon" :unread="false" />
                    <PMessageItem from="A. Chen" unit="6A \u00b7 Linden Court" preview="Can we schedule the move-in walkthrough for next Friday?" time="Apr 12" :unread="false" />
                  </div>
                </div>

              </div>
            </div>

            <!-- Bottom grid -->
            <div style="display: grid; grid-template-columns: 1.2fr 1fr 0.8fr; gap: 16px;">

              <!-- Lead pipeline -->
              <div style="background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 12px; overflow: hidden;">
                <div style="padding: 16px 16px 12px; border-bottom: 1px solid var(--color-line);">
                  <span style="font-weight: 600; font-size: 14px; color: var(--color-text);">Lead pipeline</span>
                </div>
                <div style="padding: 16px;">
                  <PKanbanStageBar :stages="kanbanStages" />
                </div>
              </div>

              <!-- Work orders -->
              <div style="background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 12px; overflow: hidden;">
                <div style="padding: 16px 16px 12px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-line);">
                  <span style="font-weight: 600; font-size: 14px; color: var(--color-text);">Work orders</span>
                  <PButton variant="ghost" size="sm">View all</PButton>
                </div>
                <div style="padding: 8px 12px; display: flex; flex-direction: column; gap: 8px;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-size: 13px; font-weight: 500; color: var(--color-text);">HVAC repair \u2014 Unit 3A</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">Linden Court</div>
                    </div>
                    <PBadge tone="danger">Urgent</PBadge>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-size: 13px; font-weight: 500; color: var(--color-text);">Leaking faucet \u2014 Unit 12A</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">Ashford Row</div>
                    </div>
                    <PBadge tone="warn">High</PBadge>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-size: 13px; font-weight: 500; color: var(--color-text);">Broken window lock \u2014 Unit 5B</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">North Ridge</div>
                    </div>
                    <PBadge tone="neutral">Normal</PBadge>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-size: 13px; font-weight: 500; color: var(--color-text);">Paint touch-up \u2014 Unit 8D</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">Cedar Lofts</div>
                    </div>
                    <PBadge tone="neutral">Low</PBadge>
                  </div>
                </div>
              </div>

              <!-- Needs attention -->
              <div style="background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 12px; overflow: hidden;">
                <div style="padding: 16px 16px 12px; border-bottom: 1px solid var(--color-line);">
                  <span style="font-weight: 600; font-size: 14px; color: var(--color-text);">Needs attention</span>
                </div>
                <div style="padding: 8px 12px; display: flex; flex-direction: column; gap: 8px;">
                  <div style="display: flex; gap: 8px; align-items: flex-start;">
                    <div style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-danger); margin-top: 6px; flex-shrink: 0;"></div>
                    <div>
                      <div style="font-size: 13px; font-weight: 500; color: var(--color-text);">Lease expiring in 3 days</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">Unit 2C \u00b7 Briarwood 7</div>
                    </div>
                  </div>
                  <div style="display: flex; gap: 8px; align-items: flex-start;">
                    <div style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-warn); margin-top: 6px; flex-shrink: 0;"></div>
                    <div>
                      <div style="font-size: 13px; font-weight: 500; color: var(--color-text);">Rent overdue 12 days</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">Unit 9A \u00b7 Cedar Lofts</div>
                    </div>
                  </div>
                  <div style="display: flex; gap: 8px; align-items: flex-start;">
                    <div style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-warn); margin-top: 6px; flex-shrink: 0;"></div>
                    <div>
                      <div style="font-size: 13px; font-weight: 500; color: var(--color-text);">Insurance cert expired</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">Market Square</div>
                    </div>
                  </div>
                  <div style="display: flex; gap: 8px; align-items: flex-start;">
                    <div style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-info); margin-top: 6px; flex-shrink: 0;"></div>
                    <div>
                      <div style="font-size: 13px; font-weight: 500; color: var(--color-text);">Inspection due this week</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">Unit 7C \u00b7 North Ridge</div>
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
