<script setup lang="ts">
/**
 * Surface container with optional title, subtitle, body, and footer slots.
 *
 * @example
 * <PCard title="Subscription" subtitle="Pro plan">
 *   <p>Body content</p>
 *   <template #footer><PButton>Save</PButton></template>
 * </PCard>
 */
import { useSlots, computed } from 'vue'

export interface CardProps {
  /** Card title rendered in the header */
  title?: string
  /** Optional subtitle below the title */
  subtitle?: string
  /** Disable inner padding (use when body manages its own spacing) */
  noPadding?: boolean
}

withDefaults(defineProps<CardProps>(), {
  noPadding: false,
})

const slots = useSlots()
const hasHeader = computed(() => !!slots.header)
</script>

<template>
  <section class="bg-surface border border-line rounded-2xl shadow-card overflow-hidden">
    <header
      v-if="title || subtitle || hasHeader"
      data-card-header
      class="px-5 py-4 border-b border-line"
    >
      <slot name="header">
        <h3 v-if="title" class="text-md font-semibold text-ink">{{ title }}</h3>
        <p v-if="subtitle" class="text-sm text-ink3 mt-0.5">{{ subtitle }}</p>
      </slot>
    </header>
    <div :class="[noPadding ? '' : 'px-5 py-4']">
      <slot />
    </div>
    <footer
      v-if="$slots.footer"
      class="px-5 py-3 border-t border-line bg-bg/50 flex justify-end gap-2"
    >
      <slot name="footer" />
    </footer>
  </section>
</template>
