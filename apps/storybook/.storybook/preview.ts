import type { Preview } from '@storybook/vue3'
import '@parcela/ui/styles/tokens.css'
import '@parcela/ui/styles/global.css'

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
        { name: 'parcela', value: '#FAFAF7' },
        { name: 'surface', value: '#FFFFFF' },
        { name: 'dark', value: '#17140F' },
      ],
    },
    layout: 'centered',
  },
}

export default preview
