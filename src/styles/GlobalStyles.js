import { darken } from 'polished'
import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Open Sans';
    scroll-behavior: smooth;
    background: ${({ theme }) => darken(0.001, theme.colors.silver)};
    color: ${({ theme }) => theme.colors.black};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  input,
  textarea,
  select {
    font-family: 'Open Sans';
    font-size: 1rem;
  }
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.silver};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`
