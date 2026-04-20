import type { Preview } from '@storybook/vue3'
import { useEffect, useGlobals } from '@storybook/preview-api'
import '../../../packages/ui/src/styles/tokens.css'
import '../../../packages/ui/src/styles/global.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'parcela',
      values: [
        { name: 'parcela', value: '#FAF9F7' },
        { name: 'surface', value: '#FFFFFF' },
        { name: 'dark', value: '#171411' },
      ],
    },
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
      const isDark = context.globals?.backgrounds?.value === '#171411'
      return {
        setup() {
          return { isDark }
        },
        template: `<div :class="isDark ? 'dark' : ''"><story /></div>`,
      }
    },
  ],
}

export default preview
