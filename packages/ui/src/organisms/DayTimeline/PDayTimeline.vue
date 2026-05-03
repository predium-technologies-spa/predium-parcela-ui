<script setup lang="ts">
/**
 * Day timeline: vertical grid of hours with positioned events.
 *
 * @example
 * <PDayTimeline v-model="selectedDay" :events="events" @event-click="onEvent" />
 */
import { computed } from 'vue'
import PDayTimelineSlot from './PDayTimelineSlot.vue'
import type { TimelineEvent, TimelineSlot } from './types'

export interface PDayTimelineProps {
  modelValue: Date
  events: TimelineEvent[]
  /** First hour to show (default 8) */
  startHour?: number
  /** Last hour to show inclusive (default 20) */
  endHour?: number
  /** Slot granularity in minutes (default 60) */
  slotMinutes?: number
  loading?: boolean
  locale?: string
  emptyText?: string
}

const props = withDefaults(defineProps<PDayTimelineProps>(), {
  startHour: 8,
  endHour: 20,
  slotMinutes: 60,
  loading: false,
  locale: 'es-CL',
  emptyText: 'Sin eventos en este día',
})

const emit = defineEmits<{
  'update:modelValue': [value: Date]
  eventClick: [event: TimelineEvent]
  slotClick: [hour: number, time: string]
}>()

// ── Slot rows ──────────────────────────────────────────────────────────────
const slots = computed((): TimelineSlot[] => {
  const result: TimelineSlot[] = []
  for (let h = props.startHour; h <= props.endHour; h++) {
    const label = `${String(h).padStart(2, '0')}:00`
    result.push({ hour: h, label, time: label })
  }
  return result
})

// ── "Now" line ─────────────────────────────────────────────────────────────
function toYMD(d: Date): string {
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

const todayInSantiago = computed((): string => {
  // Use Intl to get today's date in America/Santiago
  const now = new Date()
  const parts = new Intl.DateTimeFormat('sv-SE', { timeZone: 'America/Santiago' }).formatToParts(now)
  const y = parts.find((p) => p.type === 'year')!.value
  const mo = parts.find((p) => p.type === 'month')!.value
  const d = parts.find((p) => p.type === 'day')!.value
  return `${y}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`
})

const isToday = computed(() => toYMD(props.modelValue) === todayInSantiago.value)

const nowMinutesFromStart = computed((): number | null => {
  if (!isToday.value) return null
  const now = new Date()
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'America/Santiago',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now)
  const h = parseInt(parts.find((p) => p.type === 'hour')!.value)
  const m = parseInt(parts.find((p) => p.type === 'minute')!.value)
  const total = h * 60 + m
  const start = props.startHour * 60
  const end = (props.endHour + 1) * 60
  if (total < start || total >= end) return null
  return total - start
})

const totalMinutes = computed(() => (props.endHour - props.startHour + 1) * 60)
const nowPercent = computed(() => {
  if (nowMinutesFromStart.value === null) return null
  return (nowMinutesFromStart.value / totalMinutes.value) * 100
})

// ── Event positioning ──────────────────────────────────────────────────────
function timeToMinutes(t: string): number {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function resolveEndTime(ev: TimelineEvent): string {
  if (ev.endTime) return ev.endTime
  const startMin = timeToMinutes(ev.startTime)
  const endMin = startMin + 60
  return `${String(Math.floor(endMin / 60)).padStart(2, '0')}:${String(endMin % 60).padStart(2, '0')}`
}

interface PositionedEvent {
  event: TimelineEvent
  top: number     // percent
  height: number  // percent
}

const positionedEvents = computed((): PositionedEvent[] => {
  const startMin = props.startHour * 60
  return props.events.map((ev) => {
    const evStart = timeToMinutes(ev.startTime) - startMin
    const evEnd = timeToMinutes(resolveEndTime(ev)) - startMin
    const top = (evStart / totalMinutes.value) * 100
    const height = Math.max(((evEnd - evStart) / totalMinutes.value) * 100, 2)
    return { event: ev, top, height }
  })
})

const variantClass = (variant: TimelineEvent['variant']) => {
  switch (variant) {
    case 'google':   return 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/40 dark:text-blue-200'
    case 'synced':   return 'bg-green-100 text-green-800 border-green-300 dark:bg-green-900/40 dark:text-green-200'
    case 'readonly': return 'bg-zinc-100 text-zinc-500 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-400 opacity-70 cursor-not-allowed'
    default:         return 'bg-primary/10 text-primary border-primary/30'
  }
}
</script>

<template>
  <div class="flex flex-col h-full select-none overflow-y-auto">
    <!-- Loading -->
    <div v-if="loading" class="flex-1 flex items-center justify-center" role="status" aria-busy="true">
      <div class="animate-pulse bg-line-soft rounded w-full" style="min-height:200px" />
    </div>

    <!-- Timeline -->
    <div v-else class="relative flex-1">
      <!-- Slot rows -->
      <PDayTimelineSlot
        v-for="timeSlot in slots"
        :key="timeSlot.hour"
        :slot="timeSlot"
        @slot-click="(h, t) => emit('slotClick', h, t)"
      />

      <!-- Events overlaid absolutely -->
      <div class="absolute inset-0 left-16 pointer-events-none">
        <div
          v-for="pe in positionedEvents"
          :key="pe.event.id"
          class="absolute left-1 right-1 rounded border text-[11px] px-1.5 py-0.5 overflow-hidden pointer-events-auto"
          :class="[
            variantClass(pe.event.variant),
            pe.event.variant !== 'readonly' ? 'cursor-pointer hover:opacity-90' : '',
          ]"
          :style="{ top: `${pe.top}%`, height: `${pe.height}%` }"
          @click="pe.event.variant !== 'readonly' && emit('eventClick', pe.event)"
        >
          <slot name="event" :event="pe.event">
            <p class="font-medium leading-tight truncate">{{ pe.event.title }}</p>
            <p v-if="pe.event.subtitle" class="text-[10px] opacity-70 truncate">{{ pe.event.subtitle }}</p>
          </slot>
        </div>

        <!-- "Now" line -->
        <div
          v-if="nowPercent !== null"
          class="absolute left-0 right-0 flex items-center pointer-events-none"
          :style="{ top: `${nowPercent}%` }"
          data-testid="now-line"
        >
          <div class="w-2 h-2 rounded-full bg-red-500 -ml-1 shrink-0" />
          <div class="flex-1 h-px bg-red-500" />
        </div>
      </div>

      <!-- Empty state -->
      <div
        v-if="events.length === 0 && !loading"
        class="absolute inset-0 left-16 flex items-center justify-center pointer-events-none"
      >
        <slot name="empty">
          <p class="text-sm text-ink3">{{ emptyText }}</p>
        </slot>
      </div>
    </div>
  </div>
</template>
