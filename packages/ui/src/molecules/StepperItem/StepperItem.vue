<script setup lang="ts">
/**
 * Step indicator for multi-step forms.
 *
 * @example
 * <PStepperItem number="01" label="Identity" status="done" />
 * <PStepperItem number="04" label="Financials" status="current" />
 * <PStepperItem number="05" label="Team" status="upcoming" />
 */
import { Check } from 'lucide-vue-next'

export interface StepperItemProps {
  /** Step number (e.g. "01") */
  number: string
  /** Step label */
  label: string
  /** Step status */
  status?: 'done' | 'current' | 'upcoming'
}

withDefaults(defineProps<StepperItemProps>(), {
  status: 'upcoming',
})
</script>

<template>
  <div
    :class="[
      'flex items-center gap-2.5 px-2.5 py-2 rounded-md mb-0.5',
      status === 'current' && 'bg-active-bg',
    ]"
  >
    <div
      :class="[
        'w-[18px] h-[18px] rounded-full border-[1.5px] grid place-items-center shrink-0',
        'font-mono text-[9px] font-semibold',
        status === 'done' && 'bg-good border-good text-white',
        status === 'current' && 'bg-ink border-ink text-white',
        status === 'upcoming' && 'bg-transparent border-line text-ink4',
      ]"
    >
      <Check v-if="status === 'done'" :size="9" :stroke-width="2.5" />
      <template v-else>{{ number }}</template>
    </div>
    <span
      :class="[
        'text-base',
        status === 'current' && 'text-ink font-medium',
        status === 'done' && 'text-ink2',
        status === 'upcoming' && 'text-ink3',
      ]"
    >
      {{ label }}
    </span>
  </div>
</template>
