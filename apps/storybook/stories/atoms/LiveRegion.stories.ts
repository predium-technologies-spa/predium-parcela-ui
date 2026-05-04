import type { Meta, StoryObj } from '@storybook/vue3'
import { PLiveRegion } from '@predium-technologies-spa/predium-ui'

const meta: Meta<typeof PLiveRegion> = {
  title: 'Atoms/LiveRegion',
  component: PLiveRegion,
  argTypes: {
    politeness: { control: 'radio', options: ['polite', 'assertive', 'off'] },
  },
  args: { politeness: 'polite' },
}
export default meta
type Story = StoryObj<typeof PLiveRegion>

export const Default: Story = {
  render: (args) => ({
    components: { PLiveRegion },
    setup: () => ({ args }),
    template: `
      <div>
        <p style="color:#6B655D">Inspect the DOM — the announcement is visually hidden.</p>
        <PLiveRegion v-bind="args">Item saved</PLiveRegion>
      </div>
    `,
  }),
}
