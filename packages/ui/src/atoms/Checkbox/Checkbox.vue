<script setup lang="ts">
/**
 * Checkbox with label slot — Tailwind Forms style.
 *
 * @example
 * <PCheckbox v-model="agreed">I agree to terms</PCheckbox>
 */
import { Check } from 'lucide-vue-next'

export interface CheckboxProps {
  /** Checked state (v-model) */
  modelValue?: boolean
  /** Whether the checkbox is disabled */
  disabled?: boolean
}

withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  disabled: false,
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <label
    :class="[
      'inline-flex items-center gap-2.5 text-base cursor-pointer select-none',
      disabled ? 'opacity-40 pointer-events-none text-ink3' : 'text-ink',
    ]"
  >
    <button
      type="button"
      role="checkbox"
      :aria-checked="modelValue"
      :disabled="disabled"
      :class="[
        'w-[18px] h-[18px] rounded-md border-[1.5px] shrink-0 grid place-items-center transition-all duration-150',
        modelValue
          ? 'bg-accent border-accent'
          : 'bg-surface border-line hover:border-ink4',
      ]"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <Check v-if="modelValue" :size="11" :stroke-width="2.5" class="text-white" />
    </button>
    <slot />
  </label>
</template>
