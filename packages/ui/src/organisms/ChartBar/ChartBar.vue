<script setup lang="ts" generic="T extends Record<string, unknown>">
/**
 * Vertical bar chart built on @unovis/vue.
 *
 * @example
 * <PChartBar :data="rows" x-key="month" y-key="amount" title="Monthly" />
 */
import { VisXYContainer, VisStackedBar, VisAxis } from '@unovis/vue'

export interface ChartBarProps<TRow> {
  data: TRow[]
  xKey: keyof TRow
  yKey: keyof TRow
  title?: string
  height?: number
}

const props = withDefaults(defineProps<ChartBarProps<T>>(), {
  height: 220,
})

const xAccessor = (d: T) => d[props.xKey as keyof T] as unknown as string
const yAccessor = (d: T) => Number(d[props.yKey as keyof T])
</script>

<template>
  <div class="bg-surface border border-line rounded-2xl p-4">
    <h4 v-if="title" class="text-sm font-medium text-ink2 mb-2">{{ title }}</h4>
    <VisXYContainer :data="data" :height="height">
      <VisStackedBar :x="xAccessor" :y="yAccessor" color="var(--color-accent)" />
      <VisAxis type="x" />
      <VisAxis type="y" />
    </VisXYContainer>
  </div>
</template>
