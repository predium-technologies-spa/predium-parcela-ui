import type { Meta, StoryObj } from '@storybook/vue3'
import { PSidebar } from '@predium-technologies-spa/predium-ui'
import { ref } from 'vue'
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
      options: ['dashboard', 'reports', 'property', 'units', 'tenants', 'leases', 'payments', 'tickets', 'inspect', 'settings'],
    },
    expanded: { control: 'boolean' },
  },
  args: {
    active: 'property',
    expanded: true,
  },
}

export default meta
type Story = StoryObj<typeof PSidebar>

const sections = [
  { title: 'Workspace', items: [
    { key: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { key: 'reports', icon: BarChart3, label: 'Reports' },
  ]},
  { title: 'Portfolio', items: [
    { key: 'property', icon: Building, label: 'Properties', badge: 48 },
    { key: 'units', icon: Grid3X3, label: 'Units', badge: 312 },
    { key: 'tenants', icon: Users, label: 'Tenants', badge: 287 },
    { key: 'leases', icon: FileText, label: 'Leases', badge: 287 },
  ]},
  { title: 'Operations', items: [
    { key: 'payments', icon: CreditCard, label: 'Payments' },
    { key: 'tickets', icon: Wrench, label: 'Work orders', badge: 14 },
    { key: 'inspect', icon: Search, label: 'Inspections' },
  ]},
  { title: 'System', items: [
    { key: 'settings', icon: Settings, label: 'Settings' },
  ]},
]

export const Default: Story = {
  render: () => ({
    components: { PSidebar },
    setup() {
      const expanded = ref(true)
      return { sections, expanded }
    },
    template: `
      <div style="height: 100vh; display: flex;">
        <PSidebar
          :sections="sections"
          active="property"
          v-model:expanded="expanded"
        />
        <div class="flex-1 bg-bg p-6">
          <p class="text-md text-ink2">Sidebar is <strong class="text-ink">{{ expanded ? 'expanded' : 'collapsed' }}</strong> — click the toggle at the bottom.</p>
        </div>
      </div>
    `,
  }),
}

export const Collapsed: Story = {
  render: () => ({
    components: { PSidebar },
    setup() {
      const expanded = ref(false)
      return { sections, expanded }
    },
    template: `
      <div style="height: 100vh; display: flex;">
        <PSidebar
          :sections="sections"
          active="property"
          v-model:expanded="expanded"
        />
        <div class="flex-1 bg-bg p-6">
          <p class="text-md text-ink2">Starts collapsed. Click the toggle to expand.</p>
        </div>
      </div>
    `,
  }),
}

export const CollapsibleSections: Story = {
  render: () => ({
    components: { PSidebar },
    setup() {
      const expanded = ref(true)
      const expandedSections = ref<Record<string, boolean>>({
        Workspace: true,
        Portfolio: true,
        Operations: false,
        System: false,
      })
      return { sections, expanded, expandedSections }
    },
    template: `
      <div style="height: 100vh; display: flex;">
        <PSidebar
          :sections="sections"
          active="property"
          v-model:expanded="expanded"
          v-model:expanded-sections="expandedSections"
        />
        <div class="flex-1 bg-bg p-6">
          <p class="text-md text-ink2 mb-2">Click any section header (uppercase label) to toggle.</p>
          <pre class="text-xs text-ink3 font-sans">{{ JSON.stringify(expandedSections, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PSidebar },
    setup() {
      const expanded = ref(args.expanded ?? true)
      const expandedSections = ref<Record<string, boolean>>({})
      return { args, sections, expanded, expandedSections }
    },
    template: `
      <div style="height: 100vh; display: flex;">
        <PSidebar
          v-bind="args"
          :sections="sections"
          v-model:expanded="expanded"
          v-model:expanded-sections="expandedSections"
        />
        <div class="flex-1 bg-bg p-6">
          <p class="text-md text-ink2">Use controls or the sidebar toggle button.</p>
        </div>
      </div>
    `,
  }),
}
