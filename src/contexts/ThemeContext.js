import { useState, createContext, useCallback, useEffect } from 'react'
import * as themes from 'styles/themes'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

export const ThemeContext = createContext({
  themeName: 'light',
  onChangeTheme: () => null,
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
    <ThemeContext.Provider value={{ themeName, onChangeTheme }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
