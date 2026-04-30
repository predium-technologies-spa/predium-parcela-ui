<script setup lang="ts">
/**
 * Data table powered by TanStack Table.
 * Horizontal table on desktop, stacked cards on mobile.
 * Supports sorting, selection, and remote pagination.
 *
 * @example
 * <PDataTable :columns="cols" :rows="data" selectable sortable />
 *
 * <!-- Remote pagination -->
 * <PDataTable
 *   :columns="cols"
 *   :rows="pageRows"
 *   :totalRows="1248"
 *   :page="currentPage"
 *   :pageSize="25"
 *   @page-change="fetchPage"
 * />
 */
import { computed, ref, watch, h as vueH } from 'vue'
import {
  useVueTable,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
  FlexRender,
  type SortingState,
  type RowSelectionState,
} from '@tanstack/vue-table'
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-vue-next'

export interface DataTableColumn {
  key: string
  label: string
  align?: 'left' | 'right'
  width?: string
  sortable?: boolean
  mono?: boolean
}

export interface DataTablePagination {
  /** Current page (1-based) */
  page: number
  /** Rows per page */
  pageSize: number
  /** Total rows in the dataset */
  totalRows: number
}

export interface DataTableProps {
  /** Column definitions */
  columns: DataTableColumn[]
  /** Row data for the current page */
  rows: Record<string, unknown>[]
  /** Enable row selection with checkboxes */
  selectable?: boolean
  /** Selected row indices (v-model) */
  selectedRows?: number[]
  /** Enable column sorting */
  sortable?: boolean
  /** Remote pagination config */
  pagination?: DataTablePagination | null
  /** Label shown next to the row checkbox in mobile card view */
  selectLabel?: string
  /** Pagination summary prefix (e.g. "Showing") */
  showingLabel?: string
  /** Pagination summary conjunction (e.g. "of") */
  ofLabel?: string
}

const props = withDefaults(defineProps<DataTableProps>(), {
  selectable: false,
  selectedRows: () => [],
  sortable: false,
  pagination: null,
  selectLabel: 'Select',
  showingLabel: 'Showing',
  ofLabel: 'of',
})

const emit = defineEmits<{
  'update:selectedRows': [indices: number[]]
  'sort': [key: string, dir: 'asc' | 'desc']
  'page-change': [page: number]
}>()

// TanStack sorting state
const sorting = ref<SortingState>([])

// TanStack row selection state
const rowSelection = ref<RowSelectionState>({})

// Sync selectedRows prop → internal state
watch(
  () => props.selectedRows,
  (val) => {
    const sel: RowSelectionState = {}
    val.forEach((i) => { sel[i] = true })
    rowSelection.value = sel
  },
  { immediate: true },
)

// Sync internal state → emit
watch(rowSelection, (val) => {
  const indices = Object.keys(val)
    .filter((k) => val[k])
    .map(Number)
  emit('update:selectedRows', indices)
}, { deep: true })

// Build TanStack columns from our column defs
const tanstackColumns = computed(() => {
  const cols: any[] = []

  if (props.selectable) {
    cols.push({
      id: '_select',
      header: () => '',
      cell: () => '',
      size: 28,
      enableSorting: false,
    })
  }

  for (const col of props.columns) {
    cols.push({
      id: col.key,
      accessorKey: col.key,
      header: col.label,
      size: col.width ? parseInt(col.width) : undefined,
      enableSorting: props.sortable && (col.sortable !== false),
      meta: { align: col.align, mono: col.mono },
    })
  }

  return cols
})

// TanStack table instance
const table = useVueTable({
  get data() { return props.rows },
  get columns() { return tanstackColumns.value },
  state: {
    get sorting() { return sorting.value },
    get rowSelection() { return rowSelection.value },
  },
  onSortingChange: (updater) => {
    sorting.value = typeof updater === 'function' ? updater(sorting.value) : updater
    if (sorting.value.length) {
      emit('sort', sorting.value[0].id, sorting.value[0].desc ? 'desc' : 'asc')
    }
  },
  onRowSelectionChange: (updater) => {
    rowSelection.value = typeof updater === 'function' ? updater(rowSelection.value) : updater
  },
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: props.sortable ? getSortedRowModel() : undefined,
  enableRowSelection: props.selectable,
  enableMultiRowSelection: props.selectable,
})

// Pagination helpers
const totalPages = computed(() => {
  if (!props.pagination) return 0
  return Math.ceil(props.pagination.totalRows / props.pagination.pageSize)
})

const pageStart = computed(() => {
  if (!props.pagination) return 0
  return (props.pagination.page - 1) * props.pagination.pageSize + 1
})

const pageEnd = computed(() => {
  if (!props.pagination) return 0
  return Math.min(props.pagination.page * props.pagination.pageSize, props.pagination.totalRows)
})

function goToPage(p: number) {
  if (p >= 1 && p <= totalPages.value) {
    emit('page-change', p)
  }
}

// Visible page numbers
const visiblePages = computed(() => {
  if (!props.pagination) return []
  const total = totalPages.value
  const current = props.pagination.page
  const pages: (number | '...')[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) pages.push('...')
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
      pages.push(i)
    }
    if (current < total - 2) pages.push('...')
    pages.push(total)
  }

  return pages
})

// Check all / none
function toggleAllRows() {
  table.toggleAllRowsSelected(!table.getIsAllRowsSelected())
}
</script>

<template>
  <!-- ═══ Desktop table (lg+) ═══ -->
  <div class="hidden lg:block bg-surface rounded-xl overflow-hidden overflow-x-auto data-table-border">
    <table class="w-full border-collapse">
      <thead>
        <tr>
          <th
            v-if="selectable"
            class="w-7 px-3.5 py-2.5 text-left border-b border-line bg-table-header sticky top-0 z-10"
          >
            <input
              type="checkbox"
              class="accent-ink cursor-pointer"
              :checked="table.getIsAllRowsSelected()"
              :indeterminate="table.getIsSomeRowsSelected()"
              aria-label="Select all"
              @change="toggleAllRows"
            />
          </th>
          <th
            v-for="header in table.getFlatHeaders().filter(h => h.id !== '_select')"
            :key="header.id"
            :class="[
              'px-3.5 py-2.5 text-sm font-medium text-ink3 uppercase tracking-wide whitespace-nowrap',
              'border-b border-line bg-table-header sticky top-0 z-10',
              (header.column.columnDef.meta as any)?.align === 'right' ? 'text-right' : 'text-left',
              header.column.getCanSort() && 'cursor-pointer select-none hover:text-ink2',
            ]"
            :style="header.column.columnDef.size ? { width: `${header.column.columnDef.size}px` } : undefined"
            @click="header.column.getCanSort() && header.column.toggleSorting()"
          >
            <span class="inline-flex items-center gap-1">
              {{ header.column.columnDef.header }}
              <template v-if="header.column.getIsSorted()">
                <ChevronUp v-if="header.column.getIsSorted() === 'asc'" :size="12" class="text-ink" />
                <ChevronDown v-else :size="12" class="text-ink" />
              </template>
              <ChevronDown
                v-else-if="header.column.getCanSort()"
                :size="10"
                class="text-ink4 opacity-0 group-hover:opacity-100"
              />
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in table.getRowModel().rows"
          :key="row.id"
          :class="[
            row.getIsSelected() ? 'bg-hover' : 'bg-surface',
            'hover:bg-hover transition-colors',
          ]"
        >
          <td v-if="selectable" class="px-3.5 py-3 border-b border-line-soft">
            <input
              type="checkbox"
              class="accent-ink cursor-pointer"
              :checked="row.getIsSelected()"
              :aria-label="`Select row ${row.index + 1}`"
              @change="row.toggleSelected()"
            />
          </td>
          <td
            v-for="cell in row.getVisibleCells().filter(c => c.column.id !== '_select')"
            :key="cell.id"
            :class="[
              'px-3.5 py-3 text-md border-b border-line-soft whitespace-nowrap',
              (cell.column.columnDef.meta as any)?.align === 'right' ? 'text-right' : 'text-left',
              (cell.column.columnDef.meta as any)?.mono ? 'font-mono text-sm text-ink3' : 'text-ink2',
            ]"
          >
            <slot
              :name="`cell-${cell.column.id}`"
              :row="row.original"
              :value="cell.getValue()"
              :index="row.index"
            >
              {{ cell.getValue() }}
            </slot>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="$slots.footer || pagination">
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

  <!-- ═══ Mobile cards (<lg) ═══ -->
  <div class="lg:hidden flex flex-col gap-3">
    <div
      v-for="row in table.getRowModel().rows"
      :key="row.id"
      class="bg-surface rounded-xl overflow-hidden data-table-border"
    >
      <div v-if="selectable" class="flex items-center gap-2.5 px-4 py-3 border-b border-line-soft bg-table-header">
        <input
          type="checkbox"
          class="accent-ink cursor-pointer"
          :checked="row.getIsSelected()"
          :aria-label="`Select row ${row.index + 1}`"
          @change="row.toggleSelected()"
        />
        <span class="text-sm font-medium text-ink3 uppercase tracking-wide">{{ selectLabel }}</span>
      </div>
      <div
        v-for="(col, ci) in columns"
        :key="col.key"
        :class="['px-4 py-2.5', ci < columns.length - 1 && 'border-b border-line-soft']"
      >
        <div class="text-xs font-medium text-ink4 uppercase tracking-wide mb-0.5">{{ col.label }}</div>
        <div :class="['text-base', col.mono ? 'font-mono text-ink3' : 'text-ink']">
          <slot :name="`cell-${col.key}`" :row="row.original" :value="row.original[col.key]" :index="row.index">
            {{ row.original[col.key] }}
          </slot>
        </div>
      </div>
    </div>

    <div v-if="$slots.footer" class="px-4 py-3 text-base text-ink3">
      <slot name="footer" />
    </div>
  </div>

  <!-- ═══ Pagination (if provided) ═══ -->
  <div v-if="pagination" class="flex flex-col sm:flex-row items-center justify-between gap-3 px-1 py-3 text-sm text-ink3">
    <div>
      {{ showingLabel }} <span class="font-mono text-ink2">{{ pageStart }}–{{ pageEnd }}</span>
      {{ ofLabel }} <span class="font-mono text-ink2">{{ pagination.totalRows.toLocaleString() }}</span>
    </div>
    <div class="flex items-center gap-1">
      <button
        type="button"
        class="pagination-btn px-2 py-1 rounded-lg cursor-pointer transition-colors"
        :class="pagination.page <= 1 && 'opacity-40 pointer-events-none'"
        @click="goToPage(pagination.page - 1)"
      >
        <ChevronLeft :size="14" />
      </button>
      <template v-for="p in visiblePages" :key="p">
        <span v-if="p === '...'" class="px-1 text-ink4">…</span>
        <button
          v-else
          type="button"
          :class="[
            'w-8 h-8 rounded-lg font-mono text-sm cursor-pointer transition-colors',
            p === pagination.page
              ? 'bg-accent text-white font-medium'
              : 'pagination-btn',
          ]"
          @click="goToPage(p as number)"
        >
          {{ p }}
        </button>
      </template>
      <button
        type="button"
        class="pagination-btn px-2 py-1 rounded-lg cursor-pointer transition-colors"
        :class="pagination.page >= totalPages && 'opacity-40 pointer-events-none'"
        @click="goToPage(pagination.page + 1)"
      >
        <ChevronRight :size="14" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.data-table-border {
  border: 1px solid var(--color-line-soft);
}
.pagination-btn {
  color: var(--color-ink3);
}
.pagination-btn:hover {
  background: var(--color-hover);
  color: var(--color-ink);
}
</style>
