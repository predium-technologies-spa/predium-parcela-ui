// packages/ui/vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    dts({
      entryRoot: 'src',
      outDir: 'dist',
      include: ['src/**/*.ts', 'src/**/*.vue'],
      exclude: ['src/**/*.test.ts', 'src/test-setup.ts'],
      tsconfigPath: './tsconfig.json',
      rollupTypes: false,
    }),
    {
      name: 'copy-styles',
      closeBundle() {
        const stripSources = (input: string): string =>
          input.replace(/^\s*@source\s+["'][^"']+["']\s*;?\s*$\n?/gm, '')

        mkdirSync(resolve(__dirname, 'dist/styles'), { recursive: true })

        for (const file of ['tokens.css', 'global.css']) {
          const src = readFileSync(resolve(__dirname, `src/styles/${file}`), 'utf8')
          writeFileSync(resolve(__dirname, `dist/styles/${file}`), stripSources(src))
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: [
        'vue',
        '@tanstack/vue-table',
        'lucide-vue-next',
        '@unovis/ts',
        '@unovis/vue',
      ],
      output: {
        globals: { vue: 'Vue' },
      },
    },
  },
})
