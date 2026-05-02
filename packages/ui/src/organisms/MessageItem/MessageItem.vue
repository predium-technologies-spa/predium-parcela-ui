<script setup lang="ts">
/**
 * Message list item with sender, preview, time, and a leading visual.
 *
 * The leading visual has three flexibility layers:
 *
 *   1. Default — initials avatar derived from `from`
 *   2. Icon mode — pass `icon` (a Component) and optional `iconColor` to render
 *      a contained icon tile instead of an avatar. No slot needed.
 *   3. Slot override — use `#leading` to render anything custom (image,
 *      animation, custom badge, etc.).
 *
 * The trailing area is similarly slot-friendly via `#trailing` (default: an
 * unread dot when `unread` is true).
 *
 * @example simple
 * <PMessageItem from="K. Rivera" unit="4B · Harper Hall" preview="…" time="08:42" unread />
 *
 * @example with icon
 * <PMessageItem
 *   from="Plumbing — Unit 3A"
 *   unit="Linden Court"
 *   preview="Leaking sink"
 *   time="3h"
 *   :icon="Droplet"
 *   icon-color="var(--color-danger)"
 * />
 *
 * @example with custom leading
 * <PMessageItem from="…" preview="…" time="…">
 *   <template #leading><img src="…" /></template>
 * </PMessageItem>
 */
import type { Component } from 'vue'
import { computed } from 'vue'
import { PAvatar } from '../../atoms/Avatar'

export interface MessageItemProps {
  /** Sender name. Used as the title and (when no avatar override) to derive initials. */
  from: string
  /** Optional context line under the title (e.g., property/unit). */
  unit?: string
  /** Body / preview text (truncated to one line). */
  preview: string
  /** Timestamp text. */
  time: string
  /** Visual unread state (bold title + colored dot). */
  unread?: boolean
  /**
   * Lucide-style icon component. When provided, the leading visual renders
   * as an icon tile instead of an avatar — no slot needed.
   */
  icon?: Component
  /** CSS color value for the icon stroke. Falls back to inherited ink color. */
  iconColor?: string
  /** Override the auto-derived initials shown in the default avatar. */
  avatarInitials?: string
  /** Override the avatar background. */
  avatarColor?: string
  /** Tile size for both icon and avatar (defaults to `md`). */
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<MessageItemProps>(), {
  unread: false,
  size: 'md',
})

const sizeClass = computed(() => {
  if (props.size === 'sm') return 'h-7 w-7'
  if (props.size === 'lg') return 'h-10 w-10'
  return 'h-9 w-9'
})

const derivedInitials = computed(() =>
  props.from
    .split(/[ .]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join(''),
)
</script>

<template>
  <div
    :class="[
      'flex gap-2.5 px-3 sm:px-3.5 py-2.5 border-b border-line-soft min-h-[44px]',
      unread ? 'bg-hover' : 'bg-transparent',
    ]"
  >
    <!-- Leading visual: explicit slot beats icon prop beats avatar default -->
    <slot name="leading">
      <div
        v-if="icon"
        :class="['shrink-0 flex items-center justify-center rounded-lg', sizeClass]"
        :style="{
          background: avatarColor ?? 'var(--color-chip-bg, var(--color-line))',
          color: iconColor ?? 'inherit',
        }"
        aria-hidden="true"
      >
        <component :is="icon" class="h-4 w-4" />
      </div>
      <PAvatar
        v-else
        :initials="avatarInitials ?? derivedInitials"
        :size="size"
        :color="avatarColor ?? 'var(--color-chip-bg)'"
      />
    </slot>

    <div class="flex-1 min-w-0">
      <div class="flex justify-between">
        <span :class="['text-base text-ink truncate', unread ? 'font-semibold' : 'font-medium']">
          {{ from }}
        </span>
        <span v-if="time" class="font-mono text-xs text-ink4 shrink-0 ml-2">{{ time }}</span>
      </div>
      <div v-if="unit" class="text-sm text-ink3 truncate">{{ unit }}</div>
      <div v-if="preview" class="text-base text-ink2 mt-0.5 truncate">{{ preview }}</div>
    </div>

    <!-- Trailing: slot beats unread dot -->
    <slot name="trailing">
      <div v-if="unread" class="w-1.5 h-1.5 rounded-full bg-info mt-1.5 shrink-0" />
    </slot>
  </div>
</template>
