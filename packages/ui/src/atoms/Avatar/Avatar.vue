<script setup lang="ts">
/**
 * Avatar with initials. Sizes: 24, 32, 40px.
 *
 * @example
 * <PAvatar initials="ER" size="md" />
 * <PAvatar initials="DO" size="lg" color="#C75B39" />
 */
export interface AvatarProps {
  /** 1–2 character initials */
  initials: string
  /** Predefined size */
  size?: 'sm' | 'md' | 'lg'
  /** Background color override */
  color?: string
}

withDefaults(defineProps<AvatarProps>(), {
  size: 'md',
  color: 'var(--color-ink)',
})

const sizeClasses = {
  sm: 'w-6 h-6 text-[10px]',
  md: 'w-8 h-8 text-xs',
  lg: 'w-10 h-10 text-sm',
} as const
</script>

<template>
  <div
    role="img"
    :aria-label="initials"
    :class="[
      'rounded-full grid place-items-center text-white font-semibold tracking-wide shrink-0',
      sizeClasses[size],
    ]"
    :style="{ backgroundColor: color }"
  >
    {{ initials }}
  </div>
</template>
