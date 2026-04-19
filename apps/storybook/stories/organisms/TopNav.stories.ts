import type { Meta, StoryObj } from '@storybook/vue3'
import { PTopNav } from '@parcela/ui'

const meta: Meta<typeof PTopNav> = {
  title: 'Organisms/TopNav',
  component: PTopNav,
  argTypes: {
    breadcrumb: { control: 'object' },
    search: { control: 'boolean' },
  },
  args: {
    breadcrumb: ['Portfolio', 'Properties'],
    search: true,
  },
}

export default meta
type Story = StoryObj<typeof PTopNav>

export const Default: Story = {
  render: (args) => ({
    components: { PTopNav },
    setup: () => ({ args }),
    template: '<PTopNav v-bind="args" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PTopNav },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <PTopNav :breadcrumb="['Portfolio', 'Properties']" :search="true" />
        <PTopNav :breadcrumb="['Portfolio', 'Properties']" :search="false" />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PTopNav },
    setup: () => ({ args }),
    template: '<PTopNav v-bind="args" />',
  }),
}
