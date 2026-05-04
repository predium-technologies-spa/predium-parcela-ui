import type { Meta, StoryObj } from '@storybook/vue3'
import { PTableCell } from '@predium-technologies-spa/predium-ui'

const meta: Meta<typeof PTableCell> = {
  title: 'Molecules/TableCell',
  component: PTableCell,
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'mono', 'avatar'],
    },
    align: {
      control: 'select',
      options: ['left', 'right'],
    },
    title: { control: 'text' },
    subtitle: { control: 'text' },
    initials: { control: 'text' },
  },
  args: {
    variant: 'standard',
    align: 'left',
  },
}

export default meta
type Story = StoryObj<typeof PTableCell>

export const Default: Story = {
  render: (args) => ({
    components: { PTableCell },
    setup: () => ({ args }),
    template: `
      <table><tbody><tr>
        <PTableCell v-bind="args">214 Ashford St, Brooklyn</PTableCell>
      </tr></tbody></table>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PTableCell },
    template: `
      <table style="border-collapse: collapse;">
        <tbody>
          <tr>
            <PTableCell variant="avatar" title="Ashford Row" subtitle="214 Ashford St" initials="AR" />
            <PTableCell variant="mono">PRP-0128</PTableCell>
            <PTableCell>Brooklyn, NY</PTableCell>
            <PTableCell variant="mono" align="right">$4,280,000</PTableCell>
          </tr>
          <tr>
            <PTableCell variant="avatar" title="Harper Hall" subtitle="88 Harper Ave" initials="HH" />
            <PTableCell variant="mono">PRP-0129</PTableCell>
            <PTableCell>Queens, NY</PTableCell>
            <PTableCell variant="mono" align="right">$3,150,000</PTableCell>
          </tr>
        </tbody>
      </table>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PTableCell },
    setup: () => ({ args }),
    template: `
      <table><tbody><tr>
        <PTableCell v-bind="args">Sample cell content</PTableCell>
      </tr></tbody></table>
    `,
  }),
}
