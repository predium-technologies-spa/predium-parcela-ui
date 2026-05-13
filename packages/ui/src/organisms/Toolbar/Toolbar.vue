<script setup lang="ts">
/**
 * Toolbar with tab filters and action slots.
 * Tabs wrap to multiple rows when they don't fit.
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
  <div class="toolbar-container bg-surface rounded-xl px-2.5 py-2">
    <!-- Tabs + actions in a wrapping flex container -->
    <div class="flex flex-wrap items-center gap-2">
      <!-- Tabs (wrap naturally) -->
      <div class="flex flex-wrap gap-1 p-0.5 bg-bg rounded-lg">
        <button
          v-for="(tab, i) in tabs"
          :key="i"
          type="button"
          :class="[
            'px-2.5 py-1.5 text-sm rounded-md transition-colors cursor-pointer whitespace-nowrap min-h-[36px]',
            i === activeTab
              ? 'bg-surface text-ink font-medium shadow-card'
              : 'text-ink3 hover:text-ink2',
          ]"
          @click="$emit('update:activeTab', i)"
        >
          {{ typeof tab === 'string' ? tab : tab.label }}
          <span
            v-if="typeof tab !== 'string' && tab.count !== undefined"
            class="ml-1 font-sans text-xs text-ink4"
          >
            {{ tab.count }}
          </span>
        </button>
      </div>

      <!-- Spacer (pushes actions right on wide screens) -->
      <div class="flex-1 min-w-0" />

      <!-- Actions (wrap alongside tabs) -->
      <div v-if="$slots.actions" class="flex flex-wrap items-center gap-1.5">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.toolbar-container {
  border: 1px solid var(--color-line-soft);
}
</style>
