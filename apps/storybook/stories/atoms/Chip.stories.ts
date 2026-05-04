import type { Meta, StoryObj } from '@storybook/vue3'
import { PChip } from '@predium-technologies-spa/predium-ui'

const meta: Meta<typeof PChip> = {
  title: 'Atoms/Chip',
  component: PChip,
  argTypes: {
    removable: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    removable: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof PChip>

export const Default: Story = {
  render: (args) => ({
    components: { PChip },
    setup: () => ({ args }),
    template: '<PChip v-bind="args">core</PChip>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PChip },
    template: `
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        <PChip>core</PChip>
        <PChip removable>renovated-2019</PChip>
        <PChip removable>bronx</PChip>
        <PChip removable>section8-eligible</PChip>
        <PChip disabled>disabled</PChip>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PChip },
    setup: () => ({ args }),
    template: '<PChip v-bind="args">tag-name</PChip>',
  }),
}
