import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { defineComponent, h } from 'vue'

vi.mock('@unovis/vue', () => {
  const stub = (name: string) =>
    defineComponent({
      name,
      setup(_, { slots }) {
        return () => h('div', { 'data-stub': name }, slots.default ? slots.default() : [])
      },
    })
  return {
    VisXYContainer: stub('VisXYContainer'),
    VisStackedBar: stub('VisStackedBar'),
    VisAxis: stub('VisAxis'),
  }
})

import ChartBar from './ChartBar.vue'

describe('PChartBar', () => {
  const data = [
    { label: 'Jan', value: 10 },
    { label: 'Feb', value: 22 },
  ]

  it('mounts without errors with valid data', () => {
    expect(() =>
      mount(ChartBar, { props: { data, xKey: 'label', yKey: 'value' } }),
    ).not.toThrow()
  })

  it('renders a title when provided', () => {
    const wrapper = mount(ChartBar, {
      props: { data, xKey: 'label', yKey: 'value', title: 'Monthly' },
    })
    expect(wrapper.text()).toContain('Monthly')
  })
})
