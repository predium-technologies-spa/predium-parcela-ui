<script setup lang="ts">
/**
 * Month calendar grid with event rendering.
 * Shows 5–6 rows of days, grouped by week. Locale es-CL by default (Monday first).
 *
 * @example
 * <PMonthCalendar v-model="activeMonth" :events="events" @cell-click="onCellClick" />
 */
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import PMonthCalendarCell from './PMonthCalendarCell.vue'
import type { CalendarEvent, CalendarDay } from './types'

export interface PMonthCalendarProps {
  /** Any date in the active month */
  modelValue: Date
  /** Events to render in the grid */
  events: CalendarEvent[]
  /** Currently highlighted date (YYYY-MM-DD) */
  selectedDate?: string | null
  /** 0 = Sunday first, 1 = Monday first (default 1 for es-CL) */
  weekStartsOn?: 0 | 1
  /** Max events shown per cell before "+N más" */
  maxEventsPerCell?: number
  /** Show skeleton overlay */
  loading?: boolean
  /** Locale for day/month names */
  locale?: string
}

const props = withDefaults(defineProps<PMonthCalendarProps>(), {
  selectedDate: null,
  weekStartsOn: 1,
  maxEventsPerCell: 3,
  loading: false,
  locale: 'es-CL',
})

const emit = defineEmits<{
  'update:modelValue': [value: Date]
  cellClick: [date: string, events: CalendarEvent[]]
  eventClick: [event: CalendarEvent]
  moreClick: [date: string, events: CalendarEvent[]]
}>()

// ── Header labels ──────────────────────────────────────────────────────────
const dayHeaders = computed((): string[] => {
  const baseDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
  if (props.weekStartsOn === 1) {
    return [...baseDays.slice(1), baseDays[0]]
  }
  return baseDays
})

// ── Month/Year label ───────────────────────────────────────────────────────
const monthLabel = computed(() => {
  return props.modelValue.toLocaleDateString(props.locale, {
    month: 'long',
    year: 'numeric',
  })
})

// ── Helpers ────────────────────────────────────────────────────────────────
function toYMD(date: Date): string {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

function todayYMD(): string {
  return toYMD(new Date())
}

// ── Grid computation ───────────────────────────────────────────────────────
const days = computed((): CalendarDay[] => {
  const year = props.modelValue.getFullYear()
  const month = props.modelValue.getMonth()

  const firstOfMonth = new Date(year, month, 1)
  const lastOfMonth = new Date(year, month + 1, 0)

  // Day of week for first day (0=Sun..6=Sat)
  let startDow = firstOfMonth.getDay()
  if (props.weekStartsOn === 1) {
    // Shift so Monday = 0
    startDow = (startDow + 6) % 7
  }

  const totalCells = Math.ceil((startDow + lastOfMonth.getDate()) / 7) * 7
  const today = todayYMD()

  // Build event map keyed by YYYY-MM-DD
  const eventMap: Record<string, CalendarEvent[]> = {}
  for (const ev of props.events) {
    if (!eventMap[ev.date]) eventMap[ev.date] = []
    eventMap[ev.date].push(ev)
  }

  const result: CalendarDay[] = []
  for (let i = 0; i < totalCells; i++) {
    const dayOffset = i - startDow
    const d = new Date(year, month, 1 + dayOffset)
    const ymd = toYMD(d)
    result.push({
      date: ymd,
      dayNumber: d.getDate(),
      isCurrentMonth: d.getMonth() === month,
      isToday: ymd === today,
      events: eventMap[ymd] ?? [],
    })
  }
  return result
})

const weeks = computed((): CalendarDay[][] => {
  const result: CalendarDay[][] = []
  for (let i = 0; i < days.value.length; i += 7) {
    result.push(days.value.slice(i, i + 7))
  }
  return result
})

// ── Navigation ─────────────────────────────────────────────────────────────
function prevMonth() {
  const d = new Date(props.modelValue)
  d.setDate(1)
  d.setMonth(d.getMonth() - 1)
  emit('update:modelValue', d)
}

function nextMonth() {
  const d = new Date(props.modelValue)
  d.setDate(1)
  d.setMonth(d.getMonth() + 1)
  emit('update:modelValue', d)
}

function goToday() {
  emit('update:modelValue', new Date())
}
</script>

<template>
  <div class="flex flex-col h-full select-none">
    <!-- Calendar header -->
    <div class="flex items-center justify-between px-3 py-2 border-b border-line">
      <slot name="header">
        <div class="flex items-center gap-2">
          <button
            class="p-1.5 rounded hover:bg-hover transition-colors"
            aria-label="Mes anterior"
            @click="prevMonth"
          >
            <ChevronLeft class="size-4 text-ink2" />
          </button>
          <span class="text-sm font-semibold text-ink capitalize min-w-[140px] text-center">
            {{ monthLabel }}
          </span>
          <button
            class="p-1.5 rounded hover:bg-hover transition-colors"
            aria-label="Mes siguiente"
            @click="nextMonth"
          >
            <ChevronRight class="size-4 text-ink2" />
          </button>
        </div>
        <button
          class="text-xs font-medium px-2.5 py-1 rounded border border-line hover:bg-hover transition-colors text-ink2"
          @click="goToday"
        >
          Hoy
        </button>
      </slot>
    </div>

    <!-- Skeleton overlay -->
    <div v-if="loading" class="flex-1 flex items-center justify-center">
      <div class="grid w-full h-full" role="status" aria-busy="true" aria-label="Cargando calendario">
        <div class="animate-pulse bg-line-soft rounded" style="min-height:200px" />
      </div>
    </div>

    <!-- Grid -->
    <template v-else>
      <!-- Day-of-week headers -->
      <div class="grid grid-cols-7 border-b border-line">
        <div
          v-for="header in dayHeaders"
          :key="header"
          class="text-center text-[11px] font-medium text-ink3 py-1.5 uppercase tracking-wide"
        >
          {{ header }}
        </div>
      </div>

      <!-- Day cells -->
      <div class="flex-1 grid grid-cols-7 grid-rows-[repeat(auto-fill,minmax(80px,1fr))]" role="grid">
        <template v-for="week in weeks" :key="week[0].date">
          <PMonthCalendarCell
            v-for="day in week"
            :key="day.date"
            :day="day"
            :max-events-per-cell="maxEventsPerCell"
            :selected-date="selectedDate"
            @cell-click="(d, e) => emit('cellClick', d, e)"
            @event-click="(e) => emit('eventClick', e)"
            @more-click="(d, e) => emit('moreClick', d, e)"
          >
            <template v-if="$slots.event" #event="slotProps">
              <slot name="event" v-bind="slotProps" />
            </template>
          </PMonthCalendarCell>
        </template>
      </div>
    </template>
  </div>
</template>
