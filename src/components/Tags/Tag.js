import styled from 'styled-components'

const Tag = styled.div`
  cursor: pointer;
  border: solid black 2px;
  padding: ${({ theme }) => `${theme.sizes.xxs} ${theme.sizes.xs}`};
  user-select: none;

  background: ${({ active }) => (active ? 'black' : 'white')};
  color: ${({ active }) => (active ? 'white' : 'black')};
`

export default Tag
