import type { Meta, StoryObj } from '@storybook/vue3'
import { PCard, PButton } from '@eddwinpaz/predium-ui'

const meta: Meta<typeof PCard> = {
  title: 'Molecules/Card',
  component: PCard,
  args: { title: 'Subscription', subtitle: 'Pro plan' },
}
export default meta
type Story = StoryObj<typeof PCard>

export const Basic: Story = {
  render: (args) => ({
    components: { PCard },
    setup: () => ({ args }),
    template: `<PCard v-bind="args" style="max-width:360px"><p>Body content goes here.</p></PCard>`,
  }),
}
export const WithFooter: Story = {
  render: () => ({
    components: { PCard, PButton },
    template: `
      <PCard title="Confirm" style="max-width:360px">
        <p>Are you sure?</p>
        <template #footer>
          <PButton variant="ghost">Cancel</PButton>
          <PButton variant="primary">Save</PButton>
        </template>
      </PCard>
    `,
  }),
}
