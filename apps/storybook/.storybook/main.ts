import type { StorybookConfig } from '@storybook/vue3-vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
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

    // Ensure Vue plugin handles .vue files from packages/ui
    // (Storybook's built-in Vue plugin may restrict to project root)
    config.plugins.push(vue())

    config.plugins.push(tailwindcss())

    // Add a custom resolve plugin that maps @predium-technologies-spa/predium-ui to source
    config.plugins.push({
      name: 'parcela-ui-resolve',
      resolveId(id) {
        if (id === '@predium-technologies-spa/predium-ui') {
          return resolve(uiSrc, 'index.ts')
        }
      },
    })

    // Allow Vite to serve files from the entire monorepo
    config.server = config.server || {}
    config.server.fs = config.server.fs || {}
    config.server.fs.allow = config.server.fs.allow || []
    config.server.fs.allow.push(resolve(__dirname, '../../..'))

    return config
  },
}

export default config
