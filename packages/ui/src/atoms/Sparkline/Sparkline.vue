<script setup lang="ts">
/**
 * Mini sparkline or bar chart for KPI cards.
 *
 * @example
 * <PSparkline :points="[2, 3, 5, 4, 6]" variant="line" tone="good" />
 * <PSparkline :points="[100, 200, 0, 300]" variant="bar" tone="neutral" />
 */
import { computed } from 'vue'

export interface SparklineProps {
  /** Data points */
  points: number[]
  /** Chart type */
  variant?: 'line' | 'bar'
  /** Color tone */
  tone?: 'neutral' | 'good' | 'warn' | 'danger'
  /** Height in pixels */
  height?: number
}

const props = withDefaults(defineProps<SparklineProps>(), {
  variant: 'line',
  tone: 'neutral',
  height: 40,
})

const toneColors = {
  neutral: { stroke: 'var(--color-ink3)', fill: 'var(--color-chip-bg)' },
  good: { stroke: 'var(--color-good)', fill: 'var(--color-good-bg)' },
  warn: { stroke: 'var(--color-warn)', fill: 'var(--color-warn-bg)' },
  danger: { stroke: 'var(--color-danger)', fill: 'var(--color-danger-bg)' },
} as const

const polylinePoints = computed(() => {
  const pts = props.points
  if (!pts.length) return ''
  const max = Math.max(...pts)
  const min = Math.min(...pts)
  const range = max - min || 1
  return pts
    .map((p, i) => {
      const x = (i / (pts.length - 1)) * 100
      const y = 100 - ((p - min) / range) * 80 - 10
      return `${x},${y}`
    })
    .join(' ')
})

const areaPoints = computed(() => `0,100 ${polylinePoints.value} 100,100`)
</script>

<template>
  <div class="w-full" :style="{ height: `${height}px` }">
    <!-- Line variant -->
    <svg
      v-if="variant === 'line'"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      class="w-full h-full"
      aria-hidden="true"
    >
      <polygon :points="areaPoints" :fill="toneColors[tone].fill" />
      <polyline
        :points="polylinePoints"
        fill="none"
        :stroke="toneColors[tone].stroke"
        stroke-width="1.5"
        vector-effect="non-scaling-stroke"
      />
    </svg>

    <!-- Bar variant -->
    <div
      v-else
      class="flex items-end gap-0.5 h-full"
      aria-hidden="true"
    >
      <div
        v-for="(val, i) in points"
        :key="i"
        class="flex-1 rounded-[1px]"
        :style="{
          height: Math.max(...points) ? `${(val / Math.max(...points)) * 100}%` : '0',
          minHeight: val > 0 ? '2px' : '0',
          background: val > 0 ? toneColors[tone].stroke : 'var(--color-line-soft)',
        }"
      />
    </div>
  </div>
</template>
