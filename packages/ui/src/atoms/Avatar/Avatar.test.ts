import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PAvatar from './Avatar.vue'

describe('PAvatar', () => {
  describe('existing behavior (non-breaking)', () => {
    it('renders initials in a rounded div when no src', () => {
      const wrapper = mount(PAvatar, { props: { initials: 'KR' } })
      expect(wrapper.find('div[role="img"]').exists()).toBe(true)
      expect(wrapper.text()).toContain('KR')
    })

    it('applies sm size class', () => {
      const wrapper = mount(PAvatar, { props: { initials: 'AB', size: 'sm' } })
      expect(wrapper.find('div[role="img"]').classes()).toContain('w-6')
    })

    it('applies md size class (default)', () => {
      const wrapper = mount(PAvatar, { props: { initials: 'AB' } })
      expect(wrapper.find('div[role="img"]').classes()).toContain('w-8')
    })

    it('applies lg size class', () => {
      const wrapper = mount(PAvatar, { props: { initials: 'AB', size: 'lg' } })
      expect(wrapper.find('div[role="img"]').classes()).toContain('w-10')
    })
  })

  describe('T20 — src prop: photo vs initials fallback', () => {
    it('renders <img> when src is provided', () => {
      const wrapper = mount(PAvatar, {
        props: { initials: 'KR', src: 'https://example.com/photo.jpg' },
      })
      expect(wrapper.find('img').exists()).toBe(true)
      expect(wrapper.find('div[role="img"]').exists()).toBe(false)
    })

    it('img has correct src and alt attributes', () => {
      const wrapper = mount(PAvatar, {
        props: {
          initials: 'KR',
          src: 'https://example.com/photo.jpg',
          alt: 'Karla Rivera',
        },
      })
      const img = wrapper.find('img')
      expect(img.attributes('src')).toBe('https://example.com/photo.jpg')
      expect(img.attributes('alt')).toBe('Karla Rivera')
    })

    it('img uses initials as alt when alt prop not provided', () => {
      const wrapper = mount(PAvatar, {
        props: { initials: 'KR', src: 'https://example.com/photo.jpg' },
      })
      expect(wrapper.find('img').attributes('alt')).toBe('KR')
    })

    it('falls back to initials div when src is null', () => {
      const wrapper = mount(PAvatar, { props: { initials: 'KR', src: null } })
      expect(wrapper.find('img').exists()).toBe(false)
      expect(wrapper.find('div[role="img"]').exists()).toBe(true)
    })

    it('falls back to initials div when src is empty string', () => {
      const wrapper = mount(PAvatar, { props: { initials: 'KR', src: '' } })
      expect(wrapper.find('img').exists()).toBe(false)
      expect(wrapper.find('div[role="img"]').exists()).toBe(true)
    })

    it('sets referrerpolicy attribute on img (default no-referrer)', () => {
      const wrapper = mount(PAvatar, {
        props: { initials: 'KR', src: 'https://example.com/photo.jpg' },
      })
      expect(wrapper.find('img').attributes('referrerpolicy')).toBe('no-referrer')
    })

    it('respects custom referrerPolicy prop', () => {
      const wrapper = mount(PAvatar, {
        props: {
          initials: 'KR',
          src: 'https://example.com/photo.jpg',
          referrerPolicy: 'origin',
        },
      })
      expect(wrapper.find('img').attributes('referrerpolicy')).toBe('origin')
    })

    it('falls back to initials after image error event', async () => {
      const wrapper = mount(PAvatar, {
        props: { initials: 'KR', src: 'https://example.com/broken.jpg' },
      })
      expect(wrapper.find('img').exists()).toBe(true)
      await wrapper.find('img').trigger('error')
      expect(wrapper.find('img').exists()).toBe(false)
      expect(wrapper.find('div[role="img"]').exists()).toBe(true)
      expect(wrapper.text()).toContain('KR')
    })

    it('img has rounded-full and object-cover classes', () => {
      const wrapper = mount(PAvatar, {
        props: { initials: 'KR', src: 'https://example.com/photo.jpg' },
      })
      const img = wrapper.find('img')
      expect(img.classes()).toContain('rounded-full')
      expect(img.classes()).toContain('object-cover')
    })

    it('img applies sm size class', () => {
      const wrapper = mount(PAvatar, {
        props: { initials: 'KR', src: 'https://example.com/photo.jpg', size: 'sm' },
      })
      expect(wrapper.find('img').classes()).toContain('w-6')
    })
  })
})
