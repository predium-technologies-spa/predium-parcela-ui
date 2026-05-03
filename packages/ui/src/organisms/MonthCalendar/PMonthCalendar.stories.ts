import type { Meta, StoryObj } from '@storybook/vue3'
import PMonthCalendar from './PMonthCalendar.vue'
import type { CalendarEvent } from './types'

const meta: Meta<typeof PMonthCalendar> = {
  title: 'Organisms/MonthCalendar',
  component: PMonthCalendar,
  tags: ['autodocs'],
  argTypes: {
    weekStartsOn: { control: 'select', options: [0, 1] },
    maxEventsPerCell: { control: 'number' },
    loading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof PMonthCalendar>

const baseEvents: CalendarEvent[] = [
  { id: '1', date: '2026-05-05', time: '09:00', title: 'Visita propiedad', variant: 'default' },
  { id: '2', date: '2026-05-05', time: '11:00', title: 'Inspección', variant: 'synced' },
  { id: '3', date: '2026-05-12', time: '15:00', title: 'Reunión owner', variant: 'google' },
  { id: '4', date: '2026-05-20', title: 'Cita importada', variant: 'readonly' },
  { id: '5', date: '2026-05-20', time: '10:30', title: 'Segunda cita', variant: 'default' },
  { id: '6', date: '2026-05-20', time: '14:00', title: 'Tercera cita', variant: 'synced' },
  { id: '7', date: '2026-05-20', time: '16:00', title: 'Cuarta cita', variant: 'default' },
]

export const Default: Story = {
  args: {
    modelValue: new Date(2026, 4, 1), // May 2026
    events: baseEvents,
    weekStartsOn: 1,
    maxEventsPerCell: 3,
  },
}

export const Loading: Story = {
  args: {
    modelValue: new Date(2026, 4, 1),
    events: [],
    loading: true,
  },
}

export const SundayFirst: Story = {
  args: {
    modelValue: new Date(2026, 4, 1),
    events: baseEvents,
    weekStartsOn: 0,
  },
}

export const WithSelectedDate: Story = {
  args: {
    modelValue: new Date(2026, 4, 1),
    events: baseEvents,
    selectedDate: '2026-05-12',
    weekStartsOn: 1,
  },
}
