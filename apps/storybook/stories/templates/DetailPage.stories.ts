import type { Meta, StoryObj } from '@storybook/vue3'
import {
  PSidebar,
  PTopNav,
  PButton,
  PBadge,
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
  Download,
  MoreVertical,
  MapPin,
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
      <div style="width: 1280px; height: 820px; display: flex; font-family: var(--font-sans);">
        <PSidebar active="property" :sections="sidebarSections" />

        <div style="flex: 1; display: flex; flex-direction: column; min-width: 0;">
          <PTopNav :breadcrumb="['Portfolio', 'Properties', 'Harper Hall']" />

          <!-- Header section -->
          <div style="background: var(--color-surface); border-bottom: 1px solid var(--color-line); padding: 20px 24px 0;">
            <div style="display: flex; gap: 20px; margin-bottom: 16px;">
              <!-- Property thumbnail placeholder -->
              <div style="width: 80px; height: 80px; border-radius: 12px; background: var(--color-bg); border: 1px solid var(--color-line); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <div style="width: 32px; height: 32px; border-radius: 6px; background: var(--color-line);"></div>
              </div>
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
                  <span style="font-size: 12px; font-family: var(--font-mono); color: var(--color-text-secondary);">PRP-0126</span>
                  <PBadge tone="good">Active</PBadge>
                  <PBadge tone="neutral">Mixed-use</PBadge>
                </div>
                <h1 style="font-size: 28px; font-weight: 600; margin: 0 0 4px 0; color: var(--color-text);">Harper Hall</h1>
                <div style="font-size: 13px; color: var(--color-text-secondary); display: flex; align-items: center; gap: 4px;">
                  402 Harper St, Bronx NY 10451
                </div>
              </div>
              <div style="display: flex; gap: 8px; align-self: flex-start;">
                <PButton variant="ghost" :icon="Download">Export</PButton>
                <PButton variant="ghost" :icon="MoreVertical" />
                <PButton variant="primary">Edit property</PButton>
              </div>
            </div>

            <!-- Tab bar -->
            <div style="display: flex; gap: 0; border-bottom: none; margin: 0 -24px; padding: 0 24px;">
              <button
                v-for="(tab, i) in tabs"
                :key="tab"
                :style="{
                  padding: '10px 16px',
                  fontSize: '13px',
                  fontWeight: i === 0 ? '600' : '400',
                  color: i === 0 ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                  background: 'none',
                  border: 'none',
                  borderBottom: i === 0 ? '2px solid var(--color-primary)' : '2px solid transparent',
                  cursor: 'pointer',
                }"
              >{{ tab }}</button>
            </div>
          </div>

          <!-- Scrollable content -->
          <div style="flex: 1; overflow: auto; padding: 20px 24px; background: var(--color-bg);">

            <!-- Overview section -->
            <div style="margin-bottom: 24px;">
              <h2 style="font-size: 16px; font-weight: 600; margin: 0 0 12px 0; color: var(--color-text);">Overview</h2>
              <div style="background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 12px; padding: 20px;">
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px 32px;">
                  <div>
                    <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Property ID</div>
                    <div style="font-size: 14px; font-weight: 500; font-family: var(--font-mono); color: var(--color-text);">PRP-0126</div>
                  </div>
                  <div>
                    <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Type</div>
                    <div style="font-size: 14px; font-weight: 500; color: var(--color-text);">Mixed-use</div>
                  </div>
                  <div>
                    <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Year built</div>
                    <div style="font-size: 14px; font-weight: 500; color: var(--color-text);">1962</div>
                  </div>
                  <div>
                    <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Class</div>
                    <div style="font-size: 14px; font-weight: 500; color: var(--color-text);">B</div>
                  </div>
                  <div>
                    <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Total units</div>
                    <div style="font-size: 14px; font-weight: 500; color: var(--color-text);">36</div>
                  </div>
                  <div>
                    <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Occupancy</div>
                    <div style="font-size: 14px; font-weight: 500; color: var(--color-text);">78%</div>
                  </div>
                  <div>
                    <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Manager</div>
                    <div style="font-size: 14px; font-weight: 500; color: var(--color-text);">D. Okafor</div>
                  </div>
                  <div>
                    <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Acquired</div>
                    <div style="font-size: 14px; font-weight: 500; color: var(--color-text);">Mar 2019</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Financial snapshot -->
            <div style="margin-bottom: 24px;">
              <h2 style="font-size: 16px; font-weight: 600; margin: 0 0 12px 0; color: var(--color-text);">Financial snapshot</h2>
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;">
                <div style="background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 12px; padding: 16px;">
                  <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Gross rent</div>
                  <div style="font-size: 20px; font-weight: 600; font-family: var(--font-mono); color: var(--color-text);">$68,100</div>
                </div>
                <div style="background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 12px; padding: 16px;">
                  <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Collected</div>
                  <div style="font-size: 20px; font-weight: 600; font-family: var(--font-mono); color: var(--color-good);">$64,420</div>
                </div>
                <div style="background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 12px; padding: 16px;">
                  <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">Outstanding</div>
                  <div style="font-size: 20px; font-weight: 600; font-family: var(--font-mono); color: var(--color-warn);">$3,680</div>
                </div>
                <div style="background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 12px; padding: 16px;">
                  <div style="font-size: 12px; color: var(--color-text-secondary); margin-bottom: 4px;">NOI</div>
                  <div style="font-size: 20px; font-weight: 600; font-family: var(--font-mono); color: var(--color-text);">$41,210</div>
                </div>
              </div>
            </div>

            <!-- Recent activity -->
            <div>
              <h2 style="font-size: 16px; font-weight: 600; margin: 0 0 12px 0; color: var(--color-text);">Recent activity</h2>
              <div style="background: var(--color-surface); border: 1px solid var(--color-line); border-radius: 12px; overflow: hidden;">
                <div style="padding: 12px 16px; display: flex; flex-direction: column; gap: 12px;">
                  <div style="display: flex; gap: 10px; align-items: flex-start;">
                    <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--color-good); margin-top: 5px; flex-shrink: 0;"></div>
                    <div style="flex: 1;">
                      <div style="font-size: 13px; font-weight: 500; color: var(--color-text);">Lease signed \u2014 Unit 14B</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">T. Nakamura \u00b7 2 hours ago</div>
                    </div>
                  </div>
                  <div style="display: flex; gap: 10px; align-items: flex-start;">
                    <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--color-info); margin-top: 5px; flex-shrink: 0;"></div>
                    <div style="flex: 1;">
                      <div style="font-size: 13px; font-weight: 500; color: var(--color-text);">Inspection completed \u2014 Unit 8A</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">D. Okafor \u00b7 Yesterday</div>
                    </div>
                  </div>
                  <div style="display: flex; gap: 10px; align-items: flex-start;">
                    <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--color-warn); margin-top: 5px; flex-shrink: 0;"></div>
                    <div style="flex: 1;">
                      <div style="font-size: 13px; font-weight: 500; color: var(--color-text);">Work order created \u2014 Plumbing, Unit 3C</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">System \u00b7 2 days ago</div>
                    </div>
                  </div>
                  <div style="display: flex; gap: 10px; align-items: flex-start;">
                    <div style="width: 8px; height: 8px; border-radius: 50%; background: var(--color-danger); margin-top: 5px; flex-shrink: 0;"></div>
                    <div style="flex: 1;">
                      <div style="font-size: 13px; font-weight: 500; color: var(--color-text);">Rent overdue \u2014 Unit 11A</div>
                      <div style="font-size: 12px; color: var(--color-text-secondary);">System \u00b7 3 days ago</div>
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
