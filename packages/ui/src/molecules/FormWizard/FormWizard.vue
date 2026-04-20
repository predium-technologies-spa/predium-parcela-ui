<script setup lang="ts">
/**
 * Multi-step form wizard with progress bar, animated transitions,
 * and sticky navigation footer. Content-agnostic — use slots for each step.
 *
 * @example
 * <PFormWizard :steps="steps" v-model:currentStep="step">
 *   <template #step-0>...fields...</template>
 *   <template #step-1>...fields...</template>
 * </PFormWizard>
 */
import { computed } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

export interface FormWizardStep {
  /** Step title */
  title: string
  /** Step description */
  description?: string
  /** Whether this step is complete (shows checkmark in progress) */
  completed?: boolean
}

export interface FormWizardProps {
  /** Step definitions */
  steps: FormWizardStep[]
  /** Current step index (v-model) */
  currentStep?: number
  /** Label for the final step's continue button */
  finishLabel?: string
  /** Show save draft button */
  showDraft?: boolean
  /** Autosave status text */
  autosaveText?: string
}

const props = withDefaults(defineProps<FormWizardProps>(), {
  currentStep: 0,
  finishLabel: 'Submit',
  showDraft: true,
  autosaveText: '',
})

const emit = defineEmits<{
  'update:currentStep': [step: number]
  'finish': []
  'save-draft': []
}>()

const isFirst = computed(() => props.currentStep === 0)
const isLast = computed(() => props.currentStep === props.steps.length - 1)
const progress = computed(() => ((props.currentStep + 1) / props.steps.length) * 100)
const currentStepDef = computed(() => props.steps[props.currentStep])

function goBack() {
  if (!isFirst.value) {
    emit('update:currentStep', props.currentStep - 1)
  }
}

function goNext() {
  if (isLast.value) {
    emit('finish')
  } else {
    emit('update:currentStep', props.currentStep + 1)
  }
}
</script>

<template>
  <div class="flex flex-col h-full bg-bg">
    <!-- Progress header -->
    <div class="shrink-0 bg-surface px-6 pt-5 pb-4" style="border-bottom: 1px solid var(--color-line-soft);">
      <!-- Step indicator -->
      <div class="flex items-center justify-between mb-1">
        <span class="text-sm font-medium text-ink2">
          Step {{ currentStep + 1 }} of {{ steps.length }}
          <span class="text-ink4 ml-1">·</span>
          <span class="text-ink ml-1">{{ currentStepDef?.title }}</span>
        </span>
        <span class="text-sm text-ink4 font-mono">{{ Math.round(progress) }}%</span>
      </div>

      <!-- Progress bar -->
      <div class="w-full h-1.5 bg-chip-bg rounded-full overflow-hidden">
        <div
          class="h-full bg-accent rounded-full transition-all duration-500 ease-out"
          :style="{ width: `${progress}%` }"
        />
      </div>

      <!-- Step dots -->
      <div class="flex items-center gap-1.5 mt-3">
        <button
          v-for="(step, i) in steps"
          :key="i"
          type="button"
          :class="[
            'w-2 h-2 rounded-full transition-all duration-300 cursor-pointer',
            i === currentStep ? 'bg-accent w-5' : i < currentStep || step.completed ? 'bg-accent/40' : 'bg-chip-bg',
          ]"
          :aria-label="`Go to step ${i + 1}: ${step.title}`"
          @click="emit('update:currentStep', i)"
        />
      </div>
    </div>

    <!-- Step content -->
    <div class="flex-1 overflow-y-auto">
      <div class="max-w-[560px] mx-auto px-5 py-8">
        <!-- Step title & description -->
        <div class="mb-6">
          <h2 class="text-xl font-semibold text-ink tracking-tight">
            {{ currentStepDef?.title }}
          </h2>
          <p v-if="currentStepDef?.description" class="text-base text-ink3 mt-1">
            {{ currentStepDef.description }}
          </p>
        </div>

        <!-- Step slot content -->
        <div class="flex flex-col gap-4">
          <template v-for="(step, i) in steps" :key="i">
            <div v-show="i === currentStep">
              <slot :name="`step-${i}`" :step="step" :index="i" />
            </div>
          </template>
        </div>
      </div>
    </div>

    <!-- Footer navigation -->
    <div
      class="shrink-0 bg-surface flex flex-wrap items-center gap-3 px-6 py-3"
      style="border-top: 1px solid var(--color-line-soft);"
    >
      <button
        v-if="!isFirst"
        type="button"
        class="inline-flex items-center gap-1.5 px-4 py-2 text-base font-medium text-ink2 rounded-xl cursor-pointer transition-colors hover:bg-hover"
        @click="goBack"
      >
        <ChevronLeft :size="16" />
        Back
      </button>
      <div v-else />

      <div class="flex-1 flex items-center justify-center gap-3">
        <span v-if="autosaveText" class="text-sm text-ink4 hidden sm:inline">{{ autosaveText }}</span>
      </div>

      <div class="flex items-center gap-2">
        <button
          v-if="showDraft"
          type="button"
          class="hidden sm:inline-flex items-center px-4 py-2 text-base font-medium text-ink3 rounded-xl cursor-pointer transition-colors hover:bg-hover"
          @click="emit('save-draft')"
        >
          Save draft
        </button>
        <button
          type="button"
          class="inline-flex items-center gap-1.5 px-5 py-2 text-base font-medium text-white bg-accent rounded-xl cursor-pointer transition-colors hover:bg-accent/90"
          @click="goNext"
        >
          {{ isLast ? finishLabel : 'Continue' }}
          <ChevronRight v-if="!isLast" :size="16" />
        </button>
      </div>
    </div>
  </div>
</template>
