<script setup lang="ts">
/**
 * Breadcrumb navigation trail.
 *
 * Items can be plain label strings or objects with an optional `href` for
 * navigation. The last item is always rendered as the current page (non-link,
 * font-medium, `aria-current="page"`).
 *
 * @example Plain labels
 * <PBreadcrumbTrail :items="['Portfolio', 'Properties', 'Harper Hall']" />
 *
 * @example With navigation links
 * <PBreadcrumbTrail
 *   :items="[
 *     { label: 'Portfolio', href: '/portfolio' },
 *     { label: 'Properties', href: '/portfolio/properties' },
 *     { label: 'Harper Hall' },
 *   ]"
 * />
 */
import { computed } from 'vue'
import { ChevronRight } from 'lucide-vue-next'

export interface BreadcrumbItem {
  /** Visible breadcrumb label */
  label: string
  /** Optional navigation target. When set on a non-last item, renders an anchor. */
  href?: string
}

export interface BreadcrumbTrailProps {
  /** Ordered breadcrumb items. Strings are treated as labels with no href. */
  items: ReadonlyArray<string | BreadcrumbItem>
}

const props = defineProps<BreadcrumbTrailProps>()

const normalized = computed(() =>
  props.items.map((it) => (typeof it === 'string' ? { label: it } : it))
)
</script>

<template>
  <nav
    aria-label="Breadcrumb"
    class="flex items-center gap-2 text-md overflow-hidden flex-nowrap"
  >
    <template v-for="(item, i) in normalized" :key="i">
      <ChevronRight
        v-if="i > 0"
        :size="12"
        class="text-ink4 shrink-0"
        aria-hidden="true"
      />
      <a
        v-if="item.href && i !== normalized.length - 1"
        :href="item.href"
        class="text-ink3 hover:text-ink2 shrink-0 transition-colors"
      >
        {{ item.label }}
      </a>
      <span
        v-else
        :class="
          i === normalized.length - 1
            ? 'text-ink min-w-0 truncate'
            : 'text-ink3 shrink-0'
        "
        :aria-current="i === normalized.length - 1 ? 'page' : undefined"
      >
        {{ item.label }}
      </span>
    </template>
  </nav>
</template>
