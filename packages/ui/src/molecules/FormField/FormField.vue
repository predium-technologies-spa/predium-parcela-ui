<script setup lang="ts">
/**
 * Form field wrapper with label, hint, error, and input slot.
 *
 * @example
 * <PFormField label="Property name" required>
 *   <PInput v-model="name" />
 * </PFormField>
 */
export interface FormFieldProps {
  /** Field label */
  label: string
  /** Whether field is required */
  required?: boolean
  /** Hint text (right side) */
  hint?: string
  /** Error message */
  error?: string
  /** Span columns (for CSS grid) */
  cols?: 1 | 2
}

withDefaults(defineProps<FormFieldProps>(), {
  required: false,
  cols: 1,
})
</script>

<template>
  <div :style="cols === 2 ? { gridColumn: 'span 2' } : undefined">
    <div class="flex flex-wrap justify-between mb-1.5">
      <label class="text-base font-medium text-ink2">
        {{ label }}
        <span v-if="required" class="text-danger">*</span>
      </label>
      <span v-if="hint" class="text-sm text-ink4">{{ hint }}</span>
    </div>
    <slot />
    <div v-if="error" class="text-sm text-danger mt-1">{{ error }}</div>
  </div>
</template>
