import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import DropdownMenu from './DropdownMenu.vue'

describe('PDropdownMenu', () => {
  const items = [
    { id: 'edit', label: 'Edit' },
    { id: 'sep', separator: true as const },
    { id: 'delete', label: 'Delete', danger: true },
  ]

  it('opens on trigger click and renders items', async () => {
    const wrapper = mount(DropdownMenu, {
      props: { items },
      slots: { trigger: '<button>Open</button>' },
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('Edit')
    expect(wrapper.text()).toContain('Delete')
  })

  it('emits select with item id when an item is clicked', async () => {
    const wrapper = mount(DropdownMenu, {
      props: { items },
      slots: { trigger: '<button>Open</button>' },
    })
    await wrapper.find('button').trigger('click')
    await wrapper.findAll('[data-test="item"]')[0].trigger('click')
    expect(wrapper.emitted('select')?.[0]).toEqual(['edit'])
  })

  it('marks danger items with the danger token color class', async () => {
    const wrapper = mount(DropdownMenu, {
      props: { items },
      slots: { trigger: '<button>Open</button>' },
    })
    await wrapper.find('button').trigger('click')
    const danger = wrapper.findAll('[data-test="item"]')[1]
    expect(danger.classes()).toContain('text-danger')
  })
})
