import type { Meta, StoryObj } from '@storybook/vue3'
import { PModal, PButton } from '@predium-technologies-spa/predium-ui'
import { ref } from 'vue'
import { Trash2, FileDown } from 'lucide-vue-next'

const meta: Meta<typeof PModal> = {
  title: 'Organisms/Modal',
  component: PModal,
}

export default meta
type Story = StoryObj<typeof PModal>

export const Default: Story = {
  render: () => ({
    components: { PModal, PButton },
    setup() {
      const open = ref(false)
      return { open, Trash2 }
    },
    template: `
      <div class="p-8">
        <PButton variant="danger" :icon="Trash2" @click="open = true">Archive property</PButton>

        <PModal
          :open="open"
          variant="destructive"
          title="Archive Harper Hall?"
          subtitle="PRP-0126 · 36 units · 4 active leases"
          @close="open = false"
        >
          <template #body>
            <p class="leading-relaxed">
              Archiving will stop rent collection, pause scheduled inspections, and mark the property as read-only.
              <strong class="text-ink">This cannot be undone without manager approval.</strong>
            </p>
          </template>
          <template #footer>
            <PButton variant="danger" class="w-full sm:w-auto" @click="open = false">Archive property</PButton>
            <PButton variant="ghost" class="w-full sm:w-auto" @click="open = false">Cancel</PButton>
          </template>
        </PModal>
      </div>
    `,
  }),
}

export const Confirmation: Story = {
  render: () => ({
    components: { PModal, PButton },
    setup() {
      const open = ref(false)
      return { open, FileDown }
    },
    template: `
      <div class="p-8">
        <PButton variant="ghost" :icon="FileDown" @click="open = true">Export report</PButton>

        <PModal
          :open="open"
          variant="default"
          title="Export quarterly report"
          subtitle="Q1 2026 · Portfolio summary"
          @close="open = false"
        >
          <template #body>
            <p class="leading-relaxed">
              The report will be generated as a PDF and sent to your email. This may take a few minutes.
            </p>
          </template>
          <template #footer>
            <PButton variant="primary" class="w-full sm:w-auto" @click="open = false">Export PDF</PButton>
            <PButton variant="ghost" class="w-full sm:w-auto" @click="open = false">Cancel</PButton>
          </template>
        </PModal>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: () => ({
    components: { PModal, PButton },
    setup() {
      const open = ref(false)
      return { open }
    },
    template: `
      <div class="p-8">
        <PButton variant="primary" @click="open = true">Open modal</PButton>
        <PModal
          :open="open"
          variant="destructive"
          title="Confirm action?"
          subtitle="This requires confirmation"
          @close="open = false"
        >
          <template #body>
            <p>Are you sure you want to proceed?</p>
          </template>
          <template #footer>
            <PButton variant="danger" class="w-full sm:w-auto" @click="open = false">Confirm</PButton>
            <PButton variant="ghost" class="w-full sm:w-auto" @click="open = false">Cancel</PButton>
          </template>
        </PModal>
      </div>
    `,
  }),
}
