import type { Meta, StoryObj } from '@storybook/vue3'
import { PTile } from '@predium-technologies-spa/predium-ui'
import { ref } from 'vue'
import { Home, Building2, Warehouse, Landmark } from 'lucide-vue-next'

const meta: Meta<typeof PTile> = {
  title: 'Molecules/Tile',
  component: PTile,
  argTypes: {
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    align: { control: 'select', options: ['top', 'center'] },
  },
  args: {
    selected: false,
    disabled: false,
    align: 'center',
  },
}

export default meta
type Story = StoryObj<typeof PTile>

export const Default: Story = {
  render: (args) => ({
    components: { PTile },
    setup: () => ({ args }),
    template: `
      <div style="max-width: 220px;">
        <PTile v-bind="args">
          Single-family home
          <template #description>Detached residential property</template>
        </PTile>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { PTile, Home, Building2, Warehouse, Landmark },
    setup() {
      const selected = ref('house')
      return { selected, Home, Building2, Warehouse, Landmark }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <div style="margin-bottom: 8px; font-size: 13px; color: #888;">Selectable grid (with icons)</div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; max-width: 720px;">
            <PTile :selected="selected === 'house'" @click="selected = 'house'">
              <template #icon><Home :size="24" /></template>
              House
              <template #description>Single-family</template>
            </PTile>
            <PTile :selected="selected === 'apartment'" @click="selected = 'apartment'">
              <template #icon><Building2 :size="24" /></template>
              Apartment
              <template #description>Multi-unit building</template>
            </PTile>
            <PTile :selected="selected === 'warehouse'" @click="selected = 'warehouse'">
              <template #icon><Warehouse :size="24" /></template>
              Warehouse
              <template #description>Industrial space</template>
            </PTile>
            <PTile :selected="selected === 'office'" @click="selected = 'office'">
              <template #icon><Landmark :size="24" /></template>
              Office
              <template #description>Commercial building</template>
            </PTile>
          </div>
        </div>
        <div>
          <div style="margin-bottom: 8px; font-size: 13px; color: #888;">Disabled</div>
          <div style="max-width: 180px;">
            <PTile disabled>
              <template #icon><Home :size="24" /></template>
              Unavailable
              <template #description>Not selectable</template>
            </PTile>
          </div>
        </div>
      </div>
    `,
  }),
}

export const Playground: Story = {
  render: (args) => ({
    components: { PTile, Home },
    setup() {
      return { args, Home }
    },
    template: `
      <div style="max-width: 220px;">
        <PTile v-bind="args">
          <template #icon><Home :size="24" /></template>
          Playground tile
          <template #description>Try the controls</template>
        </PTile>
      </div>
    `,
  }),
}
