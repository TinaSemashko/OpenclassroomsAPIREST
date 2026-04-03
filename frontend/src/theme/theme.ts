'use client'

import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0000ff',
      dark: '#0000cc',
    },
    error: {
      main: '#ff0000',
      dark: '#cc0000',
    },
    background: {
      default: '#f8f8ff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#888888',
      disabled: '#333333',
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
  shape: {
    borderRadius: 12,
  },
})

export default theme
