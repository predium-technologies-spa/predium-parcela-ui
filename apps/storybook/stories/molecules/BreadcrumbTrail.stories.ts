import type { Meta, StoryObj } from '@storybook/vue3'
import { PBreadcrumbTrail } from '@predium-technologies-spa/predium-ui'

const meta: Meta<typeof PBreadcrumbTrail> = {
  title: 'Molecules/BreadcrumbTrail',
  component: PBreadcrumbTrail,
  argTypes: {
    items: { control: 'object' },
  },
  args: {
    items: ['Portfolio', 'Properties', 'Harper Hall'],
  },
}

export default meta
type Story = StoryObj<typeof PBreadcrumbTrail>

export const Default: Story = {
  render: (args) => ({
    components: { PBreadcrumbTrail },
    setup: () => ({ args }),
    template: '<PBreadcrumbTrail v-bind="args" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PBreadcrumbTrail },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div>
          <p class="text-xs text-ink3 mb-2">Short (2 items)</p>
          <PBreadcrumbTrail :items="['Portfolio', 'Properties']" />
        </div>
        <div>
          <p class="text-xs text-ink3 mb-2">Medium (3 items)</p>
          <PBreadcrumbTrail :items="['Portfolio', 'Properties', 'Harper Hall']" />
        </div>
        <div>
          <p class="text-xs text-ink3 mb-2">Long (4 items)</p>
          <PBreadcrumbTrail :items="['Portfolio', 'Properties', 'Harper Hall', 'Unit 204']" />
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PBreadcrumbTrail },
    setup: () => ({ args }),
    template: '<PBreadcrumbTrail v-bind="args" />',
  }),
}
