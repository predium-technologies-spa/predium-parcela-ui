<script setup lang="ts">
/**
 * Primary action button with multiple variants and sizes.
 *
 * @example
 * <PButton variant="primary" size="md">Save</PButton>
 * <PButton variant="ghost" size="sm" icon="Download">Export</PButton>
 * <PButton variant="danger" disabled>Delete</PButton>
 */
import { type Component } from 'vue'

export interface ButtonProps {
  /** Visual style */
  variant?: 'primary' | 'ghost' | 'subtle' | 'danger'
  /** Button size */
  size?: 'sm' | 'md'
  /** Whether the button is disabled */
  disabled?: boolean
  /** Lucide icon component to render before label */
  icon?: Component
}

withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
})
</script>

<template>
  <button
    :disabled="disabled"
    :class="[
      'inline-flex items-center gap-1.5 font-medium cursor-pointer border transition-colors',
      'focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2',
      // Size
      size === 'sm'
        ? 'px-2.5 py-1 text-base rounded-md'
        : 'px-3 py-1.5 text-md rounded-xl',
      // Variant
      variant === 'primary' && 'bg-ink text-white border-transparent hover:bg-ink2',
      variant === 'ghost' && 'bg-transparent text-ink2 border-line hover:bg-chip-bg',
      variant === 'subtle' && 'bg-chip-bg text-ink2 border-transparent hover:bg-line',
      variant === 'danger' && 'bg-transparent text-danger border-line hover:bg-danger-bg',
      // Disabled
      disabled && 'opacity-40 pointer-events-none',
    ]"
  >
    <component
      v-if="icon"
      :is="icon"
      :size="size === 'sm' ? 13 : 14"
      :stroke-width="1.5"
      aria-hidden="true"
    />
    <slot />
  </button>
</template>
