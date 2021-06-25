import React from 'react'
import { StyledColumn } from './styles'

function Column({ children, size, margin }) {
  return (
    <StyledColumn size={size} margin={margin}>
      {children}
    </StyledColumn>
  )
}

export default Column
