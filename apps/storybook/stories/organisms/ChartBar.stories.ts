import type { Meta, StoryObj } from '@storybook/vue3'
import { PChartBar } from '@eddwinpaz/predium-ui'

const meta: Meta<typeof PChartBar> = {
  title: 'Organisms/ChartBar',
  component: PChartBar,
}
export default meta
type Story = StoryObj<typeof PChartBar>

export const Default: Story = {
  render: () => ({
    components: { PChartBar },
    setup: () => ({
      data: [
        { label: 'Jan', value: 10 },
        { label: 'Feb', value: 22 },
        { label: 'Mar', value: 15 },
        { label: 'Apr', value: 30 },
      ],
    }),
    template: `<PChartBar :data="data" x-key="label" y-key="value" title="Monthly" />`,
  }),
}
