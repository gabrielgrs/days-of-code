import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: 'Open Sans';
    scroll-behavior: smooth;
    background: ${({ theme }) => theme.colors.white};   
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    color: ${({ theme }) => theme.colors.black};
    transition: ${({ theme }) =>
      theme.helpers.transitions(['background', 'opacity', 'color', 'box-shadow'])};
  }

  label {
    font-weight: ${({ theme }) => theme.fonts.weight.bold};
    font-size: 1.1rem;
  }

  input, textarea, select, div, button {
    font-size: 1rem;
  }

  button {
    cursor: pointer;
  }

  button, input {
    box-sizing: content-box;
  }

  input,
  textarea,
  select {
    /* font-family: 'Open Sans';
    font-size: 1rem; */
    width: 100%;
    
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
