<script setup lang="ts">
/**
 * Modal dialog with backdrop, body, and footer.
 * Mobile-first: slides up from bottom on small screens, centered on desktop.
 * Uses Headless UI for focus trap, ESC handling, and scroll lock.
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
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
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
}

withDefaults(defineProps<ModalProps>(), {
  open: false,
  variant: 'default',
  width: 512,
})

defineEmits<{
  close: []
}>()
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog class="relative z-50" @close="$emit('close')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-[rgba(23,20,15,0.55)] backdrop-blur-[1px] transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-xl sm:rounded-2xl bg-surface px-4 pt-5 pb-4 text-left shadow-modal transition-all sm:my-8 sm:w-full sm:p-6"
              :style="{ maxWidth: `${width}px` }"
            >
              <div class="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-surface text-ink4 hover:text-ink transition-colors cursor-pointer p-1 focus:outline-2 focus:outline-offset-2 focus:outline-ink"
                  aria-label="Close"
                  @click="$emit('close')"
                >
                  <X :size="20" aria-hidden="true" />
                </button>
              </div>

              <!--
                Layout: el wrapper sm:flex existe sólo cuando hay icono
                (variant destructive). En default/form el contenido del
                slot body queda como bloque a ancho completo del panel —
                indispensable para forms / tablas / previews que antes
                se rompían dentro del flex item sin flex-1/min-w-0.
              -->
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
                  <DialogTitle as="h3" class="text-lg font-semibold text-ink tracking-tight">
                    {{ title }}
                  </DialogTitle>
                  <div v-if="subtitle" class="mt-0.5 text-xs font-mono text-ink4">
                    {{ subtitle }}
                  </div>
                  <div class="mt-2 text-sm text-ink2">
                    <slot name="body" />
                  </div>
                </div>
              </div>

              <div
                v-if="$slots.footer"
                class="mt-5 flex flex-col-reverse gap-2 sm:mt-4 sm:flex-row sm:flex-row-reverse sm:gap-3"
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
