import type { Meta, StoryObj } from '@storybook/vue3'
import { PModal, PButton } from '@parcela/ui'
import { ref } from 'vue'

const meta: Meta<typeof PModal> = {
  title: 'Organisms/Modal',
  component: PModal,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'destructive'],
    },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    open: { control: 'boolean' },
  },
  args: {
    variant: 'destructive',
    title: 'Archive Harper Hall?',
    subtitle: 'PRP-0126 · 36 units',
    open: true,
  },
}

export default meta
type Story = StoryObj<typeof PModal>

export const Default: Story = {
  render: (args) => ({
    components: { PModal, PButton },
    setup: () => ({ args }),
    template: `
      <PModal v-bind="args">
        <template #body>
          <p style="font-size: 14px; color: var(--color-text-secondary); margin: 0;">
            This property and all associated units, leases, and documents will be moved to the archive.
            You can restore it later from Settings &gt; Archived properties.
          </p>
        </template>
        <template #footer>
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <PButton variant="ghost">Cancel</PButton>
            <PButton variant="danger">Archive</PButton>
          </div>
        </template>
      </PModal>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PModal, PButton },
    setup() {
      const openDefault = ref(true)
      const openDestructive = ref(true)
      return { openDefault, openDestructive }
    },
    template: `
      <div style="display: flex; gap: 24px;">
        <div style="flex: 1; position: relative; min-height: 300px;">
          <PModal
            variant="default"
            title="Export report"
            subtitle="Q1 2026 · Portfolio summary"
            :open="openDefault"
            :static="true"
          >
            <template #body>
              <p style="font-size: 14px; color: var(--color-text-secondary); margin: 0;">
                The report will be generated as a PDF and sent to your email on file.
              </p>
            </template>
            <template #footer>
              <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <PButton variant="ghost">Cancel</PButton>
                <PButton variant="primary">Export</PButton>
              </div>
            </template>
          </PModal>
        </div>
        <div style="flex: 1; position: relative; min-height: 300px;">
          <PModal
            variant="destructive"
            title="Archive Harper Hall?"
            subtitle="PRP-0126 · 36 units"
            :open="openDestructive"
            :static="true"
          >
            <template #body>
              <p style="font-size: 14px; color: var(--color-text-secondary); margin: 0;">
                This property and all associated units, leases, and documents will be moved to the archive.
              </p>
            </template>
            <template #footer>
              <div style="display: flex; gap: 8px; justify-content: flex-end;">
                <PButton variant="ghost">Cancel</PButton>
                <PButton variant="danger">Archive</PButton>
              </div>
            </template>
          </PModal>
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PModal, PButton },
    setup() {
      const open = ref(args.open)
      return { args, open }
    },
    template: `
      <div>
        <PButton variant="primary" @click="open = true">Open modal</PButton>
        <PModal v-bind="args" :open="open" @close="open = false">
          <template #body>
            <p style="font-size: 14px; color: var(--color-text-secondary); margin: 0;">
              Modal body content goes here.
            </p>
          </template>
          <template #footer>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
              <PButton variant="ghost" @click="open = false">Cancel</PButton>
              <PButton :variant="args.variant === 'destructive' ? 'danger' : 'primary'">Confirm</PButton>
            </div>
          </template>
        </PModal>
      </div>
    `,
  }),
}
