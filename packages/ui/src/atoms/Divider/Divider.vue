<script setup lang="ts">
/**
 * Horizontal or vertical separator line.
 *
 * @example
 * <PDivider />
 * <PDivider orientation="vertical" />
 */
export interface DividerProps {
  /** Orientation of the divider line */
  orientation?: 'horizontal' | 'vertical'
}

withDefaults(defineProps<DividerProps>(), {
  orientation: 'horizontal',
})
</script>

<template>
  <div
    role="separator"
    :aria-orientation="orientation"
    :class="[
      'bg-line',
      orientation === 'horizontal' && 'h-px w-full',
      orientation === 'vertical' && 'w-px h-full',
    ]"
  />
</template>
