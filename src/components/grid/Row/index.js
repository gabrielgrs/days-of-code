import styled from 'styled-components'

const Row = styled.div`
  position: relative;
  width: 100%;

  &::after {
    content: '';
    display: table;
    clear: both;
  }
`

export default Row
