import styled from 'styled-components'

function getBackground({ theme, color }) {
  if (color === 'transparent') return 'transparent'
  return theme.colors[color]
}

function getFontColor({ theme, color }) {
  if (color === 'transparent') return theme.colors.primary
  return theme.contrasts[color]
}

const Button = styled.button`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: ${getFontColor};
  background: ${getBackground};
  border: ${({ theme, color }) => `solid ${theme.colors[color]}`};
  opacity: ${({ theme, disabled }) => disabled && theme.opacities.default};
  box-shadow: ${({ theme, color }) => theme.shadows.colored(theme.colors[color || 'primary'])};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'initial')};
  padding: ${({ hasIcon }) => (hasIcon ? '0px 12px' : '10px 12px')};
  min-width: ${({ fullWidth }) => (fullWidth ? 'initial' : '160px')};
  border-radius: ${({ theme }) => theme.radius.default};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  letter-spacing: 1px;
  text-transform: uppercase;

  position: relative;
  overflow: hidden;
  -webkit-appearance: none;

  position: relative;
  text-align: center;
  text-decoration: none;
  vertical-align: top;
  white-space: nowrap;
  margin: ${({ margin }) => margin || '0'};
  padding: 0.3em 1.3em;
  height: 36px;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  :active,
  :focus {
    outline: none;
  }

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.color};
    background: ${(props) => getBackground(props)};
    color: ${(props) => getFontColor(props)};
  }

  :active {
    transform: ${({ disabled }) => (!disabled ? `translate(1px, -1px)` : null)};
  }
`

export default Button
