import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import NumberField from './NumberField.vue'

describe('PNumberField', () => {
  it('emits update:modelValue when increment is clicked', async () => {
    const wrapper = mount(NumberField, { props: { modelValue: 5, step: 1 } })
    await wrapper.find('[data-test="inc"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([6])
  })

  it('clamps to max', async () => {
    const wrapper = mount(NumberField, { props: { modelValue: 10, step: 1, max: 10 } })
    await wrapper.find('[data-test="inc"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([10])
  })

  it('clamps to min on decrement', async () => {
    const wrapper = mount(NumberField, { props: { modelValue: 0, step: 1, min: 0 } })
    await wrapper.find('[data-test="dec"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([0])
  })

  it('disables both buttons when disabled', () => {
    const wrapper = mount(NumberField, { props: { modelValue: 5, disabled: true } })
    expect((wrapper.find('[data-test="inc"]').element as HTMLButtonElement).disabled).toBe(true)
    expect((wrapper.find('[data-test="dec"]').element as HTMLButtonElement).disabled).toBe(true)
  })
})
