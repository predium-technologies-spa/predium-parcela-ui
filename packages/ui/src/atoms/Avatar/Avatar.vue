<script setup lang="ts">
/**
 * Avatar with initials. Sizes: 22, 28, 36px.
 *
 * @example
 * <PAvatar initials="ER" size="md" />
 * <PAvatar initials="DO" size="lg" color="#2E3A2A" />
 */
export interface AvatarProps {
  /** 1–2 character initials */
  initials: string
  /** Predefined size */
  size?: 'sm' | 'md' | 'lg'
  /** Background color override (hex) */
  color?: string
}

withDefaults(defineProps<AvatarProps>(), {
  size: 'md',
  color: '#2E3A2A',
})

const sizeClasses = {
  sm: 'w-[22px] h-[22px] text-[9px]',
  md: 'w-[28px] h-[28px] text-[10px]',
  lg: 'w-[36px] h-[36px] text-sm',
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
