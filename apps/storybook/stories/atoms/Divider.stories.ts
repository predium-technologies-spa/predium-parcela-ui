import type { Meta, StoryObj } from '@storybook/vue3'
import { PDivider } from '@predium-technologies-spa/predium-ui'

const meta: Meta<typeof PDivider> = {
  title: 'Atoms/Divider',
  component: PDivider,
  argTypes: {
    orientation: { control: 'radio', options: ['horizontal', 'vertical'] },
  },
  args: { orientation: 'horizontal' },
}
export default meta
type Story = StoryObj<typeof PDivider>

export const Horizontal: Story = {
  render: (args) => ({
    components: { PDivider },
    setup: () => ({ args }),
    template: `<div style="width:240px"><PDivider v-bind="args" /></div>`,
  }),
}
export const Vertical: Story = {
  render: () => ({
    components: { PDivider },
    template: `<div style="height:80px;display:flex"><PDivider orientation="vertical" /></div>`,
  }),
}
