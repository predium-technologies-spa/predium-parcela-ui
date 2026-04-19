<script setup lang="ts">
/**
 * Text input with optional icon and suffix.
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
}

withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  placeholder: '',
  mono: false,
  disabled: false,
  error: false,
  type: 'text',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <div
    :class="[
      'flex items-center gap-2 bg-surface border rounded-lg px-2.5 h-[34px] text-md transition-colors',
      error ? 'border-danger' : 'border-line',
      disabled ? 'opacity-40 pointer-events-none' : 'hover:border-ink4',
      'focus-within:border-ink focus-within:ring-1 focus-within:ring-ink',
    ]"
  >
    <component
      v-if="icon"
      :is="icon"
      :size="14"
      :stroke-width="1.5"
      class="text-ink4 shrink-0"
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
    <span v-if="suffix" class="text-ink4 font-mono text-base shrink-0">
      {{ suffix }}
    </span>
  </div>
</template>
