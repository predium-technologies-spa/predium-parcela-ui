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

const propertyRows = [
  { name: 'New property (draft)', id: 'PRP-0139', type: 'Multi-family', units: '—', occupancy: '—', rent: '—', status: 'Draft', draft: true },
  { name: 'Ashford Row', id: 'PRP-0118', type: 'Multi-family', units: '24', occupancy: '96%', rent: '$38,400', status: 'Active' },
  { name: 'Linden Court', id: 'PRP-0122', type: 'Multi-family', units: '18', occupancy: '89%', rent: '$27,900', status: 'Active' },
  { name: 'Harper Hall', id: 'PRP-0126', type: 'Multi-family', units: '36', occupancy: '92%', rent: '$54,000', status: 'Active' },
  { name: 'Waverly Place', id: 'PRP-0131', type: 'Townhome', units: '8', occupancy: '100%', rent: '$14,800', status: 'Review' },
  { name: 'Greystone Terrace', id: 'PRP-0134', type: 'Multi-family', units: '42', occupancy: '85%', rent: '$63,000', status: 'Onboarding' },
  { name: 'Cedar Lofts', id: 'PRP-0137', type: 'Single-family', units: '12', occupancy: '91%', rent: '$19,200', status: 'Active' },
]

const meta: Meta = {
  title: 'Templates/FormDrawer',
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
      PRightDrawer,
      PFormField,
      PInput,
      PSegmentedButton,
      PSelect,
      PButton,
      PProgressBar,
    },
    setup() {
      const propertyClass = ref('B+')
      return {
        sidebarSections,
        propertyRows,
        Calendar,
        propertyClass,
      }
    },
    template: `
      <div style="display: flex; width: 1280px; height: 820px; overflow: hidden; background: var(--color-bg);">
        <!-- Sidebar -->
        <PSidebar :sections="sidebarSections" active="property" />

        <!-- Main area -->
        <div style="flex: 1; display: flex; flex-direction: column; min-width: 0;">
          <PTopNav :breadcrumb="['Portfolio', 'Properties', 'New property']" />

          <!-- Content split -->
          <div style="flex: 1; display: flex; overflow: hidden;">
            <!-- Left: dimmed property list -->
            <div style="flex: 1; opacity: 0.55; overflow-y: auto; padding: 0;">
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <thead>
                  <tr style="border-bottom: 1px solid var(--color-border); text-align: left;">
                    <th style="padding: 10px 16px; font-weight: 500; color: var(--color-text-secondary); font-size: 12px;">Property</th>
                    <th style="padding: 10px 12px; font-weight: 500; color: var(--color-text-secondary); font-size: 12px;">ID</th>
                    <th style="padding: 10px 12px; font-weight: 500; color: var(--color-text-secondary); font-size: 12px;">Type</th>
                    <th style="padding: 10px 12px; font-weight: 500; color: var(--color-text-secondary); font-size: 12px; text-align: right;">Units</th>
                    <th style="padding: 10px 12px; font-weight: 500; color: var(--color-text-secondary); font-size: 12px; text-align: right;">Occupancy</th>
                    <th style="padding: 10px 12px; font-weight: 500; color: var(--color-text-secondary); font-size: 12px; text-align: right;">Rent roll</th>
                    <th style="padding: 10px 16px; font-weight: 500; color: var(--color-text-secondary); font-size: 12px;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, i) in propertyRows"
                    :key="row.id"
                    :style="{
                      borderBottom: '1px solid var(--color-border)',
                      background: row.draft ? 'var(--color-bg-hover)' : 'transparent',
                      opacity: row.draft ? '1' : undefined,
                    }"
                  >
                    <td style="padding: 10px 16px;">
                      <span :style="{ fontWeight: row.draft ? 600 : 400 }">{{ row.name }}</span>
                    </td>
                    <td style="padding: 10px 12px; font-family: var(--font-mono); font-size: 12px;">{{ row.id }}</td>
                    <td style="padding: 10px 12px;">{{ row.type }}</td>
                    <td style="padding: 10px 12px; text-align: right; font-family: var(--font-mono); font-size: 12px;">{{ row.units }}</td>
                    <td style="padding: 10px 12px; text-align: right;">{{ row.occupancy }}</td>
                    <td style="padding: 10px 12px; text-align: right; font-family: var(--font-mono); font-size: 12px;">{{ row.rent }}</td>
                    <td style="padding: 10px 16px;">
                      <span
                        :style="{
                          fontSize: '11px',
                          padding: '2px 8px',
                          borderRadius: '9999px',
                          background: row.draft ? 'var(--color-warn-subtle)' : 'var(--color-good-subtle)',
                          color: row.draft ? 'var(--color-warn)' : 'var(--color-good)',
                        }"
                      >{{ row.status }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Right: Drawer -->
            <div style="width: 460px; border-left: 1px solid var(--color-border); display: flex; flex-direction: column; background: var(--color-bg-surface);">
              <!-- Drawer header -->
              <div style="padding: 20px 24px 0; border-bottom: 1px solid var(--color-border);">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-secondary); margin-bottom: 4px;">New record</div>
                <div style="font-size: 18px; font-weight: 600; color: var(--color-text); margin-bottom: 4px;">Add property</div>
                <div style="font-size: 13px; color: var(--color-text-secondary); margin-bottom: 16px;">Draft will autosave &middot; 3 of 4 sections complete</div>

                <!-- Stepper bar -->
                <div style="display: flex; gap: 8px; padding-bottom: 16px;">
                  <div style="flex: 1; text-align: center;">
                    <div style="height: 3px; background: var(--color-good); border-radius: 2px; margin-bottom: 6px;"></div>
                    <span style="font-size: 11px; color: var(--color-good);">Identity &#10003;</span>
                  </div>
                  <div style="flex: 1; text-align: center;">
                    <div style="height: 3px; background: var(--color-good); border-radius: 2px; margin-bottom: 6px;"></div>
                    <span style="font-size: 11px; color: var(--color-good);">Address &#10003;</span>
                  </div>
                  <div style="flex: 1; text-align: center;">
                    <div style="height: 3px; background: var(--color-primary); border-radius: 2px; margin-bottom: 6px;"></div>
                    <span style="font-size: 11px; font-weight: 600; color: var(--color-primary);">Financials</span>
                  </div>
                  <div style="flex: 1; text-align: center;">
                    <div style="height: 3px; background: var(--color-border); border-radius: 2px; margin-bottom: 6px;"></div>
                    <span style="font-size: 11px; color: var(--color-text-secondary);">Team</span>
                  </div>
                </div>
              </div>

              <!-- Body -->
              <div style="flex: 1; overflow-y: auto; padding: 20px 24px;">
                <div style="font-size: 14px; font-weight: 600; color: var(--color-text); margin-bottom: 16px;">Financials</div>

                <div style="display: flex; flex-direction: column; gap: 16px;">
                  <PFormField label="Acquisition price" required>
                    <PInput modelValue="4,280,000" mono suffix="USD" />
                  </PFormField>

                  <PFormField label="Acquisition date" required>
                    <PInput modelValue="Mar 14, 2021" :icon="Calendar" />
                  </PFormField>

                  <PFormField label="Property class">
                    <PSegmentedButton v-model="propertyClass" :options="['A', 'B', 'B+', 'C']" />
                  </PFormField>

                  <PFormField label="Base rent estimate">
                    <PInput modelValue="1,890.00" mono suffix="/ unit / mo" />
                  </PFormField>

                  <PFormField label="Expense ratio">
                    <PInput modelValue="38" mono suffix="%" />
                  </PFormField>

                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                    <PFormField label="Cap rate">
                      <PInput modelValue="5.4" mono suffix="%" />
                    </PFormField>
                    <PFormField label="Tax assessment">
                      <PInput modelValue="3,710,000" mono suffix="USD" />
                    </PFormField>
                  </div>

                  <PFormField label="Reporting currency">
                    <PSelect
                      modelValue="usd"
                      :options="[
                        { label: 'USD — United States Dollar', value: 'usd' },
                        { label: 'EUR — Euro', value: 'eur' },
                        { label: 'GBP — British Pound', value: 'gbp' },
                      ]"
                    />
                  </PFormField>

                  <PFormField label="Internal notes">
                    <div
                      style="
                        min-height: 80px;
                        padding: 10px 12px;
                        border: 1px solid var(--color-border);
                        border-radius: 6px;
                        font-size: 13px;
                        color: var(--color-text-secondary);
                        background: var(--color-bg);
                        line-height: 1.5;
                      "
                    >Acquired as part of the Bronx portfolio deal. Cap rate negotiated below market due to renovation upside. Review with D. Okafor before finalizing.</div>
                  </PFormField>
                </div>
              </div>

              <!-- Footer -->
              <div style="padding: 12px 24px; border-top: 1px solid var(--color-border); display: flex; align-items: center; gap: 8px;">
                <PButton variant="ghost">Back</PButton>
                <div style="flex: 1; text-align: center; font-size: 12px; color: var(--color-text-secondary);">Saved 14s ago</div>
                <PButton variant="ghost">Save draft</PButton>
                <PButton variant="primary">Continue &rarr;</PButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}
