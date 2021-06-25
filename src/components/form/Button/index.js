import styled from 'styled-components'

const Button = styled.button`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  width: ${({ fullWidth }) => fullWidth && '100%'};
  opacity: ${({ disabled, theme }) => disabled && theme.opacity.default};
  height: 44px;
  min-width: 100px;
  font-size: 1.1rem;
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  background: none;
  border: solid ${({ theme }) => theme.colors.black} 2px;
  border-radius: ${({ theme }) => theme.radius.default};

  &:hover {
    background: ${({ theme, disabled }) => !disabled && theme.colors.black};
    color: ${({ theme, disabled }) => !disabled && theme.colors.white};
  }
`

export default Button
