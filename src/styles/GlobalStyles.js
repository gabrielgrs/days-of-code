import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
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
