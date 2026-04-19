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
      'inline-flex min-w-0 border border-line rounded-xl overflow-hidden bg-surface shadow-sm',
      disabled && 'opacity-40 pointer-events-none',
    ]"
  >
    <button
      v-for="(opt, i) in options"
      :key="opt"
      type="button"
      :aria-pressed="modelValue === opt"
      :class="[
        'flex-1 min-w-0 px-3.5 py-2 text-sm sm:text-base text-center transition-all duration-150 cursor-pointer',
        i > 0 && 'border-l border-line',
        modelValue === opt
          ? 'bg-accent text-white font-medium'
          : 'bg-surface text-ink2 hover:bg-hover',
      ]"
      @click="$emit('update:modelValue', opt)"
    >
      {{ opt }}
    </button>
  </div>
</template>
