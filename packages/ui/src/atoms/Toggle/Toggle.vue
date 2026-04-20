<script setup lang="ts">
/**
 * Toggle switch with optional label and description.
 *
 * @example
 * <PToggle v-model="active" label="Notifications" />
 * <PToggle v-model="dark" label="Dark mode" description="Switch the UI theme" />
 */
export interface ToggleProps {
  /** Checked state (v-model) */
  modelValue?: boolean
  /** Toggle label */
  label?: string
  /** Description text below the label */
  description?: string
  /** Whether the toggle is disabled */
  disabled?: boolean
  /** Size variant */
  size?: 'sm' | 'md'
}

withDefaults(defineProps<ToggleProps>(), {
  modelValue: false,
  disabled: false,
  size: 'md',
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <label
    :class="[
      'inline-flex items-start gap-3 select-none',
      disabled ? 'opacity-40 pointer-events-none' : 'cursor-pointer',
    ]"
  >
    <button
      type="button"
      role="switch"
      :aria-checked="modelValue"
      :disabled="disabled"
      :class="[
        'relative shrink-0 rounded-full transition-all duration-200 cursor-pointer',
        size === 'sm' && 'h-[22px] w-[40px]',
        size === 'md' && 'h-[26px] w-[48px]',
        modelValue ? 'bg-accent' : 'bg-chip-bg',
      ]"
      @click="$emit('update:modelValue', !modelValue)"
    >
      <span
        :class="[
          'absolute top-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm transition-all duration-200',
          size === 'sm' && 'h-[14px] w-[14px]',
          size === 'md' && 'h-[18px] w-[18px]',
          size === 'sm' && (modelValue ? 'left-[22px]' : 'left-[4px]'),
          size === 'md' && (modelValue ? 'left-[26px]' : 'left-[4px]'),
        ]"
      />
    </button>
    <div v-if="label || description" class="flex flex-col">
      <span v-if="label" class="text-base font-medium text-ink">{{ label }}</span>
      <span v-if="description" class="text-sm text-ink3">{{ description }}</span>
    </div>
  </label>
</template>
