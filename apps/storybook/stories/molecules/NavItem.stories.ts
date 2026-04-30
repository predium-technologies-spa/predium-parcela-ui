import type { Meta, StoryObj } from '@storybook/vue3'
import { PNavItem } from '@eddwinpaz/predium-ui'
import { Home, Building, Users, FileText, CreditCard } from 'lucide-vue-next'

const meta: Meta<typeof PNavItem> = {
  title: 'Molecules/NavItem',
  component: PNavItem,
  argTypes: {
    label: { control: 'text' },
    active: { control: 'boolean' },
    badge: { control: 'text' },
  },
  args: {
    label: 'Dashboard',
    active: true,
  },
}

export default meta
type Story = StoryObj<typeof PNavItem>

export const Default: Story = {
  render: (args) => ({
    components: { PNavItem },
    setup: () => ({ args, Home }),
    template: '<div style="width: 220px;"><PNavItem v-bind="args" :icon="Home" /></div>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PNavItem },
    setup: () => ({ Home, Building, Users, FileText, CreditCard }),
    template: `
      <div style="display: flex; flex-direction: column; gap: 2px; width: 220px;">
        <PNavItem :icon="Home" label="Dashboard" active />
        <PNavItem :icon="Building" label="Properties" :badge="48" />
        <PNavItem :icon="Users" label="Tenants" :badge="312" />
        <PNavItem :icon="FileText" label="Leases" />
        <PNavItem :icon="CreditCard" label="Payments" :badge="3" />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PNavItem },
    setup: () => ({ args, Home }),
    template: '<div style="width: 220px;"><PNavItem v-bind="args" :icon="Home" /></div>',
  }),
}
