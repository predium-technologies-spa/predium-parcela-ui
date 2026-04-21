<script setup lang="ts">
/**
 * Session expired modal. Shows when user session has expired.
 *
 * @example
 * <PSessionExpired :open="expired" @relogin="goToLogin" />
 */

export interface SessionExpiredProps {
  /** Whether the modal is visible */
  open?: boolean
}

withDefaults(defineProps<SessionExpiredProps>(), {
  open: false,
})

import PButton from '../../atoms/Button/Button.vue'

defineEmits<{
  relogin: []
}>()
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="se-backdrop">
      <div v-if="open" class="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm" />
    </Transition>

    <!-- Dialog -->
    <Transition name="se-dialog">
      <div v-if="open" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div
          class="w-[400px] max-w-[calc(100vw-2rem)] rounded-xl shadow-2xl p-6"
          style="background: var(--color-surface); border: 1px solid var(--color-line);"
          role="dialog"
          aria-modal="true"
        >
          <!-- Amber top bar -->
          <div class="h-1 -mx-6 -mt-6 mb-8 rounded-t-xl" style="background: var(--color-warn);" />

          <!-- Body -->
          <div class="flex flex-col items-center">
            <!-- Icon -->
            <div
              class="w-14 h-14 rounded-full flex items-center justify-center mb-7"
              style="background: var(--color-warn-bg);"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="stroke: var(--color-warn);">
                <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              </svg>
            </div>

            <!-- Text -->
            <h3 class="text-[18px] font-semibold mb-2" style="color: var(--color-ink);">Sesion expirada</h3>
            <p class="text-[13px] text-center leading-relaxed" style="color: var(--color-ink3);">
              Tu sesion ha expirado por inactividad.<br>
              Por favor, vuelve a iniciar sesion.
            </p>

            <!-- Action -->
            <div class="w-full mt-8 pt-6" style="border-top: 1px solid var(--color-line-soft);">
              <PButton variant="primary" class="w-full" @click="$emit('relogin')">Reingresar</PButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.se-backdrop-enter-active, .se-backdrop-leave-active { transition: opacity 0.2s ease; }
.se-backdrop-enter-from, .se-backdrop-leave-to { opacity: 0; }
.se-dialog-enter-active, .se-dialog-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.se-dialog-enter-from, .se-dialog-leave-to { opacity: 0; transform: scale(0.95); }
</style>
