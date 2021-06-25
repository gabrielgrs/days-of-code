import React from 'react'
import { StyledRow } from './styles'

function Row({ children, paddingTop }) {
  return <StyledRow paddingTop={paddingTop}>{children}</StyledRow>
}

export default Row
