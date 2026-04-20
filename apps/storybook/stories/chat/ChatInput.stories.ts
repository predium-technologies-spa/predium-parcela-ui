import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { PChatInput } from '@parcela/ui'

const meta: Meta<typeof PChatInput> = {
  title: 'Chat/ChatInput',
  component: PChatInput,
  argTypes: {
    placeholder: { control: 'text' },
    disclaimer: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  args: {
    placeholder: 'Escribe tu mensaje o arrastra un documento...',
    disclaimer: 'Nora puede cometer errores. Verifica información crítica.',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof PChatInput>

export const Default: Story = {
  render: (args) => ({
    components: { PChatInput },
    setup() {
      const message = ref('')
      return { args, message }
    },
    template: `
      <div style="max-width: 480px;">
        <PChatInput
          v-bind="args"
          v-model="message"
          @send="() => console.log('send:', message)"
          @attach="() => console.log('attach')"
          @image="() => console.log('image')"
          @voice="() => console.log('voice')"
        />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PChatInput },
    setup() {
      const message = ref('')
      return { args, message }
    },
    template: `
      <div style="max-width: 480px;">
        <PChatInput
          v-bind="args"
          v-model="message"
          @send="() => console.log('send:', message)"
        />
      </div>
    `,
  }),
}
