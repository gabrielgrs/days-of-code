import React from 'react'
import PropTypes from 'prop-types'
import { StyledColumn } from './styles'

function Column({ children, size, margin }) {
  return (
    <StyledColumn size={size} margin={margin}>
      {children}
    </StyledColumn>
  )
}

Column.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  size: PropTypes.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
  margin: PropTypes.string,
}

Column.defaultProps = {
  size: 1,
  children: undefined,
  margin: '0.5rem 2%',
}

export default Column
