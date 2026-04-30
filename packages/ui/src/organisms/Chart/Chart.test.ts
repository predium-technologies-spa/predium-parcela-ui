import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Chart from './Chart.vue'

// @unovis/vue uses D3 + ResizeObserver internally which throws in jsdom.
// Stub all unovis components so mounting Chart works without a real DOM.
vi.mock('@unovis/vue', () => ({
  VisXYContainer: { name: 'VisXYContainer', template: '<div><slot /></div>' },
  VisLine: { name: 'VisLine', template: '<div />' },
  VisArea: { name: 'VisArea', template: '<div />' },
  VisAxis: { name: 'VisAxis', template: '<div />' },
}))

describe('PChart', () => {
  const data = [
    { x: 0, y: 10 },
    { x: 1, y: 20 },
    { x: 2, y: 15 },
  ]

  it('mounts without errors with valid data', () => {
    expect(() => mount(Chart, { props: { data } })).not.toThrow()
  })

  it('renders a title when provided', () => {
    const wrapper = mount(Chart, { props: { data, title: 'Revenue' } })
    expect(wrapper.text()).toContain('Revenue')
  })
})
