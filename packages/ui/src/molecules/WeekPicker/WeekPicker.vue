<script setup lang="ts">
/**
 * Week day picker with prices and selection animation.
 *
 * @example
 * <PWeekPicker v-model="selected" :days="days" />
 */
import { computed } from 'vue'

export interface WeekDay {
  /** Day number */
  date: number
  /** Optional month label (e.g. "Jan") */
  month?: string
  /** Optional price text */
  price?: string
  /** Optional label text */
  label?: string
  /** Whether this day is disabled */
  disabled?: boolean
}

export interface WeekPickerProps {
  /** Selected day date value (v-model) */
  modelValue?: number
  /** Array of day objects */
  days: WeekDay[]
  /** Column headers */
  headers?: string[]
}

const props = withDefaults(defineProps<WeekPickerProps>(), {
  headers: () => ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const gridCols = computed(() => `repeat(${props.headers.length}, 1fr)`)

function selectDay(day: WeekDay) {
  if (day.disabled) return
  emit('update:modelValue', day.date)
}
</script>

<template>
  <div class="w-full rounded-xl overflow-hidden week-picker-container">
    <!-- Headers -->
    <div class="grid week-picker-headers" :style="{ gridTemplateColumns: gridCols }">
      <div
        v-for="header in headers"
        :key="header"
        class="py-2.5 text-sm font-medium text-ink3 text-center"
      >
        {{ header }}
      </div>
    </div>

    <!-- Day cells -->
    <div class="grid" :style="{ gridTemplateColumns: gridCols }">
      <button
        v-for="(day, idx) in days"
        :key="day.date"
        :class="[
          'min-h-[72px] flex flex-col items-center justify-center gap-1 py-2 cursor-pointer transition-colors',
          idx > 0 && 'week-picker-cell-border',
          !day.disabled && 'hover:bg-hover',
          day.disabled && 'opacity-40 cursor-not-allowed',
        ]"
        :disabled="day.disabled"
        @click="selectDay(day)"
      >
        <span v-if="day.month" class="text-xs text-ink4">{{ day.month }}</span>
        <span
          :class="[
            'w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
            modelValue === day.date
              ? 'bg-accent text-white week-picker-pop'
              : 'text-ink',
          ]"
        >
          {{ day.date }}
        </span>
        <span v-if="day.price" class="text-xs text-ink3">{{ day.price }}</span>
        <span v-if="day.label" class="text-xs text-ink4">{{ day.label }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.week-picker-container {
  border: 1px solid var(--color-line-soft);
}
.week-picker-headers {
  border-bottom: 1px solid var(--color-line-soft);
}
.week-picker-cell-border {
  border-left: 1px solid var(--color-line-soft);
}
@keyframes pop {
  0% { transform: scale(0); }
  70% { transform: scale(1.15); }
  100% { transform: scale(1); }
}
.week-picker-pop {
  animation: pop 300ms ease-out;
}
</style>
