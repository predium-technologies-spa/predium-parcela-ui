export interface CalendarEvent {
  id: string
  /** YYYY-MM-DD */
  date: string
  /** HH:MM — null = all-day */
  time?: string | null
  title: string
  variant?: 'default' | 'google' | 'synced' | 'readonly'
  meta?: Record<string, unknown>
}

export interface CalendarDay {
  date: string        // YYYY-MM-DD
  dayNumber: number
  isCurrentMonth: boolean
  isToday: boolean
  events: CalendarEvent[]
}
