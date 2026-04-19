<script setup lang="ts">
/**
 * Sidebar navigation item with icon, label, and optional badge count.
 *
 * @example
 * <PNavItem :icon="Home" label="Properties" :badge="48" active />
 */
import { type Component } from 'vue'

export interface NavItemProps {
  /** Lucide icon component */
  icon: Component
  /** Navigation label */
  label: string
  /** Whether this item is active */
  active?: boolean
  /** Optional count badge */
  badge?: number | string
}

withDefaults(defineProps<NavItemProps>(), {
  active: false,
})
</script>

<template>
  <div
    :class="[
      'flex items-center gap-2.5 px-2.5 py-[7px] rounded-md cursor-pointer transition-colors',
      active
        ? 'bg-[#EDEAE2] text-ink font-medium'
        : 'text-ink2 hover:bg-chip-bg',
    ]"
  >
    <component
      :is="icon"
      :size="15"
      :stroke-width="active ? 1.8 : 1.5"
      class="shrink-0"
      aria-hidden="true"
    />
    <span class="flex-1 text-md">{{ label }}</span>
    <span
      v-if="badge !== undefined"
      :class="[
        'font-mono text-xs text-ink3 px-1.5 py-px rounded-sm',
        active ? 'bg-white' : 'bg-chip-bg',
      ]"
    >
      {{ badge }}
    </span>
  </div>
</template>
