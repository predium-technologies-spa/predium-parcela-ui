import type { Meta, StoryObj } from '@storybook/vue3'
import { PTagsInput } from '@parcela/ui'
import { ref } from 'vue'

const meta: Meta<typeof PTagsInput> = {
  title: 'Molecules/TagsInput',
  component: PTagsInput,
}
export default meta
type Story = StoryObj<typeof PTagsInput>

export const Default: Story = {
  render: () => ({
    components: { PTagsInput },
    setup: () => ({ tags: ref<string[]>(['design', 'system']) }),
    template: `<PTagsInput v-model="tags" placeholder="Add tag…" />`,
  }),
}
