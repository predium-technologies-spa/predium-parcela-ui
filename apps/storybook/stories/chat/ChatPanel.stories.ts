import type { Meta, StoryObj } from '@storybook/vue3'
import {
  PChatPanel,
  PChatBubbleAI,
  PChatBubbleUser,
  PChatDateSeparator,
  PChatSuggestions,
  PChatInput,
} from '@eddwinpaz/predium-ui'
import { ref } from 'vue'

const meta: Meta<typeof PChatPanel> = {
  title: 'Chat/ChatPanel',
  component: PChatPanel,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'parcela' },
  },
}

export default meta
type Story = StoryObj<typeof PChatPanel>

export const Default: Story = {
  render: () => ({
    components: {
      PChatPanel,
      PChatBubbleAI,
      PChatBubbleUser,
      PChatDateSeparator,
      PChatSuggestions,
      PChatInput,
    },
    setup() {
      const open = ref(true)
      const message = ref('')
      return { open, message }
    },
    template: `
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
