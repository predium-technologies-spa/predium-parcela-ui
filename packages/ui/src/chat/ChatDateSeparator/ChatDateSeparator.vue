<script setup lang="ts">
/**
 * Date divider between message groups.
 *
 * @example
 * <PChatDateSeparator label="HOY · 10:42" />
 */
export interface ChatDateSeparatorProps {
  /** Date/time label text */
  label: string
}

defineProps<ChatDateSeparatorProps>()
</script>

<template>
  <div class="flex items-center justify-center py-3">
    <span class="text-xs text-ink4 font-medium tracking-wide uppercase">{{ label }}</span>
  </div>
</template>
