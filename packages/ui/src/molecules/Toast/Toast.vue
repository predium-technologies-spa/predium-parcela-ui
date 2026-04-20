<script setup lang="ts">
/**
 * Toast notification with auto-dismiss and optional action.
 *
 * @example
 * <PToast message="Property saved" kind="success" :visible="show" @close="show = false" />
 * <PToast message="Error occurred" kind="error" action="Retry" @action="retry" />
 */
import { watch, ref, onBeforeUnmount } from 'vue'
import { X } from 'lucide-vue-next'

export interface ToastProps {
  /** Toast message */
  message: string
  /** Visual kind */
  kind?: 'info' | 'success' | 'warning' | 'error'
  /** Optional action button label */
  action?: string
  /** Auto-dismiss duration in ms (0 = no auto-dismiss) */
  duration?: number
  /** Whether the toast is visible */
  visible?: boolean
}

const props = withDefaults(defineProps<ToastProps>(), {
  kind: 'info',
  duration: 5000,
  visible: false,
})

const emit = defineEmits<{
  close: []
  action: []
}>()

const timer = ref<ReturnType<typeof setTimeout> | null>(null)

function startTimer() {
  clearTimer()
  if (props.duration > 0) {
    timer.value = setTimeout(() => {
      emit('close')
    }, props.duration)
  }
}

function clearTimer() {
  if (timer.value) {
    clearTimeout(timer.value)
    timer.value = null
  }
}

watch(
  () => props.visible,
  (val) => {
    if (val) startTimer()
    else clearTimer()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  clearTimer()
})

const kindClasses: Record<string, string> = {
  info: 'toast-info text-white',
  success: 'bg-good text-white',
  warning: 'bg-warn text-ink',
  error: 'bg-danger text-white',
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      v-if="visible"
      :class="[
        'inline-flex items-center gap-3 min-w-[320px] px-4 py-3 rounded-xl shadow-xl',
        kindClasses[kind],
      ]"
      role="alert"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <span class="flex-1 text-base font-medium">{{ message }}</span>
      <button
        v-if="action"
        type="button"
        class="text-base underline underline-offset-2 cursor-pointer shrink-0 font-medium opacity-90 hover:opacity-100 transition-opacity"
        @click="emit('action')"
      >
        {{ action }}
      </button>
      <button
        type="button"
        class="shrink-0 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Close"
        @click="emit('close')"
      >
        <X :size="16" :stroke-width="2" aria-hidden="true" />
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.toast-info {
  background: #1A1714;
}
.dark .toast-info {
  background: #3D3833;
}
</style>
