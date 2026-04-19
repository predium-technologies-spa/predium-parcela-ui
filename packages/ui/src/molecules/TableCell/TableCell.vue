<script setup lang="ts">
/**
 * Table cell with variant styling: standard, mono, or avatar+subtext.
 *
 * @example
 * <PTableCell>Regular text</PTableCell>
 * <PTableCell variant="mono">PRP-0128</PTableCell>
 * <PTableCell variant="avatar" title="Ashford Row" subtitle="214 Ashford St" initials="AR" />
 */
import { PAvatar } from '../../atoms/Avatar'

export interface TableCellProps {
  /** Cell variant */
  variant?: 'standard' | 'mono' | 'avatar'
  /** Alignment */
  align?: 'left' | 'right'
  /** Title (for avatar variant) */
  title?: string
  /** Subtitle (for avatar variant) */
  subtitle?: string
  /** Avatar initials (for avatar variant) */
  initials?: string
}

withDefaults(defineProps<TableCellProps>(), {
  variant: 'standard',
  align: 'left',
})
</script>

<template>
  <td
    :class="[
      'px-3.5 py-3 text-md text-ink2 border-b border-line-soft whitespace-nowrap',
      align === 'right' && 'text-right',
      variant === 'mono' && 'font-mono text-sm text-ink3',
    ]"
  >
    <!-- Avatar variant -->
    <div v-if="variant === 'avatar'" class="flex items-center gap-2.5">
      <PAvatar v-if="initials" :initials="initials" size="md" color="var(--color-chip-bg)" />
      <div>
        <div class="text-md font-medium text-ink">{{ title }}</div>
        <div v-if="subtitle" class="text-sm text-ink3">{{ subtitle }}</div>
      </div>
    </div>
    <!-- Standard / mono -->
    <slot v-else />
  </td>
</template>
