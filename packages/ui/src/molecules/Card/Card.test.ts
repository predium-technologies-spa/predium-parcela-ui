import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Card from './Card.vue'

describe('PCard', () => {
  it('renders title and body slot', () => {
    const wrapper = mount(Card, {
      props: { title: 'Subscription', subtitle: 'Pro plan' },
      slots: { default: '<p>Body content</p>' },
    })
    expect(wrapper.text()).toContain('Subscription')
    expect(wrapper.text()).toContain('Pro plan')
    expect(wrapper.text()).toContain('Body content')
  })

  it('renders footer slot when provided', () => {
    const wrapper = mount(Card, {
      props: { title: 'X' },
      slots: { default: 'body', footer: '<button>Save</button>' },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('hides header when title is omitted and no header slot is supplied', () => {
    const wrapper = mount(Card, { slots: { default: 'body' } })
    expect(wrapper.find('[data-card-header]').exists()).toBe(false)
  })
})
