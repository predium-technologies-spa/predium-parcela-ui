import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import LiveRegion from './LiveRegion.vue'

describe('PLiveRegion', () => {
  it('is visually hidden but exposed to screen readers with polite default', () => {
    const wrapper = mount(LiveRegion, { slots: { default: 'Saved' } })
    expect(wrapper.attributes('aria-live')).toBe('polite')
    expect(wrapper.attributes('aria-atomic')).toBe('true')
    expect(wrapper.classes()).toContain('sr-only')
    expect(wrapper.text()).toBe('Saved')
  })

  it('supports assertive politeness', () => {
    const wrapper = mount(LiveRegion, { props: { politeness: 'assertive' } })
    expect(wrapper.attributes('aria-live')).toBe('assertive')
  })
})
