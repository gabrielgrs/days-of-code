import { rgba } from 'polished'

const DEFAULT_TRANSITION = 'linear'

const createTransition = (element, type = DEFAULT_TRANSITION) => `${element} 400ms ${type}`

const sharedTheme = {
  fonts: {
    type: {
      primary: 'Open Sans',
      secondary: 'Indie Flower',
    },
    weight: {
      regular: 400,
      bold: 600,
      bolder: 800,
    },
  },
  radius: {
    default: '4px',
  },
  shadows: {
    soft: '0px 0px 3px 0px rgba(0,0,0,0.30)',
    medium: '0px 0px 8px 0px rgba(0,0,0,0.50)',
    hard: '0px 0px 10px 0px rgba(0,0,0,0.50)',
    colored: (color) => `0px 1px 10px 0px ${rgba(color, 0.3)}`,
  },
  opacity: {
    default: 0.7,
  },
  sizes: {
    xxs: '4px',
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
    xl: '40px',
    xxl: '48px',
  },
  helpers: {
    transitions: (element, type) => {
      if (!Array.isArray(element)) return createTransition(element, type)
      return element.map((e) => createTransition(e, type)).join(', ')
    },
  },
  animations: {
    appears: (name) => `@keyframes ${name} {
      from { opacity: 0%; }
      to { opacity: 100%; }
    }`,
    scale: (name) => `@keyframes ${name} {
      from { transform: scaleY(0); }
      to { transform: scaleY(1) }
    }`,
  },
}

export default sharedTheme
