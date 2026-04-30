import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Resizable from './Resizable.vue'

describe('PResizable', () => {
  it('renders left and right slots horizontally', () => {
    const wrapper = mount(Resizable, {
      slots: { left: '<div data-test="l">L</div>', right: '<div data-test="r">R</div>' },
    })
    expect(wrapper.find('[data-test="l"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="r"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="handle"]').exists()).toBe(true)
  })

  it('starts at the initial size', () => {
    const wrapper = mount(Resizable, {
      props: { initialSize: 280 },
      slots: { left: 'L', right: 'R' },
    })
    const left = wrapper.find('[data-test="left-pane"]')
    expect((left.element as HTMLElement).style.width).toBe('280px')
  })
})
