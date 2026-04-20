<script setup lang="ts">
/**
 * Searchable combobox with filterable dropdown options.
 *
 * @example
 * <PCombobox v-model="type" :options="propertyTypes" placeholder="Search type..." />
 * <PCombobox v-model="city" :options="cities" :loading="fetching" @search="onSearch" />
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Search, Check } from 'lucide-vue-next'

export interface ComboboxOption {
  label: string
  value: string
}

export interface ComboboxProps {
  /** Selected value (v-model) */
  modelValue?: string
  /** Available options */
  options?: ComboboxOption[]
  /** Placeholder text */
  placeholder?: string
  /** Whether the combobox is disabled */
  disabled?: boolean
  /** Loading state */
  loading?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<ComboboxProps>(), {
  modelValue: '',
  options: () => [],
  placeholder: 'Search...',
  disabled: false,
  loading: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [query: string]
}>()

const isOpen = ref(false)
const query = ref('')
const containerRef = ref<HTMLElement>()
const inputRef = ref<HTMLInputElement>()

const selectedLabel = computed(() => {
  const found = props.options.find((o) => o.value === props.modelValue)
  return found?.label ?? ''
})

const filteredOptions = computed(() => {
  if (!query.value) return props.options
  const q = query.value.toLowerCase()
  return props.options.filter((o) => o.label.toLowerCase().includes(q))
})

function onInputFocus() {
  if (props.disabled) return
  isOpen.value = true
  query.value = ''
}

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  query.value = val
  emit('search', val)
  if (!isOpen.value) isOpen.value = true
}

function selectOption(opt: ComboboxOption) {
  emit('update:modelValue', opt.value)
  query.value = ''
  isOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    isOpen.value = false
    query.value = ''
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    isOpen.value = false
    query.value = ''
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div ref="containerRef" class="relative">
    <!-- Input -->
    <div
      :class="[
        'p-combobox group flex items-center bg-surface rounded-xl transition-all duration-150',
        size === 'sm' && 'gap-1.5 px-2.5 h-8 text-sm',
        size === 'md' && 'gap-2 px-3 h-10 text-base',
        size === 'lg' && 'gap-2.5 px-3.5 h-12 text-md',
        isOpen && 'is-open',
        disabled && 'is-disabled opacity-50 cursor-not-allowed bg-chip-bg',
      ]"
    >
      <Search
        :size="size === 'sm' ? 14 : size === 'lg' ? 18 : 16"
        :stroke-width="1.5"
        class="text-ink4 group-focus-within:text-ink3 shrink-0 transition-colors"
        aria-hidden="true"
      />
      <input
        ref="inputRef"
        type="text"
        :value="isOpen ? query : selectedLabel"
        :placeholder="selectedLabel || placeholder"
        :disabled="disabled"
        class="flex-1 min-w-0 bg-transparent outline-none text-ink placeholder:text-ink4"
        role="combobox"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        autocomplete="off"
        @focus="onInputFocus"
        @input="onInput"
      />
    </div>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <ul
        v-if="isOpen"
        role="listbox"
        class="p-combobox-dropdown absolute z-50 mt-1.5 w-full bg-surface rounded-xl shadow-lg max-h-60 overflow-auto py-1"
      >
        <!-- Loading -->
        <li v-if="loading" class="flex items-center gap-2 px-3 py-2 text-base text-ink4">
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            class="animate-spin text-ink4" aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" opacity="0.2" />
            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          Searching...
        </li>

        <!-- Options -->
        <template v-else>
          <li
            v-for="opt in filteredOptions"
            :key="opt.value"
            role="option"
            :aria-selected="modelValue === opt.value"
            :class="[
              'flex items-center justify-between px-3 py-2 text-base cursor-pointer transition-colors',
              modelValue === opt.value
                ? 'bg-accent-bg text-accent font-medium'
                : 'text-ink2 hover:bg-hover',
            ]"
            @click="selectOption(opt)"
          >
            <span>{{ opt.label }}</span>
            <Check
              v-if="modelValue === opt.value"
              :size="14"
              class="text-accent shrink-0"
              aria-hidden="true"
            />
          </li>
          <li v-if="filteredOptions.length === 0" class="px-3 py-2 text-base text-ink4">
            No results
          </li>
        </template>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.p-combobox {
  border: 1px solid var(--color-line-soft);
}
.p-combobox:hover:not(.is-disabled) {
  border-color: var(--color-line);
}
.p-combobox.is-open {
  border-color: var(--color-accent);
}
.p-combobox-dropdown {
  border: 1px solid var(--color-line-soft);
}
</style>
