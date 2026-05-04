<script setup lang="ts">
/**
 * Phone input with country code selector.
 *
 * @example
 * <PPhoneInput v-model="phone" country-code="+1" />
 * <PPhoneInput v-model="phone" country-code="+52" size="lg" />
 */

export interface PhoneInputProps {
  /** Phone number value (v-model) */
  modelValue?: string
  /** Country dial code */
  countryCode?: string
  /** Whether the input is disabled */
  disabled?: boolean
  /** Error state */
  error?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<PhoneInputProps>(), {
  modelValue: '',
  countryCode: '+1',
  disabled: false,
  error: false,
  size: 'md',
})

defineEmits<{
  'update:modelValue': [value: string]
  'update:countryCode': [value: string]
}>()

const countryCodes = [
  { label: '🇺🇸 +1', value: '+1' },
  { label: '🇲🇽 +52', value: '+52' },
  { label: '🇬🇧 +44', value: '+44' },
  { label: '🇩🇪 +49', value: '+49' },
  { label: '🇨🇱 +56', value: '+56' },
  { label: '🇦🇷 +54', value: '+54' },
  { label: '🇨🇴 +57', value: '+57' },
  { label: '🇵🇪 +51', value: '+51' },
]
</script>

<template>
  <div
    :class="[
      'p-phone-input group flex items-center bg-surface rounded-xl transition-all duration-150',
      size === 'sm' && 'h-8 text-sm',
      size === 'md' && 'h-10 text-base',
      size === 'lg' && 'h-12 text-md',
      error && 'is-error',
      disabled && 'is-disabled opacity-50 cursor-not-allowed bg-chip-bg',
    ]"
  >
    <select
      :value="countryCode"
      :disabled="disabled"
      :class="[
        'bg-transparent outline-none text-ink font-medium cursor-pointer appearance-none border-r shrink-0',
        size === 'sm' && 'pl-2 pr-1.5 text-sm',
        size === 'md' && 'pl-3 pr-2 text-base',
        size === 'lg' && 'pl-3.5 pr-2.5 text-md',
        disabled && 'cursor-not-allowed',
      ]"
      style="border-color: var(--color-line-soft)"
      @change="$emit('update:countryCode', ($event.target as HTMLSelectElement).value)"
    >
      <option
        v-for="c in countryCodes"
        :key="c.value"
        :value="c.value"
      >
        {{ c.label }}
      </option>
    </select>
    <input
      type="tel"
      :value="modelValue"
      :disabled="disabled"
      placeholder="(555) 123-4567"
      :class="[
        'flex-1 min-w-0 bg-transparent outline-none text-ink placeholder:text-ink4',
        size === 'sm' && 'px-2 text-sm',
        size === 'md' && 'px-3 text-base',
        size === 'lg' && 'px-3.5 text-md',
      ]"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

<style scoped>
.p-phone-input {
  border: 1px solid var(--color-line-soft);
}
.p-phone-input:hover:not(.is-disabled) {
  border-color: var(--color-line);
}
.p-phone-input:focus-within:not(.is-disabled) {
  border-color: var(--color-accent);
}
.p-phone-input.is-error {
  border-color: var(--color-danger);
}
.p-phone-input.is-error:focus-within {
  border-color: var(--color-danger);
}
</style>
