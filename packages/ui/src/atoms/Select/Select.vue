<script setup lang="ts">
/**
 * Custom styled select dropdown — Tailwind Forms aesthetic.
 *
 * @example
 * <PSelect v-model="type" placeholder="Select type" :options="['Multifamily', 'Retail']" />
 */
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ChevronDown, Check } from 'lucide-vue-next'

export interface SelectProps {
  /** Selected value (v-model) */
  modelValue?: string
  /** Placeholder text when no value */
  placeholder?: string
  /** Option list */
  options?: string[]
  /** Whether the select is disabled */
  disabled?: boolean
  /** Error state */
  error?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: '',
  placeholder: 'Select…',
  options: () => [],
  disabled: false,
  error: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const triggerRef = ref<HTMLElement>()
const listRef = ref<HTMLElement>()

function toggle() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
}

function select(opt: string) {
  emit('update:modelValue', opt)
  isOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (
    triggerRef.value &&
    !triggerRef.value.contains(e.target as Node) &&
    listRef.value &&
    !listRef.value.contains(e.target as Node)
  ) {
    isOpen.value = false
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') isOpen.value = false
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
  <div class="relative">
    <!-- Trigger -->
    <button
      ref="triggerRef"
      type="button"
      role="combobox"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :disabled="disabled"
      :class="[
        'w-full flex items-center justify-between bg-surface border border-line-soft rounded-xl cursor-pointer transition-all duration-150',
        // Size
        size === 'sm' && 'px-2.5 h-8 text-sm',
        size === 'md' && 'px-3 h-10 text-base',
        size === 'lg' && 'px-3.5 h-12 text-md',
        // State
        error
          ? 'border-danger'
          : isOpen
            ? 'border-accent'
            : 'hover:border-line',
        disabled && 'opacity-50 cursor-not-allowed bg-chip-bg',
      ]"
      @click="toggle"
    >
      <span :class="modelValue ? 'text-ink' : 'text-ink4'" class="truncate">
        {{ modelValue || placeholder }}
      </span>
      <ChevronDown
        :size="size === 'sm' ? 14 : 16"
        :class="[
          'text-ink4 transition-transform duration-200 shrink-0 ml-2',
          isOpen && 'rotate-180',
        ]"
        aria-hidden="true"
      />
    </button>

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
        ref="listRef"
        role="listbox"
        :aria-label="placeholder"
        class="absolute z-50 mt-1.5 w-full bg-surface border border-line rounded-xl shadow-lg overflow-auto max-h-[280px] py-1"
      >
        <li
          v-for="opt in options"
          :key="opt"
          role="option"
          :aria-selected="modelValue === opt"
          :class="[
            'flex items-center justify-between px-3 py-2 text-base cursor-pointer transition-colors',
            modelValue === opt
              ? 'bg-accent-bg text-accent font-medium'
              : 'text-ink2 hover:bg-hover',
          ]"
          @click="select(opt)"
        >
          <span>{{ opt }}</span>
          <Check
            v-if="modelValue === opt"
            :size="14"
            class="text-accent shrink-0"
            aria-hidden="true"
          />
        </li>
        <li v-if="options.length === 0" class="px-3 py-2 text-base text-ink4">
          No options
        </li>
      </ul>
    </Transition>
  </div>
</template>
