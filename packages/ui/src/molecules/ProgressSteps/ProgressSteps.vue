<script setup lang="ts">
/**
 * Vertical progress stepper with step circles, connector lines, and content slot.
 *
 * @example
 * <PProgressSteps :steps="[{ title: 'Step 1' }, { title: 'Step 2' }]" :currentStep="0" />
 */
import { Check } from 'lucide-vue-next'

export interface ProgressStep {
  /** Step title */
  title: string
  /** Optional description */
  description?: string
}

export interface ProgressStepsProps {
  /** Array of step definitions */
  steps: ProgressStep[]
  /** Zero-based index of the current active step */
  currentStep?: number
}

withDefaults(defineProps<ProgressStepsProps>(), {
  currentStep: 0,
})
</script>

<template>
  <div class="flex flex-col">
    <div v-for="(step, idx) in steps" :key="idx" class="flex gap-3">
      <!-- Left column: circle + connector -->
      <div class="flex flex-col items-center">
        <!-- Step circle -->
        <div
          :class="[
            'w-8 h-8 rounded-full text-sm font-semibold flex items-center justify-center shrink-0',
            idx < currentStep && 'bg-accent text-white',
            idx === currentStep && 'bg-accent text-white',
            idx > currentStep && 'step-circle-future text-ink4',
          ]"
        >
          <Check v-if="idx < currentStep" :size="16" :stroke-width="2.5" />
          <span v-else>{{ idx + 1 }}</span>
        </div>
        <!-- Connector line -->
        <div
          v-if="idx < steps.length - 1"
          :class="[
            'w-0.5 min-h-[24px] flex-1',
            idx < currentStep ? 'bg-accent' : 'step-connector-incomplete',
          ]"
        />
      </div>

      <!-- Right column: content -->
      <div class="pb-6">
        <div class="text-sm font-semibold text-ink">{{ step.title }}</div>
        <div v-if="step.description" class="text-sm text-ink3 mt-0.5">
          {{ step.description }}
        </div>
        <!-- Slot for active step content -->
        <div v-if="idx === currentStep" class="mt-2">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-circle-future {
  border: 2px solid var(--color-line-soft);
}
.step-connector-incomplete {
  background: var(--color-line);
}
</style>
