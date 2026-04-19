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
  searchPlaceholder: 'Find property, tenant, lease…',
  userInitials: 'ER',
})
</script>

<template>
  <header
    class="h-[56px] border-b border-line flex items-center px-5 gap-4 bg-surface"
  >
    <PBreadcrumbTrail :items="breadcrumb" />

    <div class="flex-1" />

    <!-- Search -->
    <div
      v-if="search"
      class="hidden md:flex items-center gap-2 bg-bg border border-line rounded-xl px-3 py-1.5 w-[280px] text-ink4 text-md"
    >
      <Search :size="14" aria-hidden="true" />
      <span class="flex-1">{{ searchPlaceholder }}</span>
      <span
        class="hidden lg:inline font-mono text-xs text-ink4 bg-white px-1.5 py-px rounded-sm border border-line"
      >⌘K</span>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2 text-ink2">
      <button type="button" class="p-[7px] rounded-xl hover:bg-chip-bg relative" aria-label="Notifications">
        <Bell :size="16" />
      </button>
      <button type="button" class="p-[7px] rounded-xl hover:bg-chip-bg" aria-label="Calendar">
        <Calendar :size="16" />
      </button>
      <div class="w-px h-5 bg-line mx-1" />
      <PAvatar :initials="userInitials" size="md" />
    </div>
  </header>
</template>
