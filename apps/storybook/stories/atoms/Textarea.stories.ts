import type { Meta, StoryObj } from '@storybook/vue3'
import { PTextarea } from '@eddwinpaz/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PTextarea> = {
  title: 'Atoms/Textarea',
  component: PTextarea,
  argTypes: {
    placeholder: { control: 'text' },
    rows: { control: { type: 'number', min: 1, max: 20 } },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    resize: { control: 'select', options: ['none', 'vertical', 'both'] },
  },
  args: {
    placeholder: 'Enter text...',
    rows: 3,
    disabled: false,
    error: false,
    resize: 'vertical',
  },
}

export default meta
type Story = StoryObj<typeof PTextarea>

export const Default: Story = {
  render: (args) => ({
    components: { PTextarea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<div style="max-width: 380px;"><PTextarea v-bind="args" v-model="value" /></div>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PTextarea },
    setup() {
      const v1 = ref('')
      const v2 = ref('This textarea already has some content filled in to demonstrate the filled state of the component.')
      const v3 = ref('')
      const v4 = ref('')
      const v5 = ref('')
      return { v1, v2, v3, v4, v5 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 380px;">
        <div>
          <div style="margin-bottom: 4px; font-size: 13px; color: #888;">Placeholder</div>
          <PTextarea v-model="v1" placeholder="Add a description..." />
        </div>
        <div>
          <div style="margin-bottom: 4px; font-size: 13px; color: #888;">Filled</div>
          <PTextarea v-model="v2" />
        </div>
        <div>
          <div style="margin-bottom: 4px; font-size: 13px; color: #888;">Error</div>
          <PTextarea v-model="v3" placeholder="Required field" error />
        </div>
        <div>
          <div style="margin-bottom: 4px; font-size: 13px; color: #888;">Disabled</div>
          <PTextarea v-model="v4" placeholder="Cannot edit" disabled />
        </div>
        <div>
          <div style="margin-bottom: 4px; font-size: 13px; color: #888;">Resize none</div>
          <PTextarea v-model="v5" placeholder="Fixed height" resize="none" />
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PTextarea },
    setup() {
      const value = ref('Editable content')
      return { args, value }
    },
    template: '<div style="max-width: 380px;"><PTextarea v-bind="args" v-model="value" /></div>',
  }),
}
