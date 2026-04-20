<script setup lang="ts">
/**
 * Suggestion chips shown above the input area.
 *
 * @example
 * <PChatSuggestions :suggestions="['Resumir', 'Explicar']" @select="handleSelect" />
 */
export interface ChatSuggestionsProps {
  /** List of suggestion labels */
  suggestions: string[]
}

defineProps<ChatSuggestionsProps>()

const emit = defineEmits<{
  select: [suggestion: string]
}>()
</script>

<template>
  <div class="flex gap-2 overflow-x-auto py-2 px-1">
    <button
      v-for="suggestion in suggestions"
      :key="suggestion"
      type="button"
      class="suggestion-chip bg-surface hover:bg-hover rounded-xl px-3 py-1.5 text-sm text-ink2 whitespace-nowrap cursor-pointer transition-colors"
      @click="emit('select', suggestion)"
    >
      {{ suggestion }}
    </button>
  </div>
</template>

<style scoped>
.suggestion-chip {
  border: 1px solid var(--color-line-soft);
}
</style>
