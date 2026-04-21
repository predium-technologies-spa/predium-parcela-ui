<script setup lang="ts">
/**
 * Session warning modal with circular countdown timer.
 * Shows when user session is about to expire due to inactivity.
 *
 * @example
 * <PSessionWarning :open="showWarning" :remaining="57" :total="120" @continue="reactivate" @logout="logout" />
 */
import { computed } from 'vue'
import PButton from '../../atoms/Button/Button.vue'

export interface SessionWarningProps {
  /** Whether the modal is visible */
  open?: boolean
  /** Seconds remaining */
  remaining: number
  /** Total warning duration in seconds */
  total?: number
}

const props = withDefaults(defineProps<SessionWarningProps>(), {
  open: false,
  total: 120,
})

defineEmits<{
  continue: []
  logout: []
}>()

const minutes = computed(() => Math.floor(props.remaining / 60))
const seconds = computed(() => props.remaining % 60)
const display = computed(() => `${minutes.value}:${String(seconds.value).padStart(2, '0')}`)
const progress = computed(() => props.remaining / props.total)

// SVG circle math
const SIZE = 80
const STROKE = 4
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const dashOffset = computed(() => CIRCUMFERENCE * (1 - progress.value))
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="sw-backdrop">
      <div v-if="open" class="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm" />
    </Transition>

    <!-- Dialog -->
    <Transition name="sw-dialog">
      <div v-if="open" class="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div
          class="w-[360px] max-w-[calc(100vw-2rem)] rounded-lg overflow-hidden shadow-2xl"
          style="background: var(--color-surface);"
          role="dialog"
          aria-modal="true"
        >
          <!-- Gold top bar -->
          <div class="h-1" style="background: var(--color-accent);" />

          <!-- Body -->
          <div class="flex flex-col items-center px-10 pt-10 pb-8">
            <!-- Circular timer -->
            <div class="relative mb-6">
              <svg :width="SIZE" :height="SIZE" class="-rotate-90">
                <!-- Track -->
                <circle
                  :cx="SIZE / 2" :cy="SIZE / 2" :r="RADIUS"
                  fill="none"
                  :stroke-width="STROKE"
                  style="stroke: var(--color-chip-bg);"
                />
                <!-- Progress -->
                <circle
                  :cx="SIZE / 2" :cy="SIZE / 2" :r="RADIUS"
                  fill="none"
                  :stroke-width="STROKE"
                  stroke-linecap="round"
                  style="stroke: var(--color-accent); transition: stroke-dashoffset 1s linear;"
                  :stroke-dasharray="CIRCUMFERENCE"
                  :stroke-dashoffset="dashOffset"
                />
              </svg>
              <!-- Time display -->
              <div class="absolute inset-0 flex flex-col items-center justify-center">
                <span class="text-[20px] font-semibold font-mono tracking-tight" style="color: var(--color-ink);">{{ display }}</span>
                <span class="text-[9px] uppercase tracking-widest font-medium" style="color: var(--color-ink3);">restantes</span>
              </div>
            </div>

            <!-- Text -->
            <h3 class="text-[17px] font-semibold mb-2" style="color: var(--color-ink);">¿Sigues ahi?</h3>
            <p class="text-[13px] text-center leading-relaxed mb-8" style="color: var(--color-ink3);">
              Por seguridad cerraremos tu sesion en <strong class="font-semibold" style="color: var(--color-ink);">{{ remaining }}</strong> s.<br>
              Presiona continuar si todavia estas trabajando.
            </p>

            <!-- Actions -->
            <div class="w-full space-y-3">
              <PButton variant="primary" class="w-full" @click="$emit('continue')">Seguir trabajando</PButton>
              <PButton variant="ghost" class="w-full" @click="$emit('logout')">Cerrar sesion ahora</PButton>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sw-backdrop-enter-active, .sw-backdrop-leave-active { transition: opacity 0.2s ease; }
.sw-backdrop-enter-from, .sw-backdrop-leave-to { opacity: 0; }
.sw-dialog-enter-active, .sw-dialog-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.sw-dialog-enter-from, .sw-dialog-leave-to { opacity: 0; transform: scale(0.95); }
</style>
