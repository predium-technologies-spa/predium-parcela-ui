<script setup lang="ts">
/**
 * Styled multi-line text input — matches PInput styling.
 * Supports a built-in character counter with optional min/max length.
 *
 * @example
 * <PTextarea v-model="notes" placeholder="Add notes..." />
 * <PTextarea v-model="bio" :rows="5" resize="none" />
 * <PTextarea v-model="msg" :max-length="500" :min-length="20" size="sm" />
 */
import { computed } from 'vue'

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
  /** Size variant — controls padding and font-size */
  size?: 'sm' | 'md' | 'lg'
  /** Maximum number of characters (also caps native input) */
  maxLength?: number
  /** Minimum number of characters — counter turns red when below */
  minLength?: number
  /** Force-show the character counter (auto-on when min/maxLength is set) */
  showCounter?: boolean
}

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: '',
  placeholder: '',
  rows: 3,
  disabled: false,
  error: false,
  resize: 'vertical',
  size: 'md',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()

const valueLength = computed(() =>
  props.modelValue == null ? 0 : String(props.modelValue).length,
)

const counterEnabled = computed(() => {
  if (props.showCounter !== undefined) return props.showCounter
  return props.maxLength != null || props.minLength != null
})

const isUnderMin = computed(
  () => props.minLength != null && valueLength.value < props.minLength,
)

const counterText = computed(() => {
  if (props.maxLength != null) {
    return `${valueLength.value} / ${props.maxLength}`
  }
  if (props.minLength != null) {
    return `${valueLength.value} / mín ${props.minLength}`
  }
  return String(valueLength.value)
})
</script>

<template>
  <div class="flex flex-col gap-1">
    <textarea
      :value="modelValue ?? ''"
      :placeholder="placeholder"
      :rows="rows"
      :disabled="disabled"
      :maxlength="maxLength"
      :class="[
        'p-textarea w-full rounded-xl bg-surface text-ink outline-none placeholder:text-ink4 transition-all duration-150',
        size === 'sm' && 'px-2.5 py-2 text-sm',
        size === 'md' && 'px-3 py-2.5 text-base',
        size === 'lg' && 'px-3.5 py-3 text-md',
        error && 'is-error',
        disabled && 'is-disabled opacity-50 bg-chip-bg cursor-not-allowed',
      ]"
      :style="{ resize }"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
    <div
      v-if="counterEnabled"
      class="flex justify-end text-xs tabular-nums"
      :class="[isUnderMin || error ? 'text-danger' : 'text-ink4']"
    >
      {{ counterText }}
    </div>
  </div>
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
.text-danger {
  color: var(--color-danger);
}
.text-ink4 {
  color: var(--color-ink4);
}
</style>
