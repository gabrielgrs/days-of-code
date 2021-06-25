import styled from 'styled-components'

const Button = styled.button`
  width: ${({ fullWidth }) => fullWidth && '100%'};
  height: 44px;
  font-size: 1.1rem;
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  background: none;
  border: solid ${({ theme }) => theme.colors.black} 2px;
  border-radius: ${({ theme }) => theme.radius.default};

  &:hover {
    background: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
  }
`

export default Button
