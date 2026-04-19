<script setup lang="ts">
/**
 * Modal dialog with backdrop, header, body, and footer.
 * Supports destructive, confirmation, and form variants.
 *
 * @example
 * <PModal :open="showModal" title="Archive property?" variant="destructive" @close="close">
 *   <template #body>Are you sure?</template>
 *   <template #footer>
 *     <PButton variant="ghost" @click="close">Cancel</PButton>
 *     <PButton variant="danger">Archive</PButton>
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
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div
        class="absolute inset-0 bg-[rgba(23,20,15,0.35)] backdrop-blur-[1px]"
        @click="$emit('close')"
      />

      <!-- Dialog -->
      <div
        class="relative bg-surface rounded-2xl shadow-modal overflow-hidden"
        :style="{ width: `${width}px` }"
        role="dialog"
        aria-modal="true"
      >
        <!-- Header -->
        <div class="px-5 py-4 flex gap-3.5 border-b border-line-soft">
          <!-- Icon for destructive -->
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
                class="text-ink4 hover:text-ink transition-colors"
                aria-label="Close"
                @click="$emit('close')"
              >
                <X :size="16" />
              </button>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div class="px-5 py-4">
          <slot name="body" />
        </div>

        <!-- Footer -->
        <div
          v-if="$slots.footer"
          class="px-5 py-3 bg-bg border-t border-line flex items-center gap-2"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
