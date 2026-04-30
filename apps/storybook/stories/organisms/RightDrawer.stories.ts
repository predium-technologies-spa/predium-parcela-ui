import type { Meta, StoryObj } from '@storybook/vue3'
import { PRightDrawer, PButton, PFormField, PInput } from '@eddwinpaz/predium-ui'
import { ref } from 'vue'
import { Plus } from 'lucide-vue-next'

const meta: Meta<typeof PRightDrawer> = {
  title: 'Organisms/RightDrawer',
  component: PRightDrawer,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof PRightDrawer>

export const Default: Story = {
  render: () => ({
    components: { PRightDrawer, PButton, PFormField, PInput },
    setup() {
      const open = ref(false)
      return { open, Plus }
    },
    template: `
      <div style="height: 100vh; display: flex;">
        <!-- Main content -->
        <div class="flex-1 bg-bg p-8 flex flex-col items-start gap-4">
          <h1 class="text-2xl font-semibold text-ink">Properties</h1>
          <p class="text-md text-ink3">Click the button to open the drawer.</p>
          <PButton variant="primary" :icon="Plus" @click="open = true">New property</PButton>
        </div>

        <!-- Drawer -->
        <PRightDrawer
          v-model:open="open"
          eyebrow="New record"
          title="Add property"
          subtitle="Draft will autosave · 3 of 4 sections complete"
        >
          <template #body>
            <div class="flex flex-col gap-3.5">
              <PFormField label="Property name" required>
                <PInput model-value="Harper Hall" placeholder="Enter name" />
              </PFormField>
              <PFormField label="Property ID" hint="auto">
                <PInput model-value="PRP-0126" mono placeholder="ID" />
              </PFormField>
              <PFormField label="Classification" required>
                <PInput model-value="Mixed-use" placeholder="Type" />
              </PFormField>
              <PFormField label="Internal notes">
                <div class="bg-surface border border-line rounded-lg p-2.5 text-md text-ink2 min-h-[68px] leading-relaxed">
                  Seller financing 20% of purchase. Roof replaced 2023.
                </div>
              </PFormField>
            </div>
          </template>
          <template #footer>
            <PButton variant="ghost" @click="open = false">Cancel</PButton>
            <div class="flex-1 text-center text-sm text-ink4">Saved 14s ago</div>
            <PButton variant="primary" @click="open = false">Save property</PButton>
          </template>
        </PRightDrawer>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: () => ({
    components: { PRightDrawer, PButton },
    setup() {
      const open = ref(false)
      return { open, Plus }
    },
    template: `
      <div style="height: 100vh; display: flex;">
        <div class="flex-1 bg-bg p-8">
          <PButton variant="primary" :icon="Plus" @click="open = true">Open drawer</PButton>
        </div>
        <PRightDrawer v-model:open="open" title="Drawer panel" subtitle="Close with X or button">
          <template #body>
            <p class="text-md text-ink2">Drawer body content.</p>
          </template>
          <template #footer>
            <div class="flex-1" />
            <PButton variant="ghost" @click="open = false">Close</PButton>
          </template>
        </PRightDrawer>
      </div>
    `,
  }),
}
