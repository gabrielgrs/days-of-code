import styled from 'styled-components'

const Tag = styled.div`
  cursor: pointer;
  border: solid black 2px;
  padding: ${({ theme }) => `${theme.sizes.xxs} ${theme.sizes.sm}`};
  user-select: none;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  border-radius: ${({ theme }) => theme.radius.default};

  background: ${({ theme, active }) => (active ? theme.colors.black : theme.colors.white)};
  color: ${({ theme, active }) => (active ? theme.colors.white : theme.colors.black)};
`

export default Tag
