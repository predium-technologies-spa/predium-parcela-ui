import type { Meta, StoryObj } from '@storybook/vue3'
import { PButton } from '@predium-technologies-spa/predium-ui'
import { Download, Plus, Upload, Trash2 } from 'lucide-vue-next'

const meta: Meta<typeof PButton> = {
  title: 'Atoms/Button',
  component: PButton,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'ghost', 'subtle', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof PButton>

export const Default: Story = {
  render: (args) => ({
    components: { PButton },
    setup: () => ({ args, Plus }),
    template: '<PButton v-bind="args" :icon="Plus">New property</PButton>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PButton },
    setup: () => ({ Plus, Download, Upload, Trash2 }),
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; gap: 8px; align-items: center;">
          <PButton variant="primary" :icon="Plus">Primary</PButton>
          <PButton variant="ghost" :icon="Download">Ghost</PButton>
          <PButton variant="subtle" :icon="Upload">Subtle</PButton>
          <PButton variant="danger" :icon="Trash2">Danger</PButton>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <PButton variant="primary" size="sm" :icon="Plus">Primary sm</PButton>
          <PButton variant="ghost" size="sm" :icon="Download">Ghost sm</PButton>
          <PButton variant="subtle" size="sm">Subtle sm</PButton>
          <PButton variant="danger" size="sm">Danger sm</PButton>
        </div>
        <div style="display: flex; gap: 8px; align-items: center;">
          <PButton variant="primary" disabled :icon="Plus">Disabled</PButton>
          <PButton variant="ghost" disabled>Disabled</PButton>
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PButton },
    setup: () => ({ args, Plus }),
    template: '<PButton v-bind="args" :icon="Plus">Click me</PButton>',
  }),
}
