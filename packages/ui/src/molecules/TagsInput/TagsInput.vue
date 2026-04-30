<script setup lang="ts">
/**
 * Multi-tag input — type a value and press Enter (or comma) to add, click × to remove.
 *
 * @example
 * <PTagsInput v-model="tags" placeholder="Add tag…" />
 */
import { ref } from 'vue'
import { X } from 'lucide-vue-next'

export interface TagsInputProps {
  modelValue: string[]
  placeholder?: string
  /** Disable typing and removal */
  disabled?: boolean
}

const props = withDefaults(defineProps<TagsInputProps>(), {
  placeholder: 'Add…',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

const draft = ref('')

function commit() {
  const v = draft.value.trim()
  if (!v) return
  if (props.modelValue.includes(v)) {
    draft.value = ''
    return
  }
  emit('update:modelValue', [...props.modelValue, v])
  draft.value = ''
}

function remove(tag: string) {
  emit(
    'update:modelValue',
    props.modelValue.filter((t) => t !== tag),
  )
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ',') {
    e.preventDefault()
    commit()
  } else if (e.key === 'Backspace' && draft.value === '' && props.modelValue.length) {
    remove(props.modelValue[props.modelValue.length - 1])
  }
}
</script>

<template>
  <div
    :class="[
      'flex flex-wrap items-center gap-1.5 px-2 py-1.5 border border-line rounded-lg bg-surface min-h-10',
      'focus-within:outline-2 focus-within:outline-accent focus-within:outline-offset-2',
      disabled && 'opacity-40 pointer-events-none',
    ]"
  >
    <span
      v-for="tag in modelValue"
      :key="tag"
      class="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-chip-bg text-ink2 text-sm"
    >
      {{ tag }}
      <button
        type="button"
        data-test="remove"
        class="hover:text-danger"
        :aria-label="`Remove ${tag}`"
        @click="remove(tag)"
      >
        <X :size="12" :stroke-width="1.75" />
      </button>
    </span>
    <input
      v-model="draft"
      type="text"
      :placeholder="modelValue.length ? '' : placeholder"
      :disabled="disabled"
      class="flex-1 min-w-[80px] bg-transparent outline-none text-sm text-ink py-1"
      @keydown="onKeydown"
      @blur="commit"
    />
  </div>
</template>
