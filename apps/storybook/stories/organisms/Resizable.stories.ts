import type { Meta, StoryObj } from '@storybook/vue3'
import { PResizable } from '@parcela/ui'

const meta: Meta<typeof PResizable> = {
  title: 'Organisms/Resizable',
  component: PResizable,
}
export default meta
type Story = StoryObj<typeof PResizable>

export const Default: Story = {
  render: () => ({
    components: { PResizable },
    template: `
      <div style="height:280px;border:1px solid #E8E5DF;border-radius:12px">
        <PResizable :initial-size="220" :min="160" :max="480">
          <template #left>
            <div style="padding:12px;background:#F5F2ED;height:100%">Sidebar</div>
          </template>
          <template #right>
            <div style="padding:12px">Content</div>
          </template>
        </PResizable>
      </div>
    `,
  }),
}
