import type { Meta, StoryObj } from '@storybook/vue3'
import { PSkeleton } from '@eddwinpaz/predium-ui'

const meta: Meta<typeof PSkeleton> = {
  title: 'Atoms/Skeleton',
  component: PSkeleton,
  argTypes: {
    shape: { control: 'radio', options: ['rect', 'text', 'circle'] },
  },
  args: { shape: 'rect', width: '180px', height: '20px' },
}
export default meta
type Story = StoryObj<typeof PSkeleton>

export const Rect: Story = { args: { shape: 'rect', width: '240px', height: '24px' } }
export const Text: Story = { args: { shape: 'text', width: '180px', height: '12px' } }
export const Circle: Story = { args: { shape: 'circle', width: '40px', height: '40px' } }
