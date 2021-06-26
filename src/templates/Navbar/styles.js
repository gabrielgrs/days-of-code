import styled from 'styled-components'

export const Nav = styled.nav`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top: solid ${({ theme }) => theme.colors.silver} 1px;
  z-index: 1;
  background: ${({ theme }) => theme.colors.white};
`

export const Item = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    transition: all 300ms linear;
    opacity: ${({ theme }) => theme.opacity.default};
    transform: scale(1.1);
  }
`

export const Section = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.sizes.lg};
  padding: ${({ theme }) => `${theme.sizes.xs} ${theme.sizes.md}`};
`
