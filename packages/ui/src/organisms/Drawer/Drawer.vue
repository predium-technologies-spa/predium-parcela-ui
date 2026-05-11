<script lang="ts">
export default { name: 'PDrawer' }
</script>

<script setup lang="ts">
/**
 * Slide-in drawer panel with optional full-screen overlay.
 * Supports four sides (right, left, top, bottom) and uses Headless UI for
 * focus trap, ESC handling, click-outside, and scroll lock.
 *
 * @example
 * <PDrawer v-model:open="showDrawer" side="right" title="Add property">
 *   <template #body>...form fields...</template>
 *   <template #footer>...buttons...</template>
 * </PDrawer>
 */
import { computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { X } from 'lucide-vue-next'

export type DrawerSide = 'right' | 'left' | 'top' | 'bottom'

export interface DrawerProps {
  /** Whether the drawer is visible (v-model:open) */
  open?: boolean
  /** Which side the drawer slides in from */
  side?: DrawerSide
  /** Render the full-screen backdrop behind the drawer */
  overlay?: boolean
  /** Drawer size in px (width for left/right, height for top/bottom) */
  size?: number
  /** Eyebrow label */
  eyebrow?: string
  /** Main title */
  title?: string
  /** Subtitle */
  subtitle?: string
}

const props = withDefaults(defineProps<DrawerProps>(), {
  open: false,
  side: 'right',
  overlay: true,
})

const emit = defineEmits<{
  close: []
  'update:open': [value: boolean]
}>()

const isHorizontal = computed(() => props.side === 'right' || props.side === 'left')

const resolvedSize = computed(() => props.size ?? (isHorizontal.value ? 460 : 360))

const panelStyle = computed(() => {
  return isHorizontal.value
    ? { width: `${resolvedSize.value}px`, maxWidth: '100vw' }
    : { height: `${resolvedSize.value}px`, maxHeight: '100vh' }
})

const containerClasses = computed(() => {
  switch (props.side) {
    case 'right':
      return 'fixed inset-y-0 right-0 max-w-full'
    case 'left':
      return 'fixed inset-y-0 left-0 max-w-full'
    case 'top':
      return 'fixed inset-x-0 top-0 max-h-full'
    case 'bottom':
      return 'fixed inset-x-0 bottom-0 max-h-full'
  }
  return ''
})

const enterFromClass = computed(() => {
  switch (props.side) {
    case 'right': return 'translate-x-full'
    case 'left':  return '-translate-x-full'
    case 'top':   return '-translate-y-full'
    case 'bottom':return 'translate-y-full'
  }
  return ''
})

const enterToClass = computed(() => isHorizontal.value ? 'translate-x-0' : 'translate-y-0')

const panelBorderClass = computed(() => {
  switch (props.side) {
    case 'right': return 'border-l'
    case 'left':  return 'border-r'
    case 'top':   return 'border-b'
    case 'bottom':return 'border-t'
  }
  return ''
})

const onClose = () => {
  emit('update:open', false)
  emit('close')
}
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-50" @close="onClose">
      <TransitionChild
        v-if="overlay"
        as="template"
        enter="ease-in-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-[rgba(23,20,15,0.35)] transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <div :class="containerClasses">
          <TransitionChild
            as="template"
            enter="transform transition ease-in-out duration-300"
            :enter-from="enterFromClass"
            :enter-to="enterToClass"
            leave="transform transition ease-in-out duration-300"
            :leave-from="enterToClass"
            :leave-to="enterFromClass"
          >
            <DialogPanel
              class="pointer-events-auto bg-surface shadow-xl flex flex-col h-full w-full overflow-hidden"
              :class="panelBorderClass"
              :style="panelStyle"
              style="border-color: var(--color-line);"
            >
              <div class="px-4 py-3 md:px-5 md:py-4 border-b" style="border-color: var(--color-line);">
                <div class="flex justify-between items-center mb-1">
                  <div
                    v-if="eyebrow"
                    class="text-xs text-ink3 uppercase tracking-wide font-medium"
                  >
                    {{ eyebrow }}
                  </div>
                  <button
                    type="button"
                    class="ml-auto text-ink3 hover:text-ink transition-colors cursor-pointer p-2 -m-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Close"
                    @click="onClose"
                  >
                    <X :size="16" />
                  </button>
                </div>
                <DialogTitle
                  v-if="title"
                  as="div"
                  class="text-xl font-semibold text-ink tracking-tight"
                >
                  {{ title }}
                </DialogTitle>
                <div v-if="subtitle" class="text-base text-ink3 mt-0.5">{{ subtitle }}</div>
                <slot name="header-extra" />
              </div>

              <div class="flex-1 overflow-auto px-4 py-3 md:px-5 md:py-4">
                <slot name="body" />
              </div>

              <div
                v-if="$slots.footer"
                class="px-4 py-3 md:px-5 border-t flex flex-wrap items-center gap-2"
                style="border-color: var(--color-line);"
              >
                <slot name="footer" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
