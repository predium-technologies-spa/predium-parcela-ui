<script setup lang="ts">
/**
 * Sortable data table with sticky header, selectable rows, and footer totals.
 *
 * @example
 * <PDataTable :columns="cols" :rows="data" selectable>
 *   <template #footer>14 entries · total $37,990</template>
 * </PDataTable>
 */
import { ChevronDown } from 'lucide-vue-next'

export interface DataTableColumn {
  key: string
  label: string
  align?: 'left' | 'right'
  width?: string
  sortable?: boolean
  mono?: boolean
}

export interface DataTableProps {
  /** Column definitions */
  columns: DataTableColumn[]
  /** Row data (array of objects) */
  rows: Record<string, unknown>[]
  /** Enable row selection with checkboxes */
  selectable?: boolean
  /** Currently selected row indices */
  selectedRows?: number[]
  /** Sort column key */
  sortKey?: string
  /** Sort direction */
  sortDir?: 'asc' | 'desc'
}

withDefaults(defineProps<DataTableProps>(), {
  selectable: false,
  selectedRows: () => [],
  sortDir: 'asc',
})

defineEmits<{
  'update:selectedRows': [indices: number[]]
  sort: [key: string]
}>()
</script>

<template>
  <div class="bg-surface border border-line rounded-xl overflow-hidden overflow-x-auto">
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th
            v-if="selectable"
            class="w-7 px-3.5 py-2.5 text-left text-sm font-medium text-ink3 uppercase tracking-wide border-b border-line bg-table-header sticky top-0 z-10"
          >
            <input type="checkbox" class="accent-ink" aria-label="Select all" />
          </th>
          <th
            v-for="col in columns"
            :key="col.key"
            :class="[
              'px-3.5 py-2.5 text-sm font-medium text-ink3 uppercase tracking-wide whitespace-nowrap',
              'border-b border-line bg-table-header sticky top-0 z-10',
              col.align === 'right' ? 'text-right' : 'text-left',
            ]"
            :style="col.width ? { width: col.width } : undefined"
          >
            <span class="inline-flex items-center gap-1">
              {{ col.label }}
              <ChevronDown
                v-if="col.sortable && sortKey === col.key"
                :size="10"
                :class="sortDir === 'desc' ? 'text-ink' : 'text-ink4'"
                aria-hidden="true"
              />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, i) in rows"
          :key="i"
          :class="[
            selectedRows.includes(i) ? 'bg-hover' : 'bg-surface',
            'hover:bg-hover transition-colors',
          ]"
        >
          <td
            v-if="selectable"
            class="px-3.5 py-3 border-b border-line-soft"
          >
            <input
              type="checkbox"
              class="accent-ink"
              :checked="selectedRows.includes(i)"
              :aria-label="`Select row ${i + 1}`"
            />
          </td>
          <td
            v-for="col in columns"
            :key="col.key"
            :class="[
              'px-3.5 py-3 text-md border-b border-line-soft whitespace-nowrap',
              col.align === 'right' ? 'text-right' : 'text-left',
              col.mono ? 'font-mono text-sm text-ink3' : 'text-ink2',
            ]"
          >
            <!-- Named slot for custom cell rendering -->
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]" :index="i">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="$slots.footer">
        <tr class="bg-table-header">
          <td
            :colspan="columns.length + (selectable ? 1 : 0)"
            class="px-3.5 py-3 text-base text-ink3 border-t border-line"
          >
            <slot name="footer" />
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>
