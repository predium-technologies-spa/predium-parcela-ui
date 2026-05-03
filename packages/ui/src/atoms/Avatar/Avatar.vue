<script setup lang="ts">
import { ref } from 'vue'

export interface AvatarProps {
  /** 1–2 character initials (always required as fallback) */
  initials: string
  /** Predefined size */
  size?: 'sm' | 'md' | 'lg'
  /** Background color override (applies only when rendering initials) */
  color?: string
  /** Absolute or relative URL for the photo. If load succeeds → shows <img>; if fails → falls back to initials. */
  src?: string | null
  /** Accessible alt text. Falls back to initials if not provided. */
  alt?: string
  /** Referrer policy for external images (Google OAuth photos require "no-referrer"). */
  referrerPolicy?: 'no-referrer' | 'origin' | 'unsafe-url' | 'strict-origin-when-cross-origin'
}

const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'md',
  color: 'var(--color-ink)',
  src: null,
  referrerPolicy: 'no-referrer',
})

const imgFailed = ref(false)

const sizeClasses = {
  sm: 'w-6 h-6 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-sm',
} as const
</script>

<template>
  <img
    v-if="props.src && !imgFailed"
    :src="props.src"
    :alt="props.alt ?? props.initials"
    :referrerpolicy="props.referrerPolicy"
    :class="['rounded-full object-cover shrink-0', sizeClasses[props.size]]"
    @error="imgFailed = true"
  />
  <div
    v-else
    role="img"
    :aria-label="props.alt ?? props.initials"
    :class="[
      'rounded-full grid place-items-center text-white font-semibold tracking-wide shrink-0',
      sizeClasses[props.size],
    ]"
    :style="{ backgroundColor: props.color }"
  >
    {{ props.initials }}
  </div>
</template>
