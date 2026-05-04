import type { Meta, StoryObj } from '@storybook/vue3'
import { PTreeView } from '@predium-technologies-spa/predium-ui'
import { Folder, File, Image, FileText } from 'lucide-vue-next'
import { markRaw } from 'vue'

const sampleItems = [
  {
    id: '1',
    label: 'src',
    icon: markRaw(Folder),
    children: [
      {
        id: '1-1',
        label: 'components',
        icon: markRaw(Folder),
        children: [
          { id: '1-1-1', label: 'Button.vue', icon: markRaw(File) },
          { id: '1-1-2', label: 'Input.vue', icon: markRaw(File) },
          { id: '1-1-3', label: 'Modal.vue', icon: markRaw(File) },
        ],
      },
      {
        id: '1-2',
        label: 'assets',
        icon: markRaw(Folder),
        children: [
          { id: '1-2-1', label: 'logo.png', icon: markRaw(Image) },
          { id: '1-2-2', label: 'styles.css', icon: markRaw(FileText) },
        ],
      },
      { id: '1-3', label: 'main.ts', icon: markRaw(File) },
    ],
  },
  {
    id: '2',
    label: 'docs',
    icon: markRaw(Folder),
    children: [
      { id: '2-1', label: 'README.md', icon: markRaw(FileText) },
      { id: '2-2', label: 'CHANGELOG.md', icon: markRaw(FileText) },
    ],
  },
  { id: '3', label: 'package.json', icon: markRaw(File) },
]

const meta: Meta<typeof PTreeView> = {
  title: 'Molecules/TreeView',
  component: PTreeView,
  argTypes: {
    defaultExpanded: { control: 'boolean' },
  },
  args: {
    items: sampleItems,
    defaultExpanded: false,
  },
}

export default meta
type Story = StoryObj<typeof PTreeView>

export const Default: Story = {
  render: (args) => ({
    components: { PTreeView },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 320px;">
        <PTreeView v-bind="args" />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PTreeView },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 320px;">
        <PTreeView v-bind="args" />
      </div>
    `,
  }),
}
