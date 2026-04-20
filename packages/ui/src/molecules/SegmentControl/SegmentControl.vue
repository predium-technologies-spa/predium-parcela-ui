<script setup lang="ts">
/**
 * Segmented control with a sliding indicator for tab-like selection.
 *
 * @example
 * <PSegmentControl v-model="tab" :options="[{ label: 'Day', value: 'day' }, { label: 'Week', value: 'week' }]" />
 */
import { ref, watch, onMounted, nextTick } from 'vue'

export interface SegmentOption {
  label: string
  value: string
}

export interface SegmentControlProps {
  /** Selected value (v-model) */
  modelValue: string
  /** Available options */
  options: SegmentOption[]
  /** Control size */
  size?: 'sm' | 'md' | 'lg'
  /** Use fully rounded shape */
  rounded?: boolean
}

const props = withDefaults(defineProps<SegmentControlProps>(), {
  size: 'md',
  rounded: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const containerRef = ref<HTMLElement | null>(null)
const indicatorStyle = ref({ left: '0px', width: '0px' })

function updateIndicator() {
  if (!containerRef.value) return
  const activeIdx = props.options.findIndex((o) => o.value === props.modelValue)
  if (activeIdx === -1) return
  const buttons = containerRef.value.querySelectorAll<HTMLButtonElement>('[data-segment-btn]')
  const btn = buttons[activeIdx]
  if (!btn) return
  indicatorStyle.value = {
    left: `${btn.offsetLeft}px`,
    width: `${btn.offsetWidth}px`,
  }
}

onMounted(() => {
  nextTick(updateIndicator)
})

watch(() => props.modelValue, () => nextTick(updateIndicator))
watch(() => props.options, () => nextTick(updateIndicator), { deep: true })

const sizeClasses = {
  sm: 'px-2.5 py-1 text-sm',
  md: 'px-4 py-1.5 text-base',
  lg: 'px-5 py-2.5 text-base',
}
</script>

<template>
  <div
    ref="containerRef"
    :class="[
      'relative inline-flex bg-chip-bg p-[3px]',
      rounded ? 'rounded-full' : 'rounded-xl',
    ]"
  >
    <!-- Sliding indicator -->
    <div
      :class="[
        'absolute top-[3px] bottom-[3px] bg-accent shadow-sm transition-all duration-300 ease-out',
        rounded ? 'rounded-full' : 'rounded-lg',
      ]"
      :style="indicatorStyle"
    />

    <!-- Buttons -->
    <button
      v-for="option in options"
      :key="option.value"
      data-segment-btn
      :class="[
        'relative z-10 font-medium cursor-pointer transition-colors duration-200',
        rounded ? 'rounded-full' : 'rounded-lg',
        sizeClasses[size],
        modelValue === option.value ? 'text-white' : 'text-ink3',
      ]"
      @click="emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </button>
  </div>
</template>
