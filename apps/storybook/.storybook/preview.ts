import type { Preview } from '@storybook/vue3'
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
        { name: 'parcela', value: '#FAFAF7' },
        { name: 'surface', value: '#FFFFFF' },
        { name: 'dark', value: '#17140F' },
      ],
    },
    layout: 'centered',
  },
}

export default preview
