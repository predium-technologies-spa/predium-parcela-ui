import { create } from '@storybook/theming'

export default create({
  base: 'light',

  // Brand
  brandTitle: 'Parcela Design System',
  brandUrl: '/',

  // Colors
  colorPrimary: '#C75B39',
  colorSecondary: '#C75B39',

  // UI
  appBg: '#FAF9F7',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FAF9F7',
  appBorderColor: '#E5E1DA',
  appBorderRadius: 6,

  // Text
  textColor: '#1A1714',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#6B655D',

  // Toolbar
  barTextColor: '#6B655D',
  barSelectedColor: '#C75B39',
  barHoverColor: '#3D3833',
  barBg: '#FFFFFF',

  // Form
  inputBg: '#FFFFFF',
  inputBorder: '#E5E1DA',
  inputTextColor: '#1A1714',
  inputBorderRadius: 5,

  // Font
  fontBase: '"Inter", -apple-system, "Segoe UI", sans-serif',
  fontCode: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
})
