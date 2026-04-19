<script setup lang="ts">
/**
 * Status indicator badge with dot and label.
 *
 * @example
 * <PBadge tone="good">Active</PBadge>
 * <PBadge tone="warn">Pending</PBadge>
 */
export interface BadgeProps {
  /** Status color tone */
  tone?: 'neutral' | 'good' | 'warn' | 'danger' | 'info'
}

withDefaults(defineProps<BadgeProps>(), {
  tone: 'neutral',
})
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm text-sm font-medium whitespace-nowrap',
      tone === 'neutral' && 'bg-chip-bg text-ink2',
      tone === 'good' && 'bg-good-bg text-good',
      tone === 'warn' && 'bg-warn-bg text-warn',
      tone === 'danger' && 'bg-danger-bg text-danger',
      tone === 'info' && 'bg-info-bg text-info',
    ]"
  >
    <span
      :class="[
        'w-[5px] h-[5px] rounded-full',
        tone === 'neutral' && 'bg-ink4',
        tone === 'good' && 'bg-good',
        tone === 'warn' && 'bg-warn',
        tone === 'danger' && 'bg-danger',
        tone === 'info' && 'bg-info',
      ]"
      aria-hidden="true"
    />
    <slot />
  </span>
</template>
