<script setup lang="ts">
/**
 * Modal dialog with backdrop, body, and footer.
 * Mobile-first: slides up from bottom on small screens, centered on desktop.
 *
 * By default, clicking outside the modal does NOT close it. Only ESC, the X
 * button, or explicit close/cancel buttons will close it. Set
 * `closeOnOverlayClick` to true to restore the classic backdrop-click-to-close.
 *
 * @example
 * <PModal :open="showModal" title="Archive?" variant="destructive" @close="showModal = false">
 *   <template #body>Are you sure?</template>
 *   <template #footer>
 *     <PButton variant="danger" @click="archive">Archive</PButton>
 *     <PButton variant="ghost" @click="showModal = false">Cancel</PButton>
 *   </template>
 * </PModal>
 */
import { onBeforeUnmount, ref, watch } from 'vue'
import { X, AlertTriangle } from 'lucide-vue-next'

export interface ModalProps {
  /** Whether the modal is visible */
  open?: boolean
  /** Modal title */
  title: string
  /** Subtitle / meta */
  subtitle?: string
  /** Modal variant */
  variant?: 'default' | 'destructive' | 'form'
  /** Width in pixels */
  width?: number
  /** Whether clicking the overlay closes the modal (default: false) */
  closeOnOverlayClick?: boolean
}

const props = withDefaults(defineProps<ModalProps>(), {
  open: false,
  variant: 'default',
  width: 512,
  closeOnOverlayClick: false,
})

const emit = defineEmits<{
  close: []
}>()

const show = ref(false)
const closing = ref(false)

function openModal() {
  if (show.value) return
  closing.value = false
  show.value = true
  document.body.style.overflow = 'hidden'
  document.addEventListener('keydown', onKeydown)
}

function closeModal() {
  if (closing.value || !show.value) return
  closing.value = true
  setTimeout(() => {
    show.value = false
    closing.value = false
    document.body.style.overflow = ''
    emit('close')
  }, 200)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    closeModal()
  }
}

function onBackdropClick() {
  if (props.closeOnOverlayClick) {
    closeModal()
  }
}

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) openModal()
    else if (show.value) closeModal()
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="relative z-50"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-[rgba(23,20,15,0.55)] backdrop-blur-[1px] transition-opacity"
          :class="[
            closing ? 'opacity-0' : 'opacity-100',
            closeOnOverlayClick ? 'cursor-pointer' : 'cursor-default',
          ]"
          @click="onBackdropClick"
        />

        <!-- Modal panel -->
        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition
              enter-active-class="ease-out duration-300"
              enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to-class="opacity-100 translate-y-0 sm:scale-100"
              leave-active-class="ease-in duration-200"
              leave-from-class="opacity-100 translate-y-0 sm:scale-100"
              leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                v-show="!closing"
                class="relative transform overflow-hidden rounded-xl sm:rounded-2xl bg-surface px-4 pt-5 pb-4 text-left shadow-modal transition-all sm:my-8 sm:w-full sm:p-6"
                :style="{ maxWidth: `${width}px` }"
              >
                <!-- X button -->
                <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                  <button
                    type="button"
                    class="rounded-md bg-surface text-ink4 hover:text-ink transition-colors cursor-pointer p-1 focus:outline-2 focus:outline-offset-2 focus:outline-ink"
                    aria-label="Close"
                    @click="closeModal"
                  >
                    <X :size="20" aria-hidden="true" />
                  </button>
                </div>

                <!-- Content -->
                <div :class="variant === 'destructive' ? 'sm:flex sm:items-start' : ''">
                  <div
                    v-if="variant === 'destructive'"
                    class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-danger-bg sm:mx-0 sm:size-10"
                  >
                    <AlertTriangle :size="20" class="text-danger" aria-hidden="true" />
                  </div>

                  <div
                    class="mt-3 text-center sm:mt-0 sm:text-left"
                    :class="variant === 'destructive' ? 'sm:ml-4 sm:flex-1 sm:min-w-0' : ''"
                  >
                    <h3
                      id="modal-title"
                      class="text-lg font-semibold text-ink tracking-tight"
                    >
                      {{ title }}
                    </h3>
                    <div v-if="subtitle" class="mt-0.5 text-xs font-mono text-ink4">
                      {{ subtitle }}
                    </div>
                    <div class="mt-2 text-sm text-ink2">
                      <slot name="body" />
                    </div>
                  </div>
                </div>

                <!-- Footer -->
                <div
                  v-if="$slots.footer"
                  class="mt-5 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:flex-row-reverse sm:gap-3"
                >
                  <slot name="footer" />
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
