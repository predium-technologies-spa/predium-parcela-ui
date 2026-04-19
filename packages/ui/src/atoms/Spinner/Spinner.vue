<script setup lang="ts">
/**
 * Loading spinner and empty state placeholder.
 *
 * @example
 * <PSpinner />
 * <PSpinner variant="empty" label="No properties found" />
 */
export interface SpinnerProps {
  /** Display variant */
  variant?: 'spinner' | 'empty'
  /** Label for empty state */
  label?: string
  /** Size in pixels */
  size?: number
}

withDefaults(defineProps<SpinnerProps>(), {
  variant: 'spinner',
  label: 'No data',
  size: 24,
})
</script>

<template>
  <!-- Spinner -->
  <div v-if="variant === 'spinner'" class="flex items-center justify-center p-4" role="status">
    <svg
      :width="size"
      :height="size"
      viewBox="0 0 24 24"
      fill="none"
      class="animate-spin text-ink4"
      aria-hidden="true"
    >
      <circle
        cx="12" cy="12" r="10"
        stroke="currentColor"
        stroke-width="2"
        opacity="0.2"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
    <span class="sr-only">Loading…</span>
  </div>

  <!-- Empty state -->
  <div v-else class="flex flex-col items-center justify-center gap-2 p-8 text-center">
    <div class="w-10 h-10 rounded-xl bg-chip-bg grid place-items-center">
      <svg
        width="18" height="18" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
        stroke-linejoin="round" class="text-ink4"
      >
        <path d="M3 3h8v8H3zM13 3h8v5h-8zM13 10h8v11h-8zM3 13h8v8H3z" />
      </svg>
    </div>
    <p class="text-md text-ink3">{{ label }}</p>
  </div>
</template>
