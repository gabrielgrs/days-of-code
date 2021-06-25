import styled from 'styled-components'

export const StyledRow = styled.div`
  position: relative;
  width: 100%;
  padding-top: ${({ theme, paddingTop }) => theme.sizes[paddingTop]};

  &::after {
    content: '';
    display: table;
    clear: both;
  }
`
