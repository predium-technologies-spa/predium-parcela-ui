<script setup lang="ts">
/**
 * Filter pill button with label and optional active state.
 *
 * @example
 * <PFilterPill label="Region: All" :icon="Filter" />
 * <PFilterPill label="Active" active count="48" />
 */
import { type Component } from 'vue'

export interface FilterPillProps {
  /** Filter label */
  label: string
  /** Whether the filter is active */
  active?: boolean
  /** Optional icon */
  icon?: Component
  /** Optional count */
  count?: string | number
}

withDefaults(defineProps<FilterPillProps>(), {
  active: false,
})

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    type="button"
    :class="[
      'inline-flex items-center gap-1.5 px-2.5 py-1 text-base rounded-md border transition-colors cursor-pointer',
      active
        ? 'bg-surface text-ink font-medium border-line shadow-card'
        : 'bg-transparent text-ink3 border-transparent hover:bg-chip-bg',
    ]"
    @click="$emit('click')"
  >
    <component
      v-if="icon"
      :is="icon"
      :size="12"
      :stroke-width="1.5"
      aria-hidden="true"
    />
    {{ label }}
    <span v-if="count !== undefined" class="font-sans text-xs text-ink4 ml-0.5">
      {{ count }}
    </span>
  </button>
</template>
