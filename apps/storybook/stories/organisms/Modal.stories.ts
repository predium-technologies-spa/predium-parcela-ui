import type { Meta, StoryObj } from '@storybook/vue3'
import { PModal, PButton } from '@parcela/ui'
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
            <p class="text-md text-ink2 leading-relaxed">
              Archiving will stop rent collection, pause scheduled inspections, and mark the property as read-only.
              <strong class="text-ink">This cannot be undone without manager approval.</strong>
            </p>
          </template>
          <template #footer>
            <div class="flex-1" />
            <PButton variant="ghost" @click="open = false">Cancel</PButton>
            <PButton variant="danger" @click="open = false">Archive property</PButton>
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
            <p class="text-md text-ink2 leading-relaxed">
              The report will be generated as a PDF and sent to your email. This may take a few minutes.
            </p>
          </template>
          <template #footer>
            <div class="flex-1" />
            <PButton variant="ghost" @click="open = false">Cancel</PButton>
            <PButton variant="primary" @click="open = false">Export PDF</PButton>
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
            <p class="text-md text-ink2">Are you sure you want to proceed?</p>
          </template>
          <template #footer>
            <div class="flex-1" />
            <PButton variant="ghost" @click="open = false">Cancel</PButton>
            <PButton variant="danger" @click="open = false">Confirm</PButton>
          </template>
        </PModal>
      </div>
    `,
  }),
}
