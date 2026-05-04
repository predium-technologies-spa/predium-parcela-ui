import type { Meta, StoryObj } from '@storybook/vue3'
import { PTabs } from '@predium-technologies-spa/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PTabs> = {
  title: 'Molecules/Tabs',
  component: PTabs,
  argTypes: {
    fill: { control: 'boolean' },
  },
  args: {
    fill: false,
  },
}

export default meta
type Story = StoryObj<typeof PTabs>

export const Default: Story = {
  render: (args) => ({
    components: { PTabs },
    setup() {
      const active = ref('overview')
      const tabs = [
        { key: 'overview', label: 'Overview' },
        { key: 'units', label: 'Units' },
        { key: 'financials', label: 'Financials' },
      ]
      return { args, active, tabs }
    },
    template: `
      <div style="max-width: 500px;">
        <PTabs v-bind="args" v-model="active" :tabs="tabs">
          <div style="font-size: 14px; color: #888;">Content for "{{ active }}" tab</div>
        </PTabs>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PTabs },
    setup() {
      const t1 = ref('all')
      const t2 = ref('active')
      const tabsWithCounts = [
        { key: 'all', label: 'All', count: 48 },
        { key: 'active', label: 'Active', count: 32 },
        { key: 'archived', label: 'Archived', count: 16 },
      ]
      const fillTabs = [
        { key: 'details', label: 'Details' },
        { key: 'history', label: 'History' },
        { key: 'settings', label: 'Settings' },
      ]
      return { t1, t2, tabsWithCounts, fillTabs }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 32px; max-width: 500px;">
        <div>
          <div style="margin-bottom: 8px; font-size: 13px; color: #888;">With counts</div>
          <PTabs v-model="t1" :tabs="tabsWithCounts" />
        </div>
        <div>
          <div style="margin-bottom: 8px; font-size: 13px; color: #888;">Fill mode</div>
          <PTabs v-model="t2" :tabs="fillTabs" fill />
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PTabs },
    setup() {
      const active = ref('tab1')
      const tabs = [
        { key: 'tab1', label: 'Tab 1' },
        { key: 'tab2', label: 'Tab 2' },
        { key: 'tab3', label: 'Tab 3' },
      ]
      return { args, active, tabs }
    },
    template: `
      <div style="max-width: 500px;">
        <PTabs v-bind="args" v-model="active" :tabs="tabs">
          <div style="font-size: 14px; color: #888;">Selected: {{ active }}</div>
        </PTabs>
      </div>
    `,
  }),
}
