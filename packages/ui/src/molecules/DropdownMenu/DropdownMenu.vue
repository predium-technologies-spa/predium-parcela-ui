<script setup lang="ts">
/**
 * Dropdown menu — a trigger slot opens a panel with selectable items.
 * Closes on outside click or item select. Items can be separators or
 * marked as `danger` (destructive).
 *
 * @example
 * <PDropdownMenu :items="items" @select="onSelect">
 *   <template #trigger><PButton variant="ghost">⋯</PButton></template>
 * </PDropdownMenu>
 */
import { ref, onMounted, onUnmounted, type Component } from 'vue'

export type DropdownMenuItem =
  | { id: string; label: string; icon?: Component; danger?: boolean; separator?: false }
  | { id: string; separator: true; label?: never; icon?: never; danger?: never }

export interface DropdownMenuProps {
  items: DropdownMenuItem[]
  /** Panel alignment relative to trigger */
  align?: 'start' | 'end'
}

withDefaults(defineProps<DropdownMenuProps>(), { align: 'start' })

const emit = defineEmits<{
  (e: 'select', id: string): void
}>()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

function toggle() {
  open.value = !open.value
}
function close() {
  open.value = false
}
function pick(id: string) {
  emit('select', id)
  close()
}
function onDocClick(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) close()
}

onMounted(() => document.addEventListener('mousedown', onDocClick))
onUnmounted(() => document.removeEventListener('mousedown', onDocClick))
</script>

<template>
  <div ref="root" class="relative inline-block">
    <div @click="toggle"><slot name="trigger" /></div>
    <div
      v-if="open"
      role="menu"
      :class="[
        'absolute mt-1 min-w-[180px] z-50 bg-surface border border-line rounded-lg shadow-modal py-1',
        align === 'end' ? 'right-0' : 'left-0',
      ]"
    >
      <template v-for="item in items" :key="item.id">
        <div v-if="item.separator" class="my-1 h-px bg-line" />
        <button
          v-else
          type="button"
          role="menuitem"
          data-test="item"
          :class="[
            'w-full flex items-center gap-2 px-3 py-1.5 text-sm text-left hover:bg-hover',
            item.danger ? 'text-danger' : 'text-ink2',
          ]"
          @click="pick(item.id)"
        >
          <component v-if="item.icon" :is="item.icon" :size="14" :stroke-width="1.75" />
          <span>{{ item.label }}</span>
        </button>
      </template>
    </div>
  </div>
</template>
