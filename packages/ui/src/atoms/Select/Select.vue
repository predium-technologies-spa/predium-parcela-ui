<script setup lang="ts">
/**
 * Custom styled select dropdown — clean, soft borders.
 *
 * @example
 * <PSelect v-model="type" placeholder="Select type" :options="['Multifamily', 'Retail']" />
 * <PSelect
 *   v-model="status"
 *   :options="[
 *     { value: 'ACTIVE', label: 'Active' },
 *     { value: 'PAUSED', label: 'Paused' },
 *   ]"
 * />
 */
import { computed, nextTick, ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { ChevronDown, Check } from 'lucide-vue-next'

export interface SelectOption {
  /** The value stored in modelValue when this option is picked */
  value: string
  /** The user-facing label rendered in the trigger and dropdown */
  label: string
  /** Whether this individual option is disabled */
  disabled?: boolean
}

export interface SelectProps {
  /** Selected value (v-model) */
  modelValue?: string
  /** Placeholder text when no value */
  placeholder?: string
  /**
   * Option list. Either an array of strings (where the option is both the
   * stored value and the label) or an array of `{ value, label }` objects
   * for distinct values and labels.
   */
  options?: ReadonlyArray<string | SelectOption>
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

// Floating dropdown coords (Teleport to body to escape overflow/scroll containers)
const dropdownTop = ref(0)
const dropdownBottom = ref(0)
const dropdownLeft = ref(0)
const dropdownWidth = ref(0)
const dropdownDirection = ref<'down' | 'up'>('down')

const dropdownStyle = computed(() => ({
  top: dropdownDirection.value === 'down' ? `${dropdownTop.value}px` : 'auto',
  bottom: dropdownDirection.value === 'up' ? `${dropdownBottom.value}px` : 'auto',
  left: `${dropdownLeft.value}px`,
  width: `${dropdownWidth.value}px`,
}))

function updateDropdownPosition() {
  const trigger = triggerRef.value
  if (!trigger) return
  const rect = trigger.getBoundingClientRect()
  const spaceBelow = window.innerHeight - rect.bottom
  const dropdownMaxHeight = 280
  const wantUp = spaceBelow < dropdownMaxHeight + 16 && rect.top > spaceBelow
  dropdownDirection.value = wantUp ? 'up' : 'down'
  dropdownLeft.value = rect.left + window.scrollX
  dropdownWidth.value = rect.width
  if (wantUp) {
    dropdownBottom.value = window.innerHeight - rect.top + 6
  } else {
    dropdownTop.value = rect.bottom + window.scrollY + 6
  }
}

const normalizedOptions = computed<SelectOption[]>(() =>
  props.options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt,
  ),
)

const selectedLabel = computed(() => {
  const match = normalizedOptions.value.find((o) => o.value === props.modelValue)
  return match?.label ?? props.modelValue
})

function toggle() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    // Position is calculated AFTER opening so the dropdown can render at the right place
    nextTick(updateDropdownPosition)
  }
}

watch(isOpen, (open) => {
  if (open) {
    window.addEventListener('scroll', updateDropdownPosition, true)
    window.addEventListener('resize', updateDropdownPosition)
  } else {
    window.removeEventListener('scroll', updateDropdownPosition, true)
    window.removeEventListener('resize', updateDropdownPosition)
  }
})

function select(opt: SelectOption) {
  if (opt.disabled) return
  emit('update:modelValue', opt.value)
  isOpen.value = false
}

function handleClickOutside(e: MouseEvent) {
  if (
    triggerRef.value && !triggerRef.value.contains(e.target as Node) &&
    listRef.value && !listRef.value.contains(e.target as Node)
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
  window.removeEventListener('scroll', updateDropdownPosition, true)
  window.removeEventListener('resize', updateDropdownPosition)
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
        'p-select w-full flex items-center justify-between bg-surface rounded-xl cursor-pointer transition-all duration-150',
        size === 'sm' && 'px-2.5 h-8 text-sm',
        size === 'md' && 'px-3 h-10 text-base',
        size === 'lg' && 'px-3.5 h-12 text-md',
        isOpen && 'is-open',
        error && 'is-error',
        disabled && 'is-disabled opacity-50 cursor-not-allowed bg-chip-bg',
      ]"
      @click="toggle"
    >
      <span :class="modelValue ? 'text-ink' : 'text-ink4'" class="truncate">
        {{ modelValue ? selectedLabel : placeholder }}
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

    <!-- Dropdown (teleported to body to escape parent overflow/z-index stacking contexts) -->
    <Teleport to="body">
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
        class="p-select-dropdown fixed z-[1000] bg-surface rounded-xl shadow-lg overflow-auto max-h-[280px] py-1"
        :style="dropdownStyle"
      >
        <li
          v-for="opt in normalizedOptions"
          :key="opt.value"
          role="option"
          :aria-selected="modelValue === opt.value"
          :aria-disabled="opt.disabled || undefined"
          :class="[
            'flex items-center justify-between px-3 py-2 text-base transition-colors',
            opt.disabled && 'opacity-50 cursor-not-allowed',
            !opt.disabled && 'cursor-pointer',
            modelValue === opt.value
              ? 'bg-accent-bg text-accent font-medium'
              : !opt.disabled && 'text-ink2 hover:bg-hover',
          ]"
          @click="select(opt)"
        >
          <span>{{ opt.label }}</span>
          <Check
            v-if="modelValue === opt.value"
            :size="14"
            class="text-accent shrink-0"
            aria-hidden="true"
          />
        </li>
        <li v-if="normalizedOptions.length === 0" class="px-3 py-2 text-base text-ink4">
          No options
        </li>
      </ul>
    </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.p-select {
  border: 1px solid var(--color-line-soft);
}
.p-select:hover:not(.is-disabled) {
  border-color: var(--color-line);
}
.p-select.is-open {
  border-color: var(--color-accent);
}
.p-select.is-error {
  border-color: var(--color-danger);
}
.p-select-dropdown {
  border: 1px solid var(--color-line-soft);
}
</style>
