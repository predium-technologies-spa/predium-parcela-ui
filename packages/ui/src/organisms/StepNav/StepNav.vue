<script setup lang="ts">
/**
 * Step navigation — vertical sidebar or horizontal bar.
 *
 * @example
 * <PStepNav :steps="steps" :current="3" :completed="[0,1,2]" />
 * <PStepNav :steps="steps" :current="1" direction="horizontal" />
 */
import { computed } from 'vue'
import { Check } from 'lucide-vue-next'
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
  /** Layout direction */
  direction?: 'vertical' | 'horizontal'
  /** Show completion progress */
  showProgress?: boolean
  /** Heading above step list (vertical mode) */
  sectionsLabel?: string
  /** Heading above progress bar (vertical mode) */
  completionLabel?: string
}

const props = withDefaults(defineProps<StepNavProps>(), {
  current: 0,
  completed: () => [],
  direction: 'vertical',
  showProgress: true,
  sectionsLabel: 'Sections',
  completionLabel: 'Completion',
})

defineEmits<{
  navigate: [index: number]
}>()

const progress = computed(() =>
  props.steps.length ? (props.completed.length / props.steps.length) * 100 : 0,
)

function stepStatus(i: number): 'done' | 'current' | 'upcoming' {
  if (props.completed.includes(i)) return 'done'
  if (i === props.current) return 'current'
  return 'upcoming'
}
</script>

<template>
  <!-- ═══ Vertical ═══ -->
  <div
    v-if="direction === 'vertical'"
    class="hidden md:flex md:flex-col w-[220px] shrink-0 bg-table-header p-4 step-nav-vertical"
  >
    <div class="text-xs text-ink3 uppercase tracking-widest font-medium mb-2.5">{{ sectionsLabel }}</div>

    <button
      v-for="(step, i) in steps"
      :key="step.number"
      type="button"
      :class="[
        'flex items-center gap-2.5 px-2.5 py-2 rounded-lg mb-0.5 text-left cursor-pointer transition-colors',
        stepStatus(i) === 'current' && 'bg-active-bg',
        stepStatus(i) !== 'current' && 'hover:bg-hover',
      ]"
      @click="$emit('navigate', i)"
    >
      <div
        :class="[
          'w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0 text-[10px] font-semibold transition-colors',
          stepStatus(i) === 'done' && 'bg-accent text-white',
          stepStatus(i) === 'current' && 'bg-accent text-white',
          stepStatus(i) === 'upcoming' && 'step-circle-future text-ink4',
        ]"
      >
        <Check v-if="stepStatus(i) === 'done'" :size="11" :stroke-width="2.5" />
        <span v-else>{{ step.number }}</span>
      </div>
      <span
        :class="[
          'text-sm',
          stepStatus(i) === 'current' && 'text-ink font-medium',
          stepStatus(i) === 'done' && 'text-ink2',
          stepStatus(i) === 'upcoming' && 'text-ink3',
        ]"
      >
        {{ step.label }}
      </span>
    </button>

    <template v-if="showProgress">
      <div class="step-nav-divider my-4" />
      <div class="text-sm text-ink3 mb-1.5">{{ completionLabel }}</div>
      <PProgressBar :value="progress" tone="neutral" size="sm" />
      <div class="font-sans text-sm text-ink2 mt-1.5">
        {{ completed.length }} / {{ steps.length }}
      </div>
    </template>
  </div>

  <!-- ═══ Horizontal ═══ -->
  <div
    v-else
    class="flex items-center gap-1 overflow-x-auto px-3 sm:px-4 py-3 bg-surface step-nav-horizontal"
  >
    <template v-for="(step, i) in steps" :key="step.number">
      <button
        type="button"
        :class="[
          'flex items-center gap-2 px-3 py-2 rounded-lg shrink-0 cursor-pointer transition-colors min-h-[44px]',
          stepStatus(i) === 'current' && 'bg-active-bg',
          stepStatus(i) !== 'current' && 'hover:bg-hover',
        ]"
        @click="$emit('navigate', i)"
      >
        <div
          :class="[
            'w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-semibold transition-colors',
            stepStatus(i) === 'done' && 'bg-accent text-white',
            stepStatus(i) === 'current' && 'bg-accent text-white',
            stepStatus(i) === 'upcoming' && 'step-circle-future text-ink4',
          ]"
        >
          <Check v-if="stepStatus(i) === 'done'" :size="10" :stroke-width="2.5" />
          <span v-else>{{ step.number }}</span>
        </div>
        <span
          :class="[
            'text-sm whitespace-nowrap',
            stepStatus(i) === 'current' && 'text-ink font-medium',
            stepStatus(i) === 'done' && 'text-ink2',
            stepStatus(i) === 'upcoming' && 'text-ink4',
          ]"
        >
          {{ step.label }}
        </span>
      </button>

      <!-- Connector dash -->
      <div
        v-if="i < steps.length - 1"
        :class="[
          'w-4 h-px shrink-0',
          i < (completed.length ? Math.max(...completed) + 1 : current) ? 'bg-accent' : 'step-connector',
        ]"
      />
    </template>

    <!-- Progress pill -->
    <div v-if="showProgress" class="ml-auto pl-4 shrink-0 flex items-center gap-2">
      <div class="w-16">
        <PProgressBar :value="progress" tone="neutral" size="sm" />
      </div>
      <span class="font-sans text-xs text-ink3">{{ completed.length }}/{{ steps.length }}</span>
    </div>
  </div>
</template>

<style scoped>
.step-nav-vertical {
  border-right: 1px solid var(--color-line-soft);
}
.step-nav-horizontal {
  border-bottom: 1px solid var(--color-line-soft);
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.step-nav-horizontal::-webkit-scrollbar {
  display: none;
}
.step-nav-divider {
  border-top: 1px solid var(--color-line-soft);
}
.step-circle-future {
  border: 1.5px solid var(--color-line);
}
.step-connector {
  background: var(--color-line);
}
</style>
