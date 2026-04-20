<script setup lang="ts">
/**
 * Multi-step form wizard with clickable step navigation,
 * progress bar, and sticky footer. Content-agnostic via slots.
 *
 * @example
 * <PFormWizard :steps="steps" v-model:currentStep="step">
 *   <template #step-0>...fields...</template>
 *   <template #step-1>...fields...</template>
 * </PFormWizard>
 */
import { computed } from 'vue'
import { Check, ChevronLeft, ChevronRight } from 'lucide-vue-next'

export interface FormWizardStep {
  /** Step title */
  title: string
  /** Step description */
  description?: string
  /** Whether this step is complete */
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

function goTo(i: number) {
  emit('update:currentStep', i)
}

function goBack() {
  if (!isFirst.value) goTo(props.currentStep - 1)
}

function goNext() {
  if (isLast.value) {
    emit('finish')
  } else {
    goTo(props.currentStep + 1)
  }
}
</script>

<template>
  <div class="flex flex-col h-full bg-bg">
    <!-- Header: progress + step nav -->
    <div class="shrink-0 bg-surface" style="border-bottom: 1px solid var(--color-line-soft);">
      <!-- Progress bar (thin, top) -->
      <div class="w-full h-1 bg-chip-bg">
        <div
          class="h-full bg-accent transition-all duration-500 ease-out"
          :style="{ width: `${progress}%` }"
        />
      </div>

      <!-- Clickable step nav -->
      <div class="flex overflow-x-auto px-2 sm:px-4">
        <button
          v-for="(step, i) in steps"
          :key="i"
          type="button"
          class="wizard-step-btn flex items-center gap-2 px-3 sm:px-4 py-3 shrink-0 cursor-pointer transition-colors"
          :class="[
            i === currentStep && 'is-active',
          ]"
          @click="goTo(i)"
        >
          <!-- Step circle -->
          <div
            :class="[
              'w-6 h-6 rounded-full text-xs font-semibold flex items-center justify-center shrink-0 transition-all duration-200',
              i < currentStep || step.completed
                ? 'bg-accent text-white'
                : i === currentStep
                  ? 'bg-accent text-white'
                  : 'wizard-circle-future text-ink4',
            ]"
          >
            <Check v-if="i < currentStep || (step.completed && i !== currentStep)" :size="12" :stroke-width="2.5" />
            <span v-else>{{ i + 1 }}</span>
          </div>

          <!-- Step label (hidden on small mobile, shown on sm+) -->
          <span
            :class="[
              'hidden sm:inline text-sm whitespace-nowrap transition-colors',
              i === currentStep ? 'font-medium text-ink' : 'text-ink3',
            ]"
          >
            {{ step.title }}
          </span>
        </button>
      </div>
    </div>

    <!-- Step content -->
    <div class="flex-1 overflow-y-auto">
      <div class="max-w-[560px] mx-auto px-5 py-10 sm:py-12">
        <!-- Step title & description -->
        <div class="mb-8">
          <div class="text-xs uppercase tracking-wide text-ink4 font-medium mb-1">
            Step {{ currentStep + 1 }} of {{ steps.length }}
          </div>
          <h2 class="text-2xl font-semibold text-ink tracking-tight">
            {{ currentStepDef?.title }}
          </h2>
          <p v-if="currentStepDef?.description" class="text-base text-ink3 mt-2 leading-relaxed">
            {{ currentStepDef.description }}
          </p>
        </div>

        <!-- Divider -->
        <div class="mb-8" style="border-top: 1px solid var(--color-line-soft);" />

        <!-- Step slot content -->
        <div class="flex flex-col gap-5">
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

<style scoped>
.wizard-step-btn.is-active {
  border-bottom: 2px solid var(--color-accent);
}
.wizard-step-btn:not(.is-active) {
  border-bottom: 2px solid transparent;
}
.wizard-step-btn:hover:not(.is-active) {
  background: var(--color-hover);
}
.wizard-circle-future {
  border: 1.5px solid var(--color-line);
}
</style>
