<script setup lang="ts">
/**
 * Floating chat window container with header, context bar,
 * message area, suggestions, and input slots.
 *
 * @example
 * <PChatPanel v-model:open="chatOpen" assistant-name="Nora">
 *   <template #messages>...</template>
 *   <template #input>...</template>
 * </PChatPanel>
 */
import { RotateCcw, Maximize2, Minus } from 'lucide-vue-next'

export interface ChatPanelProps {
  /** Whether the panel is visible (v-model) */
  open?: boolean
  /** Assistant display name */
  assistantName?: string
  /** Subtitle below assistant name */
  assistantSubtitle?: string
  /** Avatar background color */
  avatarColor?: string
  /** Context label (e.g. "Harper Hall · Payment history") */
  contextLabel?: string
  /** Context note (e.g. "Nora puede ver esta pantalla") */
  contextNote?: string
}

const props = withDefaults(defineProps<ChatPanelProps>(), {
  open: false,
  assistantName: 'Nora',
  assistantSubtitle: 'Asistente Parcela \u00b7 GPT-4o',
  avatarColor: '#8B7355',
})

const emit = defineEmits<{
  'update:open': [value: boolean]
  history: []
  expand: []
  fullscreen: []
}>()

const initial = props.assistantName.charAt(0).toUpperCase()

function close() {
  emit('update:open', false)
}
</script>

<template>
  <Transition name="chat-panel">
    <div
      v-if="open"
      class="fixed bottom-20 right-6 z-50"
    >
      <div class="chat-panel-container w-[400px] h-[600px] max-h-[80vh] bg-bg rounded-2xl shadow-modal flex flex-col overflow-hidden">
        <!-- Header -->
        <div class="chat-panel-header px-4 py-3 flex items-center gap-3">
          <!-- Avatar -->
          <div
            class="w-10 h-10 rounded-full grid place-items-center text-white font-semibold text-base shrink-0"
            :style="{ backgroundColor: avatarColor }"
          >
            {{ initial }}
          </div>

          <!-- Name + subtitle -->
          <div class="flex-1 min-w-0">
            <div class="text-base font-semibold text-ink">{{ assistantName }}</div>
            <div class="text-xs text-ink3">{{ assistantSubtitle }}</div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-0.5">
            <button
              type="button"
              class="p-1.5 rounded-lg text-ink3 hover:text-ink hover:bg-hover cursor-pointer"
              aria-label="History"
              @click="emit('history')"
            >
              <RotateCcw :size="16" />
            </button>
            <button
              type="button"
              class="p-1.5 rounded-lg text-ink3 hover:text-ink hover:bg-hover cursor-pointer"
              aria-label="Expand"
              @click="emit('expand')"
            >
              <Maximize2 :size="16" />
            </button>
            <button
              type="button"
              class="p-1.5 rounded-lg text-ink3 hover:text-ink hover:bg-hover cursor-pointer"
              aria-label="Minimize"
              @click="close"
            >
              <Minus :size="16" />
            </button>
          </div>
        </div>

        <!-- Context bar -->
        <div
          v-if="contextLabel"
          class="chat-panel-context px-4 py-2 flex items-center gap-2 text-xs"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-info shrink-0" />
          <span class="font-medium text-ink2">Contexto: {{ contextLabel }}</span>
          <span v-if="contextNote" class="text-ink4 ml-auto">{{ contextNote }}</span>
        </div>

        <!-- Messages area -->
        <div class="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
          <slot name="messages" />
        </div>

        <!-- Suggestions area -->
        <div v-if="$slots.suggestions" class="px-4">
          <slot name="suggestions" />
        </div>

        <!-- Input area -->
        <div class="px-4 pb-4 pt-2">
          <slot name="input" />
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.chat-panel-container {
  border: 1px solid var(--color-line-soft);
}

.chat-panel-header {
  border-bottom: 1px solid var(--color-line-soft);
}

.chat-panel-context {
  border-bottom: 1px solid var(--color-line-soft);
}

/* Slide-up transition */
.chat-panel-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-panel-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.chat-panel-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.chat-panel-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
</style>
