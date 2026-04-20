<script setup lang="ts">
/**
 * Horizontal step indicator with circles and connector lines.
 *
 * @example
 * <PStepper :steps="[{ label: 'Info' }, { label: 'Review' }, { label: 'Done' }]" :activeStep="1" />
 */
import { Check } from 'lucide-vue-next'

export interface StepDef {
  /** Step label */
  label: string
}

export interface StepperProps {
  /** Step definitions */
  steps: StepDef[]
  /** Zero-based active step index */
  activeStep: number
}

defineProps<StepperProps>()
</script>

<template>
  <div class="overflow-x-auto">
    <div class="flex items-start min-w-max">
      <template v-for="(step, idx) in steps" :key="idx">
        <!-- Step column -->
        <div class="flex flex-col items-center">
          <!-- Circle -->
          <div
            :class="[
              'w-7 h-7 rounded-full text-sm font-semibold flex items-center justify-center shrink-0',
              idx < activeStep && 'bg-accent text-white',
              idx === activeStep && 'bg-accent text-white',
              idx > activeStep && 'stepper-circle-future text-ink4',
            ]"
          >
            <Check v-if="idx < activeStep" :size="14" :stroke-width="2.5" />
            <span v-else>{{ idx + 1 }}</span>
          </div>
          <!-- Label -->
          <span
            :class="[
              'text-xs font-medium mt-1.5 whitespace-nowrap',
              idx <= activeStep ? 'text-ink' : 'text-ink4',
            ]"
          >
            {{ step.label }}
          </span>
        </div>

        <!-- Connector line -->
        <div
          v-if="idx < steps.length - 1"
          :class="[
            'h-0.5 min-w-[40px] flex-1 self-center mt-[-12px]',
            idx < activeStep ? 'bg-accent' : 'stepper-connector-incomplete',
          ]"
          style="margin-top: 14px;"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.stepper-circle-future {
  border: 2px solid var(--color-line-soft);
}
.stepper-connector-incomplete {
  background: var(--color-line);
}
</style>
