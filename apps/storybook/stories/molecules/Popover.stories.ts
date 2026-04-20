import type { Meta, StoryObj } from '@storybook/vue3'
import { PPopover, PButton } from '@parcela/ui'

const meta: Meta<typeof PPopover> = {
  title: 'Molecules/Popover',
  component: PPopover,
  argTypes: {
    placement: {
      control: 'select',
      options: ['bottom', 'bottom-start', 'bottom-end', 'top', 'top-start', 'top-end'],
    },
  },
  args: {
    placement: 'bottom-start',
  },
}

export default meta
type Story = StoryObj<typeof PPopover>

export const Default: Story = {
  render: (args) => ({
    components: { PPopover, PButton },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 80px 40px;">
        <PPopover v-bind="args">
          <template #trigger>
            <PButton variant="ghost">Open Menu</PButton>
          </template>
          <div class="py-1">
            <button class="w-full text-left px-3 py-2 text-base text-ink2 hover:bg-hover transition-colors">Edit</button>
            <button class="w-full text-left px-3 py-2 text-base text-ink2 hover:bg-hover transition-colors">Duplicate</button>
            <button class="w-full text-left px-3 py-2 text-base text-ink2 hover:bg-hover transition-colors">Archive</button>
            <button class="w-full text-left px-3 py-2 text-base text-danger hover:bg-hover transition-colors">Delete</button>
          </div>
        </PPopover>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PPopover, PButton },
    template: `
      <div style="display: flex; gap: 40px; padding: 120px 40px; flex-wrap: wrap;">
        <PPopover placement="bottom-start">
          <template #trigger><PButton variant="ghost">bottom-start</PButton></template>
          <div class="p-3 text-base text-ink2">Bottom Start</div>
        </PPopover>
        <PPopover placement="bottom">
          <template #trigger><PButton variant="ghost">bottom</PButton></template>
          <div class="p-3 text-base text-ink2">Bottom Center</div>
        </PPopover>
        <PPopover placement="bottom-end">
          <template #trigger><PButton variant="ghost">bottom-end</PButton></template>
          <div class="p-3 text-base text-ink2">Bottom End</div>
        </PPopover>
        <PPopover placement="top-start">
          <template #trigger><PButton variant="ghost">top-start</PButton></template>
          <div class="p-3 text-base text-ink2">Top Start</div>
        </PPopover>
        <PPopover placement="top">
          <template #trigger><PButton variant="ghost">top</PButton></template>
          <div class="p-3 text-base text-ink2">Top Center</div>
        </PPopover>
        <PPopover placement="top-end">
          <template #trigger><PButton variant="ghost">top-end</PButton></template>
          <div class="p-3 text-base text-ink2">Top End</div>
        </PPopover>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PPopover, PButton },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 120px 40px;">
        <PPopover v-bind="args">
          <template #trigger>
            <PButton>Click me</PButton>
          </template>
          <div class="p-4 text-base text-ink2" style="min-width: 200px;">
            <p class="font-medium text-ink mb-1">Popover Title</p>
            <p class="text-ink3">This is popover content that can hold any elements.</p>
          </div>
        </PPopover>
      </div>
    `,
  }),
}
