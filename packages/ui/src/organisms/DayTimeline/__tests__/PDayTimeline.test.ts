import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, afterEach } from 'vitest'
import PDayTimeline from '../PDayTimeline.vue'
import type { TimelineEvent } from '../types'

function makeEvent(id: string, startTime: string, variant?: TimelineEvent['variant']): TimelineEvent {
  return { id, startTime, title: `Event ${id}`, variant }
}

describe('PDayTimeline', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  // DS-T6: renders rows from startHour to endHour inclusive
  it('DS-T6: renders correct number of hour rows', () => {
    const day = new Date(2026, 2, 15) // March 15, 2026 (Saturday, not today)
    const wrapper = mount(PDayTimeline, {
      props: {
        modelValue: day,
        events: [],
        startHour: 8,
        endHour: 20,
      },
    })
    // 8..20 inclusive = 13 rows
    const rows = wrapper.findAll('.flex.border-b')
    expect(rows.length).toBe(13)
    // First should say 08:00
    expect(rows[0].text()).toContain('08:00')
    // Last should say 20:00
    expect(rows[12].text()).toContain('20:00')
  })

  // DS-T7: readonly events do not emit eventClick when clicked
  it('DS-T7: readonly events do not emit eventClick', async () => {
    const day = new Date(2026, 2, 15)
    const readonlyEvent = makeEvent('ro1', '10:00', 'readonly')
    const wrapper = mount(PDayTimeline, {
      props: {
        modelValue: day,
        events: [readonlyEvent],
        startHour: 8,
        endHour: 20,
      },
    })
    const eventEl = wrapper.find('.cursor-not-allowed')
    expect(eventEl.exists()).toBe(true)
    await eventEl.trigger('click')
    expect(wrapper.emitted('eventClick')).toBeFalsy()
  })

  // DS-T8: slotClick emits hour and time correctly
  it('DS-T8: slotClick emits correct hour and time', async () => {
    const day = new Date(2026, 2, 15)
    const wrapper = mount(PDayTimeline, {
      props: {
        modelValue: day,
        events: [],
        startHour: 8,
        endHour: 20,
      },
    })
    // Click the first slot area (08:00)
    const slotArea = wrapper.find('.flex-1.relative.hover\\:bg-hover\\/40')
    await slotArea.trigger('click')
    const emitted = wrapper.emitted('slotClick') as Array<[number, string]>
    expect(emitted).toBeTruthy()
    expect(emitted[0][0]).toBe(8)
    expect(emitted[0][1]).toBe('08:00')
  })

  // DS-T9: "now" line shows only when modelValue is today in America/Santiago
  it('DS-T9: now-line is absent when modelValue is not today', () => {
    // Use a date clearly in the past
    const past = new Date(2020, 0, 1)
    const wrapper = mount(PDayTimeline, {
      props: {
        modelValue: past,
        events: [],
        startHour: 8,
        endHour: 20,
      },
    })
    const nowLine = wrapper.find('[data-testid="now-line"]')
    expect(nowLine.exists()).toBe(false)
  })

  it('DS-T9b: now-line is present when modelValue is today', () => {
    // Pin "today" to a fixed Santiago date
    const todayInSantiago = new Intl.DateTimeFormat('sv-SE', {
      timeZone: 'America/Santiago',
    }).format(new Date())
    const [yyyy, mm, dd] = todayInSantiago.split('-').map(Number)
    const today = new Date(yyyy, mm - 1, dd)

    const wrapper = mount(PDayTimeline, {
      props: {
        modelValue: today,
        events: [],
        startHour: 0,
        endHour: 23,
      },
    })
    const nowLine = wrapper.find('[data-testid="now-line"]')
    // May not show if current Santiago time is outside [startHour, endHour]
    // but with 0..23 it should always show during day
    const hourInSantiago = parseInt(
      new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Santiago',
        hour: '2-digit',
        hour12: false,
      }).format(new Date()),
    )
    if (hourInSantiago >= 0 && hourInSantiago < 24) {
      expect(nowLine.exists()).toBe(true)
    }
  })
})
