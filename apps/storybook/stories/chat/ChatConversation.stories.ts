import type { Meta, StoryObj } from '@storybook/vue3'
import {
  PChatBadge,
  PChatPanel,
  PChatBubbleAI,
  PChatBubbleUser,
  PChatDateSeparator,
  PChatSuggestions,
  PChatInput,
} from '@predium-technologies-spa/predium-ui'
import { ref } from 'vue'

const meta: Meta = {
  title: 'Chat/ChatConversation',
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => ({
    components: {
      PChatBadge,
      PChatPanel,
      PChatBubbleAI,
      PChatBubbleUser,
      PChatDateSeparator,
      PChatSuggestions,
      PChatInput,
    },
    setup() {
      const open = ref(false)
      const message = ref('')
      function toggle() {
        open.value = !open.value
      }
      return { open, message, toggle }
    },
    template: `
      <!-- Badge (visible when panel is closed) -->
      <PChatBadge
        v-if="!open"
        name="Nora"
        :online="true"
        :unread-count="2"
        time="07:58"
        @click="toggle"
      />

      <!-- Panel (visible when open) -->
      <PChatPanel
        v-model:open="open"
        assistant-name="Nora"
        assistant-subtitle="Asistente Parcela · GPT-4o"
        context-label="Harper Hall · Payment history"
        context-note="Nora puede ver esta pantalla"
      >
        <template #messages>
          <PChatDateSeparator label="HOY · 10:42" />

          <PChatBubbleAI sender="Nora" time="10:42">
            <span v-html="'Hola Elena, buenos días. Vi que tenés <strong>3 pagos fallidos</strong> desde ayer. ¿Quieres que prepare los mensajes de cobranza?'" />
            <template #quick-replies>
              <div class="flex flex-wrap gap-2 mt-2">
                <button type="button" class="bg-surface hover:bg-hover rounded-xl px-3 py-1.5 text-sm text-ink font-medium cursor-pointer transition-colors" style="border: 1px solid var(--color-line-soft)">Sí, redactá borradores</button>
                <button type="button" class="bg-surface hover:bg-hover rounded-xl px-3 py-1.5 text-sm text-ink font-medium cursor-pointer transition-colors" style="border: 1px solid var(--color-line-soft)">Mostrame los casos primero</button>
              </div>
            </template>
          </PChatBubbleAI>

          <PChatBubbleUser time="10:44" status="read">
            Mostrame los casos primero
          </PChatBubbleUser>

          <PChatBubbleAI sender="Nora" time="10:44">
            Acá están los 3 pagos fallidos más urgentes:
          </PChatBubbleAI>
        </template>

        <template #suggestions>
          <PChatSuggestions
            :suggestions="['Resumir esta pantalla', 'Generar reporte', 'Explicar indicador']"
          />
        </template>

        <template #input>
          <PChatInput v-model="message" />
        </template>
      </PChatPanel>
    `,
  }),
}
