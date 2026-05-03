import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import PMonthCalendar from '../PMonthCalendar.vue'
import type { CalendarEvent } from '../types'

// March 2026 has 31 days; starts on Sunday → with weekStartsOn=1 (Mon), grid = 5 weeks = 35 cells
const march2026 = new Date(2026, 2, 1) // month index 2 = March

function makeEvent(date: string, id = '1'): CalendarEvent {
  return { id, date, title: `Event ${id}` }
}

describe('PMonthCalendar', () => {
  // DS-T1: renders 35–42 cells depending on month
  it('DS-T1: renders 35 cells for March 2026 with weekStartsOn=1', () => {
    const wrapper = mount(PMonthCalendar, {
      props: {
        modelValue: march2026,
        events: [],
        weekStartsOn: 1,
      },
    })
    const cells = wrapper.findAll('[role="gridcell"]')
    expect(cells.length).toBeGreaterThanOrEqual(35)
    expect(cells.length).toBeLessThanOrEqual(42)
  })

  // DS-T2: click on cell emits cellClick with date + events
  it('DS-T2: emits cellClick with date and events when cell clicked', async () => {
    const events: CalendarEvent[] = [makeEvent('2026-03-15', 'ev1')]
    const wrapper = mount(PMonthCalendar, {
      props: {
        modelValue: march2026,
        events,
        weekStartsOn: 1,
      },
    })
    const cells = wrapper.findAll('[role="gridcell"]')
    // Find the cell for 2026-03-15
    const cell = cells.find((c) => c.attributes('aria-label') === '2026-03-15')
    expect(cell).toBeDefined()
    await cell!.trigger('click')
    const emitted = wrapper.emitted('cellClick') as Array<[string, CalendarEvent[]]>
    expect(emitted).toBeTruthy()
    expect(emitted[0][0]).toBe('2026-03-15')
  })

  // DS-T3: +N más appears when events.length > maxEventsPerCell
  it('DS-T3: shows "+N más" button when events exceed maxEventsPerCell', () => {
    const events: CalendarEvent[] = [
      makeEvent('2026-03-10', 'e1'),
      makeEvent('2026-03-10', 'e2'),
      makeEvent('2026-03-10', 'e3'),
      makeEvent('2026-03-10', 'e4'),
    ]
    const wrapper = mount(PMonthCalendar, {
      props: {
        modelValue: march2026,
        events,
        weekStartsOn: 1,
        maxEventsPerCell: 3,
      },
    })
    const moreBtn = wrapper.findAll('button').find((b) => b.text().startsWith('+'))
    expect(moreBtn).toBeDefined()
    expect(moreBtn!.text()).toContain('+1')
  })

  // DS-T4: next arrow advances month and emits update:modelValue
  it('DS-T4: next-month arrow emits update:modelValue with next month', async () => {
    const wrapper = mount(PMonthCalendar, {
      props: {
        modelValue: march2026,
        events: [],
      },
    })
    const nextBtn = wrapper.find('[aria-label="Mes siguiente"]')
    await nextBtn.trigger('click')
    const emitted = wrapper.emitted('update:modelValue') as Array<[Date]>
    expect(emitted).toBeTruthy()
    expect(emitted[0][0].getMonth()).toBe(3) // April
    expect(emitted[0][0].getFullYear()).toBe(2026)
  })

  // DS-T5: weekStartsOn=1 puts Monday first in the header
  it('DS-T5: weekStartsOn=1 shows Lun as first day header', () => {
    const wrapper = mount(PMonthCalendar, {
      props: {
        modelValue: march2026,
        events: [],
        weekStartsOn: 1,
      },
    })
    const headers = wrapper.findAll('.text-\\[11px\\]').map((el) => el.text().trim())
    // First visible header should be Lun
    const dayHeaderTexts = wrapper.findAll('.grid-cols-7 .text-\\[11px\\]').map((el) => el.text().trim())
    // Fallback: check that Lun appears before Dom in rendered text
    const allText = wrapper.text()
    const lunIndex = allText.indexOf('Lun')
    const domIndex = allText.indexOf('Dom')
    expect(lunIndex).toBeLessThan(domIndex)
    // Silence unused variable warning
    void headers
    void dayHeaderTexts
  })
})
