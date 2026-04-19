import type { Meta, StoryObj } from '@storybook/vue3'
import {
  PSidebar,
  PTopNav,
  PStepNav,
  PFormSection,
  PFormField,
  PInput,
  PSelect,
  PSegmentedButton,
  PChip,
  PBadge,
  PButton,
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
  Upload,
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

const stepNavSteps = [
  { label: 'Identity' },
  { label: 'Address & Location' },
  { label: 'Structure' },
  { label: 'Financials' },
  { label: 'Team & Access' },
  { label: 'Documents' },
]

const meta: Meta = {
  title: 'Templates/FullForm',
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
      PStepNav,
      PFormSection,
      PFormField,
      PInput,
      PSelect,
      PSegmentedButton,
      PChip,
      PBadge,
      PButton,
    },
    setup() {
      const propertyClass = ref('B+')
      return {
        sidebarSections,
        stepNavSteps,
        Calendar,
        Upload,
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

          <!-- Content row -->
          <div style="flex: 1; display: flex; overflow: hidden;">
            <!-- Step Nav -->
            <PStepNav :steps="stepNavSteps" :current="3" :completed="[0, 1, 2]" />

            <!-- Form body -->
            <div style="flex: 1; overflow-y: auto; background: var(--color-bg); padding: 24px 32px 120px;">
              <!-- Page header -->
              <div style="margin-bottom: 24px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-secondary); margin-bottom: 4px;">New record</div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="font-size: 22px; font-weight: 600; color: var(--color-text);">Add property</span>
                  <PBadge tone="warn">Draft &middot; autosaved 12s ago</PBadge>
                </div>
              </div>

              <!-- Section 01: Identity -->
              <PFormSection number="01" title="Identity">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <PFormField label="Property name" required :cols="2">
                    <PInput modelValue="Harper Hall" />
                  </PFormField>
                  <PFormField label="Property ID">
                    <PInput modelValue="PRP-0126" mono />
                  </PFormField>
                  <PFormField label="Internal code">
                    <PInput modelValue="HRP-BX-02" mono />
                  </PFormField>
                  <PFormField label="Classification">
                    <PSelect
                      modelValue="mixed-use"
                      :options="[
                        { label: 'Multi-family', value: 'multi-family' },
                        { label: 'Mixed-use', value: 'mixed-use' },
                        { label: 'Commercial', value: 'commercial' },
                      ]"
                    />
                  </PFormField>
                  <PFormField label="Sub-type">
                    <PSelect
                      modelValue="residential-retail"
                      :options="[
                        { label: 'Residential over retail', value: 'residential-retail' },
                        { label: 'Office over retail', value: 'office-retail' },
                      ]"
                    />
                  </PFormField>
                  <PFormField label="Tags" :cols="2">
                    <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                      <PChip removable>core</PChip>
                      <PChip removable>renovated-2019</PChip>
                      <PChip removable>bronx</PChip>
                    </div>
                  </PFormField>
                </div>
              </PFormSection>

              <!-- Section 02: Address & Location -->
              <PFormSection number="02" title="Address & Location">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <PFormField label="Street" :cols="2">
                    <PInput modelValue="402 Harper St" />
                  </PFormField>
                  <PFormField label="City">
                    <PInput modelValue="Bronx" />
                  </PFormField>
                  <PFormField label="State">
                    <PSelect
                      modelValue="ny"
                      :options="[
                        { label: 'New York', value: 'ny' },
                        { label: 'New Jersey', value: 'nj' },
                        { label: 'Connecticut', value: 'ct' },
                      ]"
                    />
                  </PFormField>
                  <PFormField label="ZIP">
                    <PInput modelValue="10457" mono />
                  </PFormField>
                  <PFormField label="County">
                    <PInput placeholder="Enter county" />
                  </PFormField>
                  <PFormField label="Latitude">
                    <PInput placeholder="e.g. 40.8448" mono />
                  </PFormField>
                  <PFormField label="Longitude">
                    <PInput placeholder="e.g. -73.8958" mono />
                  </PFormField>
                  <PFormField label="Parcel / APN" :cols="2">
                    <PInput placeholder="Enter parcel number" mono />
                  </PFormField>
                </div>
              </PFormSection>

              <!-- Section 03: Structure -->
              <PFormSection number="03" title="Structure">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <PFormField label="Year built">
                    <PInput modelValue="1948" mono />
                  </PFormField>
                  <PFormField label="Last renovation">
                    <PInput modelValue="2019" mono />
                  </PFormField>
                  <PFormField label="Floors above grade">
                    <PInput placeholder="e.g. 6" mono />
                  </PFormField>
                  <PFormField label="Floors below grade">
                    <PInput placeholder="e.g. 1" mono />
                  </PFormField>
                  <PFormField label="Gross area" :cols="2">
                    <PInput modelValue="42,180" mono suffix="sq ft" />
                  </PFormField>
                </div>
              </PFormSection>

              <!-- Section 04: Financials (current) -->
              <PFormSection number="04" title="Financials" :current="true">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <PFormField label="Acquisition price" required :cols="2">
                    <PInput modelValue="4,280,000" mono suffix="USD" />
                  </PFormField>
                  <PFormField label="Acquisition date" required>
                    <PInput modelValue="Mar 14, 2021" :icon="Calendar" />
                  </PFormField>
                  <PFormField label="Property class">
                    <PSegmentedButton v-model="propertyClass" :options="['A', 'B', 'B+', 'C']" />
                  </PFormField>
                  <PFormField label="Base rent estimate" :cols="2">
                    <PInput modelValue="1,890.00" mono suffix="/ unit / mo" />
                  </PFormField>
                  <PFormField label="Expense ratio">
                    <PInput modelValue="38" mono suffix="%" />
                  </PFormField>
                  <PFormField label="Cap rate">
                    <PInput modelValue="5.4" mono suffix="%" />
                  </PFormField>
                  <PFormField label="Tax assessment">
                    <PInput modelValue="3,710,000" mono suffix="USD" />
                  </PFormField>
                </div>
              </PFormSection>

              <!-- Section 05: Team & Access -->
              <PFormSection number="05" title="Team & Access">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <PFormField label="Primary manager">
                    <PInput modelValue="D. Okafor" />
                  </PFormField>
                  <PFormField label="Owner entity">
                    <PInput placeholder="Select entity" />
                  </PFormField>
                </div>
              </PFormSection>

              <!-- Section 06: Documents -->
              <PFormSection number="06" title="Documents">
                <div
                  style="
                    border: 2px dashed var(--color-border);
                    border-radius: 8px;
                    padding: 32px;
                    text-align: center;
                    color: var(--color-text-secondary);
                    font-size: 13px;
                  "
                >
                  <component :is="Upload" :size="24" style="margin: 0 auto 8px; display: block; opacity: 0.5;" />
                  <div>Drag files here or click to browse</div>
                  <div style="font-size: 12px; margin-top: 4px;">PDF, DOC, XLS up to 25 MB each</div>
                </div>
              </PFormSection>
            </div>
          </div>

          <!-- Sticky footer -->
          <div style="height: 56px; border-top: 1px solid var(--color-border); display: flex; align-items: center; padding: 0 24px; gap: 12px; background: var(--color-bg-surface); flex-shrink: 0;">
            <PButton variant="ghost">Previous</PButton>
            <span style="font-size: 13px; color: var(--color-text-secondary);">04 of 06 &middot; Financials</span>
            <div style="flex: 1;"></div>
            <span style="font-size: 12px; color: var(--color-text-secondary);">Autosaved 12s ago</span>
            <PButton variant="ghost">Save draft</PButton>
            <PButton variant="ghost">Preview</PButton>
            <PButton variant="primary">Continue to Team</PButton>
          </div>
        </div>
      </div>
    `,
  }),
}
