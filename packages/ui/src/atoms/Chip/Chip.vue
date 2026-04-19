<script setup lang="ts">
/**
 * Removable chip / tag.
 *
 * @example
 * <PChip removable @remove="handleRemove">core</PChip>
 * <PChip>section8-eligible</PChip>
 */
import { X } from 'lucide-vue-next'

export interface ChipProps {
  /** Show remove button */
  removable?: boolean
  /** Whether the chip is disabled */
  disabled?: boolean
}

withDefaults(defineProps<ChipProps>(), {
  removable: false,
  disabled: false,
})

defineEmits<{
  remove: []
}>()
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1 bg-chip-bg text-ink2 px-2 py-0.5 rounded-md text-sm',
      disabled && 'opacity-40 pointer-events-none',
    ]"
  >
    <slot />
    <button
      v-if="removable"
      type="button"
      aria-label="Remove"
      class="text-ink4 hover:text-ink2 transition-colors"
      @click="$emit('remove')"
    >
      <X :size="10" :stroke-width="1.5" />
    </button>
  </span>
</template>
