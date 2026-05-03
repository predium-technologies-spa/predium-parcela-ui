export interface TimelineEvent {
  id: string
  /** HH:MM */
  startTime: string
  /** HH:MM — defaults to startTime + 60 min if not provided */
  endTime?: string | null
  title: string
  subtitle?: string
  variant?: 'default' | 'google' | 'synced' | 'readonly'
  meta?: Record<string, unknown>
}

export interface TimelineSlot {
  hour: number
  label: string
  time: string // HH:00
}
