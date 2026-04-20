<script setup lang="ts">
/**
 * Top navigation bar with breadcrumb, search, and avatar.
 *
 * @example
 * <PTopNav :breadcrumb="['Portfolio', 'Properties']" />
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
  /** User initials */
  userInitials?: string
}

withDefaults(defineProps<TopNavProps>(), {
  search: true,
  searchPlaceholder: 'Search…',
  userInitials: 'ER',
})
</script>

<template>
  <header
    class="h-12 border-b border-line flex items-center px-4 gap-3 bg-surface shrink-0"
  >
    <PBreadcrumbTrail :items="breadcrumb" />

    <div class="flex-1" />

    <!-- Search -->
    <div
      v-if="search"
      class="p-topnav-search hidden md:flex items-center gap-2 bg-bg rounded-lg px-2.5 h-8 w-[220px] lg:w-[260px] text-ink4 text-sm"
    >
      <Search :size="14" class="shrink-0" aria-hidden="true" />
      <span class="flex-1 truncate">{{ searchPlaceholder }}</span>
      <span
        class="hidden lg:inline font-mono text-[10px] text-ink4 bg-surface px-1 py-px rounded border border-line shrink-0"
      >⌘K</span>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-1 text-ink2">
      <button type="button" class="p-1.5 rounded-lg hover:bg-hover transition-colors relative" aria-label="Notifications">
        <Bell :size="16" />
      </button>
      <button type="button" class="p-1.5 rounded-lg hover:bg-hover transition-colors" aria-label="Calendar">
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
</style>
