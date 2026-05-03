import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { h } from 'vue'
import Sidebar, { type SidebarSection } from './Sidebar.vue'

const Icon = { render: () => h('svg') }

const baseSections: SidebarSection[] = [
  {
    key: 'workspace',
    title: 'Workspace',
    items: [{ key: 'dashboard', icon: Icon, label: 'Dashboard' }],
  },
  {
    key: 'portfolio',
    title: 'Portfolio',
    items: [
      { key: 'property', icon: Icon, label: 'Properties', badge: 12 },
      { key: 'units', icon: Icon, label: 'Units' },
    ],
  },
]

describe('PSidebar — collapsible sections', () => {
  it('renders all sections expanded by default (no expandedSections prop)', () => {
    const wrapper = mount(Sidebar, {
      props: { sections: baseSections },
    })
    const headers = wrapper.findAll('.sidebar-section-title')
    expect(headers).toHaveLength(2)
    expect(headers[0].attributes('aria-expanded')).toBe('true')
    expect(headers[1].attributes('aria-expanded')).toBe('true')
  })

  it('marks a section as collapsed when expandedSections sets it to false', () => {
    const wrapper = mount(Sidebar, {
      props: {
        sections: baseSections,
        expandedSections: { portfolio: false },
      },
    })
    const headers = wrapper.findAll('.sidebar-section-title')
    expect(headers[0].attributes('aria-expanded')).toBe('true')
    expect(headers[1].attributes('aria-expanded')).toBe('false')
  })

  it('emits update:expandedSections and toggle-section on header click', async () => {
    const wrapper = mount(Sidebar, {
      props: {
        sections: baseSections,
        expandedSections: { workspace: true, portfolio: true },
      },
    })
    const headers = wrapper.findAll('.sidebar-section-title')
    await headers[1].trigger('click')

    const updates = wrapper.emitted('update:expandedSections') ?? []
    const toggles = wrapper.emitted('toggle-section') ?? []
    expect(updates).toHaveLength(1)
    expect(updates[0][0]).toEqual({ workspace: true, portfolio: false })
    expect(toggles).toHaveLength(1)
    expect(toggles[0]).toEqual(['portfolio', false])
  })

  it('toggles via keyboard (Enter)', async () => {
    const wrapper = mount(Sidebar, {
      props: { sections: baseSections },
    })
    const header = wrapper.findAll('.sidebar-section-title')[0]
    await header.trigger('keydown', { key: 'Enter' })

    const updates = wrapper.emitted('update:expandedSections') ?? []
    expect(updates).toHaveLength(1)
    expect((updates[0][0] as Record<string, boolean>).workspace).toBe(false)
  })

  it('toggles via keyboard (Space)', async () => {
    const wrapper = mount(Sidebar, {
      props: { sections: baseSections },
    })
    const header = wrapper.findAll('.sidebar-section-title')[0]
    await header.trigger('keydown', { key: ' ' })

    const updates = wrapper.emitted('update:expandedSections') ?? []
    expect(updates).toHaveLength(1)
  })

  it('does not render header as a button when section is collapsible=false', () => {
    const wrapper = mount(Sidebar, {
      props: {
        sections: [
          {
            key: 'fixed',
            title: 'Fixed',
            collapsible: false,
            items: [{ key: 'a', icon: Icon, label: 'A' }],
          },
        ],
      },
    })
    const header = wrapper.find('.sidebar-section-title')
    expect(header.element.tagName).toBe('DIV')
    expect(header.attributes('aria-expanded')).toBeUndefined()
  })

  it('does not toggle when collapsible=false is clicked', async () => {
    const wrapper = mount(Sidebar, {
      props: {
        sections: [
          {
            key: 'fixed',
            title: 'Fixed',
            collapsible: false,
            items: [{ key: 'a', icon: Icon, label: 'A' }],
          },
        ],
      },
    })
    await wrapper.find('.sidebar-section-title').trigger('click')
    expect(wrapper.emitted('update:expandedSections')).toBeUndefined()
  })

  it('falls back to title as section key when key is omitted', async () => {
    const wrapper = mount(Sidebar, {
      props: {
        sections: [
          { title: 'Workspace', items: [{ key: 'a', icon: Icon, label: 'A' }] },
        ],
      },
    })
    await wrapper.find('.sidebar-section-title').trigger('click')

    const updates = wrapper.emitted('update:expandedSections') ?? []
    expect(updates[0][0]).toEqual({ Workspace: false })
  })

  it('sets aria-controls on header pointing to content id', () => {
    const wrapper = mount(Sidebar, {
      props: { sections: baseSections },
    })
    const header = wrapper.findAll('.sidebar-section-title')[0]
    expect(header.attributes('aria-controls')).toBe('sidebar-section-workspace')
    expect(wrapper.find('#sidebar-section-workspace').exists()).toBe(true)
  })

  it('marks section content with aria-hidden when collapsed', () => {
    const wrapper = mount(Sidebar, {
      props: {
        sections: baseSections,
        expandedSections: { portfolio: false },
      },
    })
    const portfolioContent = wrapper.find('#sidebar-section-portfolio')
    expect(portfolioContent.attributes('aria-hidden')).toBe('true')
  })

  it('removes section items from tab order when collapsed (tabindex=-1)', () => {
    const wrapper = mount(Sidebar, {
      props: {
        sections: baseSections,
        expandedSections: { portfolio: false },
      },
    })
    const portfolioItems = wrapper
      .find('#sidebar-section-portfolio')
      .findAll('[tabindex]')
    expect(portfolioItems.length).toBeGreaterThan(0)
    portfolioItems.forEach((el) => expect(el.attributes('tabindex')).toBe('-1'))
  })

  it('still renders items when sidebar is in mini mode regardless of section state', () => {
    const wrapper = mount(Sidebar, {
      props: {
        sections: baseSections,
        expanded: false,
        expandedSections: { portfolio: false },
      },
    })
    // In mini mode all items remain reachable as icons; we don't apply collapse.
    const portfolioContent = wrapper.find('#sidebar-section-portfolio')
    expect(portfolioContent.classes()).toContain('grid-rows-[1fr]')
  })

  it('navigates on item click', async () => {
    const wrapper = mount(Sidebar, {
      props: { sections: baseSections },
    })
    const items = wrapper.find('#sidebar-section-portfolio').findAll('[tabindex]')
    await items[0].trigger('click')
    const navigated = wrapper.emitted('navigate') ?? []
    expect(navigated).toHaveLength(1)
    expect(navigated[0]).toEqual(['property'])
  })
})
