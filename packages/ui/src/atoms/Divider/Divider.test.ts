import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Divider from './Divider.vue'

describe('PDivider', () => {
  it('renders a horizontal divider by default', () => {
    const wrapper = mount(Divider)
    expect(wrapper.attributes('role')).toBe('separator')
    expect(wrapper.attributes('aria-orientation')).toBe('horizontal')
    expect(wrapper.classes()).toContain('h-px')
  })

  it('renders a vertical divider when orientation is vertical', () => {
    const wrapper = mount(Divider, { props: { orientation: 'vertical' } })
    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
    expect(wrapper.classes()).toContain('w-px')
  })
})
