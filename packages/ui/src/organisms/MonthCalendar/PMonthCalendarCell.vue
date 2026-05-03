<script setup lang="ts">
import type { CalendarEvent, CalendarDay } from './types'
import { computed } from 'vue'

export interface MonthCalendarCellProps {
  day: CalendarDay
  maxEventsPerCell: number
  selectedDate?: string | null
}

const props = defineProps<MonthCalendarCellProps>()

const emit = defineEmits<{
  cellClick: [date: string, events: CalendarEvent[]]
  eventClick: [event: CalendarEvent]
  moreClick: [date: string, events: CalendarEvent[]]
}>()

const visibleEvents = computed(() => props.day.events.slice(0, props.maxEventsPerCell))
const hiddenCount = computed(() => Math.max(0, props.day.events.length - props.maxEventsPerCell))

const isSelected = computed(() => props.selectedDate === props.day.date)

const variantClass = (variant: CalendarEvent['variant']) => {
  switch (variant) {
    case 'google':   return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200'
    case 'synced':   return 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200'
    case 'readonly': return 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 opacity-70'
    default:         return 'bg-primary/10 text-primary'
  }
}
</script>

<template>
  <div
    class="relative min-h-[80px] p-1 border border-line-soft cursor-pointer hover:bg-hover transition-colors"
    :class="{
      'opacity-40': !day.isCurrentMonth,
      'bg-primary/5 ring-1 ring-primary ring-inset': isSelected,
    }"
    role="gridcell"
    :aria-label="day.date"
    @click.self="emit('cellClick', day.date, day.events)"
  >
    <!-- Day number -->
    <button
      class="text-xs font-medium w-6 h-6 rounded-full flex items-center justify-center leading-none mb-0.5 transition-colors"
      :class="day.isToday ? 'bg-primary text-white' : 'text-ink2 hover:bg-hover'"
      @click.stop="emit('cellClick', day.date, day.events)"
    >
      {{ day.dayNumber }}
    </button>

    <!-- Events -->
    <div class="flex flex-col gap-0.5">
      <template v-for="event in visibleEvents" :key="event.id">
        <slot name="event" :event="event">
          <button
            class="w-full text-left text-[11px] font-medium px-1 py-0.5 rounded truncate leading-tight"
            :class="[
              variantClass(event.variant),
              event.variant === 'readonly' ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-80',
            ]"
            :disabled="event.variant === 'readonly'"
            @click.stop="event.variant !== 'readonly' && emit('eventClick', event)"
          >
            {{ event.time ? `${event.time} ` : '' }}{{ event.title }}
          </button>
        </slot>
      </template>

      <!-- More button -->
      <button
        v-if="hiddenCount > 0"
        class="text-[11px] text-primary font-medium px-1 hover:underline text-left"
        @click.stop="emit('moreClick', day.date, day.events)"
      >
        +{{ hiddenCount }} más
      </button>
    </div>
  </div>
</template>
