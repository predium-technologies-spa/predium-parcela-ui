<script setup lang="ts">
/**
 * Segmented button group for toggling between 2–5 options.
 *
 * @example
 * <PSegmentedButton v-model="selected" :options="['A', 'B', 'B+', 'C']" />
 */
export interface SegmentedButtonProps {
  /** Currently selected value (v-model) */
  modelValue?: string
  /** List of option labels */
  options: string[]
  /** Whether the control is disabled */
  disabled?: boolean
}

withDefaults(defineProps<SegmentedButtonProps>(), {
  modelValue: '',
  disabled: false,
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div
    role="group"
    :class="[
      'inline-flex border border-line rounded-lg overflow-hidden bg-surface',
      disabled && 'opacity-40 pointer-events-none',
    ]"
  >
    <button
      v-for="(opt, i) in options"
      :key="opt"
      type="button"
      :aria-pressed="modelValue === opt"
      :class="[
        'flex-1 px-2.5 py-1.5 text-md text-center transition-colors',
        i > 0 && 'border-l border-line',
        modelValue === opt
          ? 'bg-ink text-white font-medium'
          : 'bg-surface text-ink2 hover:bg-chip-bg',
      ]"
      @click="$emit('update:modelValue', opt)"
    >
      {{ opt }}
    </button>
  </div>
</template>
