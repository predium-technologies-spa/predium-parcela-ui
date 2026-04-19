<script setup lang="ts">
/**
 * Status badge with colored dot and label text.
 *
 * @example
 * <PStatusBadge tone="good" label="Active" />
 * <PStatusBadge tone="warn" label="Pending review" />
 */
export interface StatusBadgeProps {
  /** Status color */
  tone?: 'neutral' | 'good' | 'warn' | 'danger' | 'info'
  /** Status label text */
  label: string
}

withDefaults(defineProps<StatusBadgeProps>(), {
  tone: 'neutral',
})
</script>

<template>
  <div class="inline-flex items-center gap-1.5">
    <span
      :class="[
        'w-1.5 h-1.5 rounded-full shrink-0',
        tone === 'neutral' && 'bg-ink4',
        tone === 'good' && 'bg-good',
        tone === 'warn' && 'bg-warn',
        tone === 'danger' && 'bg-danger',
        tone === 'info' && 'bg-info',
      ]"
    />
    <span class="text-md text-ink">{{ label }}</span>
  </div>
</template>
