<script setup lang="ts">
/**
 * Modal dialog with backdrop, header, body, and footer.
 * Animated open/close with fade + scale transitions.
 *
 * @example
 * <PModal :open="showModal" title="Archive?" variant="destructive" @close="showModal = false">
 *   <template #body>Are you sure?</template>
 *   <template #footer>
 *     <PButton variant="ghost" @click="showModal = false">Cancel</PButton>
 *     <PButton variant="danger" @click="archive">Archive</PButton>
 *   </template>
 * </PModal>
 */
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
  width: 480,
})

defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="modal-backdrop">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div
          class="absolute inset-0 bg-[rgba(23,20,15,0.35)] backdrop-blur-[1px]"
          @click="$emit('close')"
        />

        <!-- Dialog -->
        <Transition name="modal-dialog" appear>
          <div
            v-if="open"
            class="relative bg-surface rounded-xl sm:rounded-2xl shadow-modal overflow-hidden w-[calc(100%-1.5rem)] sm:w-auto mx-3 sm:mx-auto max-h-[calc(100vh-2rem)]"
            :style="{ maxWidth: `${width}px` }"
            role="dialog"
            aria-modal="true"
          >
            <!-- Header -->
            <div class="px-4 py-3 sm:px-5 sm:py-4 flex gap-3 sm:gap-3.5 border-b border-line-soft">
              <div
                v-if="variant === 'destructive'"
                class="w-8 h-8 rounded-xl bg-danger-bg text-danger grid place-items-center shrink-0"
              >
                <AlertTriangle :size="16" />
              </div>

              <div class="flex-1">
                <div class="flex justify-between items-start">
                  <div>
                    <div class="text-lg font-semibold text-ink tracking-tight">{{ title }}</div>
                    <div v-if="subtitle" class="text-xs font-mono text-ink4 mt-0.5">{{ subtitle }}</div>
                  </div>
                  <button
                    type="button"
                    class="text-ink4 hover:text-ink transition-colors cursor-pointer p-2 -m-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Close"
                    @click="$emit('close')"
                  >
                    <X :size="16" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Body -->
            <div class="px-4 py-3 sm:px-5 sm:py-4 overflow-y-auto">
              <slot name="body" />
            </div>

            <!-- Footer -->
            <div
              v-if="$slots.footer"
              class="px-4 py-3 sm:px-5 bg-bg border-t border-line flex flex-wrap items-center gap-2"
            >
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Backdrop fade */
.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
  transition: opacity 0.25s ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
  opacity: 0;
}

/* Dialog scale + fade */
.modal-dialog-enter-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-dialog-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-dialog-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(8px);
}

.modal-dialog-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(8px);
}
</style>
