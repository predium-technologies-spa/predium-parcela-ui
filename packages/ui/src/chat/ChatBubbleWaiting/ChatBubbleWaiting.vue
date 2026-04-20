<script setup lang="ts">
/**
 * Typing indicator bubble with animated dots.
 *
 * @example
 * <PChatBubbleWaiting sender="Nora" />
 */
export interface ChatBubbleWaitingProps {
  /** Display name of the AI sender */
  sender?: string
  /** Avatar background color */
  avatarColor?: string
}

const props = withDefaults(defineProps<ChatBubbleWaitingProps>(), {
  sender: 'Nora',
  avatarColor: '#8B7355',
})

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

    <!-- Bubble -->
    <div class="chat-bubble-waiting bg-surface rounded-2xl rounded-tl-md p-4">
      <div class="flex items-center gap-1.5">
        <span class="dot dot-1 w-2 h-2 rounded-full bg-ink4" />
        <span class="dot dot-2 w-2 h-2 rounded-full bg-ink4" />
        <span class="dot dot-3 w-2 h-2 rounded-full bg-ink4" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-bubble-waiting {
  border: 1px solid var(--color-line-soft);
}

.dot {
  display: inline-block;
  animation: bounce-dot 1.4s infinite ease-in-out;
}

.dot-1 {
  animation-delay: 0s;
}

.dot-2 {
  animation-delay: 0.2s;
}

.dot-3 {
  animation-delay: 0.4s;
}

@keyframes bounce-dot {
  0%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-6px);
  }
}
</style>
