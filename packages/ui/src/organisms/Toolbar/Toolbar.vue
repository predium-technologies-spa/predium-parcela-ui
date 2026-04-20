<script setup lang="ts">
/**
 * Toolbar with tab filters and action slots.
 * Stacks to 2 rows on mobile, single row on desktop.
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
  <div class="toolbar-container bg-surface rounded-xl">
    <!-- Row 1: Tabs (always visible, scrollable) -->
    <div class="flex items-center gap-2 px-2.5 py-2">
      <div class="flex-1 min-w-0 overflow-x-auto">
        <div class="flex gap-0.5 p-0.5 bg-bg rounded-lg w-fit">
          <button
            v-for="(tab, i) in tabs"
            :key="i"
            type="button"
            :class="[
              'px-2.5 py-1 text-sm sm:text-base rounded-md transition-colors cursor-pointer whitespace-nowrap',
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
      </div>

      <!-- Desktop actions (inline, lg+) -->
      <div v-if="$slots.actions" class="hidden lg:flex items-center gap-2 shrink-0">
        <slot name="actions" />
      </div>
    </div>

    <!-- Row 2: Actions on mobile/tablet (below tabs) -->
    <div v-if="$slots.actions" class="lg:hidden flex items-center gap-2 px-2.5 pb-2 overflow-x-auto">
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped>
.toolbar-container {
  border: 1px solid var(--color-line-soft);
}
</style>
