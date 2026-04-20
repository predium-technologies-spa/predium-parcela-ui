<script setup lang="ts">
/**
 * Recursive tree view for hierarchical data.
 *
 * @example
 * <PTreeView :items="[{ id: '1', label: 'Root', children: [{ id: '2', label: 'Child' }] }]" />
 */
import { reactive, type Component } from 'vue'
import { ChevronRight } from 'lucide-vue-next'

export interface TreeNode {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Child nodes */
  children?: TreeNode[]
  /** Optional icon component */
  icon?: Component
}

export interface TreeViewProps {
  /** Tree items */
  items: TreeNode[]
  /** Expand all nodes by default */
  defaultExpanded?: boolean
}

const props = withDefaults(defineProps<TreeViewProps>(), {
  defaultExpanded: false,
})

const expanded = reactive(new Set<string>())

// Initialize expanded state
if (props.defaultExpanded) {
  function expandAll(nodes: TreeNode[]) {
    for (const node of nodes) {
      if (node.children?.length) {
        expanded.add(node.id)
        expandAll(node.children)
      }
    }
  }
  expandAll(props.items)
}

function toggle(id: string) {
  if (expanded.has(id)) {
    expanded.delete(id)
  } else {
    expanded.add(id)
  }
}
</script>

<template>
  <div>
    <div v-for="item in items" :key="item.id">
      <div
        class="flex items-center px-2 py-1.5 rounded-lg hover:bg-hover text-base cursor-pointer"
        @click="item.children?.length ? toggle(item.id) : undefined"
      >
        <!-- Chevron or spacer -->
        <span v-if="item.children?.length" class="w-5 h-5 flex items-center justify-center mr-1">
          <ChevronRight
            :size="16"
            :class="[
              'transition-transform duration-200',
              expanded.has(item.id) && 'rotate-90',
            ]"
          />
        </span>
        <span v-else class="w-5 h-5 mr-1" />

        <!-- Icon -->
        <component
          v-if="item.icon"
          :is="item.icon"
          :size="16"
          class="mr-2 text-ink3"
        />

        <!-- Label -->
        <span class="text-ink">{{ item.label }}</span>
      </div>

      <!-- Recursive children -->
      <div v-if="item.children?.length && expanded.has(item.id)" class="ml-4">
        <PTreeView :items="item.children" :default-expanded="defaultExpanded" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'PTreeView' }
</script>
