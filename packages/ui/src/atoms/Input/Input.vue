<script setup lang="ts">
/**
 * Styled text input — clean, soft borders.
 *
 * @example
 * <PInput v-model="name" placeholder="Property name" />
 * <PInput v-model="price" mono suffix="USD" />
 * <PInput v-model="search" :icon="Search" placeholder="Search..." />
 */
import { type Component } from 'vue'

export interface InputProps {
  /** Input value (v-model) */
  modelValue?: string
  /** Placeholder text */
  placeholder?: string
  /** Use monospace font */
  mono?: boolean
  /** Suffix label (e.g. "USD", "%") */
  suffix?: string
  /** Lucide icon component for left side */
  icon?: Component
  /** Whether the input is disabled */
  disabled?: boolean
  /** Error state */
  error?: boolean
  /** Input type */
  type?: 'text' | 'number' | 'email' | 'password'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  placeholder: '',
  mono: false,
  disabled: false,
  error: false,
  type: 'text',
  size: 'md',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div
    :class="[
      'p-input group flex items-center bg-surface rounded-xl transition-all duration-150',
      size === 'sm' && 'gap-1.5 px-2.5 h-8 text-sm',
      size === 'md' && 'gap-2 px-3 h-10 text-base',
      size === 'lg' && 'gap-2.5 px-3.5 h-12 text-md',
      error && 'is-error',
      disabled && 'is-disabled opacity-50 cursor-not-allowed bg-chip-bg',
    ]"
  >
    <component
      v-if="icon"
      :is="icon"
      :size="size === 'sm' ? 14 : size === 'lg' ? 18 : 16"
      :stroke-width="1.5"
      class="text-ink4 group-focus-within:text-ink3 shrink-0 transition-colors"
      aria-hidden="true"
    />
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="[
        'flex-1 min-w-0 bg-transparent outline-none text-ink placeholder:text-ink4',
        mono ? 'font-mono' : 'font-sans',
      ]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="suffix" class="text-ink4 font-mono text-sm shrink-0">
      {{ suffix }}
    </span>
  </div>
</template>

<style scoped>
.p-input {
  border: 1px solid var(--color-line-soft);
}
.p-input:hover:not(.is-disabled) {
  border-color: var(--color-line);
}
.p-input:focus-within:not(.is-disabled) {
  border-color: var(--color-accent);
}
.p-input.is-error {
  border-color: var(--color-danger);
}
.p-input.is-error:focus-within {
  border-color: var(--color-danger);
}
</style>
