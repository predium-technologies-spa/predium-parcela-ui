import type { Meta, StoryObj } from '@storybook/vue3'
import { PSparkline } from '@predium-technologies-spa/predium-ui'

const meta: Meta<typeof PSparkline> = {
  title: 'Atoms/Sparkline',
  component: PSparkline,
  argTypes: {
    variant: { control: 'select', options: ['line', 'bar'] },
    tone: { control: 'select', options: ['neutral', 'good', 'warn', 'danger'] },
    height: { control: { type: 'range', min: 20, max: 80, step: 4 } },
  },
  args: {
    points: [2, 3, 3, 2, 4, 3, 4],
    variant: 'line',
    tone: 'good',
    height: 40,
  },
}

export default meta
type Story = StoryObj<typeof PSparkline>

export const Default: Story = {
  render: (args) => ({
    components: { PSparkline },
    setup: () => ({ args }),
    template: '<div style="width: 200px;"><PSparkline v-bind="args" /></div>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PSparkline },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 200px); gap: 16px;">
        <div>
          <p class="text-xs text-ink3 mb-1">Line · good</p>
          <PSparkline :points="[2,3,3,2,4,3,4]" variant="line" tone="good" />
        </div>
        <div>
          <p class="text-xs text-ink3 mb-1">Line · warn</p>
          <PSparkline :points="[10,11,13,12,14,15,14]" variant="line" tone="warn" />
        </div>
        <div>
          <p class="text-xs text-ink3 mb-1">Bar · neutral</p>
          <PSparkline :points="[4100,4230,0,3100,1850,2620,1990,0,0,2150]" variant="bar" tone="neutral" :height="32" />
        </div>
        <div>
          <p class="text-xs text-ink3 mb-1">Bar · danger</p>
          <PSparkline :points="[1,3,5,2,4,6,3]" variant="bar" tone="danger" :height="32" />
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PSparkline },
    setup: () => ({ args }),
    template: '<div style="width: 200px;"><PSparkline v-bind="args" /></div>',
  }),
}
