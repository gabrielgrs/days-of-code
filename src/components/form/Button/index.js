import styled from 'styled-components'

const Button = styled.button`
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  border: solid ${({ theme }) => theme.colors.black} 1px;
  width: ${({ fullWidth }) => fullWidth && '100%'};
`

export default Button
