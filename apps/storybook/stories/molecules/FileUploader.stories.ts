import type { Meta, StoryObj } from '@storybook/vue3'
import { PFileUploader } from '@parcela/ui'

const meta: Meta<typeof PFileUploader> = {
  title: 'Molecules/FileUploader',
  component: PFileUploader,
  argTypes: {
    accept: { control: 'text' },
    multiple: { control: 'boolean' },
    maxSize: { control: 'number' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    accept: '',
    multiple: false,
    maxSize: 10485760,
    disabled: false,
    label: 'Drop files here or',
  },
}

export default meta
type Story = StoryObj<typeof PFileUploader>

export const Default: Story = {
  render: (args) => ({
    components: { PFileUploader },
    setup() {
      function onUpload(files: File[]) {
        console.log('Uploaded:', files.map((f) => f.name))
      }
      function onError(msg: string) {
        console.warn('Upload error:', msg)
      }
      return { args, onUpload, onError }
    },
    template: `
      <div style="max-width: 480px;">
        <PFileUploader v-bind="args" @upload="onUpload" @error="onError" />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PFileUploader },
    setup() {
      function onUpload(files: File[]) {
        console.log('Uploaded:', files.map((f) => f.name))
      }
      function onError(msg: string) {
        console.warn('Upload error:', msg)
      }
      return { args, onUpload, onError }
    },
    template: `
      <div style="max-width: 480px;">
        <PFileUploader v-bind="args" @upload="onUpload" @error="onError" />
      </div>
    `,
  }),
}
