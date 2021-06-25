import { darken } from 'polished'
import sharedTheme from './shared'
import lightTheme from './light'

const darkTheme = {
  ...sharedTheme,
  colors: {
    primary: lightTheme.colors.primary,
    secondary: lightTheme.colors.secondary,
    black: lightTheme.colors.white,
    white: lightTheme.colors.black,
    silver: darken(0.7, lightTheme.colors.silver),
    success: lightTheme.colors.success,
    warning: lightTheme.colors.warning,
    danger: lightTheme.colors.danger,
  },
  // TODO
  contrasts: {},
}

export default darkTheme
