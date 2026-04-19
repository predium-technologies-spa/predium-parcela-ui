import { create } from '@storybook/theming'

export default create({
  base: 'light',

  // Brand
  brandTitle: 'Parcela Design System',
  brandUrl: '/',

  // Colors
  colorPrimary: '#17140F',
  colorSecondary: '#5A6B3E',

  // UI
  appBg: '#FAFAF7',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FAFAF7',
  appBorderColor: '#E8E5DE',
  appBorderRadius: 6,

  // Text
  textColor: '#17140F',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#6E6A63',

  // Toolbar
  barTextColor: '#6E6A63',
  barSelectedColor: '#17140F',
  barHoverColor: '#3A3631',
  barBg: '#FFFFFF',

  // Form
  inputBg: '#FFFFFF',
  inputBorder: '#E8E5DE',
  inputTextColor: '#17140F',
  inputBorderRadius: 5,

  // Font
  fontBase: '"Inter", -apple-system, "Segoe UI", sans-serif',
  fontCode: '"IBM Plex Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
})
