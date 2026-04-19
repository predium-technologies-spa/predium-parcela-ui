import type { StorybookConfig } from '@storybook/vue3-vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

const uiSrc = resolve(__dirname, '../../packages/ui/src')

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-essentials',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(config) {
    config.plugins = config.plugins || []
    config.plugins.push(tailwindcss())

    // Add a custom resolve plugin that maps @parcela/ui to source
    config.plugins.push({
      name: 'parcela-ui-resolve',
      resolveId(id) {
        if (id === '@parcela/ui') {
          return resolve(uiSrc, 'index.ts')
        }
      },
    })

    // Allow Vite to serve files from the packages directory
    config.server = config.server || {}
    config.server.fs = config.server.fs || {}
    config.server.fs.allow = config.server.fs.allow || []
    config.server.fs.allow.push(resolve(__dirname, '../../packages'))

    return config
  },
}

export default config
