import type { Preview } from '@storybook/vue3'
import { onMounted } from 'vue'
import '../../../packages/ui/src/styles/tokens.css'
import '../../../packages/ui/src/styles/global.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '812px' } },
        mobileLg: { name: 'Mobile Large', styles: { width: '428px', height: '926px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1280px', height: '820px' } },
      },
    },
    layout: 'padded',
  },
  decorators: [
    (story, context) => {
      const isDark = context.globals.theme === 'dark'

      return {
        components: { story },
        setup() {
          onMounted(() => {
            // Apply .dark to <html> so CSS vars swap globally
            const root = document.documentElement
            const body = document.body
            if (isDark) {
              root.classList.add('dark')
              body.style.backgroundColor = '#171411'
              body.style.color = '#F2EEE8'
            } else {
              root.classList.remove('dark')
              body.style.backgroundColor = '#FAF9F7'
              body.style.color = '#1A1714'
            }
          })
        },
        template: '<story />',
      }
    },
  ],
}

export default preview
