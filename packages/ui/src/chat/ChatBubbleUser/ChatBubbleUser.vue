<script setup lang="ts">
/**
 * User message bubble (right-aligned).
 *
 * @example
 * <PChatBubbleUser time="10:44" status="read">Hola, necesito ayuda</PChatBubbleUser>
 */
export interface ChatBubbleUserProps {
  /** Timestamp label */
  time: string
  /** Message delivery status */
  status?: 'sent' | 'delivered' | 'read'
}

withDefaults(defineProps<ChatBubbleUserProps>(), {
  status: 'sent',
})

const statusLabels: Record<string, string> = {
  sent: 'enviado',
  delivered: 'entregado',
  read: 'leído',
}
</script>

<template>
  <div class="flex justify-end">
    <div class="flex flex-col items-end">
      <!-- Bubble — always dark, works in both modes -->
      <div class="chat-bubble-user text-white rounded-2xl rounded-tr-md px-4 py-3 max-w-[320px] text-base leading-relaxed">
        <slot />
      </div>

      <!-- Status -->
      <span class="text-xs text-ink4 mt-1">{{ time }} · {{ statusLabels[status] }}</span>
    </div>
  </div>
</template>

<style scoped>
.chat-bubble-user {
  background: #1A1714;
}
.dark .chat-bubble-user {
  background: #3D3833;
}
</style>
