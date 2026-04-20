<script setup lang="ts">
/**
 * Message input area with attachment buttons and send.
 *
 * @example
 * <PChatInput v-model="message" @send="handleSend" />
 */
import { Paperclip, Image, Mic, Maximize2, Send } from 'lucide-vue-next'

export interface ChatInputProps {
  /** Current input value (v-model) */
  modelValue: string
  /** Placeholder text */
  placeholder?: string
  /** Disclaimer text shown below input */
  disclaimer?: string
  /** Disable the input */
  disabled?: boolean
}

withDefaults(defineProps<ChatInputProps>(), {
  placeholder: 'Escribe tu mensaje o arrastra un documento...',
  disclaimer: 'Nora puede cometer errores. Verifica información crítica.',
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  send: []
  attach: []
  image: []
  voice: []
}>()

function onInput(e: Event) {
  const target = e.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    emit('send')
  }
}
</script>

<template>
  <div>
    <div class="chat-input-container rounded-2xl bg-surface">
      <!-- Textarea -->
      <textarea
        rows="1"
        class="resize-none px-4 pt-3 pb-2 text-base text-ink placeholder:text-ink4 outline-none bg-transparent w-full"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
        @input="onInput"
        @keydown="onKeydown"
      />

      <!-- Bottom row -->
      <div class="flex items-center justify-between px-3 pb-2">
        <!-- Left icons -->
        <div class="flex items-center gap-1">
          <button
            type="button"
            class="p-1.5 rounded-lg text-ink4 hover:text-ink3 hover:bg-hover cursor-pointer"
            :disabled="disabled"
            @click="emit('attach')"
          >
            <Paperclip :size="16" />
          </button>
          <button
            type="button"
            class="p-1.5 rounded-lg text-ink4 hover:text-ink3 hover:bg-hover cursor-pointer"
            :disabled="disabled"
            @click="emit('image')"
          >
            <Image :size="16" />
          </button>
          <button
            type="button"
            class="p-1.5 rounded-lg text-ink4 hover:text-ink3 hover:bg-hover cursor-pointer"
            :disabled="disabled"
            @click="emit('voice')"
          >
            <Mic :size="16" />
          </button>
        </div>

        <!-- Right icons -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="p-1.5 rounded-lg text-ink4 hover:text-ink3 hover:bg-hover cursor-pointer"
          >
            <Maximize2 :size="16" />
          </button>
          <button
            type="button"
            class="w-9 h-9 rounded-full bg-accent text-white grid place-items-center hover:bg-accent/90 cursor-pointer"
            :disabled="disabled"
            @click="emit('send')"
          >
            <Send :size="16" />
          </button>
        </div>
      </div>
    </div>

    <!-- Disclaimer -->
    <p v-if="disclaimer" class="text-[11px] text-ink4 text-center mt-2">{{ disclaimer }}</p>
  </div>
</template>

<style scoped>
.chat-input-container {
  border: 1px solid var(--color-line-soft);
}
</style>
