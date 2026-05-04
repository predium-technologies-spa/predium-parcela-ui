import type { Meta, StoryObj } from '@storybook/vue3'
import { PAvatar } from '@predium-technologies-spa/predium-ui'

const meta: Meta<typeof PAvatar> = {
  title: 'Atoms/Avatar',
  component: PAvatar,
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    color: { control: 'color' },
  },
  args: {
    initials: 'ER',
    size: 'md',
    color: '#2E3A2A',
  },
}

export default meta
type Story = StoryObj<typeof PAvatar>

export const Default: Story = {
  render: (args) => ({
    components: { PAvatar },
    setup: () => ({ args }),
    template: '<PAvatar v-bind="args" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PAvatar },
    template: `
      <div style="display: flex; gap: 12px; align-items: center;">
        <PAvatar initials="ER" size="sm" />
        <PAvatar initials="DO" size="md" />
        <PAvatar initials="LM" size="lg" />
        <PAvatar initials="AP" size="md" color="#34495E" />
        <PAvatar initials="KR" size="md" color="#8B3A2E" />
        <PAvatar initials="MH" size="lg" color="#5A6B3E" />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PAvatar },
    setup: () => ({ args }),
    template: '<PAvatar v-bind="args" />',
  }),
}
