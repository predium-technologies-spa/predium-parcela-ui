<script setup lang="ts">
/**
 * Styled multi-line text input — matches PInput styling.
 *
 * @example
 * <PTextarea v-model="notes" placeholder="Add notes..." />
 * <PTextarea v-model="bio" :rows="5" resize="none" />
 */
export interface TextareaProps {
  /**
   * Textarea value (v-model). Accepts string, number, or null — the underlying
   * HTML textarea always renders a string. Useful for nullable form fields so
   * consumers do not have to pre-coerce.
   */
  modelValue?: string | number | null
  /** Placeholder text */
  placeholder?: string
  /** Number of visible rows */
  rows?: number
  /** Whether the textarea is disabled */
  disabled?: boolean
  /** Error state */
  error?: boolean
  /** Resize behavior */
  resize?: 'none' | 'vertical' | 'both'
}

withDefaults(defineProps<TextareaProps>(), {
  modelValue: '',
  placeholder: '',
  rows: 3,
  disabled: false,
  error: false,
  resize: 'vertical',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <textarea
    :value="modelValue"
    :placeholder="placeholder"
    :rows="rows"
    :disabled="disabled"
    :class="[
      'p-textarea w-full rounded-xl px-3 py-2.5 text-base bg-surface text-ink outline-none placeholder:text-ink4 transition-all duration-150',
      error && 'is-error',
      disabled && 'is-disabled opacity-50 bg-chip-bg cursor-not-allowed',
    ]"
    :style="{ resize }"
    @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>

<style scoped>
.p-textarea {
  border: 1px solid var(--color-line-soft);
}
.p-textarea:hover:not(.is-disabled) {
  border-color: var(--color-line);
}
.p-textarea:focus:not(.is-disabled) {
  border-color: var(--color-accent);
}
.p-textarea.is-error {
  border-color: var(--color-danger);
}
.p-textarea.is-error:focus {
  border-color: var(--color-danger);
}
</style>
