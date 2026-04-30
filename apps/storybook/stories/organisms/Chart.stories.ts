import type { Meta, StoryObj } from '@storybook/vue3'
import { PChart } from '@eddwinpaz/predium-ui'

const meta: Meta<typeof PChart> = {
  title: 'Organisms/Chart',
  component: PChart,
}
export default meta
type Story = StoryObj<typeof PChart>

export const Line: Story = {
  render: () => ({
    components: { PChart },
    setup: () => ({
      data: [
        { x: 0, y: 10 },
        { x: 1, y: 24 },
        { x: 2, y: 18 },
        { x: 3, y: 35 },
        { x: 4, y: 28 },
      ],
    }),
    template: `<PChart :data="data" title="Revenue" />`,
  }),
}
export const Area: Story = {
  render: () => ({
    components: { PChart },
    setup: () => ({
      data: [
        { x: 0, y: 10 },
        { x: 1, y: 24 },
        { x: 2, y: 18 },
        { x: 3, y: 35 },
        { x: 4, y: 28 },
      ],
    }),
    template: `<PChart :data="data" area title="Revenue" />`,
  }),
}
