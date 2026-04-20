<script setup lang="ts">
/**
 * Custom calendar date picker — no external library.
 *
 * @example
 * <PDatePicker v-model="date" placeholder="Select date" />
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-vue-next'

export interface DatePickerProps {
  /** Date value in YYYY-MM-DD format (v-model) */
  modelValue?: string
  /** Placeholder text */
  placeholder?: string
  /** Whether the picker is disabled */
  disabled?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<DatePickerProps>(), {
  modelValue: '',
  placeholder: 'Select date',
  disabled: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const triggerRef = ref<HTMLElement>()
const panelRef = ref<HTMLElement>()

// Calendar state
const today = new Date()
const viewYear = ref(today.getFullYear())
const viewMonth = ref(today.getMonth())

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

// Selected date parsed
const selectedDate = computed(() => {
  if (!props.modelValue) return null
  const [y, m, d] = props.modelValue.split('-').map(Number)
  return { year: y, month: m - 1, day: d }
})

// Display label
const displayLabel = computed(() => {
  if (!selectedDate.value) return ''
  const { year, month, day } = selectedDate.value
  return `${MONTHS[month]} ${day}, ${year}`
})

// Calendar grid: 42 cells (6 rows x 7 cols)
const calendarDays = computed(() => {
  const year = viewYear.value
  const month = viewMonth.value
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  const cells: { day: number; month: number; year: number; isCurrentMonth: boolean }[] = []

  // Previous month fill
  for (let i = firstDay - 1; i >= 0; i--) {
    const prevMonth = month === 0 ? 11 : month - 1
    const prevYear = month === 0 ? year - 1 : year
    cells.push({ day: daysInPrevMonth - i, month: prevMonth, year: prevYear, isCurrentMonth: false })
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, month, year, isCurrentMonth: true })
  }

  // Next month fill to 42
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    const nextMonth = month === 11 ? 0 : month + 1
    const nextYear = month === 11 ? year + 1 : year
    cells.push({ day: d, month: nextMonth, year: nextYear, isCurrentMonth: false })
  }

  return cells
})

function isToday(cell: { day: number; month: number; year: number }) {
  return cell.day === today.getDate() && cell.month === today.getMonth() && cell.year === today.getFullYear()
}

function isSelected(cell: { day: number; month: number; year: number }) {
  if (!selectedDate.value) return false
  return cell.day === selectedDate.value.day && cell.month === selectedDate.value.month && cell.year === selectedDate.value.year
}

function selectDay(cell: { day: number; month: number; year: number }) {
  const m = String(cell.month + 1).padStart(2, '0')
  const d = String(cell.day).padStart(2, '0')
  emit('update:modelValue', `${cell.year}-${m}-${d}`)
  isOpen.value = false
}

function prevMonth() {
  if (viewMonth.value === 0) {
    viewMonth.value = 11
    viewYear.value--
  } else {
    viewMonth.value--
  }
}

function nextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0
    viewYear.value++
  } else {
    viewMonth.value++
  }
}

function toggle() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value && selectedDate.value) {
    viewYear.value = selectedDate.value.year
    viewMonth.value = selectedDate.value.month
  }
}

function handleClickOutside(e: MouseEvent) {
  if (
    triggerRef.value && !triggerRef.value.contains(e.target as Node) &&
    panelRef.value && !panelRef.value.contains(e.target as Node)
  ) {
    isOpen.value = false
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') isOpen.value = false
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="relative">
    <!-- Trigger -->
    <button
      ref="triggerRef"
      type="button"
      :disabled="disabled"
      :class="[
        'w-full flex items-center justify-between bg-surface border rounded-xl shadow-sm cursor-pointer transition-all duration-150',
        size === 'sm' && 'px-2.5 h-8 text-sm',
        size === 'md' && 'px-3 h-10 text-base',
        size === 'lg' && 'px-3.5 h-12 text-md',
        isOpen ? 'border-accent' : 'border-line-soft hover:border-line',
        disabled && 'opacity-50 cursor-not-allowed bg-chip-bg',
      ]"
      @click="toggle"
    >
      <span :class="modelValue ? 'text-ink' : 'text-ink4'">
        {{ displayLabel || placeholder }}
      </span>
      <Calendar
        :size="size === 'sm' ? 14 : 16"
        class="text-ink4 shrink-0"
        aria-hidden="true"
      />
    </button>

    <!-- Calendar panel -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="isOpen"
        ref="panelRef"
        class="absolute z-50 mt-1.5 w-72 bg-surface border border-line-soft rounded-xl shadow-lg p-3"
      >
        <!-- Month navigation -->
        <div class="flex items-center justify-between mb-2">
          <button
            type="button"
            class="w-8 h-8 rounded-lg grid place-items-center text-ink3 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
            aria-label="Previous month"
            @click="prevMonth"
          >
            <ChevronLeft :size="16" />
          </button>
          <span class="text-base font-semibold text-ink">
            {{ MONTHS[viewMonth] }} {{ viewYear }}
          </span>
          <button
            type="button"
            class="w-8 h-8 rounded-lg grid place-items-center text-ink3 hover:bg-hover hover:text-ink transition-colors cursor-pointer"
            aria-label="Next month"
            @click="nextMonth"
          >
            <ChevronRight :size="16" />
          </button>
        </div>

        <!-- Day-of-week headers -->
        <div class="grid grid-cols-7 mb-1">
          <div
            v-for="d in DAYS"
            :key="d"
            class="text-center text-xs font-medium text-ink4 py-1"
          >
            {{ d }}
          </div>
        </div>

        <!-- Day grid -->
        <div class="grid grid-cols-7">
          <button
            v-for="(cell, i) in calendarDays"
            :key="i"
            type="button"
            :class="[
              'w-9 h-9 rounded-full grid place-items-center text-sm transition-all duration-150 cursor-pointer',
              isSelected(cell)
                ? 'bg-accent text-white font-semibold'
                : isToday(cell)
                  ? 'font-bold text-ink hover:bg-hover'
                  : cell.isCurrentMonth
                    ? 'text-ink hover:bg-hover'
                    : 'text-ink4 hover:bg-hover',
            ]"
            @click="selectDay(cell)"
          >
            {{ cell.day }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
