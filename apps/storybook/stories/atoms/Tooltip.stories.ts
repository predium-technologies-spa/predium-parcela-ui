import type { Meta, StoryObj } from '@storybook/vue3'
import { PTooltip, PButton } from '@predium-technologies-spa/predium-ui'

const meta: Meta<typeof PTooltip> = {
  title: 'Atoms/Tooltip',
  component: PTooltip,
  argTypes: {
    content: { control: 'text' },
    placement: { control: 'select', options: ['top', 'bottom', 'left', 'right'] },
  },
  args: {
    content: 'Tooltip text',
    placement: 'top',
  },
}

export default meta
type Story = StoryObj<typeof PTooltip>

export const Default: Story = {
  render: (args) => ({
    components: { PTooltip, PButton },
    setup: () => ({ args }),
    template: `
      <div style="padding: 60px; display: flex; justify-content: center;">
        <PTooltip v-bind="args">
          <PButton>Hover me</PButton>
        </PTooltip>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PTooltip, PButton },
    template: `
      <div style="padding: 80px; display: flex; gap: 40px; justify-content: center; align-items: center;">
        <PTooltip content="Top tooltip" placement="top">
          <PButton>Top</PButton>
        </PTooltip>
        <PTooltip content="Bottom tooltip" placement="bottom">
          <PButton>Bottom</PButton>
        </PTooltip>
        <PTooltip content="Left tooltip" placement="left">
          <PButton>Left</PButton>
        </PTooltip>
        <PTooltip content="Right tooltip" placement="right">
          <PButton>Right</PButton>
        </PTooltip>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PTooltip, PButton },
    setup: () => ({ args }),
    template: `
      <div style="padding: 60px; display: flex; justify-content: center;">
        <PTooltip v-bind="args">
          <PButton>Hover me</PButton>
        </PTooltip>
      </div>
    `,
  }),
}
