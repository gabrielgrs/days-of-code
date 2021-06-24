import styled from 'styled-components'

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ template }) => template};
  grid-gap: ${({ theme }) => theme.sizes.md};
  padding: ${({ theme, spacing }) => theme.sizes[spacing]} 0;
`

export default Grid
