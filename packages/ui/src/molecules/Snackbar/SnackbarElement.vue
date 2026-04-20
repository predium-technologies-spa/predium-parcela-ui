<script setup lang="ts">
/**
 * Internal snackbar visual element. Not exported separately.
 */
import { Check, X } from 'lucide-vue-next'

export interface SnackbarElementProps {
  /** Snackbar message */
  message: string
  /** Visual kind */
  kind?: 'default' | 'success' | 'error'
  /** Optional action button text */
  actionText?: string
  /** Show spinner instead of icon */
  progress?: boolean
}

withDefaults(defineProps<SnackbarElementProps>(), {
  kind: 'default',
  progress: false,
})

defineEmits<{
  actionClick: []
  close: []
}>()
</script>

<template>
  <div
    :class="[
      'inline-flex items-center rounded-xl min-w-[320px] max-w-[540px] shadow-xl text-white',
      kind === 'default' && 'bg-ink',
      kind === 'success' && 'bg-good',
      kind === 'error' && 'bg-danger',
    ]"
  >
    <!-- Left icon -->
    <div class="pl-4 flex items-center">
      <!-- Spinner -->
      <svg
        v-if="progress"
        class="animate-spin w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          class="opacity-25"
          cx="12" cy="12" r="10"
          stroke="currentColor" stroke-width="3"
        />
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <Check v-else-if="kind === 'success'" :size="20" :stroke-width="2.5" />
      <X v-else-if="kind === 'error'" :size="20" :stroke-width="2.5" />
    </div>

    <!-- Message -->
    <span class="text-base px-3 py-3.5 flex-1">{{ message }}</span>

    <!-- Action -->
    <button
      v-if="actionText"
      class="px-4 font-medium rounded-full hover:bg-white/10 py-1.5 cursor-pointer"
      @click="$emit('actionClick')"
    >
      {{ actionText }}
    </button>

    <!-- Close -->
    <button
      class="w-9 h-9 rounded-full opacity-70 hover:opacity-100 flex items-center justify-center mr-1 cursor-pointer"
      @click="$emit('close')"
    >
      <X :size="18" />
    </button>
  </div>
</template>
