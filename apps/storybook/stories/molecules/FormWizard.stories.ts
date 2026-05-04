import type { Meta, StoryObj } from '@storybook/vue3'
import {
  PFormWizard,
  PFormField,
  PInput,
  PSelect,
  PTextarea,
  PSegmentedButton,
  PCheckbox,
  PChip,
  PDatePicker,
  PFileUploader,
} from '@predium-technologies-spa/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PFormWizard> = {
  title: 'Molecules/FormWizard',
  component: PFormWizard,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof PFormWizard>

export const Default: Story = {
  render: () => ({
    components: {
      PFormWizard, PFormField, PInput, PSelect, PTextarea,
      PSegmentedButton, PCheckbox, PChip, PDatePicker, PFileUploader,
    },
    setup() {
      const step = ref(0)
      const propertyClass = ref('B+')
      const steps = [
        { title: 'Identity', description: 'How this property is identified in the system and on documents.' },
        { title: 'Address & Location', description: 'Physical location used for maps, routing, and tax filings.' },
        { title: 'Structure', description: 'Physical characteristics of the building.' },
        { title: 'Financials', description: 'Acquisition, rent estimates, and tax metadata.' },
        { title: 'Team & Access', description: 'Who manages this property and what they can do.' },
        { title: 'Documents', description: 'Deed, title, insurance, inspection reports.' },
      ]
      return { step, steps, propertyClass }
    },
    template: `
      <div style="height: 100vh;">
        <PFormWizard
          :steps="steps"
          v-model:current-step="step"
          finish-label="Publish property"
          autosave-text="Autosaved 12s ago"
          @finish="alert('Published!')"
        >
          <!-- Step 0: Identity -->
          <template #step-0>
            <div class="flex flex-col gap-4">
              <PFormField label="Property name" required>
                <PInput model-value="Harper Hall" placeholder="e.g. Ashford Row" />
              </PFormField>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PFormField label="Property ID" hint="auto">
                  <PInput model-value="PRP-0126" mono />
                </PFormField>
                <PFormField label="Internal code">
                  <PInput model-value="HRP-BX-02" mono />
                </PFormField>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PFormField label="Classification" required>
                  <PSelect model-value="Mixed-use" :options="['Multifamily', 'Mixed-use', 'Retail', 'Office']" />
                </PFormField>
                <PFormField label="Sub-type">
                  <PSelect model-value="Residential over retail" :options="['Residential over retail', 'Office over retail']" />
                </PFormField>
              </div>
              <PFormField label="Tags">
                <div class="flex flex-wrap gap-1.5">
                  <PChip removable>core</PChip>
                  <PChip removable>renovated-2019</PChip>
                  <PChip removable>bronx</PChip>
                  <PChip removable>section8-eligible</PChip>
                </div>
              </PFormField>
            </div>
          </template>

          <!-- Step 1: Address -->
          <template #step-1>
            <div class="flex flex-col gap-4">
              <PFormField label="Street address" required>
                <PInput model-value="402 Harper St" placeholder="Street name and number" />
              </PFormField>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <PFormField label="City" required>
                  <PInput model-value="Bronx" />
                </PFormField>
                <PFormField label="State" required>
                  <PSelect model-value="New York" :options="['New York', 'New Jersey', 'Connecticut']" />
                </PFormField>
                <PFormField label="ZIP" required>
                  <PInput model-value="10457" mono />
                </PFormField>
              </div>
              <PFormField label="County">
                <PInput model-value="Bronx County" />
              </PFormField>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PFormField label="Latitude">
                  <PInput model-value="40.8537" mono />
                </PFormField>
                <PFormField label="Longitude">
                  <PInput model-value="-73.8814" mono />
                </PFormField>
              </div>
              <PFormField label="Parcel / APN" hint="Used for tax matching">
                <PInput model-value="BX-2988-0042-01" mono />
              </PFormField>
            </div>
          </template>

          <!-- Step 2: Structure -->
          <template #step-2>
            <div class="flex flex-col gap-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PFormField label="Year built" required>
                  <PInput model-value="1948" mono />
                </PFormField>
                <PFormField label="Last renovation">
                  <PInput model-value="2019" mono />
                </PFormField>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PFormField label="Floors above grade">
                  <PInput model-value="5" mono />
                </PFormField>
                <PFormField label="Floors below grade">
                  <PInput model-value="1" mono />
                </PFormField>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PFormField label="Gross area" required>
                  <PInput model-value="42,180" mono suffix="sqft" />
                </PFormField>
                <PFormField label="Net leasable area">
                  <PInput model-value="36,420" mono suffix="sqft" />
                </PFormField>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PFormField label="Residential units" required>
                  <PInput model-value="36" mono />
                </PFormField>
                <PFormField label="Commercial units">
                  <PInput model-value="4" mono />
                </PFormField>
              </div>
              <PFormField label="Amenities">
                <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <PCheckbox :model-value="true">Elevator</PCheckbox>
                  <PCheckbox :model-value="true">Laundry</PCheckbox>
                  <PCheckbox :model-value="false">Gym</PCheckbox>
                  <PCheckbox :model-value="true">Rooftop</PCheckbox>
                  <PCheckbox :model-value="false">Doorman</PCheckbox>
                  <PCheckbox :model-value="true">Bike storage</PCheckbox>
                  <PCheckbox :model-value="true">Package room</PCheckbox>
                  <PCheckbox :model-value="true">Pet friendly</PCheckbox>
                </div>
              </PFormField>
            </div>
          </template>

          <!-- Step 3: Financials -->
          <template #step-3>
            <div class="flex flex-col gap-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PFormField label="Acquisition price" required hint="USD">
                  <PInput model-value="4,280,000" mono suffix="USD" />
                </PFormField>
                <PFormField label="Acquisition date" required>
                  <PDatePicker model-value="2021-03-14" />
                </PFormField>
              </div>
              <PFormField label="Property class" required>
                <PSegmentedButton v-model="propertyClass" :options="['A', 'B', 'B+', 'C', 'D']" />
              </PFormField>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PFormField label="Base rent estimate" hint="Blended avg">
                  <PInput model-value="1,890.00" mono suffix="/ unit / mo" />
                </PFormField>
                <PFormField label="Expense ratio" hint="Of gross">
                  <PInput model-value="38" mono suffix="%" />
                </PFormField>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <PTextarea model-value="Seller financing 20% of purchase. Roof replaced 2023. Legal review pending for unit 3A conversion." :rows="3" />
              </PFormField>
            </div>
          </template>

          <!-- Step 4: Team -->
          <template #step-4>
            <div class="flex flex-col gap-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PFormField label="Primary manager" required>
                  <PSelect model-value="D. Okafor" :options="['D. Okafor', 'L. Moreno', 'A. Petrov']" />
                </PFormField>
                <PFormField label="Owner entity" required>
                  <PSelect model-value="Meridian Holdings LLC" :options="['Meridian Holdings LLC', 'Parcela Inc.']" />
                </PFormField>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PFormField label="Backup manager">
                  <PSelect placeholder="Select a user" :options="['L. Moreno', 'A. Petrov']" />
                </PFormField>
                <PFormField label="Maintenance vendor">
                  <PSelect model-value="North Bronx Services" :options="['North Bronx Services', 'Metro Repairs']" />
                </PFormField>
              </div>
            </div>
          </template>

          <!-- Step 5: Documents -->
          <template #step-5>
            <div class="flex flex-col gap-4">
              <PFormField label="Upload documents">
                <PFileUploader accept=".pdf,.doc,.docx,.xls,.xlsx" multiple label="Drop files here or" />
              </PFormField>
            </div>
          </template>
        </PFormWizard>
      </div>
    `,
  }),
}

export const ShortForm: Story = {
  render: () => ({
    components: { PFormWizard, PFormField, PInput, PSelect, PTextarea },
    setup() {
      const step = ref(0)
      const steps = [
        { title: 'Tenant info', description: 'Basic information about the tenant.' },
        { title: 'Lease details', description: 'Terms and dates of the lease agreement.' },
        { title: 'Review', description: 'Review and confirm all details.' },
      ]
      return { step, steps }
    },
    template: `
      <div style="height: 100vh;">
        <PFormWizard :steps="steps" v-model:current-step="step" finish-label="Create tenant">
          <template #step-0>
            <div class="flex flex-col gap-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PFormField label="First name" required>
                  <PInput placeholder="First name" />
                </PFormField>
                <PFormField label="Last name" required>
                  <PInput placeholder="Last name" />
                </PFormField>
              </div>
              <PFormField label="Email" required>
                <PInput placeholder="email@example.com" type="email" />
              </PFormField>
              <PFormField label="Phone">
                <PInput placeholder="+1 (555) 123-4567" />
              </PFormField>
            </div>
          </template>
          <template #step-1>
            <div class="flex flex-col gap-4">
              <PFormField label="Property" required>
                <PSelect placeholder="Select property" :options="['Harper Hall', 'Cedar Lofts', 'Ashford Row']" />
              </PFormField>
              <PFormField label="Unit" required>
                <PSelect placeholder="Select unit" :options="['4B', '7C', '2A']" />
              </PFormField>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <PFormField label="Monthly rent" required>
                  <PInput placeholder="0.00" mono suffix="USD" />
                </PFormField>
                <PFormField label="Lease term">
                  <PSelect model-value="12 months" :options="['6 months', '12 months', '24 months']" />
                </PFormField>
              </div>
              <PFormField label="Notes">
                <PTextarea placeholder="Additional notes..." :rows="3" />
              </PFormField>
            </div>
          </template>
          <template #step-2>
            <div class="bg-surface rounded-xl p-5" style="border: 1px solid var(--color-line-soft);">
              <p class="text-base text-ink2">Review the details above and click "Create tenant" to finalize.</p>
            </div>
          </template>
        </PFormWizard>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: () => ({
    components: { PFormWizard, PFormField, PInput },
    setup() {
      const step = ref(0)
      const steps = [
        { title: 'Step one', description: 'First step description.' },
        { title: 'Step two', description: 'Second step description.' },
        { title: 'Step three', description: 'Final step.' },
      ]
      return { step, steps }
    },
    template: `
      <div style="height: 100vh;">
        <PFormWizard :steps="steps" v-model:current-step="step" finish-label="Done">
          <template #step-0>
            <PFormField label="Field A"><PInput placeholder="Type here..." /></PFormField>
          </template>
          <template #step-1>
            <PFormField label="Field B"><PInput placeholder="Type here..." /></PFormField>
          </template>
          <template #step-2>
            <p class="text-base text-ink3">All done. Click finish.</p>
          </template>
        </PFormWizard>
      </div>
    `,
  }),
}
