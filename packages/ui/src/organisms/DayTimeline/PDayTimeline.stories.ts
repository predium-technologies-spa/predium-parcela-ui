import type { Meta, StoryObj } from '@storybook/vue3'
import PDayTimeline from './PDayTimeline.vue'
import type { TimelineEvent } from './types'

const meta: Meta<typeof PDayTimeline> = {
  title: 'Organisms/DayTimeline',
  component: PDayTimeline,
  tags: ['autodocs'],
  argTypes: {
    startHour: { control: 'number' },
    endHour: { control: 'number' },
    loading: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof PDayTimeline>

const baseEvents: TimelineEvent[] = [
  { id: '1', startTime: '09:00', endTime: '10:00', title: 'Visita propiedad', subtitle: 'Av. Providencia 123', variant: 'default' },
  { id: '2', startTime: '11:30', endTime: '12:30', title: 'Inspección técnica', subtitle: 'Las Condes', variant: 'synced' },
  { id: '3', startTime: '14:00', endTime: '15:00', title: 'Reunión Google', subtitle: 'Vitacura', variant: 'google' },
  { id: '4', startTime: '16:00', endTime: '17:00', title: 'Cita solo lectura', variant: 'readonly' },
]

export const Default: Story = {
  args: {
    modelValue: new Date(),
    events: baseEvents,
    startHour: 8,
    endHour: 20,
  },
}

export const Loading: Story = {
  args: {
    modelValue: new Date(),
    events: [],
    loading: true,
    startHour: 8,
    endHour: 20,
  },
}

export const Empty: Story = {
  args: {
    modelValue: new Date(2026, 2, 15),
    events: [],
    startHour: 8,
    endHour: 20,
    emptyText: 'No hay citas para este día',
  },
}

export const ReadonlyEvents: Story = {
  args: {
    modelValue: new Date(2026, 2, 15),
    events: [
      { id: 'r1', startTime: '10:00', endTime: '11:00', title: 'Solo lectura Google', variant: 'readonly' },
    ],
    startHour: 8,
    endHour: 20,
  },
}
