import { createTheme } from '@material-ui/core';

import 'react-toastify/dist/ReactToastify.css';

const fonts = ['Roboto', 'Montserrat', '"Helvetica Neue"', 'Arial'];

const ThemeLight = {
  header: {
    height: '97px',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: fonts.join(','),
    fonts,
    h1: {
      fontSize: '3rem',
      fontFamily: fonts[1],
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontFamily: fonts[1],
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.8rem',
      fontFamily: fonts[1],
    },
    h4: {
      fontSize: '1.5rem',
      fontFamily: fonts[1],
    },
    h5: {
      fontSize: '1.3rem',
      fontFamily: fonts[1],
    },
    h6: {
      fontSize: '1rem',
      fontFamily: fonts[1],
    },
  },
  palette: {
    background: {
      default: '#F7F5F7',
      light: '#F9F6FC',
    },
    primary: {
      main: '#5FB3C8 ',
      dark: '#5FB3C8',
      contrastText: '#fff',
    },
    secondary: {
      main: '#5FB3C8',
      dark: '#6750A4',
    },
    tertiary: {
      main: '#C77A93',
    },
    error: {
      main: '#C77A93',
    },
    danger: {
      main: '#E68B86',
    },
    warning: {
      main: '#EDBF74',
    },
    info: {
      main: '#9DAADF',
    },
    success: {
      main: '#6EAF99',
    },
    gray: {
      default: '#B5BDD7',
      dark: '#6c6f70',
    },
    divider: '#B5BDD7',
    blue: {
      main: '#99C7FF',
    },
    green: {
      main: '#6EAF99',
    },
    yellow: {
      main: '#EDBF74',
    },
  },
};

export default createTheme(ThemeLight);
