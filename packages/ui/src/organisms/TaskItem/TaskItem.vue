<script setup lang="ts">
/**
 * Task list item with checkbox, label, and due date.
 *
 * @example
 * <PTaskItem v-model="done" label="Send lease docs" when="08:00" />
 */
import { PCheckbox } from '../../atoms/Checkbox'

export interface TaskItemProps {
  /** Done state (v-model) */
  modelValue?: boolean
  /** Task label */
  label: string
  /** Due/time label */
  when?: string
  /** Whether the time is urgent */
  urgent?: boolean
}

withDefaults(defineProps<TaskItemProps>(), {
  modelValue: false,
  urgent: false,
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>

<template>
  <div class="flex items-center gap-2.5 px-3 sm:px-3.5 py-2.5 border-b border-line-soft min-h-[44px]">
    <PCheckbox
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
    />
    <span
      :class="[
        'flex-1 min-w-0 text-base',
        modelValue ? 'text-ink3 line-through' : 'text-ink font-medium',
      ]"
    >
      {{ label }}
    </span>
    <span
      v-if="when"
      :class="['font-sans text-xs', urgent ? 'text-warn' : 'text-ink4']"
    >
      {{ when }}
    </span>
  </div>
</template>
