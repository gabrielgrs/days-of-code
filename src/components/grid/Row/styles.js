import styled from 'styled-components'

export const StyledRow = styled.div`
  position: relative;
  width: 100%;

  &::after {
    content: '';
    display: table;
    clear: both;
  }
`
