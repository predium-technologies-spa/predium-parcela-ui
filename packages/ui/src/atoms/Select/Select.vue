<script setup lang="ts">
/**
 * Custom select trigger (dropdown handled externally).
 *
 * @example
 * <PSelect v-model="type" placeholder="Select type" :options="['Multifamily', 'Retail']" />
 */
import { ChevronDown } from 'lucide-vue-next'

export interface SelectProps {
  /** Selected value (v-model) */
  modelValue?: string
  /** Placeholder text when no value */
  placeholder?: string
  /** Option list */
  options?: string[]
  /** Whether the select is disabled */
  disabled?: boolean
}

withDefaults(defineProps<SelectProps>(), {
  modelValue: '',
  placeholder: 'Select…',
  options: () => [],
  disabled: false,
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div
    :class="[
      'relative flex items-center bg-surface border border-line rounded-lg h-[34px] text-md transition-colors',
      disabled ? 'opacity-40 pointer-events-none' : 'hover:border-ink4',
      'focus-within:border-ink focus-within:ring-1 focus-within:ring-ink',
    ]"
  >
    <select
      :value="modelValue"
      :disabled="disabled"
      :class="[
        'w-full h-full bg-transparent outline-none appearance-none px-2.5 pr-8 text-md',
        modelValue ? 'text-ink' : 'text-ink4',
      ]"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option value="" disabled>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt" :value="opt">
        {{ opt }}
      </option>
    </select>
    <ChevronDown
      :size="14"
      class="absolute right-2.5 text-ink4 pointer-events-none"
      aria-hidden="true"
    />
  </div>
</template>
