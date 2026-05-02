<script setup lang="ts">
/**
 * Message list item with avatar, sender, preview, and unread indicator.
 *
 * Use the optional `leading` slot to replace the default initials avatar
 * with custom content (e.g., an icon).
 *
 * @example
 * <PMessageItem from="K. Rivera" unit="4B · Harper Hall" preview="Sorry for delay…" time="08:42" unread />
 *
 * @example with custom leading icon
 * <PMessageItem from="HVAC repair" preview="No heat" time="2h">
 *   <template #leading><Zap /></template>
 * </PMessageItem>
 */
import { PAvatar } from '../../atoms/Avatar'

export interface MessageItemProps {
  /** Sender name */
  from: string
  /** Unit/context label */
  unit?: string
  /** Message preview text */
  preview: string
  /** Timestamp */
  time: string
  /** Unread state */
  unread?: boolean
}

withDefaults(defineProps<MessageItemProps>(), {
  unread: false,
})
</script>

<template>
  <div
    :class="[
      'flex gap-2.5 px-3 sm:px-3.5 py-2.5 border-b border-line-soft min-h-[44px]',
      unread ? 'bg-hover' : 'bg-transparent',
    ]"
  >
    <slot name="leading">
      <PAvatar
        :initials="from.split(/[ .]/).filter(Boolean).slice(0, 2).map(s => s[0]).join('')"
        size="md"
        color="var(--color-chip-bg)"
      />
    </slot>
    <div class="flex-1 min-w-0">
      <div class="flex justify-between">
        <span :class="['text-base text-ink', unread ? 'font-semibold' : 'font-medium']">
          {{ from }}
        </span>
        <span class="font-mono text-xs text-ink4">{{ time }}</span>
      </div>
      <div v-if="unit" class="text-sm text-ink3">{{ unit }}</div>
      <div class="text-base text-ink2 mt-0.5 truncate">{{ preview }}</div>
    </div>
    <div v-if="unread" class="w-1.5 h-1.5 rounded-full bg-info mt-1.5 shrink-0" />
  </div>
</template>
