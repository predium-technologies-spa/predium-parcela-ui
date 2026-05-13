<script setup lang="ts">
/**
 * Country phone input with flag selector and searchable country dropdown.
 *
 * @example
 * <PCountryPhoneInput v-model="phone" v-model:country-code="code" />
 * <PCountryPhoneInput v-model="phone" country-code="+56" size="lg" />
 */
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ChevronDown, Check } from 'lucide-vue-next'

export interface CountryPhoneInputProps {
  /** Phone number value (v-model) */
  modelValue?: string
  /** Country dial code (v-model:country-code) */
  countryCode?: string
  /** Whether the input is disabled */
  disabled?: boolean
  /** Error state */
  error?: boolean
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Placeholder for phone number */
  placeholder?: string
}

export interface CountryOption {
  code: string
  dialCode: string
  flag: string
  name: string
  nativeName?: string
}

const props = withDefaults(defineProps<CountryPhoneInputProps>(), {
  modelValue: '',
  countryCode: '+56',
  disabled: false,
  error: false,
  size: 'md',
  placeholder: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:countryCode': [value: string]
}>()

// Comprehensive country list with flags and dial codes
const countries: CountryOption[] = [
  { code: 'AR', dialCode: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: 'AU', dialCode: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: 'AT', dialCode: '+43', flag: '🇦🇹', name: 'Austria' },
  { code: 'BR', dialCode: '+55', flag: '🇧🇷', name: 'Brasil' },
  { code: 'CA', dialCode: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: 'CL', dialCode: '+56', flag: '🇨🇱', name: 'Chile' },
  { code: 'CN', dialCode: '+86', flag: '🇨🇳', name: 'China', nativeName: '中国' },
  { code: 'CO', dialCode: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: 'CR', dialCode: '+506', flag: '🇨🇷', name: 'Costa Rica' },
  { code: 'CU', dialCode: '+53', flag: '🇨🇺', name: 'Cuba' },
  { code: 'EC', dialCode: '+593', flag: '🇪🇨', name: 'Ecuador' },
  { code: 'SV', dialCode: '+503', flag: '🇸🇻', name: 'El Salvador' },
  { code: 'ES', dialCode: '+34', flag: '🇪🇸', name: 'España' },
  { code: 'US', dialCode: '+1', flag: '🇺🇸', name: 'United States' },
  { code: 'FR', dialCode: '+33', flag: '🇫🇷', name: 'France' },
  { code: 'DE', dialCode: '+49', flag: '🇩🇪', name: 'Deutschland' },
  { code: 'GT', dialCode: '+502', flag: '🇬🇹', name: 'Guatemala' },
  { code: 'HN', dialCode: '+504', flag: '🇭🇳', name: 'Honduras' },
  { code: 'IN', dialCode: '+91', flag: '🇮🇳', name: 'India', nativeName: 'भारत' },
  { code: 'IT', dialCode: '+39', flag: '🇮🇹', name: 'Italia' },
  { code: 'JP', dialCode: '+81', flag: '🇯🇵', name: 'Japan', nativeName: '日本' },
  { code: 'MX', dialCode: '+52', flag: '🇲🇽', name: 'México' },
  { code: 'NI', dialCode: '+505', flag: '🇳🇮', name: 'Nicaragua' },
  { code: 'PA', dialCode: '+507', flag: '🇵🇦', name: 'Panamá' },
  { code: 'PY', dialCode: '+595', flag: '🇵🇾', name: 'Paraguay' },
  { code: 'PE', dialCode: '+51', flag: '🇵🇪', name: 'Perú' },
  { code: 'PT', dialCode: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: 'DO', dialCode: '+1', flag: '🇩🇴', name: 'República Dominicana' },
  { code: 'GB', dialCode: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: 'UY', dialCode: '+598', flag: '🇺🇾', name: 'Uruguay' },
  { code: 'VE', dialCode: '+58', flag: '🇻🇪', name: 'Venezuela' },
].sort((a, b) => a.name.localeCompare(b.name))

const dropdownOpen = ref(false)
const searchQuery = ref('')
const containerRef = ref<HTMLElement>()

const selectedCountry = computed(
  () => countries.find((c) => c.dialCode === props.countryCode) ?? countries.find((c) => c.code === 'CL')!,
)

const filteredCountries = computed(() => {
  if (!searchQuery.value) return countries
  const q = searchQuery.value.toLowerCase()
  return countries.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.dialCode.includes(q) ||
      (c.nativeName && c.nativeName.toLowerCase().includes(q)),
  )
})

function toggleDropdown() {
  if (props.disabled) return
  dropdownOpen.value = !dropdownOpen.value
  if (dropdownOpen.value) {
    searchQuery.value = ''
  }
}

function selectCountry(country: CountryOption) {
  emit('update:countryCode', country.dialCode)
  dropdownOpen.value = false
  searchQuery.value = ''
}

function handleClickOutside(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    dropdownOpen.value = false
    searchQuery.value = ''
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    dropdownOpen.value = false
    searchQuery.value = ''
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

const sizeClasses = {
  sm: { container: 'h-8 text-sm', selectBtn: 'px-2 py-1 text-sm', input: 'px-2 text-sm', dropdown: 'text-sm' },
  md: { container: 'h-10 text-base', selectBtn: 'px-2.5 py-1.5 text-base', input: 'px-3 text-base', dropdown: 'text-base' },
  lg: { container: 'h-12 text-md', selectBtn: 'px-3 py-2 text-md', input: 'px-3.5 text-md', dropdown: 'text-md' },
}
</script>

<template>
  <div
    ref="containerRef"
    :class="[
      'p-country-phone-input group flex items-center bg-surface rounded-xl transition-all duration-150',
      sizeClasses[size].container,
      error && 'is-error',
      disabled && 'is-disabled opacity-50 cursor-not-allowed bg-chip-bg',
    ]"
  >
    <!-- Country Selector Button -->
    <button
      type="button"
      :disabled="disabled"
      :class="[
        'flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors rounded-l-xl',
        sizeClasses[size].selectBtn,
        disabled && 'cursor-not-allowed',
      ]"
      style="border-right: 1px solid var(--color-line-soft)"
      @click="toggleDropdown"
    >
      <span class="text-lg leading-none">{{ selectedCountry.flag }}</span>
      <ChevronDown
        :size="size === 'sm' ? 12 : size === 'lg' ? 14 : 13"
        :class="[
          'shrink-0 transition-transform duration-150',
          dropdownOpen ? 'rotate-180' : '',
          'text-ink4',
        ]"
        aria-hidden="true"
      />
    </button>

    <!-- Phone Number Input -->
    <div class="flex items-center flex-1 min-w-0">
      <span
        :class="[
          'text-ink3 font-medium shrink-0 select-none',
          sizeClasses[size].input,
        ]"
      >
        {{ selectedCountry.dialCode }}
      </span>
      <input
        type="tel"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder || '(9) 1234 5678'"
        :class="[
          'flex-1 min-w-0 bg-transparent outline-none text-ink placeholder:text-ink4',
          sizeClasses[size].input,
        ]"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>

    <!-- Country Dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="dropdownOpen"
        class="p-country-phone-dropdown absolute z-50 mt-1 w-72 bg-surface rounded-xl shadow-lg overflow-hidden"
        style="border: 1px solid var(--color-line-soft)"
      >
        <!-- Search -->
        <div class="p-2 border-b" style="border-color: var(--color-line-soft)">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar país..."
            :class="[
              'w-full bg-transparent outline-none text-ink placeholder:text-ink4',
              sizeClasses[size].dropdown,
            ]"
            autofocus
          />
        </div>

        <!-- Country List -->
        <div class="max-h-60 overflow-auto py-1">
          <button
            v-for="country in filteredCountries"
            :key="country.code + country.dialCode"
            type="button"
            :class="[
              'w-full flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors',
              props.countryCode === country.dialCode
                ? 'bg-accent-bg text-accent font-medium'
                : 'text-ink2 hover:bg-hover',
              sizeClasses[size].dropdown,
            ]"
            @click="selectCountry(country)"
          >
            <span class="text-lg leading-none shrink-0">{{ country.flag }}</span>
            <span class="flex-1 text-left truncate">
              {{ country.name }}
              <span v-if="country.nativeName" class="text-ink4 ml-1">({{ country.nativeName }})</span>
            </span>
            <span class="text-ink3 font-mono shrink-0">{{ country.dialCode }}</span>
            <Check
              v-if="props.countryCode === country.dialCode"
              :size="14"
              class="text-accent shrink-0"
              aria-hidden="true"
            />
          </button>
          <div
            v-if="filteredCountries.length === 0"
            :class="['px-3 py-2 text-ink4', sizeClasses[size].dropdown]"
          >
            Sin resultados
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.p-country-phone-input {
  position: relative;
  border: 1px solid var(--color-line-soft);
}
.p-country-phone-input:hover:not(.is-disabled) {
  border-color: var(--color-line);
}
.p-country-phone-input:focus-within:not(.is-disabled) {
  border-color: var(--color-accent);
}
.p-country-phone-input.is-error {
  border-color: var(--color-danger);
}
.p-country-phone-input.is-error:focus-within {
  border-color: var(--color-danger);
}
</style>
