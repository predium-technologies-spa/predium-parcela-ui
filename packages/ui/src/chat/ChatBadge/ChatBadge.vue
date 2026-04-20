<script setup lang="ts">
/**
 * Floating chat badge that triggers the chat panel.
 * Fixed position bottom-right.
 *
 * @example
 * <PChatBadge name="Nora" :online="true" :unread-count="2" time="07:58" @click="openChat" />
 */
export interface ChatBadgeProps {
  /** Display name */
  name?: string
  /** Subtitle text */
  subtitle?: string
  /** Avatar background color */
  avatarColor?: string
  /** Whether the assistant is online */
  online?: boolean
  /** Number of unread messages */
  unreadCount?: number
  /** Time label */
  time?: string
}

const props = withDefaults(defineProps<ChatBadgeProps>(), {
  name: 'Nora',
  subtitle: 'Asistente \u00b7 En l\u00ednea',
  avatarColor: '#8B7355',
  online: true,
  unreadCount: 0,
})

defineEmits<{
  click: []
}>()

const initial = props.name.charAt(0).toUpperCase()
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50">
    <button
      type="button"
      class="flex items-center gap-3 bg-ink text-white rounded-full pl-1.5 pr-4 py-1.5 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
      @click="$emit('click')"
    >
      <!-- Avatar -->
      <div class="relative">
        <div
          class="w-10 h-10 rounded-full grid place-items-center text-white text-base font-semibold"
          :style="{ backgroundColor: avatarColor }"
        >
          {{ initial }}
        </div>
        <span
          v-if="online"
          class="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-good border-2 border-ink"
        />
      </div>

      <!-- Text -->
      <div class="flex flex-col text-left">
        <span class="text-sm font-semibold text-white">{{ name }}</span>
        <span class="text-xs opacity-60">{{ subtitle }}</span>
      </div>

      <!-- Right: time + unread -->
      <div class="flex flex-col items-end gap-0.5 ml-2">
        <span v-if="time" class="text-xs opacity-50">{{ time }}</span>
        <span
          v-if="unreadCount > 0"
          class="w-5 h-5 rounded-full bg-accent text-white text-xs font-semibold grid place-items-center"
        >
          {{ unreadCount }}
        </span>
      </div>
    </button>
  </div>
</template>
