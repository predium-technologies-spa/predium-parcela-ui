import type { Meta, StoryObj } from '@storybook/vue3'
import { PKpiCard, PSparkline } from '@predium-technologies-spa/predium-ui'

const meta: Meta<typeof PKpiCard> = {
  title: 'Molecules/KpiCard',
  component: PKpiCard,
  argTypes: {
    tone: {
      control: 'select',
      options: ['neutral', 'good', 'warn', 'danger'],
    },
    mono: { control: 'boolean' },
    label: { control: 'text' },
    value: { control: 'text' },
    delta: { control: 'text' },
  },
  args: {
    label: 'Properties',
    value: '48',
    delta: '+2 this qtr',
    tone: 'good',
    mono: false,
  },
}

export default meta
type Story = StoryObj<typeof PKpiCard>

export const Default: Story = {
  render: (args) => ({
    components: { PKpiCard },
    setup: () => ({ args }),
    template: '<PKpiCard v-bind="args" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PKpiCard, PSparkline },
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 900px;">
        <PKpiCard label="Properties" value="48" delta="+2 this qtr" tone="good" />
        <PKpiCard label="Units" value="312" delta="0 change" tone="neutral" />
        <PKpiCard label="Monthly rent" value="$84,200" delta="+4.2%" tone="good" mono>
          <template #sparkline>
            <PSparkline :points="[2,3,3,2,4,3,4]" variant="line" tone="good" :height="32" />
          </template>
        </PKpiCard>
        <PKpiCard label="Delinquencies" value="$1,420" delta="3 tenants" tone="warn" mono />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PKpiCard },
    setup: () => ({ args }),
    template: '<div style="max-width: 220px;"><PKpiCard v-bind="args" /></div>',
  }),
}
