<script setup lang="ts">
/**
 * Visually hidden ARIA live region for screen reader announcements.
 *
 * @example
 * <PLiveRegion>{{ statusMessage }}</PLiveRegion>
 */
export interface LiveRegionProps {
  /** ARIA live politeness */
  politeness?: 'polite' | 'assertive' | 'off'
}

withDefaults(defineProps<LiveRegionProps>(), {
  politeness: 'polite',
})
</script>

<template>
  <div :aria-live="politeness" aria-atomic="true" class="sr-only">
    <slot />
  </div>
</template>
