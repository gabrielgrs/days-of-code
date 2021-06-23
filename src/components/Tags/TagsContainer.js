import styled from 'styled-components'

const TagsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.sizes.xs};
`

export default TagsContainer
