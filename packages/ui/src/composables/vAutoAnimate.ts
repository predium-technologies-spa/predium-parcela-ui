/**
 * Vue directive that wires `@formkit/auto-animate` onto an element so its
 * direct children animate when added/removed/reordered. Respects the user's
 * `prefers-reduced-motion` setting (no-op when reduced).
 *
 * Usage:
 *   import { vAutoAnimate } from '@eddwinpaz/predium-ui'
 *
 *   <tbody v-auto-animate>...</tbody>
 *   <ul v-auto-animate="{ duration: 180 }">...</ul>
 *
 * The binding value is forwarded to autoAnimate's options
 * (see https://auto-animate.formkit.com/#usage).
 */
import autoAnimate, { type AutoAnimateOptions } from '@formkit/auto-animate'
import type { Directive, DirectiveBinding } from 'vue'

const DEFAULT_OPTIONS: Partial<AutoAnimateOptions> = {
  duration: 220,
  easing: 'ease-in-out',
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export const vAutoAnimate: Directive<HTMLElement, Partial<AutoAnimateOptions> | undefined> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<Partial<AutoAnimateOptions> | undefined>) {
    if (prefersReducedMotion()) return
    const options = { ...DEFAULT_OPTIONS, ...(binding.value ?? {}) }
    autoAnimate(el, options)
  },
}
