const DEFAULT_TRANSITION = 'linear'

const createTransition = (element, type = DEFAULT_TRANSITION) => `${element} 400ms ${type}`

const theme = {
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
  colors: {
    primary: '#363537',
    secondary: '#6A7FDB',
    black: '#010101',
    white: '#f7f8ff',
    silver: '#DADADE',
    success: '#5CF590',
    warning: '#FF9141',
    danger: '#FF4141',
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
}

export default theme
