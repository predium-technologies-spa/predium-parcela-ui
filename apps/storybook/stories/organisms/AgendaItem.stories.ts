import type { Meta, StoryObj } from '@storybook/vue3'
import { PAgendaItem } from '@eddwinpaz/predium-ui'

const meta: Meta<typeof PAgendaItem> = {
  title: 'Organisms/AgendaItem',
  component: PAgendaItem,
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'info', 'good', 'warn', 'danger'],
    },
    type: { control: 'text' },
    time: { control: 'text' },
    duration: { control: 'text' },
    label: { control: 'text' },
    status: { control: 'text' },
  },
  args: {
    time: '09:00',
    duration: '30m',
    type: 'Showing',
    label: 'Unit 4B · Harper Hall',
    tone: 'info',
  },
}

export default meta
type Story = StoryObj<typeof PAgendaItem>

export const Default: Story = {
  render: (args) => ({
    components: { PAgendaItem },
    setup: () => ({ args }),
    template: '<PAgendaItem v-bind="args" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PAgendaItem },
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px; max-width: 400px;">
        <PAgendaItem
          time="09:00"
          duration="30m"
          type="Showing"
          label="Unit 4B · Harper Hall"
          tone="info"
          status="confirmed"
        />
        <PAgendaItem
          time="10:00"
          duration="45m"
          type="Inspection"
          label="Unit 12A · Ashford Row"
          tone="warn"
          status="pending"
        />
        <PAgendaItem
          time="13:30"
          duration="1h"
          type="Maintenance"
          label="HVAC · Linden Court"
          tone="danger"
          status="flagged"
        />
        <PAgendaItem
          time="15:00"
          duration="30m"
          type="Lease signing"
          label="Unit 2C · Waverly Place"
          tone="good"
          status="confirmed"
        />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PAgendaItem },
    setup: () => ({ args }),
    template: '<PAgendaItem v-bind="args" />',
  }),
}
