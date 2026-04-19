<script setup lang="ts">
/**
 * Right-side drawer panel with header, scrollable body, and footer actions.
 *
 * @example
 * <PRightDrawer title="Add property" subtitle="Draft will autosave" :open="isOpen">
 *   <template #body>...form fields...</template>
 *   <template #footer>...buttons...</template>
 * </PRightDrawer>
 */
import { X } from 'lucide-vue-next'

export interface RightDrawerProps {
  /** Whether the drawer is visible */
  open?: boolean
  /** Drawer width */
  width?: number
  /** Eyebrow label */
  eyebrow?: string
  /** Main title */
  title?: string
  /** Subtitle */
  subtitle?: string
}

withDefaults(defineProps<RightDrawerProps>(), {
  open: true,
  width: 460,
})

defineEmits<{
  close: []
}>()
</script>

<template>
  <!-- Mobile backdrop overlay -->
  <div
    v-if="open"
    class="fixed inset-0 bg-[rgba(23,20,15,0.35)] z-30 md:hidden"
    @click="$emit('close')"
  />

  <div
    v-if="open"
    class="fixed inset-0 z-40 md:relative md:inset-auto w-full md:w-auto h-full bg-surface border-l border-line flex flex-col shrink-0"
    :style="{ '--drawer-width': `${width}px` }"
    :class="'md:[width:var(--drawer-width)]'"
  >
    <!-- Header -->
    <div class="px-5 py-4 border-b border-line">
      <div class="flex justify-between items-center mb-1">
        <div v-if="eyebrow" class="text-xs text-ink3 uppercase tracking-wide font-medium">
          {{ eyebrow }}
        </div>
        <button
          type="button"
          class="text-ink3 hover:text-ink transition-colors"
          aria-label="Close"
          @click="$emit('close')"
        >
          <X :size="16" />
        </button>
      </div>
      <div v-if="title" class="text-xl font-semibold text-ink tracking-tight">{{ title }}</div>
      <div v-if="subtitle" class="text-base text-ink3 mt-0.5">{{ subtitle }}</div>
      <slot name="header-extra" />
    </div>

    <!-- Body -->
    <div class="flex-1 overflow-auto px-5 py-4">
      <slot name="body" />
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="px-5 py-3 border-t border-line flex items-center gap-2">
      <slot name="footer" />
    </div>
  </div>
</template>
