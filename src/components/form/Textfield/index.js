import styled from 'styled-components'

const Textfield = styled.input`
  cursor: ${({ disabled }) => disabled && 'not-allowed'};
  display: block;
  padding: 0.3em 1.3em;
  height: 44px;
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.black};
  border: ${({ theme, error }) => `2px ${error ? theme.colors.danger : theme.colors.silver} solid`};
  background: ${({ theme }) => theme.colors.white};
  background-image: none;
  background-clip: padding-box;
  border-radius: ${({ theme }) => theme.radius.default};
  width: 100%;
  box-sizing: border-box;
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};

  &:focus {
    border: 2px solid ${({ theme, error }) => (error ? theme.colors.danger : theme.colors.primary)};
    box-shadow: ${({ theme }) => theme.shadows.colored(theme.colors.primary)};
    outline: 0;
  }
`

export default Textfield
