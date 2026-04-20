<script setup lang="ts">
/**
 * Horizontal pipeline/kanban stage bar showing stage distribution.
 *
 * @example
 * <PKanbanStageBar :stages="[{ label: 'New', count: 7, color: 'neutral' }, ...]" />
 */
export interface KanbanStage {
  label: string
  count: number
  tone?: 'neutral' | 'good' | 'warn' | 'info'
}

export interface KanbanStageBarProps {
  stages: KanbanStage[]
}

defineProps<KanbanStageBarProps>()

const toneColors = {
  neutral: 'var(--color-ink4)',
  good: 'var(--color-good)',
  warn: 'var(--color-warn)',
  info: 'var(--color-info)',
} as const
</script>

<template>
  <div class="grid grid-cols-2 sm:flex gap-1.5 sm:gap-1 px-3 sm:px-4 py-3">
    <div
      v-for="stage in stages"
      :key="stage.label"
      class="min-w-0 sm:min-w-[30px]"
      :style="{ flex: `${stage.count}` }"
    >
      <div
        class="h-1.5 rounded-sm opacity-70"
        :style="{ background: toneColors[stage.tone || 'neutral'] }"
      />
      <div class="text-xs text-ink3 mt-1 tracking-wide truncate">
        {{ stage.label }}
        <span class="font-mono text-ink2">{{ stage.count }}</span>
      </div>
    </div>
  </div>
</template>
