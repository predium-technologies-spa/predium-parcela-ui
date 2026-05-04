import type { Meta, StoryObj } from '@storybook/vue3'
import { PIcon } from '@predium-technologies-spa/predium-ui'
import {
  Search, Plus, Bell, Calendar, Settings, Download,
  Upload, Check, ChevronRight, X, Filter, MoreVertical,
  Home, Key, FileText, Building,
} from 'lucide-vue-next'

const meta: Meta<typeof PIcon> = {
  title: 'Atoms/Icon',
  component: PIcon,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    strokeWidth: { control: { type: 'range', min: 1, max: 3, step: 0.25 } },
  },
  args: {
    size: 'md',
    strokeWidth: 1.5,
  },
}

export default meta
type Story = StoryObj<typeof PIcon>

export const Default: Story = {
  render: (args) => ({
    components: { PIcon },
    setup: () => ({ args, Search }),
    template: '<PIcon v-bind="args" :icon="Search" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PIcon },
    setup: () => ({
      icons: [
        ['Search', Search], ['Plus', Plus], ['Bell', Bell],
        ['Calendar', Calendar], ['Settings', Settings], ['Download', Download],
        ['Upload', Upload], ['Check', Check], ['ChevronRight', ChevronRight],
        ['X', X], ['Filter', Filter], ['MoreVertical', MoreVertical],
        ['Home', Home], ['Key', Key], ['FileText', FileText], ['Building', Building],
      ],
    }),
    template: `
      <div style="display: grid; grid-template-columns: repeat(8, 1fr); gap: 12px;">
        <div
          v-for="[name, icon] in icons"
          :key="name"
          style="display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 12px; border: 1px solid var(--color-line); border-radius: 5px;"
        >
          <PIcon :icon="icon" size="lg" />
          <span class="text-xs text-ink3">{{ name }}</span>
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PIcon },
    setup: () => ({ args, Search }),
    template: '<PIcon v-bind="args" :icon="Search" />',
  }),
}
