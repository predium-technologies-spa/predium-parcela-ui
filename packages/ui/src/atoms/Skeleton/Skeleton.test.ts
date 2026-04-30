import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Skeleton from './Skeleton.vue'

describe('PSkeleton', () => {
  it('renders a rect skeleton by default', () => {
    const wrapper = mount(Skeleton)
    expect(wrapper.attributes('role')).toBe('status')
    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.classes()).toContain('rounded-md')
  })

  it('respects width and height props', () => {
    const wrapper = mount(Skeleton, { props: { width: '120px', height: '24px' } })
    expect(wrapper.attributes('style')).toContain('width: 120px')
    expect(wrapper.attributes('style')).toContain('height: 24px')
  })

  it('renders circle variant with full radius', () => {
    const wrapper = mount(Skeleton, { props: { shape: 'circle' } })
    expect(wrapper.classes()).toContain('rounded-full')
  })
})
