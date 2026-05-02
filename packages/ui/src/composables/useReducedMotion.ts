/**
 * Reactive flag tracking the user's `prefers-reduced-motion` setting.
 *
 * @example
 * const prefersReduced = useReducedMotion()
 * if (prefersReduced.value) skipAnimation()
 */
import { onBeforeUnmount, ref } from 'vue'

export function useReducedMotion() {
  const prefersReduced = ref(false)

  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return prefersReduced
  }

  const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReduced.value = mq.matches

  const onChange = (event: MediaQueryListEvent) => {
    prefersReduced.value = event.matches
  }

  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', onChange)
    onBeforeUnmount(() => mq.removeEventListener('change', onChange))
  } else {
    // Safari < 14 fallback
    mq.addListener(onChange)
    onBeforeUnmount(() => mq.removeListener(onChange))
  }

  return prefersReduced
}
