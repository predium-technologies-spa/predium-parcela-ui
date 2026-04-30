import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TagsInput from './TagsInput.vue'

describe('PTagsInput', () => {
  it('adds a tag on Enter', async () => {
    const wrapper = mount(TagsInput, { props: { modelValue: [] } })
    const input = wrapper.find('input')
    await input.setValue('alpha')
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['alpha']])
  })

  it('removes a tag when its remove button is clicked', async () => {
    const wrapper = mount(TagsInput, { props: { modelValue: ['alpha', 'beta'] } })
    await wrapper.findAll('[data-test="remove"]')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['beta']])
  })

  it('does not add duplicate tags', async () => {
    const wrapper = mount(TagsInput, { props: { modelValue: ['alpha'] } })
    const input = wrapper.find('input')
    await input.setValue('alpha')
    await input.trigger('keydown.enter')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
