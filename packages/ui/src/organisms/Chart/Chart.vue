<script setup lang="ts" generic="T extends Record<string, unknown>">
/**
 * Line / area chart built on @unovis/vue. Pass an array of points and
 * the field accessors via `xKey` / `yKey`.
 *
 * @example
 * <PChart :data="rows" x-key="month" y-key="revenue" title="Revenue (CLP)" />
 */
import { VisXYContainer, VisLine, VisArea, VisAxis } from '@unovis/vue'

export interface ChartProps<TRow> {
  data: TRow[]
  /** Field name for the x value */
  xKey?: keyof TRow
  /** Field name for the y value */
  yKey?: keyof TRow
  /** Render filled area below the line */
  area?: boolean
  /** Optional chart title */
  title?: string
  /** Height in px */
  height?: number
}

const props = withDefaults(defineProps<ChartProps<T>>(), {
  xKey: 'x' as keyof T,
  yKey: 'y' as keyof T,
  area: false,
  height: 220,
})

const xAccessor = (d: T) => Number(d[props.xKey as keyof T])
const yAccessor = (d: T) => Number(d[props.yKey as keyof T])
</script>

<template>
  <div class="bg-surface border border-line rounded-2xl p-4">
    <h4 v-if="title" class="text-sm font-medium text-ink2 mb-2">{{ title }}</h4>
    <VisXYContainer :data="data" :height="height">
      <VisArea v-if="area" :x="xAccessor" :y="yAccessor" color="var(--color-accent)" />
      <VisLine :x="xAccessor" :y="yAccessor" color="var(--color-accent)" />
      <VisAxis type="x" />
      <VisAxis type="y" />
    </VisXYContainer>
  </div>
</template>
