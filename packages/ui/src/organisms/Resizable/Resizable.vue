<script setup lang="ts">
/**
 * Two-pane horizontal resizable layout. Drag the handle to resize the left pane.
 * The host can listen to `update:size` for persistence.
 *
 * @example
 * <PResizable :initial-size="280" :min="200" :max="480">
 *   <template #left>Sidebar</template>
 *   <template #right>Content</template>
 * </PResizable>
 */
import { ref, onUnmounted } from 'vue'

export interface ResizableProps {
  /** Initial width of the left pane in px */
  initialSize?: number
  /** Minimum width in px */
  min?: number
  /** Maximum width in px */
  max?: number
}

const props = withDefaults(defineProps<ResizableProps>(), {
  initialSize: 240,
  min: 160,
  max: 600,
})

const emit = defineEmits<{
  (e: 'update:size', value: number): void
}>()

const size = ref(props.initialSize)
const dragging = ref(false)
const startX = ref(0)
const startSize = ref(0)

function onDown(e: MouseEvent) {
  dragging.value = true
  startX.value = e.clientX
  startSize.value = size.value
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
  e.preventDefault()
}
function onMove(e: MouseEvent) {
  if (!dragging.value) return
  const dx = e.clientX - startX.value
  const next = Math.min(props.max, Math.max(props.min, startSize.value + dx))
  size.value = next
  emit('update:size', next)
}
function onUp() {
  dragging.value = false
  document.removeEventListener('mousemove', onMove)
  document.removeEventListener('mouseup', onUp)
}

onUnmounted(onUp)
</script>

<template>
  <div class="flex h-full w-full overflow-hidden">
    <div
      data-test="left-pane"
      :style="{ width: `${size}px`, flex: '0 0 auto' }"
      class="overflow-auto"
    >
      <slot name="left" />
    </div>
    <div
      data-test="handle"
      role="separator"
      aria-orientation="vertical"
      class="w-1 bg-line cursor-col-resize hover:bg-accent transition-colors"
      @mousedown="onDown"
    />
    <div class="flex-1 overflow-auto">
      <slot name="right" />
    </div>
  </div>
</template>
