import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Command from './Command.vue'

const groups = [
  {
    heading: 'Navigation',
    items: [
      { id: 'home', label: 'Go home' },
      { id: 'invoices', label: 'Open invoices' },
    ],
  },
  {
    heading: 'Actions',
    items: [{ id: 'new-invoice', label: 'Create invoice' }],
  },
]

describe('PCommand', () => {
  it('renders all items when query is empty', () => {
    const wrapper = mount(Command, { props: { groups, modelValue: '' } })
    expect(wrapper.findAll('[data-test="item"]').length).toBe(3)
  })

  it('filters items by query (case-insensitive substring)', async () => {
    const wrapper = mount(Command, { props: { groups, modelValue: 'invo' } })
    expect(wrapper.findAll('[data-test="item"]').length).toBe(2)
    expect(wrapper.text()).toContain('Open invoices')
    expect(wrapper.text()).toContain('Create invoice')
  })

  it('emits select with item id', async () => {
    const wrapper = mount(Command, { props: { groups, modelValue: '' } })
    await wrapper.findAll('[data-test="item"]')[0].trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual(['home'])
  })

  it('shows empty state when no item matches', () => {
    const wrapper = mount(Command, {
      props: { groups, modelValue: 'zzz', emptyLabel: 'Nothing found' },
    })
    expect(wrapper.text()).toContain('Nothing found')
  })
})
