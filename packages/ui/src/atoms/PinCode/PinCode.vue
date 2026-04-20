<script setup lang="ts">
/**
 * PIN / OTP code input — row of individual digit fields with auto-advance.
 *
 * @example
 * <PPinCode v-model="code" :length="4" />
 * <PPinCode v-model="otp" :length="6" mask />
 */
import { ref, watch, nextTick } from 'vue'

export interface PinCodeProps {
  /** Current value (v-model) */
  modelValue?: string
  /** Number of digit fields */
  length?: number
  /** Mask input as password dots */
  mask?: boolean
  /** Whether the input is disabled */
  disabled?: boolean
  /** Error state */
  error?: boolean
  /** Size variant */
  size?: 'sm' | 'md'
}

const props = withDefaults(defineProps<PinCodeProps>(), {
  modelValue: '',
  length: 4,
  mask: false,
  disabled: false,
  error: false,
  size: 'md',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  complete: [value: string]
}>()

const inputs = ref<HTMLInputElement[]>([])

function getDigits(): string[] {
  const chars = props.modelValue.split('')
  return Array.from({ length: props.length }, (_, i) => chars[i] ?? '')
}

function setRef(el: any, i: number) {
  if (el) inputs.value[i] = el as HTMLInputElement
}

function focusAt(index: number) {
  nextTick(() => {
    inputs.value[index]?.focus()
  })
}

function handleInput(index: number, event: Event) {
  const target = event.target as HTMLInputElement
  const char = target.value.slice(-1)

  const digits = getDigits()
  digits[index] = char
  const joined = digits.join('')
  emit('update:modelValue', joined)

  if (char && index < props.length - 1) {
    focusAt(index + 1)
  }

  if (joined.length === props.length && !joined.includes('')) {
    emit('complete', joined)
  }
}

function handleKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace') {
    const digits = getDigits()
    if (!digits[index] && index > 0) {
      event.preventDefault()
      digits[index - 1] = ''
      emit('update:modelValue', digits.join(''))
      focusAt(index - 1)
    }
  }
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault()
  const pasted = (event.clipboardData?.getData('text') ?? '').slice(0, props.length)
  emit('update:modelValue', pasted)
  const nextIndex = Math.min(pasted.length, props.length - 1)
  focusAt(nextIndex)

  if (pasted.length === props.length) {
    emit('complete', pasted)
  }
}
</script>

<template>
  <div class="inline-flex gap-2">
    <input
      v-for="(_, i) in length"
      :key="i"
      :ref="(el) => setRef(el, i)"
      :type="mask ? 'password' : 'text'"
      maxlength="1"
      inputmode="numeric"
      autocomplete="one-time-code"
      :value="getDigits()[i]"
      :disabled="disabled"
      :class="[
        'p-pin-digit text-center font-semibold outline-none bg-surface transition-all duration-150',
        size === 'sm' && 'w-10 h-10 text-lg rounded-xl',
        size === 'md' && 'w-12 h-12 text-xl rounded-xl',
        error && 'is-error',
        disabled && 'is-disabled opacity-50 bg-chip-bg cursor-not-allowed',
      ]"
      @input="handleInput(i, $event)"
      @keydown="handleKeydown(i, $event)"
      @paste="handlePaste"
    />
  </div>
</template>

<style scoped>
.p-pin-digit {
  border: 1px solid var(--color-line-soft);
}
.p-pin-digit:hover:not(.is-disabled) {
  border-color: var(--color-line);
}
.p-pin-digit:focus:not(.is-disabled) {
  border-color: var(--color-accent);
}
.p-pin-digit.is-error {
  border-color: var(--color-danger);
}
.p-pin-digit.is-error:focus {
  border-color: var(--color-danger);
}
</style>
