<script setup lang="ts">
/**
 * Snackbar provider/container. Wrap your app (or a section) with this component
 * and use `useSnackbar()` to enqueue messages.
 *
 * @example
 * <PSnackbar placement="top">
 *   <App />
 * </PSnackbar>
 */
import { ref, provide, Teleport, Transition } from 'vue'
import SnackbarElement from './SnackbarElement.vue'
import { SNACKBAR_INJECTION_KEY, type SnackbarOptions } from './useSnackbar'

export interface SnackbarProps {
  /** Where the snackbar appears */
  placement?: 'top' | 'bottom'
}

const props = withDefaults(defineProps<SnackbarProps>(), {
  placement: 'top',
})

interface QueueItem extends SnackbarOptions {
  id: number
}

let nextId = 0
const queue = ref<QueueItem[]>([])
const current = ref<QueueItem | null>(null)
let dismissTimer: ReturnType<typeof setTimeout> | null = null

function showNext() {
  if (queue.value.length === 0) {
    current.value = null
    return
  }
  const item = queue.value.shift()!
  current.value = item
  const dur = item.duration ?? 3000
  dismissTimer = setTimeout(() => dismiss(), dur)
}

function dismiss() {
  if (dismissTimer) {
    clearTimeout(dismissTimer)
    dismissTimer = null
  }
  current.value = null
  setTimeout(() => showNext(), 220)
}

function enqueue(options: SnackbarOptions) {
  const item: QueueItem = { ...options, id: nextId++ }
  if (!current.value) {
    queue.value.push(item)
    showNext()
  } else {
    queue.value.push(item)
  }
}

provide(SNACKBAR_INJECTION_KEY, { enqueue })
</script>

<template>
  <slot />

  <Teleport to="body">
    <div
      :class="[
        'fixed left-0 right-0 flex justify-center z-50 pointer-events-none px-4',
        placement === 'top' ? 'top-4' : 'bottom-4',
      ]"
    >
      <Transition
        mode="out-in"
        :enter-active-class="'snackbar-enter-active'"
        :leave-active-class="'snackbar-leave-active'"
        :enter-from-class="placement === 'top' ? 'snackbar-enter-from-top' : 'snackbar-enter-from-bottom'"
        :enter-to-class="'snackbar-to'"
        :leave-from-class="'snackbar-to'"
        :leave-to-class="placement === 'top' ? 'snackbar-enter-from-top' : 'snackbar-enter-from-bottom'"
      >
        <SnackbarElement
          v-if="current"
          :key="current.id"
          class="pointer-events-auto"
          :message="current.message"
          :kind="current.kind"
          :action-text="current.actionText"
          @close="dismiss"
          @action-click="dismiss"
        />
      </Transition>
    </div>
  </Teleport>
</template>

<style scoped>
.snackbar-enter-active,
.snackbar-leave-active {
  transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease-out;
  will-change: transform, opacity;
}
.snackbar-enter-from-top {
  transform: translate3d(0, -12px, 0);
  opacity: 0;
}
.snackbar-enter-from-bottom {
  transform: translate3d(0, 12px, 0);
  opacity: 0;
}
.snackbar-to {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
</style>
