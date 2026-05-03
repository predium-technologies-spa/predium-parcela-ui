<script setup lang="ts">
/**
 * Application sidebar with brand, nav sections, and storage footer.
 * Supports expand/collapse toggle with smooth animation, plus per-section
 * collapsible groups (controlled via `expandedSections` v-model).
 *
 * @example
 * <PSidebar
 *   v-model:expanded="isOpen"
 *   v-model:expanded-sections="sectionState"
 *   :sections="sections"
 *   active="property"
 * />
 */
import { computed, type Component } from 'vue'
import { PProgressBar } from '../../atoms/ProgressBar'
import { ChevronRight, PanelLeftClose, PanelLeftOpen } from 'lucide-vue-next'

export interface SidebarNavItem {
  key: string
  icon: Component
  label: string
  badge?: number | string
}

export interface SidebarSection {
  /** Unique identifier for the section. Falls back to `title` when omitted. */
  key?: string
  title: string
  items: SidebarNavItem[]
  /** Whether the section header acts as a collapse toggle. Defaults to true. */
  collapsible?: boolean
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
  /**
   * Per-section expanded state, keyed by `section.key` (or `section.title` as fallback).
   * Sections missing from the map default to expanded for backwards compatibility.
   * Supports v-model:expanded-sections.
   */
  expandedSections?: Record<string, boolean>
  /** Storage used (percentage) */
  storageUsed?: number
  /** Storage label */
  storageLabel?: string
  /** Label for the storage section heading */
  storageHeading?: string
  /** Label for the collapse button */
  collapseLabel?: string
}

const props = withDefaults(defineProps<SidebarProps>(), {
  brand: 'Parcela',
  org: 'Meridian Holdings',
  active: '',
  expanded: true,
  expandedSections: () => ({}),
  storageUsed: 42,
  storageLabel: '42.1 / 100 GB',
  storageHeading: 'Storage',
  collapseLabel: 'Collapse',
})

const emit = defineEmits<{
  navigate: [key: string]
  'update:expanded': [value: boolean]
  'update:expandedSections': [value: Record<string, boolean>]
  'toggle-section': [key: string, value: boolean]
}>()

function sectionKey(section: SidebarSection): string {
  return section.key ?? section.title
}

function isSectionCollapsible(section: SidebarSection): boolean {
  return section.collapsible !== false
}

function isSectionExpanded(section: SidebarSection): boolean {
  if (!isSectionCollapsible(section)) return true
  const k = sectionKey(section)
  // Default: expanded when no preference recorded.
  return props.expandedSections[k] !== false
}

function toggleSection(section: SidebarSection) {
  if (!isSectionCollapsible(section)) return
  const k = sectionKey(section)
  const next = !isSectionExpanded(section)
  emit('update:expandedSections', { ...props.expandedSections, [k]: next })
  emit('toggle-section', k, next)
}

function onSectionKeydown(e: KeyboardEvent, section: SidebarSection) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    toggleSection(section)
  }
}

const headerSections = computed(() =>
  props.sections.map((s) => ({
    section: s,
    key: sectionKey(s),
    collapsible: isSectionCollapsible(s),
    expanded: isSectionExpanded(s),
  })),
)
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
      <div
        v-for="meta in headerSections"
        :key="meta.key"
        class="mb-3"
      >
        <!-- Section header: clickable when collapsible (and sidebar expanded) -->
        <component
          :is="meta.collapsible && expanded ? 'button' : 'div'"
          :type="meta.collapsible && expanded ? 'button' : undefined"
          :aria-expanded="meta.collapsible ? meta.expanded : undefined"
          :aria-controls="meta.collapsible ? `sidebar-section-${meta.key}` : undefined"
          :class="[
            'sidebar-section-title group w-full flex items-center text-xs uppercase tracking-widest text-ink4 font-medium px-2.5 mb-1.5 whitespace-nowrap overflow-hidden transition-all duration-300',
            expanded ? 'opacity-100 h-auto' : 'opacity-0 h-0 mb-0',
            meta.collapsible && expanded ? 'cursor-pointer hover:text-ink2' : '',
          ]"
          @click="meta.collapsible && expanded && toggleSection(meta.section)"
          @keydown="meta.collapsible && expanded && onSectionKeydown($event, meta.section)"
        >
          <span class="flex-1 text-left">{{ meta.section.title }}</span>
          <component
            v-if="meta.collapsible && expanded"
            :is="ChevronRight"
            :size="12"
            :stroke-width="2"
            :class="[
              'shrink-0 transition-transform duration-200',
              meta.expanded ? 'rotate-90' : 'rotate-0',
            ]"
            aria-hidden="true"
          />
        </component>

        <!-- Section items: collapse via grid-rows trick (smooth, no fixed height) -->
        <div
          :id="`sidebar-section-${meta.key}`"
          :class="[
            'sidebar-section-content grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none',
            // In mini mode (sidebar collapsed) ignore per-section state and always show items.
            !expanded || meta.expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          ]"
          :aria-hidden="expanded && !meta.expanded ? 'true' : undefined"
        >
          <div class="overflow-hidden">
            <div class="flex flex-col gap-px">
              <div
                v-for="item in meta.section.items"
                :key="item.key"
                :class="[
                  'flex items-center gap-2.5 px-2.5 py-[7px] rounded-md cursor-pointer transition-colors overflow-hidden',
                  active === item.key
                    ? 'bg-active-bg text-ink font-medium'
                    : 'text-ink2 hover:bg-chip-bg',
                ]"
                :title="!expanded ? item.label : undefined"
                :tabindex="expanded && !meta.expanded ? -1 : 0"
                @click="emit('navigate', item.key)"
                @keydown.enter.space.prevent="emit('navigate', item.key)"
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
        </div>
      </div>
    </nav>

    <!-- Toggle button -->
    <div class="px-2 py-2 border-t border-line">
      <button
        type="button"
        class="w-full flex items-center justify-center gap-2 px-2.5 py-1.5 rounded-md text-ink3 hover:text-ink hover:bg-chip-bg transition-colors cursor-pointer"
        :aria-label="expanded ? 'Collapse sidebar' : 'Expand sidebar'"
        @click="emit('update:expanded', !expanded)"
      >
        <component :is="expanded ? PanelLeftClose : PanelLeftOpen" :size="15" class="shrink-0" />
        <span
          :class="[
            'text-sm whitespace-nowrap transition-all duration-300',
            expanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden',
          ]"
        >
          {{ collapseLabel }}
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
        <span>{{ storageHeading }}</span>
        <span class="font-mono">{{ storageLabel }}</span>
      </div>
      <PProgressBar :value="storageUsed" tone="neutral" size="sm" />
    </div>
  </aside>
</template>
