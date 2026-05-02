<script setup lang="ts">
/**
 * Primary action button with multiple variants and sizes.
 *
 * @example
 * <PButton variant="primary" size="md">Save</PButton>
 * <PButton variant="ghost" size="sm" icon="Download">Export</PButton>
 */
import { type Component } from 'vue'

export interface ButtonProps {
  /** Visual style */
  variant?: 'primary' | 'ghost' | 'subtle' | 'danger'
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
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
      'inline-flex items-center justify-center gap-2 font-semibold cursor-pointer border shadow-xs transition-all duration-150',
      'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
      // Size — shape per Tailwind UI button spec (color tokens preserved below)
      size === 'sm' && 'rounded-md px-2.5 py-1.5 text-sm',
      size === 'md' && 'rounded-md px-3 py-2 text-sm',
      size === 'lg' && 'rounded-md px-3.5 py-2.5 text-sm',
      // Variant
      variant === 'primary' && 'bg-accent text-white border-transparent hover:bg-accent/90 active:bg-accent/80',
      variant === 'ghost' && 'bg-transparent text-ink2 border-line hover:bg-hover active:bg-chip-bg shadow-none',
      variant === 'subtle' && 'bg-chip-bg text-ink2 border-transparent hover:bg-line active:bg-line-soft shadow-none',
      variant === 'danger' && 'bg-transparent text-danger border-line hover:bg-danger-bg active:bg-danger-bg shadow-none',
      // Disabled
      disabled && 'opacity-40 pointer-events-none',
    ]"
  >
    <component
      v-if="icon"
      :is="icon"
      :size="size === 'sm' ? 14 : size === 'lg' ? 18 : 16"
      :stroke-width="1.5"
      aria-hidden="true"
    />
    <slot />
  </button>
</template>
