<script setup lang="ts">
/**
 * Application sidebar with brand, nav sections, and storage footer.
 *
 * @example
 * <PSidebar :sections="sections" active="property" brand="Parcela" org="Meridian Holdings" />
 */
import { type Component } from 'vue'
import { PNavItem } from '../../molecules/NavItem'
import { PProgressBar } from '../../atoms/ProgressBar'

export interface SidebarNavItem {
  key: string
  icon: Component
  label: string
  badge?: number | string
}

export interface SidebarSection {
  title: string
  items: SidebarNavItem[]
}

export interface SidebarProps {
  /** Brand name */
  brand?: string
  /** Organization name */
  org?: string
  /** Nav sections */
  sections: SidebarSection[]
  /** Active item key */
  active?: string
  /** Storage used (percentage) */
  storageUsed?: number
  /** Storage label */
  storageLabel?: string
  /** Collapse sidebar to icon-only mode (auto-collapses on mobile by default) */
  collapsed?: boolean
}

withDefaults(defineProps<SidebarProps>(), {
  brand: 'Parcela',
  org: 'Meridian Holdings',
  active: '',
  storageUsed: 42,
  storageLabel: '42.1 / 100 GB',
  collapsed: false,
})

defineEmits<{
  navigate: [key: string]
}>()
</script>

<template>
  <aside
    :class="[
      'h-full bg-bg border-r border-line flex flex-col shrink-0 transition-[width] duration-200',
      collapsed ? 'w-[56px]' : 'w-[56px] lg:w-[240px]',
    ]"
  >
    <!-- Brand -->
    <div class="h-[56px] flex items-center gap-2.5 px-4 border-b border-line overflow-hidden">
      <div
        class="w-[22px] h-[22px] bg-ink rounded-md grid place-items-center text-white font-mono text-base font-semibold shrink-0"
      >
        {{ brand.charAt(0) }}
      </div>
      <div :class="['leading-tight', collapsed ? 'hidden' : 'hidden lg:block']">
        <div class="text-md font-semibold text-ink tracking-tight whitespace-nowrap">{{ brand }}</div>
        <div class="text-xs text-ink4 whitespace-nowrap">{{ org }}</div>
      </div>
    </div>

    <!-- Nav sections -->
    <nav class="p-3 flex-1 overflow-auto overflow-x-hidden">
      <div v-for="section in sections" :key="section.title" class="mb-4">
        <div :class="['text-xs uppercase tracking-widest text-ink4 font-medium px-2.5 mb-1.5 whitespace-nowrap', collapsed ? 'hidden' : 'hidden lg:block']">
          {{ section.title }}
        </div>
        <div class="flex flex-col gap-px">
          <PNavItem
            v-for="item in section.items"
            :key="item.key"
            :icon="item.icon"
            :label="item.label"
            :badge="item.badge"
            :active="active === item.key"
            :class="['overflow-hidden', collapsed ? '[&>span]:hidden' : 'lg:[&>span]:inline [&>span]:hidden']"
            @click="$emit('navigate', item.key)"
          />
        </div>
      </div>
    </nav>

    <!-- Storage footer -->
    <div v-if="storageLabel" :class="['p-3.5 border-t border-line', collapsed ? 'hidden' : 'hidden lg:block']">
      <div class="flex justify-between text-sm text-ink3 mb-1.5">
        <span>Storage</span>
        <span class="font-mono">{{ storageLabel }}</span>
      </div>
      <PProgressBar :value="storageUsed" tone="neutral" size="sm" />
    </div>
  </aside>
</template>
