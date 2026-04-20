<script setup lang="ts">
/**
 * Selectable tile card with icon, title, and description slots.
 *
 * @example
 * <PTile :selected="choice === 'a'" @click="choice = 'a'">Option A</PTile>
 */
export interface TileProps {
  /** Selected state */
  selected?: boolean
  /** Whether the tile is disabled */
  disabled?: boolean
  /** Vertical alignment of content */
  align?: 'top' | 'center'
}

withDefaults(defineProps<TileProps>(), {
  selected: false,
  disabled: false,
  align: 'center',
})

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    type="button"
    :disabled="disabled"
    :class="[
      'p-tile relative flex flex-col w-full rounded-xl p-5 text-left transition-all duration-150 cursor-pointer',
      selected ? 'is-selected' : '',
      disabled && 'is-disabled opacity-50 cursor-not-allowed',
      align === 'center' && 'items-center text-center',
      align === 'top' && 'items-start text-left',
    ]"
    @click="$emit('click')"
  >
    <!-- Selected checkmark -->
    <span
      v-if="selected"
      class="absolute top-3 right-3 w-5 h-5 rounded-full bg-accent flex items-center justify-center"
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        class="text-white"
      >
        <path
          d="M2.5 6L5 8.5L9.5 4"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <!-- Icon slot -->
    <div v-if="$slots.icon" class="mb-3 text-ink3">
      <slot name="icon" />
    </div>
    <!-- Title (default slot) -->
    <div class="text-base font-semibold text-ink">
      <slot />
    </div>
    <!-- Description slot -->
    <div v-if="$slots.description" class="text-sm text-ink3 mt-1">
      <slot name="description" />
    </div>
  </button>
</template>

<style scoped>
.p-tile {
  border: 1px solid var(--color-line-soft);
}
.p-tile:hover:not(.is-disabled) {
  border-color: var(--color-line);
}
.p-tile.is-selected {
  border-color: var(--color-accent);
}
.p-tile.is-disabled {
  pointer-events: none;
}
</style>
