<script setup lang="ts">
/**
 * Command palette — a search box and grouped, selectable items.
 * The host controls the query via v-model and listens to @select.
 *
 * @example
 * <PCommand v-model="query" :groups="groups" @select="run" />
 */
import { computed, type Component } from 'vue'
import { Search } from 'lucide-vue-next'

export interface CommandItem {
  id: string
  label: string
  hint?: string
  icon?: Component
}
export interface CommandGroup {
  heading: string
  items: CommandItem[]
}

export interface CommandProps {
  /** Search query (v-model:modelValue) */
  modelValue: string
  groups: CommandGroup[]
  /** Placeholder for the search input */
  placeholder?: string
  /** Text shown when no item matches the query */
  emptyLabel?: string
}

const props = withDefaults(defineProps<CommandProps>(), {
  placeholder: 'Search…',
  emptyLabel: 'No results',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'select', id: string): void
}>()

const filtered = computed(() => {
  const q = props.modelValue.trim().toLowerCase()
  if (!q) return props.groups
  return props.groups
    .map((g) => ({ ...g, items: g.items.filter((i) => i.label.toLowerCase().includes(q)) }))
    .filter((g) => g.items.length > 0)
})

const total = computed(() => filtered.value.reduce((acc, g) => acc + g.items.length, 0))
</script>

<template>
  <div
    class="bg-surface border border-line rounded-xl shadow-modal w-full max-w-md overflow-hidden"
    role="combobox"
    aria-haspopup="listbox"
  >
    <div class="flex items-center gap-2 px-3 py-2 border-b border-line">
      <Search :size="14" :stroke-width="1.75" class="text-ink3" />
      <input
        :value="modelValue"
        :placeholder="placeholder"
        class="flex-1 bg-transparent outline-none text-sm text-ink"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
    <div class="max-h-80 overflow-auto py-1" role="listbox">
      <template v-if="total > 0">
        <div v-for="group in filtered" :key="group.heading" class="py-1">
          <div class="px-3 py-1 text-xs font-medium text-ink4 uppercase tracking-wider">
            {{ group.heading }}
          </div>
          <button
            v-for="item in group.items"
            :key="item.id"
            type="button"
            data-test="item"
            role="option"
            class="w-full flex items-center justify-between px-3 py-1.5 text-sm text-left text-ink2 hover:bg-hover"
            @click="emit('select', item.id)"
          >
            <span class="flex items-center gap-2">
              <component
                v-if="item.icon"
                :is="item.icon"
                :size="14"
                :stroke-width="1.75"
              />
              {{ item.label }}
            </span>
            <span v-if="item.hint" class="text-ink4 text-xs">{{ item.hint }}</span>
          </button>
        </div>
      </template>
      <div v-else class="px-3 py-6 text-center text-sm text-ink3">{{ emptyLabel }}</div>
    </div>
  </div>
</template>
