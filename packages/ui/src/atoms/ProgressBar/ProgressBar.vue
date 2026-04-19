<script setup lang="ts">
/**
 * Horizontal progress bar.
 *
 * @example
 * <PProgressBar :value="42" />
 * <PProgressBar :value="96" tone="good" />
 * <PProgressBar :value="68" tone="warn" size="md" />
 */
export interface ProgressBarProps {
  /** Percentage value (0–100) */
  value: number
  /** Color tone */
  tone?: 'neutral' | 'good' | 'warn' | 'danger'
  /** Track height */
  size?: 'sm' | 'md'
}

withDefaults(defineProps<ProgressBarProps>(), {
  tone: 'neutral',
  size: 'sm',
})
</script>

<template>
  <div
    role="progressbar"
    :aria-valuenow="value"
    aria-valuemin="0"
    aria-valuemax="100"
    :class="[
      'w-full bg-chip-bg rounded-sm overflow-hidden',
      size === 'sm' ? 'h-[3px]' : 'h-[5px]',
    ]"
  >
    <div
      :class="[
        'h-full rounded-sm transition-all duration-300',
        tone === 'neutral' && 'bg-ink',
        tone === 'good' && 'bg-good',
        tone === 'warn' && 'bg-warn',
        tone === 'danger' && 'bg-danger',
      ]"
      :style="{ width: `${Math.min(100, Math.max(0, value))}%` }"
    />
  </div>
</template>
