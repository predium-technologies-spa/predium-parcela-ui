<script setup lang="ts">
/**
 * Drag-and-drop file uploader with file list.
 *
 * @example
 * <PFileUploader accept="image/*" :multiple="true" @upload="handleFiles" />
 * <PFileUploader accept=".pdf,.doc" :max-size="5242880" @upload="handleFiles" />
 */
import { ref } from 'vue'
import { Upload, X } from 'lucide-vue-next'

export interface FileUploaderProps {
  /** Accepted file types (e.g. "image/*", ".pdf,.doc") */
  accept?: string
  /** Allow multiple files */
  multiple?: boolean
  /** Max file size in bytes (default 10MB) */
  maxSize?: number
  /** Whether the uploader is disabled */
  disabled?: boolean
  /** Drop zone label */
  label?: string
}

const props = withDefaults(defineProps<FileUploaderProps>(), {
  accept: '',
  multiple: false,
  maxSize: 10485760,
  disabled: false,
  label: 'Drop files here or',
})

const emit = defineEmits<{
  upload: [files: File[]]
  error: [message: string]
}>()

const isDragging = ref(false)
const files = ref<File[]>([])
const inputRef = ref<HTMLInputElement>()

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1048576).toFixed(1)} MB`
}

function processFiles(fileList: FileList | null) {
  if (!fileList || props.disabled) return
  const valid: File[] = []
  for (const file of Array.from(fileList)) {
    if (file.size > props.maxSize) {
      emit('error', `${file.name} exceeds max size of ${formatSize(props.maxSize)}`)
      continue
    }
    valid.push(file)
  }
  if (valid.length) {
    if (props.multiple) {
      files.value = [...files.value, ...valid]
    } else {
      files.value = [valid[0]]
    }
    emit('upload', valid)
  }
}

function onDrop(e: DragEvent) {
  isDragging.value = false
  processFiles(e.dataTransfer?.files ?? null)
}

function onDragOver(e: DragEvent) {
  if (!props.disabled) isDragging.value = true
}

function onDragLeave() {
  isDragging.value = false
}

function onBrowse() {
  if (!props.disabled) inputRef.value?.click()
}

function onFileChange(e: Event) {
  processFiles((e.target as HTMLInputElement).files)
  if (inputRef.value) inputRef.value.value = ''
}

function removeFile(index: number) {
  files.value.splice(index, 1)
}
</script>

<template>
  <div>
    <!-- Drop zone -->
    <div
      :class="[
        'p-file-uploader flex flex-col items-center justify-center gap-2 rounded-xl p-8 text-center transition-colors cursor-pointer',
        isDragging && 'is-dragging bg-accent/5',
        disabled && 'opacity-50 cursor-not-allowed',
      ]"
      @drop.prevent="onDrop"
      @dragover.prevent="onDragOver"
      @dragleave="onDragLeave"
      @click="onBrowse"
    >
      <Upload :size="24" :stroke-width="1.5" class="text-ink4" aria-hidden="true" />
      <p class="text-base text-ink3">
        {{ label }}
        <span class="text-accent font-medium cursor-pointer hover:underline">browse</span>
      </p>
      <p v-if="accept" class="text-sm text-ink4">
        Accepted: {{ accept }}
      </p>
    </div>

    <!-- Hidden file input -->
    <input
      ref="inputRef"
      type="file"
      :accept="accept"
      :multiple="multiple"
      :disabled="disabled"
      class="hidden"
      @change="onFileChange"
    />

    <!-- File list -->
    <ul v-if="files.length" class="mt-3 flex flex-col gap-1.5">
      <li
        v-for="(file, i) in files"
        :key="`${file.name}-${i}`"
        class="flex items-center gap-2 px-3 py-2 bg-chip-bg rounded-lg text-base"
      >
        <span class="flex-1 truncate text-ink2">{{ file.name }}</span>
        <span class="text-sm text-ink4 shrink-0">{{ formatSize(file.size) }}</span>
        <button
          type="button"
          class="shrink-0 text-ink4 hover:text-ink cursor-pointer transition-colors"
          aria-label="Remove file"
          @click.stop="removeFile(i)"
        >
          <X :size="14" :stroke-width="2" aria-hidden="true" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.p-file-uploader {
  border: 2px dashed var(--color-line-soft);
}
.p-file-uploader:hover:not(.is-disabled) {
  border-color: var(--color-line);
}
.p-file-uploader.is-dragging {
  border-color: var(--color-accent);
}
</style>
