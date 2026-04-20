<script setup lang="ts">
/**
 * Horizontal tab bar with underline indicator and optional content slot.
 *
 * @example
 * <PTabs v-model="tab" :tabs="[{ key: 'all', label: 'All' }, { key: 'active', label: 'Active' }]" />
 */
export interface TabItem {
  /** Unique key for the tab */
  key: string
  /** Display label */
  label: string
  /** Optional count badge */
  count?: number
}

export interface TabsProps {
  /** Active tab key (v-model) */
  modelValue: string | number
  /** Tab definitions */
  tabs: TabItem[]
  /** Fill available width equally */
  fill?: boolean
}

withDefaults(defineProps<TabsProps>(), {
  fill: false,
})

defineEmits<{
  'update:modelValue': [value: string | number]
}>()
</script>

<template>
  <div>
    <div class="p-tabs-bar relative overflow-x-auto" role="tablist">
      <div :class="['flex', fill && 'w-full']">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          role="tab"
          :aria-selected="modelValue === tab.key"
          :class="[
            'relative px-4 py-2.5 text-sm font-medium transition-colors duration-150 cursor-pointer whitespace-nowrap',
            fill && 'flex-1 text-center',
            modelValue === tab.key
              ? 'text-ink'
              : 'text-ink4 hover:text-ink3',
          ]"
          @click="$emit('update:modelValue', tab.key)"
        >
          {{ tab.label }}
          <span
            v-if="tab.count !== undefined"
            :class="[
              'ml-1.5 text-xs font-medium px-1.5 py-0.5 rounded-full',
              modelValue === tab.key
                ? 'bg-accent-bg text-accent'
                : 'bg-chip-bg text-ink4',
            ]"
          >
            {{ tab.count }}
          </span>
          <!-- Active underline bar -->
          <span
            v-if="modelValue === tab.key"
            class="absolute bottom-0 left-0 right-0 h-[3px] bg-accent rounded-full"
          />
        </button>
      </div>
    </div>
    <div v-if="$slots.default" class="mt-4">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.p-tabs-bar {
  border-bottom: 1px solid var(--color-line-soft);
}
</style>
