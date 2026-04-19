import type { Meta, StoryObj } from '@storybook/vue3'
import { PSidebar } from '@parcela/ui'
import {
  LayoutDashboard,
  BarChart3,
  Building,
  Grid3X3,
  Users,
  FileText,
  CreditCard,
  Wrench,
  Search,
  Settings,
} from 'lucide-vue-next'

const meta: Meta<typeof PSidebar> = {
  title: 'Organisms/Sidebar',
  component: PSidebar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    active: {
      control: 'select',
      options: [
        'dashboard',
        'reports',
        'property',
        'units',
        'tenants',
        'leases',
        'payments',
        'work-orders',
        'inspections',
        'settings',
      ],
    },
  },
  args: {
    active: 'property',
  },
}

export default meta
type Story = StoryObj<typeof PSidebar>

const sections = [
  {
    label: 'Workspace',
    items: [
      { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { key: 'reports', label: 'Reports', icon: BarChart3 },
    ],
  },
  {
    label: 'Portfolio',
    items: [
      { key: 'property', label: 'Properties', icon: Building, count: 48 },
      { key: 'units', label: 'Units', icon: Grid3X3, count: 312 },
      { key: 'tenants', label: 'Tenants', icon: Users, count: 287 },
      { key: 'leases', label: 'Leases', icon: FileText, count: 287 },
    ],
  },
  {
    label: 'Operations',
    items: [
      { key: 'payments', label: 'Payments', icon: CreditCard },
      { key: 'work-orders', label: 'Work orders', icon: Wrench, count: 14 },
      { key: 'inspections', label: 'Inspections', icon: Search },
    ],
  },
  {
    label: 'System',
    items: [
      { key: 'settings', label: 'Settings', icon: Settings },
    ],
  },
]

export const Default: Story = {
  render: (args) => ({
    components: { PSidebar },
    setup: () => ({ args, sections }),
    template: `
      <div style="height: 100vh;">
        <PSidebar v-bind="args" :sections="sections" />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PSidebar },
    setup: () => ({ args, sections }),
    template: `
      <div style="height: 100vh;">
        <PSidebar v-bind="args" :sections="sections" />
      </div>
    `,
  }),
}
