<script setup lang="ts">
/**
 * Top navigation bar with breadcrumb, functional search, and avatar.
 *
 * @example
 * <PTopNav :breadcrumb="['Portfolio', 'Properties']" v-model:searchQuery="query" @search="onSearch" />
 */
import { Search, Bell, Calendar } from 'lucide-vue-next'
import { PBreadcrumbTrail } from '../../molecules/BreadcrumbTrail'
import { PAvatar } from '../../atoms/Avatar'

export interface TopNavProps {
  /** Breadcrumb items */
  breadcrumb: string[]
  /** Show search bar */
  search?: boolean
  /** Search placeholder */
  searchPlaceholder?: string
  /** Search query (v-model) */
  searchQuery?: string
  /** User initials */
  userInitials?: string
}

withDefaults(defineProps<TopNavProps>(), {
  search: true,
  searchPlaceholder: 'Search…',
  searchQuery: '',
  userInitials: 'ER',
})

defineEmits<{
  'update:searchQuery': [value: string]
  'search': [query: string]
}>()
</script>

<template>
  <header
    class="h-12 border-b border-line flex items-center px-3 lg:px-4 gap-2 lg:gap-3 bg-surface shrink-0"
  >
    <PBreadcrumbTrail :items="breadcrumb" />

    <div class="flex-1" />

    <!-- Search (functional input) -->
    <div
      v-if="search"
      class="p-topnav-search hidden md:flex items-center gap-2 bg-bg rounded-lg px-2.5 h-8 w-[220px] lg:w-[260px] text-sm"
    >
      <Search :size="14" class="text-ink4 shrink-0" aria-hidden="true" />
      <input
        type="text"
        :value="searchQuery"
        :placeholder="searchPlaceholder"
        class="flex-1 min-w-0 bg-transparent outline-none text-ink placeholder:text-ink4"
        @input="$emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
        @keydown.enter="$emit('search', searchQuery)"
      />
      <span
        class="hidden lg:inline font-sans text-[10px] text-ink4 bg-surface px-1 py-px rounded shrink-0 kbd-badge"
      >⌘K</span>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-0.5 lg:gap-1 text-ink2">
      <button type="button" class="p-2.5 lg:p-1.5 rounded-lg hover:bg-hover transition-colors relative min-w-[44px] min-h-[44px] lg:min-w-0 lg:min-h-0 flex items-center justify-center" aria-label="Notifications">
        <Bell :size="16" />
      </button>
      <button type="button" class="p-2.5 lg:p-1.5 rounded-lg hover:bg-hover transition-colors min-w-[44px] min-h-[44px] lg:min-w-0 lg:min-h-0 flex items-center justify-center" aria-label="Calendar">
        <Calendar :size="16" />
      </button>
      <div class="w-px h-5 bg-line mx-1" />
      <PAvatar :initials="userInitials" size="sm" />
    </div>
  </header>
</template>

<style scoped>
.p-topnav-search {
  border: 1px solid var(--color-line-soft);
}
.p-topnav-search:focus-within {
  border-color: var(--color-accent);
}
.kbd-badge {
  border: 1px solid var(--color-line-soft);
}
</style>
