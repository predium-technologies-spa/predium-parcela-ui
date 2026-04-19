<script setup lang="ts">
/**
 * Wrapper for lucide-vue-next icons with consistent sizing.
 *
 * @example
 * <PIcon :icon="Search" size="md" />
 * <PIcon :icon="Plus" size="sm" class="text-ink3" />
 */
import { type Component } from 'vue'

export interface IconProps {
  /** Lucide icon component */
  icon: Component
  /** Predefined size */
  size?: 'sm' | 'md' | 'lg'
  /** Stroke width */
  strokeWidth?: number
}

const props = withDefaults(defineProps<IconProps>(), {
  size: 'md',
  strokeWidth: 1.5,
})

const sizeMap = { sm: 14, md: 15, lg: 16 } as const
</script>

<template>
  <component
    :is="icon"
    :size="sizeMap[size]"
    :stroke-width="strokeWidth"
    class="shrink-0"
    aria-hidden="true"
  />
</template>
