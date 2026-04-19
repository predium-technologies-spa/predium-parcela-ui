<script setup lang="ts">
/**
 * Vertical step navigation for multi-section forms.
 *
 * @example
 * <PStepNav :steps="steps" :current="3" :completed="[0,1,2]" />
 */
import { PStepperItem } from '../../molecules/StepperItem'
import { PProgressBar } from '../../atoms/ProgressBar'

export interface StepNavStep {
  number: string
  label: string
}

export interface StepNavProps {
  /** Step definitions */
  steps: StepNavStep[]
  /** Current step index */
  current?: number
  /** Completed step indices */
  completed?: number[]
}

withDefaults(defineProps<StepNavProps>(), {
  current: 0,
  completed: () => [],
})
</script>

<template>
  <div class="hidden md:flex md:flex-col w-[220px] border-r border-line p-4 shrink-0 bg-table-header">
    <div class="text-xs text-ink3 uppercase tracking-widest font-medium mb-2.5">Sections</div>

    <PStepperItem
      v-for="(step, i) in steps"
      :key="step.number"
      :number="step.number"
      :label="step.label"
      :status="completed.includes(i) ? 'done' : i === current ? 'current' : 'upcoming'"
    />

    <div class="h-px bg-line my-4" />

    <div class="text-sm text-ink3 mb-1.5">Completion</div>
    <PProgressBar :value="((completed.length) / steps.length) * 100" tone="neutral" size="sm" />
    <div class="font-mono text-sm text-ink2 mt-1.5">
      {{ completed.length }} / {{ steps.length }}
    </div>
  </div>
</template>
