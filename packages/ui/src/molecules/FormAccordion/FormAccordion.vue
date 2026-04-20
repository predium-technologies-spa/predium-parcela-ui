<script setup lang="ts">
/**
 * Accordion form for editing — all sections visible, one open at a time.
 * Each section shows a summary when collapsed, full fields when expanded.
 *
 * @example
 * <PFormAccordion :sections="sections" v-model:activeSection="active">
 *   <template #summary-0>Harper Hall · PRP-0126</template>
 *   <template #content-0>...editable fields...</template>
 * </PFormAccordion>
 */
import { Check, ChevronDown, Pencil } from 'lucide-vue-next'

export interface FormAccordionSection {
  /** Section title */
  title: string
  /** Whether this section has been saved/completed */
  completed?: boolean
}

export interface FormAccordionProps {
  /** Section definitions */
  sections: FormAccordionSection[]
  /** Currently expanded section index (-1 = all collapsed, v-model) */
  activeSection?: number
}

const props = withDefaults(defineProps<FormAccordionProps>(), {
  activeSection: -1,
})

const emit = defineEmits<{
  'update:activeSection': [index: number]
  'save': [index: number]
  'cancel': [index: number]
}>()

function toggle(i: number) {
  emit('update:activeSection', props.activeSection === i ? -1 : i)
}
</script>

<template>
  <div class="flex flex-col gap-3">
    <div
      v-for="(section, i) in sections"
      :key="i"
      class="form-accordion-section bg-surface rounded-xl overflow-hidden transition-all duration-200"
      :class="activeSection === i && 'is-active'"
    >
      <!-- Header (always visible, clickable) -->
      <button
        type="button"
        class="w-full flex items-center gap-3 px-5 py-4 cursor-pointer transition-colors hover:bg-hover text-left"
        @click="toggle(i)"
      >
        <!-- Status circle -->
        <div
          :class="[
            'w-6 h-6 rounded-full flex items-center justify-center shrink-0',
            section.completed ? 'bg-accent text-white' : 'text-ink4',
          ]"
          :style="!section.completed ? 'border: 1.5px solid var(--color-line)' : ''"
        >
          <Check v-if="section.completed" :size="12" :stroke-width="2.5" />
          <span v-else class="text-xs font-semibold">{{ i + 1 }}</span>
        </div>

        <!-- Title -->
        <span class="flex-1 text-base font-semibold text-ink">{{ section.title }}</span>

        <!-- Edit icon or chevron -->
        <Pencil v-if="activeSection !== i && section.completed" :size="14" class="text-ink4" />
        <ChevronDown
          :size="16"
          :class="[
            'text-ink4 transition-transform duration-200',
            activeSection === i && 'rotate-180',
          ]"
        />
      </button>

      <!-- Summary (shown when collapsed, if slot provided) -->
      <div
        v-if="activeSection !== i && $slots[`summary-${i}`]"
        class="px-5 pb-4 -mt-1 text-sm text-ink3"
      >
        <slot :name="`summary-${i}`" :section="section" :index="i" />
      </div>

      <!-- Expandable content -->
      <div
        v-show="activeSection === i"
        class="px-5 pb-5"
      >
        <!-- Divider -->
        <div class="mb-5" style="border-top: 1px solid var(--color-line-soft);" />

        <!-- Fields slot -->
        <div class="max-w-[560px]">
          <div class="flex flex-col gap-5">
            <slot :name="`content-${i}`" :section="section" :index="i" />
          </div>

          <!-- Section actions -->
          <div class="flex items-center gap-2 mt-6 pt-4" style="border-top: 1px solid var(--color-line-soft);">
            <div class="flex-1" />
            <button
              type="button"
              class="px-4 py-2 text-base font-medium text-ink3 rounded-xl cursor-pointer transition-colors hover:bg-hover"
              @click="emit('cancel', i); emit('update:activeSection', -1)"
            >
              Cancel
            </button>
            <button
              type="button"
              class="px-5 py-2 text-base font-medium text-white bg-accent rounded-xl cursor-pointer transition-colors hover:bg-accent/90"
              @click="emit('save', i)"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-accordion-section {
  border: 1px solid var(--color-line-soft);
}
.form-accordion-section.is-active {
  border-color: var(--color-accent);
}
</style>
