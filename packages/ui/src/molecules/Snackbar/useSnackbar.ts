import { inject } from 'vue'

export interface SnackbarOptions {
  /** Message to display */
  message: string
  /** Visual kind */
  kind?: 'default' | 'success' | 'error'
  /** Optional action button text */
  actionText?: string
  /** Auto-dismiss duration in ms (default 3000) */
  duration?: number
}

export type EnqueueFn = (options: SnackbarOptions) => void

export const SNACKBAR_INJECTION_KEY = Symbol('snackbar') as InjectionKey<{ enqueue: EnqueueFn }>

import type { InjectionKey } from 'vue'

/**
 * Composable to enqueue snackbar messages.
 * Must be used inside a <PSnackbar> provider.
 */
export function useSnackbar() {
  const ctx = inject(SNACKBAR_INJECTION_KEY)
  if (!ctx) {
    throw new Error('useSnackbar() must be used inside a <PSnackbar> provider.')
  }
  return ctx
}
