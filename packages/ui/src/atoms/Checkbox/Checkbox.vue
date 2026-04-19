<script setup lang="ts">
/**
 * Checkbox with label slot.
 *
 * @example
 * <PCheckbox v-model="agreed">I agree to terms</PCheckbox>
 * <PCheckbox v-model="enabled" disabled>Disabled option</PCheckbox>
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
      'inline-flex items-center gap-2 text-md cursor-pointer select-none',
      disabled ? 'opacity-40 pointer-events-none text-ink3' : 'text-ink',
    ]"
  >
    <button
      type="button"
      role="checkbox"
      :aria-checked="modelValue"
      :disabled="disabled"
      :class="[
        'w-3.5 h-3.5 rounded-sm border-[1.5px] shrink-0 grid place-items-center transition-colors',
        modelValue
          ? 'bg-ink border-ink'
          : 'bg-transparent border-ink4 hover:border-ink3',
      ]"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <Check v-if="modelValue" :size="9" :stroke-width="2.5" class="text-white" />
    </button>
    <slot />
  </label>
</template>
