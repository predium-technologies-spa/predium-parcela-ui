<script setup lang="ts">
/**
 * Right-side drawer panel with slide-in/slide-out animation.
 *
 * @example
 * <PRightDrawer v-model:open="showDrawer" title="Add property">
 *   <template #body>...form fields...</template>
 *   <template #footer>...buttons...</template>
 * </PRightDrawer>
 */
import { X } from 'lucide-vue-next'

export interface RightDrawerProps {
  /** Whether the drawer is visible (v-model) */
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
  open: false,
  width: 460,
})

defineEmits<{
  close: []
  'update:open': [value: boolean]
}>()
</script>

<template>
  <!-- Mobile backdrop -->
  <Transition name="backdrop">
    <div
      v-if="open"
      class="fixed inset-0 bg-[rgba(23,20,15,0.35)] z-30 md:hidden"
      @click="$emit('update:open', false); $emit('close')"
    />
  </Transition>

  <!-- Drawer -->
  <Transition name="drawer">
    <div
      v-if="open"
      class="fixed inset-y-0 right-0 z-40 md:relative md:inset-auto w-full md:w-auto h-full bg-surface border-l border-line flex flex-col shrink-0"
      :style="{ '--drawer-width': `${width}px` }"
      :class="'md:[width:var(--drawer-width)]'"
    >
      <!-- Header -->
      <div class="px-4 py-3 md:px-5 md:py-4 border-b border-line">
        <div class="flex justify-between items-center mb-1">
          <div v-if="eyebrow" class="text-xs text-ink3 uppercase tracking-wide font-medium">
            {{ eyebrow }}
          </div>
          <button
            type="button"
            class="text-ink3 hover:text-ink transition-colors cursor-pointer p-2 -m-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label="Close"
            @click="$emit('update:open', false); $emit('close')"
          >
            <X :size="16" />
          </button>
        </div>
        <div v-if="title" class="text-xl font-semibold text-ink tracking-tight">{{ title }}</div>
        <div v-if="subtitle" class="text-base text-ink3 mt-0.5">{{ subtitle }}</div>
        <slot name="header-extra" />
      </div>

      <!-- Body -->
      <div class="flex-1 overflow-auto px-4 py-3 md:px-5 md:py-4">
        <slot name="body" />
      </div>

      <!-- Footer -->
      <div v-if="$slots.footer" class="px-4 py-3 md:px-5 border-t border-line flex flex-wrap items-center gap-2">
        <slot name="footer" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Drawer slide animation */
.drawer-enter-active,
.drawer-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}

/* Backdrop fade */
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.3s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
</style>
