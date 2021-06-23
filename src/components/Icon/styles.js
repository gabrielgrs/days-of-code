import styled from 'styled-components'

export const Wrapper = styled.div`
  cursor: ${({ disabled, cursor }) => (disabled ? 'not-allowed' : cursor)};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  * {
    color: ${({ theme, color }) => theme.colors[color]};
  }

  /* &:hover {
    color: ${({ theme, disabled }) => !disabled && theme.colors.primary};
  } */
`
