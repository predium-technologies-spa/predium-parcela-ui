<script setup lang="ts">
/**
 * Breadcrumb navigation trail.
 *
 * @example
 * <PBreadcrumbTrail :items="['Portfolio', 'Properties', 'Harper Hall']" />
 */
import { ChevronRight } from 'lucide-vue-next'

export interface BreadcrumbTrailProps {
  /** Ordered breadcrumb labels */
  items: string[]
}

defineProps<BreadcrumbTrailProps>()
</script>

<template>
  <nav aria-label="Breadcrumb" class="flex items-center gap-2 text-md">
    <template v-for="(item, i) in items" :key="i">
      <ChevronRight v-if="i > 0" :size="12" class="text-ink4" aria-hidden="true" />
      <span
        :class="[
          i === items.length - 1
            ? 'text-ink font-medium'
            : 'text-ink3 cursor-pointer hover:text-ink2',
        ]"
      >
        {{ item }}
      </span>
    </template>
  </nav>
</template>
