<script setup lang="ts">
/**
 * Tooltip — wraps a slot and shows a floating label on hover.
 *
 * @example
 * <PTooltip content="Copy to clipboard">
 *   <button>Copy</button>
 * </PTooltip>
 */
import { ref } from 'vue'

export interface TooltipProps {
  /** Tooltip text */
  content: string
  /** Tooltip placement */
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

withDefaults(defineProps<TooltipProps>(), {
  placement: 'top',
})

const visible = ref(false)
</script>

<template>
  <div
    class="relative inline-flex"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
  >
    <slot />
    <Transition name="p-tooltip">
      <div
        v-if="visible && content"
        :class="[
          'absolute z-50 px-2.5 py-1.5 text-xs font-medium bg-ink text-white rounded-lg shadow-lg whitespace-nowrap pointer-events-none',
          placement === 'top' && 'bottom-full left-1/2 -translate-x-1/2 mb-2',
          placement === 'bottom' && 'top-full left-1/2 -translate-x-1/2 mt-2',
          placement === 'left' && 'right-full top-1/2 -translate-y-1/2 mr-2',
          placement === 'right' && 'left-full top-1/2 -translate-y-1/2 ml-2',
        ]"
      >
        {{ content }}
        <!-- Arrow -->
        <span
          :class="[
            'absolute w-2 h-2 bg-ink rotate-45',
            placement === 'top' && 'top-full left-1/2 -translate-x-1/2 -mt-1',
            placement === 'bottom' && 'bottom-full left-1/2 -translate-x-1/2 -mb-1',
            placement === 'left' && 'left-full top-1/2 -translate-y-1/2 -ml-1',
            placement === 'right' && 'right-full top-1/2 -translate-y-1/2 -mr-1',
          ]"
        />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.p-tooltip-enter-active,
.p-tooltip-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}
.p-tooltip-enter-from,
.p-tooltip-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
