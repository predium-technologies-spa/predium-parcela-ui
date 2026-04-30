import type { Meta, StoryObj } from '@storybook/vue3'
import { PMessageItem } from '@eddwinpaz/predium-ui'

const meta: Meta<typeof PMessageItem> = {
  title: 'Organisms/MessageItem',
  component: PMessageItem,
  argTypes: {
    from: { control: 'text' },
    unit: { control: 'text' },
    preview: { control: 'text' },
    time: { control: 'text' },
    unread: { control: 'boolean' },
  },
  args: {
    from: 'K. Rivera',
    unit: '4B · Harper Hall',
    preview: 'Sorry for the delay — I attached the signed addendum to the portal last night.',
    time: '08:42',
    unread: true,
  },
}

export default meta
type Story = StoryObj<typeof PMessageItem>

export const Default: Story = {
  render: (args) => ({
    components: { PMessageItem },
    setup: () => ({ args }),
    template: '<PMessageItem v-bind="args" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PMessageItem },
    template: `
      <div style="display: flex; flex-direction: column; gap: 4px; max-width: 400px;">
        <PMessageItem
          from="K. Rivera"
          unit="4B · Harper Hall"
          preview="Sorry for the delay — I attached the signed addendum to the portal last night."
          time="08:42"
          :unread="true"
        />
        <PMessageItem
          from="J. Okonkwo"
          unit="12A · Ashford Row"
          preview="The kitchen faucet is still dripping after the repair visit yesterday."
          time="Yesterday"
          :unread="true"
        />
        <PMessageItem
          from="M. Delacroix"
          unit="2C · Waverly Place"
          preview="Thanks for sending over the lease renewal. I'll review it this weekend."
          time="Mon"
          :unread="false"
        />
        <PMessageItem
          from="A. Chen"
          unit="6A · Linden Court"
          preview="Can we schedule the move-in walkthrough for next Friday?"
          time="Apr 12"
          :unread="false"
        />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PMessageItem },
    setup: () => ({ args }),
    template: '<PMessageItem v-bind="args" />',
  }),
}
