<script setup lang="ts">
/**
 * Loading placeholder with shimmer animation.
 *
 * @example
 * <PSkeleton width="180px" height="20px" />
 * <PSkeleton shape="circle" width="40px" height="40px" />
 */
export interface SkeletonProps {
  /** Visual shape */
  shape?: 'rect' | 'text' | 'circle'
  /** CSS width (px, %, etc.) */
  width?: string
  /** CSS height (px, %, etc.) */
  height?: string
}

withDefaults(defineProps<SkeletonProps>(), {
  shape: 'rect',
  width: '100%',
  height: '1rem',
})
</script>

<template>
  <div
    role="status"
    aria-busy="true"
    aria-label="Loading"
    :style="{ width, height }"
    :class="[
      'bg-chip-bg animate-pulse',
      shape === 'rect' && 'rounded-md',
      shape === 'text' && 'rounded-sm',
      shape === 'circle' && 'rounded-full',
    ]"
  />
</template>
