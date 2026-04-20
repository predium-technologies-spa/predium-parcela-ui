<script setup lang="ts">
/**
 * Click-triggered popover with placement options.
 *
 * @example
 * <PPopover>
 *   <template #trigger><PButton>Open</PButton></template>
 *   <div class="p-3">Popover content</div>
 * </PPopover>
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'

export interface PopoverProps {
  /** Panel placement relative to trigger */
  placement?: 'bottom' | 'bottom-start' | 'bottom-end' | 'top' | 'top-start' | 'top-end'
}

const props = withDefaults(defineProps<PopoverProps>(), {
  placement: 'bottom-start',
})

const isOpen = ref(false)
const containerRef = ref<HTMLElement>()

function toggle() {
  isOpen.value = !isOpen.value
}

function handleClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') isOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})

const placementClasses: Record<string, string> = {
  'bottom': 'top-full left-1/2 -translate-x-1/2 mt-1.5',
  'bottom-start': 'top-full left-0 mt-1.5',
  'bottom-end': 'top-full right-0 mt-1.5',
  'top': 'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
  'top-start': 'bottom-full left-0 mb-1.5',
  'top-end': 'bottom-full right-0 mb-1.5',
}
</script>

<template>
  <div ref="containerRef" class="relative inline-block">
    <!-- Trigger -->
    <div @click="toggle">
      <slot name="trigger" />
    </div>

    <!-- Panel -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        :class="[
          'p-popover-panel absolute z-50 min-w-[180px] bg-surface rounded-xl shadow-lg overflow-hidden',
          placementClasses[placement],
        ]"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.p-popover-panel {
  border: 1px solid var(--color-line-soft);
}
</style>
