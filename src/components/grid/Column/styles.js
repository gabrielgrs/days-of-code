import styled from 'styled-components'

const getWidthByQuantity = (size) => {
  if (!size) return '4.33%'
  const sizes = {
    1: '4.33%',
    2: '12.66%',
    3: '21%;',
    4: '29.33%;',
    5: '37.66%;',
    6: '46%',
    7: '54.33%',
    8: '62.66%',
    9: '71%',
    10: '79.33%',
    11: '87.66%',
    12: '96%',
  }

  return sizes[size]
}

export const StyledColumn = styled.div`
  width: 96%;

  float: left;
  margin: 0.5rem 2%;
  min-height: 0.125rem;

  @media only screen and (min-width: 45em) {
    width: ${({ size }) => getWidthByQuantity(size)};
  }
`
