<script setup lang="ts">
/**
 * Agenda/schedule item with time, duration, type chip, and title.
 *
 * @example
 * <PAgendaItem time="09:00" duration="30m" type="Showing" label="Unit 4B" tone="info" />
 */
import { PBadge } from '../../atoms/Badge'
import { ChevronRight } from 'lucide-vue-next'

export interface AgendaItemProps {
  /** Start time */
  time: string
  /** Duration label */
  duration: string
  /** Type label (e.g. "Showing", "Inspection") */
  type: string
  /** Main label */
  label: string
  /** Sub-label */
  sublabel?: string
  /** Color tone for the sidebar stripe */
  tone?: 'neutral' | 'good' | 'warn' | 'info'
  /** Status badge */
  status?: 'confirmed' | 'pending' | 'flagged'
}

withDefaults(defineProps<AgendaItemProps>(), {
  tone: 'neutral',
})
</script>

<template>
  <div class="flex items-stretch gap-3.5 px-4 py-3 border-b border-line-soft hover:bg-hover transition-colors">
    <!-- Time -->
    <div class="w-[52px] shrink-0">
      <div class="font-mono text-md text-ink font-medium">{{ time }}</div>
      <div class="font-mono text-xs text-ink4">{{ duration }}</div>
    </div>

    <!-- Color stripe -->
    <div
      :class="[
        'w-[3px] rounded-sm shrink-0',
        tone === 'info' && 'bg-info',
        tone === 'good' && 'bg-good',
        tone === 'warn' && 'bg-warn',
        tone === 'neutral' && 'bg-ink4',
      ]"
    />

    <!-- Content -->
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2">
        <span class="text-xs uppercase tracking-wide text-ink3 font-medium">{{ type }}</span>
        <PBadge v-if="status === 'flagged'" tone="warn">Follow-up</PBadge>
        <PBadge v-if="status === 'pending'" tone="neutral">Pending</PBadge>
      </div>
      <div class="text-md font-medium text-ink mt-0.5">{{ label }}</div>
      <div v-if="sublabel" class="text-sm text-ink3">{{ sublabel }}</div>
    </div>

    <div class="flex items-center">
      <ChevronRight :size="14" class="text-ink4" aria-hidden="true" />
    </div>
  </div>
</template>
