import PropTypes from 'prop-types'
import icons from './icons'
import { Wrapper } from './styles'

function Icon({ name, onClick, height, disabled, cursor, className, color, ...rest }) {
  const Component = icons[name]

  if (!icons[name]) throw Error(`Icon ${name} not found`)

  if (Component)
    return (
      <Wrapper
        onClick={!disabled ? onClick : () => null}
        className={className}
        cursor={cursor}
        disabled={disabled}
        color={color}
      >
        <Component className="icon" {...rest} style={{ cursor }} height={height} />
      </Wrapper>
    )
  return null
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  cursor: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
}

Icon.defaultProps = {
  onClick: null,
  height: '20',
  disabled: false,
  cursor: undefined,
  className: 'icon',
  color: 'black',
}

export default Icon
