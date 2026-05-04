import type { Meta, StoryObj } from '@storybook/vue3'
import { PFormAccordion, PFormField, PInput, PSelect, PCheckbox } from '@predium-technologies-spa/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PFormAccordion> = {
  title: 'Molecules/FormAccordion',
  component: PFormAccordion,
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof PFormAccordion>

export const Default: Story = {
  render: () => ({
    components: { PFormAccordion, PFormField, PInput, PSelect, PCheckbox },
    setup() {
      const active = ref(3)
      const sections = [
        { title: 'Identity', completed: true },
        { title: 'Address & Location', completed: true },
        { title: 'Structure', completed: true },
        { title: 'Financials', completed: false },
        { title: 'Team & Access', completed: false },
        { title: 'Documents', completed: false },
      ]
      return { active, sections }
    },
    template: `
      <div class="max-w-[720px] mx-auto py-6">
        <div class="mb-6">
          <h1 class="text-2xl font-semibold text-ink tracking-tight">Edit — Harper Hall</h1>
          <p class="text-base text-ink3 mt-1">PRP-0126 · Mixed-use · 36 units</p>
        </div>

        <PFormAccordion :sections="sections" v-model:active-section="active">
          <!-- Summaries (shown when collapsed) -->
          <template #summary-0>Harper Hall · PRP-0126 · Mixed-use</template>
          <template #summary-1>402 Harper St, Bronx NY 10457</template>
          <template #summary-2>36 residential + 4 retail · 42,180 sqft · Built 1948</template>
          <template #summary-3>$4,280,000 · Class B+ · Cap 5.4%</template>
          <template #summary-4>D. Okafor · Meridian Holdings LLC</template>
          <template #summary-5>3 documents uploaded</template>

          <!-- Editable content (shown when expanded) -->
          <template #content-0>
            <PFormField label="Property name" required>
              <PInput model-value="Harper Hall" />
            </PFormField>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PFormField label="Property ID" hint="auto">
                <PInput model-value="PRP-0126" mono />
              </PFormField>
              <PFormField label="Classification">
                <PSelect model-value="Mixed-use" :options="['Multifamily', 'Mixed-use', 'Retail']" />
              </PFormField>
            </div>
          </template>

          <template #content-1>
            <PFormField label="Street" required>
              <PInput model-value="402 Harper St" />
            </PFormField>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <PFormField label="City">
                <PInput model-value="Bronx" />
              </PFormField>
              <PFormField label="State">
                <PSelect model-value="New York" :options="['New York', 'New Jersey']" />
              </PFormField>
              <PFormField label="ZIP">
                <PInput model-value="10457" mono />
              </PFormField>
            </div>
          </template>

          <template #content-2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PFormField label="Year built">
                <PInput model-value="1948" mono />
              </PFormField>
              <PFormField label="Last renovation">
                <PInput model-value="2019" mono />
              </PFormField>
              <PFormField label="Gross area">
                <PInput model-value="42,180" mono suffix="sqft" />
              </PFormField>
              <PFormField label="Residential units">
                <PInput model-value="36" mono />
              </PFormField>
            </div>
          </template>

          <template #content-3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PFormField label="Acquisition price" required hint="USD">
                <PInput model-value="4,280,000" mono suffix="USD" />
              </PFormField>
              <PFormField label="Acquisition date">
                <PInput model-value="Mar 14, 2021" />
              </PFormField>
              <PFormField label="Cap rate">
                <PInput model-value="5.4" mono suffix="%" />
              </PFormField>
              <PFormField label="Tax assessment">
                <PInput model-value="3,710,000" mono suffix="USD" />
              </PFormField>
            </div>
          </template>

          <template #content-4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <PFormField label="Primary manager">
                <PSelect model-value="D. Okafor" :options="['D. Okafor', 'L. Moreno', 'A. Petrov']" />
              </PFormField>
              <PFormField label="Owner entity">
                <PSelect model-value="Meridian Holdings LLC" :options="['Meridian Holdings LLC']" />
              </PFormField>
            </div>
          </template>

          <template #content-5>
            <p class="text-base text-ink3">File upload area would go here.</p>
          </template>
        </PFormAccordion>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: () => ({
    components: { PFormAccordion, PFormField, PInput },
    setup() {
      const active = ref(0)
      const sections = [
        { title: 'Section A', completed: true },
        { title: 'Section B', completed: false },
        { title: 'Section C', completed: false },
      ]
      return { active, sections }
    },
    template: `
      <div class="max-w-[720px] mx-auto py-6">
        <PFormAccordion :sections="sections" v-model:active-section="active">
          <template #summary-0>Summary for section A</template>
          <template #summary-1>Summary for section B</template>
          <template #summary-2>Summary for section C</template>
          <template #content-0>
            <PFormField label="Field 1"><PInput placeholder="Edit..." /></PFormField>
          </template>
          <template #content-1>
            <PFormField label="Field 2"><PInput placeholder="Edit..." /></PFormField>
          </template>
          <template #content-2>
            <PFormField label="Field 3"><PInput placeholder="Edit..." /></PFormField>
          </template>
        </PFormAccordion>
      </div>
    `,
  }),
}
