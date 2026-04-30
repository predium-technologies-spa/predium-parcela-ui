<script setup lang="ts">
/**
 * Numeric input with increment/decrement steppers.
 *
 * @example
 * <PNumberField v-model="qty" :min="0" :max="100" :step="1" />
 */
import { Minus, Plus } from 'lucide-vue-next'

export interface NumberFieldProps {
  modelValue: number
  /** Minimum allowed value */
  min?: number
  /** Maximum allowed value */
  max?: number
  /** Increment / decrement amount */
  step?: number
  /** Whether the field is disabled */
  disabled?: boolean
  /** Placeholder text when value is undefined */
  placeholder?: string
}

const props = withDefaults(defineProps<NumberFieldProps>(), {
  step: 1,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

function clamp(v: number) {
  let next = v
  if (props.max !== undefined) next = Math.min(next, props.max)
  if (props.min !== undefined) next = Math.max(next, props.min)
  return next
}

function increment() {
  emit('update:modelValue', clamp((props.modelValue ?? 0) + (props.step ?? 1)))
}
function decrement() {
  emit('update:modelValue', clamp((props.modelValue ?? 0) - (props.step ?? 1)))
}
function onInput(e: Event) {
  const v = Number((e.target as HTMLInputElement).value)
  emit('update:modelValue', clamp(Number.isNaN(v) ? 0 : v))
}
</script>

<template>
  <div
    :class="[
      'inline-flex items-stretch border border-line rounded-lg bg-surface overflow-hidden',
      disabled && 'opacity-40 pointer-events-none',
    ]"
  >
    <button
      type="button"
      data-test="dec"
      :disabled="disabled"
      class="px-2 hover:bg-hover focus-visible:outline-2 focus-visible:outline-accent"
      aria-label="Decrement"
      @click="decrement"
    >
      <Minus :size="14" :stroke-width="1.75" />
    </button>
    <input
      type="number"
      :value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-20 px-2 text-center bg-transparent outline-none text-ink"
      @input="onInput"
    />
    <button
      type="button"
      data-test="inc"
      :disabled="disabled"
      class="px-2 hover:bg-hover focus-visible:outline-2 focus-visible:outline-accent"
      aria-label="Increment"
      @click="increment"
    >
      <Plus :size="14" :stroke-width="1.75" />
    </button>
  </div>
</template>
