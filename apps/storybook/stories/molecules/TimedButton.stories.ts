import type { Meta, StoryObj } from '@storybook/vue3'
import { PTimedButton, PButton } from '@parcela/ui'
import { ref } from 'vue'

const meta: Meta<typeof PTimedButton> = {
  title: 'Molecules/TimedButton',
  component: PTimedButton,
  argTypes: {
    label: { control: 'text' },
    duration: { control: 'number' },
    paused: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Countdown',
    duration: 10,
    paused: true,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof PTimedButton>

export const Default: Story = {
  render: (args) => ({
    components: { PTimedButton, PButton },
    setup() {
      const paused = ref(true)
      const btnRef = ref<InstanceType<typeof PTimedButton>>()
      function start() { paused.value = false }
      function resetBtn() {
        paused.value = true
        btnRef.value?.reset()
      }
      function onDone() { paused.value = true }
      return { args, paused, btnRef, start, resetBtn, onDone }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
        <PTimedButton ref="btnRef" v-bind="args" :paused="paused" @click="onDone" />
        <div style="display: flex; gap: 8px;">
          <PButton size="sm" @click="start">Start</PButton>
          <PButton size="sm" variant="ghost" @click="resetBtn">Reset</PButton>
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PTimedButton, PButton },
    setup() {
      const paused = ref(args.paused)
      const btnRef = ref<InstanceType<typeof PTimedButton>>()
      function toggle() { paused.value = !paused.value }
      function resetBtn() {
        paused.value = true
        btnRef.value?.reset()
      }
      return { args, paused, btnRef, toggle, resetBtn }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start;">
        <PTimedButton ref="btnRef" v-bind="args" :paused="paused" />
        <div style="display: flex; gap: 8px;">
          <PButton size="sm" @click="toggle">{{ paused ? 'Start' : 'Pause' }}</PButton>
          <PButton size="sm" variant="ghost" @click="resetBtn">Reset</PButton>
        </div>
      </div>
    `,
  }),
}
