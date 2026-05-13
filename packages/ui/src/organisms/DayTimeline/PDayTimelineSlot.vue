<script setup lang="ts">
import type { TimelineSlot } from './types'

defineProps<{
  slot: TimelineSlot
}>()

defineEmits<{
  slotClick: [hour: number, time: string]
}>()
</script>

<template>
  <div class="flex border-b border-line-soft min-h-[60px]">
    <!-- Hour label column -->
    <div class="w-16 shrink-0 px-2 pt-1 text-[11px] text-ink3 font-sans select-none border-r border-line-soft">
      {{ slot.label }}
    </div>
    <!-- Clickable slot area -->
    <div
      class="flex-1 relative hover:bg-hover/40 transition-colors cursor-pointer"
      @click="$emit('slotClick', slot.hour, slot.time)"
    >
      <slot />
    </div>
  </div>
</template>
