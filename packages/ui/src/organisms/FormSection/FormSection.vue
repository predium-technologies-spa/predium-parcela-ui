<script setup lang="ts">
/**
 * Two-column form section: left description, right fields grid.
 *
 * @example
 * <PFormSection number="01" title="Identity" description="How this property is identified.">
 *   <PFormField label="Name"><PInput v-model="name" /></PFormField>
 * </PFormSection>
 */
export interface FormSectionProps {
  /** Section number (e.g. "01") */
  number?: string
  /** Section title */
  title: string
  /** Section description */
  description?: string
  /** Whether this is the current/active section */
  current?: boolean
}

withDefaults(defineProps<FormSectionProps>(), {
  current: false,
})
</script>

<template>
  <div
    :class="[
      'bg-surface border rounded-xl mb-4 overflow-hidden',
      current ? 'border-ink border-[1.5px] shadow-sticky' : 'border-line',
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 p-5">
      <!-- Left: description -->
      <div>
        <div class="flex items-center gap-2 mb-1">
          <span v-if="number" class="font-mono text-sm text-ink4">{{ number }}</span>
          <span class="text-lg font-semibold text-ink tracking-tight">{{ title }}</span>
          <span
            v-if="current"
            class="text-xs text-ink bg-active-bg px-1.5 py-px rounded-sm font-medium uppercase tracking-wide"
          >
            Current
          </span>
        </div>
        <p v-if="description" class="text-base text-ink3 leading-relaxed">{{ description }}</p>
        <!-- Extra slot for validation notices etc. -->
        <slot name="aside" />
      </div>

      <!-- Right: fields grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <slot />
      </div>
    </div>
  </div>
</template>
