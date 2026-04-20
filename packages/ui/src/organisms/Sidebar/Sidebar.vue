<script setup lang="ts">
/**
 * Application sidebar with brand, nav sections, and storage footer.
 * Supports expand/collapse toggle with smooth animation.
 *
 * @example
 * <PSidebar v-model:expanded="isOpen" :sections="sections" active="property" />
 */
import { type Component } from 'vue'
import { PNavItem } from '../../molecules/NavItem'
import { PProgressBar } from '../../atoms/ProgressBar'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-vue-next'

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
  /** Whether sidebar is expanded (v-model) */
  expanded?: boolean
  /** Storage used (percentage) */
  storageUsed?: number
  /** Storage label */
  storageLabel?: string
}

withDefaults(defineProps<SidebarProps>(), {
  brand: 'Parcela',
  org: 'Meridian Holdings',
  active: '',
  expanded: true,
  storageUsed: 42,
  storageLabel: '42.1 / 100 GB',
})

defineEmits<{
  navigate: [key: string]
  'update:expanded': [value: boolean]
}>()
</script>

<template>
  <aside
    :class="[
      'h-full bg-bg border-r border-line hidden lg:flex flex-col shrink-0 transition-all duration-300 ease-in-out overflow-hidden',
      expanded ? 'w-[240px]' : 'w-[56px]',
    ]"
  >
    <!-- Brand -->
    <div class="h-[56px] flex items-center gap-2.5 px-4 border-b border-line">
      <div
        class="w-[22px] h-[22px] bg-ink rounded-md grid place-items-center text-white font-mono text-base font-semibold shrink-0"
      >
        {{ brand.charAt(0) }}
      </div>
      <div
        :class="[
          'leading-tight overflow-hidden transition-all duration-300',
          expanded ? 'opacity-100 w-auto' : 'opacity-0 w-0',
        ]"
      >
        <div class="text-md font-semibold text-ink tracking-tight whitespace-nowrap">{{ brand }}</div>
        <div class="text-xs text-ink4 whitespace-nowrap">{{ org }}</div>
      </div>
    </div>

    <!-- Nav sections -->
    <nav class="p-2 flex-1 overflow-y-auto overflow-x-hidden">
      <div v-for="section in sections" :key="section.title" class="mb-3">
        <div
          :class="[
            'text-xs uppercase tracking-widest text-ink4 font-medium px-2.5 mb-1.5 whitespace-nowrap overflow-hidden transition-all duration-300',
            expanded ? 'opacity-100 h-auto' : 'opacity-0 h-0 mb-0',
          ]"
        >
          {{ section.title }}
        </div>
        <div class="flex flex-col gap-px">
          <div
            v-for="item in section.items"
            :key="item.key"
            :class="[
              'flex items-center gap-2.5 px-2.5 py-[7px] rounded-md cursor-pointer transition-colors overflow-hidden',
              active === item.key
                ? 'bg-active-bg text-ink font-medium'
                : 'text-ink2 hover:bg-chip-bg',
            ]"
            :title="!expanded ? item.label : undefined"
            @click="$emit('navigate', item.key)"
          >
            <component
              :is="item.icon"
              :size="15"
              :stroke-width="active === item.key ? 1.8 : 1.5"
              class="shrink-0"
              aria-hidden="true"
            />
            <span
              :class="[
                'flex-1 text-md whitespace-nowrap transition-all duration-300',
                expanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden',
              ]"
            >
              {{ item.label }}
            </span>
            <span
              v-if="item.badge !== undefined"
              :class="[
                'font-mono text-xs text-ink3 px-1.5 py-px rounded-sm whitespace-nowrap transition-all duration-300',
                active === item.key ? 'bg-surface' : 'bg-chip-bg',
                expanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden',
              ]"
            >
              {{ item.badge }}
            </span>
          </div>
        </div>
      </div>
    </nav>

    <!-- Toggle button -->
    <div class="px-2 py-2 border-t border-line">
      <button
        type="button"
        class="w-full flex items-center justify-center gap-2 px-2.5 py-1.5 rounded-md text-ink3 hover:text-ink hover:bg-chip-bg transition-colors cursor-pointer"
        :aria-label="expanded ? 'Collapse sidebar' : 'Expand sidebar'"
        @click="$emit('update:expanded', !expanded)"
      >
        <component :is="expanded ? PanelLeftClose : PanelLeftOpen" :size="15" class="shrink-0" />
        <span
          :class="[
            'text-sm whitespace-nowrap transition-all duration-300',
            expanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden',
          ]"
        >
          Collapse
        </span>
      </button>
    </div>

    <!-- Storage footer -->
    <div
      v-if="storageLabel"
      :class="[
        'border-t border-line overflow-hidden transition-all duration-300',
        expanded ? 'p-3.5 opacity-100 max-h-20' : 'p-0 opacity-0 max-h-0',
      ]"
    >
      <div class="flex justify-between text-sm text-ink3 mb-1.5">
        <span>Storage</span>
        <span class="font-mono">{{ storageLabel }}</span>
      </div>
      <PProgressBar :value="storageUsed" tone="neutral" size="sm" />
    </div>
  </aside>
</template>
