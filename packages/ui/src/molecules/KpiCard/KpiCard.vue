<script setup lang="ts">
/**
 * KPI metric card with label, value, delta text and optional sparkline.
 *
 * @example
 * <PKpiCard label="Properties" value="48" delta="+2 this qtr" tone="good" />
 */
import { type Component } from 'vue'

export interface KpiCardProps {
  /** Metric label */
  label: string
  /** Main value */
  value: string
  /** Delta or sub-text */
  delta?: string
  /** Color tone for delta */
  tone?: 'neutral' | 'good' | 'warn' | 'danger'
  /** Use mono font for value */
  mono?: boolean
}

withDefaults(defineProps<KpiCardProps>(), {
  tone: 'neutral',
  mono: false,
})
</script>

<template>
  <div class="bg-surface border border-line rounded-xl p-3.5">
    <div class="text-sm text-ink3">{{ label }}</div>
    <div
      :class="[
        'text-xl sm:text-2xl font-semibold text-ink tracking-tight mt-0.5',
        mono ? 'font-mono' : 'font-sans',
      ]"
    >
      {{ value }}
    </div>
    <div
      v-if="delta"
      :class="[
        'text-sm mt-1',
        tone === 'good' && 'text-good',
        tone === 'warn' && 'text-warn',
        tone === 'danger' && 'text-danger',
        tone === 'neutral' && 'text-ink3',
      ]"
    >
      {{ delta }}
    </div>
    <!-- Sparkline slot -->
    <div v-if="$slots.sparkline" class="mt-1 -mx-1">
      <slot name="sparkline" />
    </div>
  </div>
</template>
