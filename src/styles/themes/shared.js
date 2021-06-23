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
    default: '16px',
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
  },
}

export default sharedTheme
