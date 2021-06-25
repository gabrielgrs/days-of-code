import { useState, createContext, useCallback, useEffect } from 'react'
import * as themes from 'styles/themes'
import { SkeletonTheme } from 'react-loading-skeleton'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

export const ThemeContext = createContext({
  themeName: 'light',
  onChangeTheme: () => null,
  theme: {},
})

export function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState('light')

  const theme = themes[themeName]

  const onChangeTheme = useCallback((themeName) => {
    setThemeName(themeName)
    localStorage.setItem('@doc:theme', themeName)
  }, [])

  useEffect(() => {
    const themeName = localStorage.getItem('@doc:theme')
    onChangeTheme(themeName ?? 'light')
  }, [onChangeTheme])

  return (
    <ThemeContext.Provider value={{ themeName, onChangeTheme, theme }}>
      <StyledThemeProvider theme={theme}>
        <SkeletonTheme color={theme.colors.silver} highlightColor={theme.colors.white}>
          {children}
        </SkeletonTheme>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
