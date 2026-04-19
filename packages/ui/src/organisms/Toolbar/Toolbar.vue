<script setup lang="ts">
/**
 * Toolbar with tab filters and action slots.
 *
 * @example
 * <PToolbar :tabs="['All', 'Active', 'Review']" v-model:activeTab="tab">
 *   <template #actions>...</template>
 * </PToolbar>
 */
export interface ToolbarTab {
  label: string
  count?: number | string
}

export interface ToolbarProps {
  /** Tab definitions */
  tabs: (string | ToolbarTab)[]
  /** Active tab index (v-model) */
  activeTab?: number
}

withDefaults(defineProps<ToolbarProps>(), {
  activeTab: 0,
})

defineEmits<{
  'update:activeTab': [index: number]
}>()
</script>

<template>
  <div
    class="flex items-center gap-2 px-2.5 py-2 bg-surface border border-line rounded-xl"
  >
    <!-- Tabs -->
    <div class="flex gap-0.5 p-0.5 bg-bg rounded-lg">
      <button
        v-for="(tab, i) in tabs"
        :key="i"
        type="button"
        :class="[
          'px-2.5 py-1 text-base rounded-md transition-colors cursor-pointer',
          i === activeTab
            ? 'bg-surface text-ink font-medium shadow-card'
            : 'text-ink3 hover:text-ink2',
        ]"
        @click="$emit('update:activeTab', i)"
      >
        {{ typeof tab === 'string' ? tab : tab.label }}
        <span
          v-if="typeof tab !== 'string' && tab.count !== undefined"
          class="ml-1 font-mono text-xs text-ink4"
        >
          {{ tab.count }}
        </span>
      </button>
    </div>

    <div class="flex-1" />

    <!-- Actions slot -->
    <slot name="actions" />
  </div>
</template>
