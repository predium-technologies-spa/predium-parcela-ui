import type { Meta, StoryObj } from '@storybook/vue3'
import { PTaskItem } from '@predium-technologies-spa/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PTaskItem> = {
  title: 'Organisms/TaskItem',
  component: PTaskItem,
  argTypes: {
    label: { control: 'text' },
    when: { control: 'text' },
    modelValue: { control: 'boolean' },
    urgent: { control: 'boolean' },
  },
  args: {
    label: 'Send lease docs to M. Delacroix',
    when: '08:00',
    modelValue: true,
    urgent: false,
  },
}

export default meta
type Story = StoryObj<typeof PTaskItem>

export const Default: Story = {
  render: (args) => ({
    components: { PTaskItem },
    setup() {
      const done = ref(args.modelValue)
      return { args, done }
    },
    template: '<PTaskItem v-bind="args" v-model="done" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PTaskItem },
    setup() {
      const done1 = ref(true)
      const done2 = ref(true)
      const done3 = ref(false)
      const done4 = ref(false)
      return { done1, done2, done3, done4 }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 8px; max-width: 400px;">
        <PTaskItem
          label="Send lease docs to M. Delacroix"
          when="08:00"
          v-model="done1"
        />
        <PTaskItem
          label="Follow up on maintenance request #247"
          when="09:30"
          v-model="done2"
        />
        <PTaskItem
          label="Review tenant application — Unit 6A"
          when="11:00"
          v-model="done3"
          :urgent="true"
        />
        <PTaskItem
          label="Schedule HVAC inspection for Linden Court"
          when="14:00"
          v-model="done4"
        />
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PTaskItem },
    setup() {
      const done = ref(args.modelValue)
      return { args, done }
    },
    template: '<PTaskItem v-bind="args" v-model="done" />',
  }),
}
