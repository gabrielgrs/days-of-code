import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
      &::before,
      &::after {
        box-sizing: inherit;
    }
    transition: ${({ theme }) =>
      theme.helpers.transitions([
        'background',
        'color',
        'opacity',
        'top',
        'right',
        'padding',
        'border',
      ])};
    color: ${({ theme }) => theme.colors.black};
  }

  a {
    text-decoration: none;
  }

  body {
    font-family: 'Share Tech Mono';
    background: ${({ theme }) => theme.colors.white};
  }

  button {
    cursor: pointer;
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
