import styled from 'styled-components'

const Tag = styled.div`
  cursor: pointer;
  border: solid black 2px;
  padding: ${({ theme }) => `${theme.sizes.xxs} ${theme.sizes.sm}`};
  user-select: none;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  border-radius: ${({ theme }) => theme.radius.default};

  background: ${({ active }) => (active ? 'black' : 'white')};
  color: ${({ active }) => (active ? 'white' : 'black')};
`

export default Tag
