<script setup lang="ts">
/**
 * Countdown button with visual progress and timer display.
 *
 * @example
 * <PTimedButton label="Auto-save" :duration="30" :paused="false" @click="onDone" />
 * <PTimedButton ref="btn" label="Retry" :duration="10" :paused="isPaused" />
 */
import { ref, computed, watch, onBeforeUnmount } from 'vue'

export interface TimedButtonProps {
  /** Button label */
  label?: string
  /** Countdown duration in seconds */
  duration?: number
  /** Whether the timer is paused */
  paused?: boolean
  /** Whether the button is disabled */
  disabled?: boolean
}

const props = withDefaults(defineProps<TimedButtonProps>(), {
  label: 'Countdown',
  duration: 10,
  paused: true,
  disabled: false,
})

const emit = defineEmits<{
  click: []
}>()

const remaining = ref(props.duration)
const intervalId = ref<ReturnType<typeof setInterval> | null>(null)

const isFinished = computed(() => remaining.value <= 0)
const isRunning = computed(() => !props.paused && !isFinished.value && !props.disabled)

const elapsedPercent = computed(() => {
  if (props.duration <= 0) return 100
  return ((props.duration - remaining.value) / props.duration) * 100
})

const timeDisplay = computed(() => {
  const secs = Math.max(0, Math.ceil(remaining.value))
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})

function startInterval() {
  stopInterval()
  intervalId.value = setInterval(() => {
    remaining.value -= 1
    if (remaining.value <= 0) {
      remaining.value = 0
      stopInterval()
      emit('click')
    }
  }, 1000)
}

function stopInterval() {
  if (intervalId.value) {
    clearInterval(intervalId.value)
    intervalId.value = null
  }
}

function reset() {
  stopInterval()
  remaining.value = props.duration
}

watch(
  () => props.paused,
  (paused) => {
    if (paused || props.disabled || isFinished.value) {
      stopInterval()
    } else {
      startInterval()
    }
  },
  { immediate: true },
)

watch(
  () => props.duration,
  (val) => {
    remaining.value = val
  },
)

onBeforeUnmount(() => {
  stopInterval()
})

defineExpose({ reset })
</script>

<template>
  <button
    type="button"
    :disabled="disabled || isFinished"
    :class="[
      'relative h-12 min-w-[140px] rounded-xl text-base font-medium overflow-hidden transition-colors cursor-pointer',
      'focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
      paused && !isFinished && !disabled && 'bg-accent text-white',
      (isFinished || disabled) && 'bg-chip-bg text-ink4 cursor-not-allowed',
    ]"
    @click="!isRunning && !isFinished && !disabled && emit('click')"
  >
    <!-- Running progress background -->
    <div
      v-if="isRunning"
      class="absolute inset-0 flex"
    >
      <div
        class="bg-ink4 transition-all duration-1000 linear"
        :style="{ width: `${elapsedPercent}%` }"
      />
      <div class="bg-chip-bg flex-1" />
    </div>

    <!-- Label content -->
    <span
      :class="[
        'relative z-10 flex items-center justify-center gap-2 px-4',
        isRunning && 'text-white',
      ]"
    >
      {{ label }}
      <span class="tabular-nums">{{ timeDisplay }}</span>
    </span>
  </button>
</template>
