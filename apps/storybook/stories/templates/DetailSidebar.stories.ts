import type { Meta, StoryObj } from '@storybook/vue3'
import {
  PSidebar,
  PTopNav,
  PButton,
  PBadge,
  PDataTable,
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
  X,
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

const columns = [
  { key: 'property', label: 'Property' },
  { key: 'id', label: 'ID', mono: true },
  { key: 'units', label: 'Units', align: 'right' as const, mono: true },
  { key: 'occupancy', label: 'Occupancy', align: 'right' as const },
  { key: 'status', label: 'Status' },
]

const rows = [
  { property: 'Ashford Row', address: '214 Ashford St, Brooklyn NY', id: 'PRP-0128', units: 24, occupancy: '96%', status: 'Active', statusTone: 'good' },
  { property: 'Linden Court', address: '88 Linden Blvd, Queens NY', id: 'PRP-0127', units: 18, occupancy: '89%', status: 'Active', statusTone: 'good' },
  { property: 'Harper Hall', address: '402 Harper St, Bronx NY', id: 'PRP-0126', units: 36, occupancy: '78%', status: 'Active', statusTone: 'good', _selected: true },
  { property: 'Vine & Third', address: '1290 3rd Ave, Manhattan NY', id: 'PRP-0125', units: 6, occupancy: '100%', status: 'Active', statusTone: 'good' },
  { property: 'North Ridge', address: '55 Ridge Rd, Jersey City NJ', id: 'PRP-0124', units: 42, occupancy: '93%', status: 'Active', statusTone: 'good' },
  { property: 'Briarwood 7', address: '7 Briarwood Ln, Yonkers NY', id: 'PRP-0123', units: 12, occupancy: '100%', status: 'Active', statusTone: 'good' },
  { property: 'Cedar Lofts', address: '330 Cedar St, Hoboken NJ', id: 'PRP-0122', units: 28, occupancy: '82%', status: 'Review', statusTone: 'warn' },
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
      PSidebar,
      PTopNav,
      PButton,
      PBadge,
      PDataTable,
    },
    setup() {
      return {
        sidebarSections,
        columns,
        rows,
        ChevronRight,
        X,
      }
    },
    template: `
      <div class="w-full max-w-[1280px] min-h-screen lg:h-[820px] flex font-sans">
        <PSidebar active="property" :sections="sidebarSections" />

        <div class="flex-1 flex flex-col min-w-0">
          <PTopNav :breadcrumb="['Portfolio', 'Properties']" />

          <div style="flex: 1; display: flex; overflow: hidden;">

            <!-- Left: table list -->
            <div class="hidden lg:block flex-1 overflow-auto p-5 lg:p-6" style="background: var(--color-bg);">
              <PDataTable :columns="columns" :rows="rows" selectable sortable>
                <template #cell-property="{ row }">
                  <div>
                    <div :style="{ fontWeight: row._selected ? '600' : '500' }">{{ row.property }}</div>
                    <div style="font-size: 12px; color: var(--color-text-secondary);">{{ row.address }}</div>
                  </div>
                </template>
                <template #cell-status="{ row }">
                  <PBadge :tone="row.statusTone">{{ row.status }}</PBadge>
                </template>
              </PDataTable>
            </div>

            <!-- Right: detail panel -->
            <div class="w-full lg:w-[440px] lg:border-l flex flex-col flex-shrink-0" style="border-color: var(--color-line); background: var(--color-surface);">

              <!-- Panel header -->
              <div style="padding: 16px 20px; border-bottom: 1px solid var(--color-line);">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                  <span style="font-size: 12px; font-family: var(--font-mono); color: var(--color-text-secondary);">PRP-0126</span>
                  <button style="background: none; border: none; cursor: pointer; color: var(--color-text-secondary); padding: 2px;">
                    <span style="font-size: 18px;">\u00d7</span>
                  </button>
                </div>
                <!-- Thumbnail placeholder -->
                <div style="width: 100%; height: 120px; border-radius: 10px; background: var(--color-bg); border: 1px solid var(--color-line); margin-bottom: 12px; display: flex; align-items: center; justify-content: center;">
                  <div style="width: 40px; height: 40px; border-radius: 8px; background: var(--color-line);"></div>
                </div>
                <h2 style="font-size: 20px; font-weight: 600; margin: 0 0 4px 0; color: var(--color-text);">Harper Hall</h2>
                <div style="font-size: 13px; color: var(--color-text-secondary); margin-bottom: 8px;">402 Harper St, Bronx NY 10451</div>
                <div style="display: flex; gap: 6px;">
                  <PBadge tone="good">Active</PBadge>
                  <PBadge tone="neutral">Mixed-use</PBadge>
                </div>
              </div>

              <!-- Panel body -->
              <div style="flex: 1; overflow: auto; padding: 16px 20px;">

                <!-- Compact overview -->
                <div style="margin-bottom: 20px;">
                  <h3 style="font-size: 13px; font-weight: 600; margin: 0 0 10px 0; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Overview</h3>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px 20px;">
                    <div>
                      <div style="font-size: 11px; color: var(--color-text-secondary); margin-bottom: 2px;">Property ID</div>
                      <div style="font-size: 13px; font-family: var(--font-mono); color: var(--color-text);">PRP-0126</div>
                    </div>
                    <div>
                      <div style="font-size: 11px; color: var(--color-text-secondary); margin-bottom: 2px;">Type</div>
                      <div style="font-size: 13px; color: var(--color-text);">Mixed-use</div>
                    </div>
                    <div>
                      <div style="font-size: 11px; color: var(--color-text-secondary); margin-bottom: 2px;">Units</div>
                      <div style="font-size: 13px; color: var(--color-text);">36</div>
                    </div>
                    <div>
                      <div style="font-size: 11px; color: var(--color-text-secondary); margin-bottom: 2px;">Occupancy</div>
                      <div style="font-size: 13px; color: var(--color-text);">78%</div>
                    </div>
                    <div>
                      <div style="font-size: 11px; color: var(--color-text-secondary); margin-bottom: 2px;">Year built</div>
                      <div style="font-size: 13px; color: var(--color-text);">1962</div>
                    </div>
                    <div>
                      <div style="font-size: 11px; color: var(--color-text-secondary); margin-bottom: 2px;">Manager</div>
                      <div style="font-size: 13px; color: var(--color-text);">D. Okafor</div>
                    </div>
                  </div>
                </div>

                <!-- Financial snapshot -->
                <div style="margin-bottom: 20px;">
                  <h3 style="font-size: 13px; font-weight: 600; margin: 0 0 10px 0; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Financial snapshot</h3>
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div style="background: var(--color-bg); border-radius: 8px; padding: 10px 12px;">
                      <div style="font-size: 11px; color: var(--color-text-secondary); margin-bottom: 2px;">Gross rent</div>
                      <div style="font-size: 16px; font-weight: 600; font-family: var(--font-mono); color: var(--color-text);">$68,100</div>
                    </div>
                    <div style="background: var(--color-bg); border-radius: 8px; padding: 10px 12px;">
                      <div style="font-size: 11px; color: var(--color-text-secondary); margin-bottom: 2px;">Collected</div>
                      <div style="font-size: 16px; font-weight: 600; font-family: var(--font-mono); color: var(--color-good);">$64,420</div>
                    </div>
                    <div style="background: var(--color-bg); border-radius: 8px; padding: 10px 12px;">
                      <div style="font-size: 11px; color: var(--color-text-secondary); margin-bottom: 2px;">Outstanding</div>
                      <div style="font-size: 16px; font-weight: 600; font-family: var(--font-mono); color: var(--color-warn);">$3,680</div>
                    </div>
                    <div style="background: var(--color-bg); border-radius: 8px; padding: 10px 12px;">
                      <div style="font-size: 11px; color: var(--color-text-secondary); margin-bottom: 2px;">NOI</div>
                      <div style="font-size: 16px; font-weight: 600; font-family: var(--font-mono); color: var(--color-text);">$41,210</div>
                    </div>
                  </div>
                </div>

                <!-- Recent activity -->
                <div>
                  <h3 style="font-size: 13px; font-weight: 600; margin: 0 0 10px 0; color: var(--color-text-secondary); text-transform: uppercase; letter-spacing: 0.5px;">Recent activity</h3>
                  <div style="display: flex; flex-direction: column; gap: 10px;">
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                      <div style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-good); margin-top: 5px; flex-shrink: 0;"></div>
                      <div>
                        <div style="font-size: 12px; font-weight: 500; color: var(--color-text);">Lease signed \u2014 Unit 14B</div>
                        <div style="font-size: 11px; color: var(--color-text-secondary);">2 hours ago</div>
                      </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                      <div style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-info); margin-top: 5px; flex-shrink: 0;"></div>
                      <div>
                        <div style="font-size: 12px; font-weight: 500; color: var(--color-text);">Inspection completed \u2014 Unit 8A</div>
                        <div style="font-size: 11px; color: var(--color-text-secondary);">Yesterday</div>
                      </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                      <div style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-warn); margin-top: 5px; flex-shrink: 0;"></div>
                      <div>
                        <div style="font-size: 12px; font-weight: 500; color: var(--color-text);">Work order \u2014 Plumbing, Unit 3C</div>
                        <div style="font-size: 11px; color: var(--color-text-secondary);">2 days ago</div>
                      </div>
                    </div>
                    <div style="display: flex; gap: 8px; align-items: flex-start;">
                      <div style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-danger); margin-top: 5px; flex-shrink: 0;"></div>
                      <div>
                        <div style="font-size: 12px; font-weight: 500; color: var(--color-text);">Rent overdue \u2014 Unit 11A</div>
                        <div style="font-size: 11px; color: var(--color-text-secondary);">3 days ago</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              <!-- Panel footer -->
              <div style="padding: 12px 20px; border-top: 1px solid var(--color-line); display: flex; gap: 8px; justify-content: flex-end;">
                <PButton variant="ghost" :icon="ChevronRight">Open full page</PButton>
                <PButton variant="primary">Edit property</PButton>
              </div>

            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
