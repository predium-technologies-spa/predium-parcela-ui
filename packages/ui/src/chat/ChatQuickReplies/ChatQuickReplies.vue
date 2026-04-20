<script setup lang="ts">
/**
 * Quick reply buttons shown below AI messages.
 *
 * @example
 * <PChatQuickReplies :replies="['Sí', 'No']" @select="handleSelect" />
 */
export interface ChatQuickRepliesProps {
  /** List of reply labels */
  replies: string[]
}

defineProps<ChatQuickRepliesProps>()

const emit = defineEmits<{
  select: [reply: string]
}>()
</script>

<template>
  <div class="flex flex-wrap gap-2 mt-2">
    <button
      v-for="reply in replies"
      :key="reply"
      type="button"
      class="quick-reply bg-surface hover:bg-hover rounded-xl px-3 py-1.5 text-sm text-ink font-medium cursor-pointer transition-colors"
      @click="emit('select', reply)"
    >
      {{ reply }}
    </button>
  </div>
</template>

<style scoped>
.quick-reply {
  border: 1px solid var(--color-line-soft);
}
</style>
