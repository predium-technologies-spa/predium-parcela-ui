import type { Meta, StoryObj } from '@storybook/vue3'
import { PRightDrawer, PButton } from '@parcela/ui'

const meta: Meta<typeof PRightDrawer> = {
  title: 'Organisms/RightDrawer',
  component: PRightDrawer,
  argTypes: {
    open: { control: 'boolean' },
    eyebrow: { control: 'text' },
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
  args: {
    open: true,
    eyebrow: 'New record',
    title: 'Add property',
    subtitle: 'Draft will autosave',
  },
}

export default meta
type Story = StoryObj<typeof PRightDrawer>

export const Default: Story = {
  render: (args) => ({
    components: { PRightDrawer, PButton },
    setup: () => ({ args }),
    template: `
      <div style="height: 600px; position: relative; overflow: hidden;">
        <PRightDrawer v-bind="args">
          <template #body>
            <div style="padding: 16px;">
              <p style="color: var(--color-text-secondary); font-size: 14px;">
                Form content goes here. This area scrolls independently when the content exceeds the drawer height.
              </p>
            </div>
          </template>
          <template #footer>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
              <PButton variant="ghost">Cancel</PButton>
              <PButton variant="primary">Save property</PButton>
            </div>
          </template>
        </PRightDrawer>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PRightDrawer, PButton },
    setup: () => ({ args }),
    template: `
      <div style="height: 600px; position: relative; overflow: hidden;">
        <PRightDrawer v-bind="args">
          <template #body>
            <div style="padding: 16px;">
              <p style="color: var(--color-text-secondary); font-size: 14px;">
                Drawer body content area.
              </p>
            </div>
          </template>
          <template #footer>
            <div style="display: flex; gap: 8px; justify-content: flex-end;">
              <PButton variant="ghost">Cancel</PButton>
              <PButton variant="primary">Save</PButton>
            </div>
          </template>
        </PRightDrawer>
      </div>
    `,
  }),
}
