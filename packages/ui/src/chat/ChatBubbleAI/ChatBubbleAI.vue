<script setup lang="ts">
/**
 * AI/assistant message bubble (left-aligned).
 *
 * @example
 * <PChatBubbleAI sender="Nora" time="10:42">Hello!</PChatBubbleAI>
 */
import { ThumbsUp, ThumbsDown, Copy, Share2 } from 'lucide-vue-next'

export interface ChatBubbleAIProps {
  /** Display name of the AI sender */
  sender?: string
  /** Timestamp label */
  time: string
  /** Avatar background color */
  avatarColor?: string
  /** Show action buttons (like, dislike, copy, share) */
  showActions?: boolean
}

const props = withDefaults(defineProps<ChatBubbleAIProps>(), {
  sender: 'Nora',
  avatarColor: '#8B7355',
  showActions: true,
})

const emit = defineEmits<{
  action: [type: 'like' | 'dislike' | 'copy' | 'share']
}>()

const initial = props.sender.charAt(0).toUpperCase()
</script>

<template>
  <div class="flex items-start gap-3">
    <!-- Avatar -->
    <div
      class="w-8 h-8 rounded-full grid place-items-center text-white font-semibold text-xs shrink-0"
      :style="{ backgroundColor: avatarColor }"
    >
      {{ initial }}
    </div>

    <!-- Content -->
    <div class="flex flex-col">
      <!-- Header -->
      <span class="text-sm text-ink3 mb-1">{{ sender }} · {{ time }}</span>

      <!-- Bubble -->
      <div class="chat-bubble-ai bg-surface rounded-2xl rounded-tl-md p-4 max-w-[320px] text-base text-ink leading-relaxed">
        <slot />
      </div>

      <!-- Quick replies slot -->
      <slot name="quick-replies" />

      <!-- Actions -->
      <div v-if="showActions" class="flex items-center gap-1 mt-1">
        <button
          type="button"
          class="p-1.5 rounded-lg text-ink4 hover:text-ink3 hover:bg-hover cursor-pointer"
          @click="emit('action', 'like')"
        >
          <ThumbsUp :size="14" />
        </button>
        <button
          type="button"
          class="p-1.5 rounded-lg text-ink4 hover:text-ink3 hover:bg-hover cursor-pointer"
          @click="emit('action', 'dislike')"
        >
          <ThumbsDown :size="14" />
        </button>
        <button
          type="button"
          class="p-1.5 rounded-lg text-ink4 hover:text-ink3 hover:bg-hover cursor-pointer"
          @click="emit('action', 'copy')"
        >
          <Copy :size="14" />
        </button>
        <button
          type="button"
          class="p-1.5 rounded-lg text-ink4 hover:text-ink3 hover:bg-hover cursor-pointer"
          @click="emit('action', 'share')"
        >
          <Share2 :size="14" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-bubble-ai {
  border: 1px solid var(--color-line-soft);
}
</style>
