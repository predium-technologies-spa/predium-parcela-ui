import type { Meta, StoryObj } from '@storybook/vue3'
import { PFormSection, PFormField, PInput, PSelect } from '@predium-technologies-spa/predium-ui'

const meta: Meta<typeof PFormSection> = {
  title: 'Organisms/FormSection',
  component: PFormSection,
  argTypes: {
    number: { control: 'text' },
    title: { control: 'text' },
    description: { control: 'text' },
    current: { control: 'boolean' },
  },
  args: {
    number: '01',
    title: 'Identity',
    description: 'How this property is identified.',
    current: false,
  },
}

export default meta
type Story = StoryObj<typeof PFormSection>

export const Default: Story = {
  render: (args) => ({
    components: { PFormSection, PFormField, PInput, PSelect },
    setup: () => ({ args }),
    template: `
      <PFormSection v-bind="args">
        <PFormField label="Property name">
          <PInput placeholder="e.g. Harper Hall" />
        </PFormField>
        <PFormField label="Property type">
          <PSelect
            placeholder="Select type"
            :options="[
              { label: 'Multi-family', value: 'multi-family' },
              { label: 'Townhome', value: 'townhome' },
              { label: 'Single-family', value: 'single-family' },
            ]"
          />
        </PFormField>
        <PFormField label="Year built">
          <PInput placeholder="e.g. 1998" />
        </PFormField>
      </PFormSection>
    `,
  }),
}

export const Composition: Story = {
  render: () => ({
    components: { PFormSection, PFormField, PInput, PSelect },
    template: `
      <PFormSection number="01" title="Identity" description="How this property is identified." :current="true">
        <PFormField label="Property name">
          <PInput modelValue="Harper Hall" />
        </PFormField>
        <PFormField label="Property type">
          <PSelect
            modelValue="multi-family"
            :options="[
              { label: 'Multi-family', value: 'multi-family' },
              { label: 'Townhome', value: 'townhome' },
              { label: 'Single-family', value: 'single-family' },
            ]"
          />
        </PFormField>
        <PFormField label="Year built">
          <PInput modelValue="2004" />
        </PFormField>
      </PFormSection>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PFormSection, PFormField, PInput, PSelect },
    setup: () => ({ args }),
    template: `
      <PFormSection v-bind="args">
        <PFormField label="Property name">
          <PInput placeholder="e.g. Harper Hall" />
        </PFormField>
        <PFormField label="Property type">
          <PSelect
            placeholder="Select type"
            :options="[
              { label: 'Multi-family', value: 'multi-family' },
              { label: 'Townhome', value: 'townhome' },
              { label: 'Single-family', value: 'single-family' },
            ]"
          />
        </PFormField>
      </PFormSection>
    `,
  }),
}
