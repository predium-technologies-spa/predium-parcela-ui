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
    <!-- Top row: circles + lines aligned -->
    <div class="flex items-center min-w-max px-4">
      <template v-for="(step, idx) in steps" :key="idx">
        <!-- Circle -->
        <div
          :class="[
            'w-8 h-8 rounded-full text-sm font-semibold flex items-center justify-center shrink-0',
            idx <= activeStep ? 'bg-accent text-white' : 'stepper-circle-future text-ink4',
          ]"
        >
          <Check v-if="idx < activeStep" :size="14" :stroke-width="2.5" />
          <span v-else>{{ idx + 1 }}</span>
        </div>

        <!-- Connector line (between circles) -->
        <div
          v-if="idx < steps.length - 1"
          :class="[
            'h-0.5 min-w-[48px] flex-1 mx-2',
            idx < activeStep ? 'bg-accent' : 'stepper-connector-incomplete',
          ]"
        />
      </template>
    </div>

    <!-- Bottom row: labels aligned under circles -->
    <div class="flex min-w-max px-4 mt-2">
      <template v-for="(step, idx) in steps" :key="idx">
        <div class="flex justify-center shrink-0" style="width: 32px;">
          <span
            :class="[
              'text-xs font-medium whitespace-nowrap',
              idx <= activeStep ? 'text-ink' : 'text-ink4',
            ]"
            style="margin-left: -50px; margin-right: -50px; text-align: center;"
          >
            {{ step.label }}
          </span>
        </div>

        <!-- Spacer matching connector width -->
        <div
          v-if="idx < steps.length - 1"
          class="min-w-[48px] flex-1 mx-2"
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
