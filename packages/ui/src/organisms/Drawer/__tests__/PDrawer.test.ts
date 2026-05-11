import { mount, flushPromises } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { nextTick, h } from 'vue'
import PDrawer from '../Drawer.vue'

describe('PDrawer', () => {
  it('does not render the panel when open=false', () => {
    const wrapper = mount(PDrawer, { props: { open: false, title: 'Panel' } })
    expect(wrapper.text()).not.toContain('Panel')
  })

  it('renders title, subtitle and slots when open=true', async () => {
    const wrapper = mount(PDrawer, {
      props: { open: true, title: 'My panel', subtitle: 'Subtitle' },
      slots: {
        body: '<div data-test="body">Body content</div>',
        footer: '<div data-test="footer">Footer content</div>',
      },
      attachTo: document.body,
    })
    await flushPromises()
    expect(document.body.textContent).toContain('My panel')
    expect(document.body.textContent).toContain('Subtitle')
    expect(document.body.querySelector('[data-test="body"]')).toBeTruthy()
    expect(document.body.querySelector('[data-test="footer"]')).toBeTruthy()
    wrapper.unmount()
  })

  it('emits update:open=false and close when the close button is clicked', async () => {
    const wrapper = mount(PDrawer, {
      props: { open: true, title: 'X' },
      attachTo: document.body,
    })
    await flushPromises()
    const closeButton = document.body.querySelector('button[aria-label="Close"]') as HTMLButtonElement
    expect(closeButton).toBeTruthy()
    closeButton.click()
    await nextTick()
    expect(wrapper.emitted('update:open')?.[0]).toEqual([false])
    expect(wrapper.emitted('close')).toBeTruthy()
    wrapper.unmount()
  })

  it.each([
    ['right', 'right-0'],
    ['left', 'left-0'],
    ['top', 'top-0'],
    ['bottom', 'bottom-0'],
  ] as const)('positions the container correctly for side=%s', async (side, expectedClass) => {
    const wrapper = mount(PDrawer, {
      props: { open: true, side, title: side },
      attachTo: document.body,
    })
    await flushPromises()
    // The DialogPanel sits inside the container div with the position classes
    const container = document.body.querySelector(`.${expectedClass}`)
    expect(container).toBeTruthy()
    wrapper.unmount()
  })

  it('renders an overlay backdrop when overlay=true (default)', async () => {
    const wrapper = mount(PDrawer, {
      props: { open: true, title: 'X' },
      attachTo: document.body,
    })
    await flushPromises()
    const backdrop = document.body.querySelector('.fixed.inset-0.bg-\\[rgba\\(23\\,20\\,15\\,0\\.35\\)\\]')
    expect(backdrop).toBeTruthy()
    wrapper.unmount()
  })

  it('does not render a backdrop when overlay=false', async () => {
    const wrapper = mount(PDrawer, {
      props: { open: true, overlay: false, title: 'X' },
      attachTo: document.body,
    })
    await flushPromises()
    const backdrop = document.body.querySelector('.fixed.inset-0.bg-\\[rgba\\(23\\,20\\,15\\,0\\.35\\)\\]')
    expect(backdrop).toBeFalsy()
    wrapper.unmount()
  })

  it('applies size as width for horizontal sides', async () => {
    const wrapper = mount(PDrawer, {
      props: { open: true, side: 'right', size: 600, title: 'X' },
      attachTo: document.body,
    })
    await flushPromises()
    const panel = document.body.querySelector('[role="dialog"] [class*="bg-surface"]') as HTMLElement
    expect(panel?.style.width).toBe('600px')
    expect(panel?.style.height).toBe('')
    wrapper.unmount()
  })

  it('applies size as height for vertical sides', async () => {
    const wrapper = mount(PDrawer, {
      props: { open: true, side: 'bottom', size: 400, title: 'X' },
      attachTo: document.body,
    })
    await flushPromises()
    const panel = document.body.querySelector('[role="dialog"] [class*="bg-surface"]') as HTMLElement
    expect(panel?.style.height).toBe('400px')
    expect(panel?.style.width).toBe('')
    wrapper.unmount()
  })
})
