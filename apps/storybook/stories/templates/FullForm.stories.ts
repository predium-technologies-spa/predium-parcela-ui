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
  ChevronRight,
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
  { number: '01', label: 'Identity' },
  { number: '02', label: 'Address & Location' },
  { number: '03', label: 'Structure' },
  { number: '04', label: 'Financials' },
  { number: '05', label: 'Team & Access' },
  { number: '06', label: 'Documents' },
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
      PSidebar, PTopNav, PStepNav, PFormSection, PFormField,
      PInput, PSelect, PSegmentedButton, PChip, PBadge, PButton,
    },
    setup() {
      const sidebarExpanded = ref(true)
      const propertyClass = ref('B+')
      return {
        sidebarSections, stepNavSteps, Calendar, Upload, ChevronRight,
        propertyClass, sidebarExpanded,
      }
    },
    template: `
      <div class="flex w-full max-w-[1280px] min-h-screen lg:h-[820px] overflow-hidden bg-bg font-sans text-ink">
        <PSidebar :sections="sidebarSections" active="property" v-model:expanded="sidebarExpanded" />

        <div class="flex-1 flex flex-col min-w-0">
          <PTopNav :breadcrumb="['Portfolio', 'Properties', 'New property']" />

          <div class="flex-1 flex overflow-hidden">
            <PStepNav :steps="stepNavSteps" :current="3" :completed="[0, 1, 2]" />

            <!-- Form body -->
            <div class="flex-1 overflow-y-auto p-6 lg:p-8 pb-24 bg-bg">
              <!-- Header -->
              <div class="mb-6">
                <div class="text-xs uppercase tracking-wide text-ink4 font-medium mb-1">New record</div>
                <div class="flex items-center gap-3">
                  <span class="text-2xl font-semibold text-ink tracking-tight">Add property</span>
                  <PBadge tone="warn">Draft · autosaved 12s ago</PBadge>
                </div>
                <p class="text-base text-ink3 mt-1">Complete all sections to publish.</p>
              </div>

              <!-- 01 Identity -->
              <PFormSection number="01" title="Identity" description="How this property is identified in the system.">
                <PFormField label="Property name" required :cols="2">
                  <PInput model-value="Harper Hall" />
                </PFormField>
                <PFormField label="Property ID" hint="auto">
                  <PInput model-value="PRP-0126" mono />
                </PFormField>
                <PFormField label="Internal code">
                  <PInput model-value="HRP-BX-02" mono />
                </PFormField>
                <PFormField label="Classification" required>
                  <PSelect model-value="Mixed-use" :options="['Multifamily', 'Mixed-use', 'Retail', 'Office']" />
                </PFormField>
                <PFormField label="Sub-type">
                  <PSelect model-value="Residential over retail" :options="['Residential over retail', 'Office over retail']" />
                </PFormField>
                <PFormField label="Tags" :cols="2">
                  <div class="flex flex-wrap gap-1.5">
                    <PChip removable>core</PChip>
                    <PChip removable>renovated-2019</PChip>
                    <PChip removable>bronx</PChip>
                    <PChip removable>section8-eligible</PChip>
                  </div>
                </PFormField>
              </PFormSection>

              <!-- 02 Address -->
              <PFormSection number="02" title="Address & Location" description="Physical location for maps, routing, and tax filings.">
                <PFormField label="Street" required :cols="2">
                  <PInput model-value="402 Harper St" />
                </PFormField>
                <PFormField label="City" required>
                  <PInput model-value="Bronx" />
                </PFormField>
                <PFormField label="State" required>
                  <PSelect model-value="New York" :options="['New York', 'New Jersey', 'Connecticut']" />
                </PFormField>
                <PFormField label="ZIP" required>
                  <PInput model-value="10457" mono />
                </PFormField>
                <PFormField label="County">
                  <PInput model-value="Bronx County" />
                </PFormField>
                <PFormField label="Latitude">
                  <PInput model-value="40.8537" mono />
                </PFormField>
                <PFormField label="Longitude">
                  <PInput model-value="-73.8814" mono />
                </PFormField>
                <PFormField label="Parcel / APN" :cols="2" hint="Used for tax matching">
                  <PInput model-value="BX-2988-0042-01" mono />
                </PFormField>
              </PFormSection>

              <!-- 03 Structure -->
              <PFormSection number="03" title="Structure" description="Physical characteristics of the building.">
                <PFormField label="Year built" required>
                  <PInput model-value="1948" mono />
                </PFormField>
                <PFormField label="Last renovation">
                  <PInput model-value="2019" mono />
                </PFormField>
                <PFormField label="Floors above grade">
                  <PInput model-value="5" mono />
                </PFormField>
                <PFormField label="Floors below grade">
                  <PInput model-value="1" mono />
                </PFormField>
                <PFormField label="Gross area" required>
                  <PInput model-value="42,180" mono suffix="sqft" />
                </PFormField>
                <PFormField label="Net leasable area">
                  <PInput model-value="36,420" mono suffix="sqft" />
                </PFormField>
                <PFormField label="Residential units" required>
                  <PInput model-value="36" mono />
                </PFormField>
                <PFormField label="Commercial units">
                  <PInput model-value="4" mono />
                </PFormField>
              </PFormSection>

              <!-- 04 Financials (current) -->
              <PFormSection number="04" title="Financials" :current="true" description="Acquisition, rent estimates, and tax metadata.">
                <PFormField label="Acquisition price" required hint="USD">
                  <PInput model-value="4,280,000" mono suffix="USD" />
                </PFormField>
                <PFormField label="Acquisition date" required>
                  <PInput model-value="Mar 14, 2021" :icon="Calendar" />
                </PFormField>
                <PFormField label="Property class" required :cols="2">
                  <PSegmentedButton v-model="propertyClass" :options="['A', 'B', 'B+', 'C', 'D']" />
                </PFormField>
                <PFormField label="Base rent estimate" hint="Blended avg">
                  <PInput model-value="1,890.00" mono suffix="/ unit / mo" />
                </PFormField>
                <PFormField label="Expense ratio" hint="Of gross">
                  <PInput model-value="38" mono suffix="%" />
                </PFormField>
                <PFormField label="Cap rate">
                  <PInput model-value="5.4" mono suffix="%" />
                </PFormField>
                <PFormField label="Tax assessment">
                  <PInput model-value="3,710,000" mono suffix="USD" />
                </PFormField>
                <PFormField label="Reporting currency" :cols="2">
                  <PSelect model-value="USD — United States Dollar" :options="['USD — United States Dollar', 'CLP — Chilean Peso']" />
                </PFormField>
              </PFormSection>

              <!-- 05 Team & Access -->
              <PFormSection number="05" title="Team & Access" description="Who manages this property.">
                <PFormField label="Primary manager" required>
                  <PInput model-value="D. Okafor" />
                </PFormField>
                <PFormField label="Owner entity" required>
                  <PSelect model-value="Meridian Holdings LLC" :options="['Meridian Holdings LLC', 'Parcela Inc.']" />
                </PFormField>
                <PFormField label="Backup manager">
                  <PSelect placeholder="Select a user" :options="['L. Moreno', 'A. Petrov']" />
                </PFormField>
                <PFormField label="Maintenance vendor">
                  <PSelect model-value="North Bronx Services" :options="['North Bronx Services', 'Metro Repairs']" />
                </PFormField>
              </PFormSection>

              <!-- 06 Documents -->
              <PFormSection number="06" title="Documents" description="Deed, title, insurance, inspection reports.">
                <PFormField label="Attachments" :cols="2">
                  <div class="flex flex-col items-center justify-center gap-2 p-8 rounded-xl text-center" style="border: 2px dashed var(--color-line);">
                    <component :is="Upload" :size="20" class="text-ink4" />
                    <div class="text-base font-medium text-ink2">Drop files or browse</div>
                    <div class="text-sm text-ink4">PDF, DOC, XLS · up to 25 MB each</div>
                  </div>
                </PFormField>
              </PFormSection>
            </div>
          </div>

          <!-- Sticky footer -->
          <div class="flex flex-wrap items-center gap-3 px-6 py-3 bg-surface shrink-0" style="border-top: 1px solid var(--color-line-soft);">
            <PButton variant="ghost">Previous</PButton>
            <span class="hidden sm:inline text-sm text-ink3">
              <span class="font-mono text-ink2">04</span> of <span class="font-mono text-ink2">06</span> · Financials
            </span>
            <div class="flex-1" />
            <span class="hidden md:inline text-sm text-ink4">Autosaved 12s ago</span>
            <PButton variant="ghost" class="hidden md:inline-flex">Save draft</PButton>
            <PButton variant="ghost" class="hidden sm:inline-flex">Preview</PButton>
            <PButton variant="primary" :icon="ChevronRight">Continue to Team</PButton>
          </div>
        </div>
      </div>
    `,
  }),
}
