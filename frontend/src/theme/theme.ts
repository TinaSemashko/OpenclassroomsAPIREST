'use client'

import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    chart: {
      barDefault: string
      barHover: string
      lineInactive: string
      bpmMin: string
      bpmMax: string
      tooltipBg: string
      tooltipText: string
    }
  }
  interface PaletteOptions {
    chart?: {
      barDefault?: string
      barHover?: string
      lineInactive?: string
      bpmMin?: string
      bpmMax?: string
      tooltipBg?: string
      tooltipText?: string
    }
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#0000ff',
      dark: '#0000cc',
      light: '#b3b3e6',
    },
    error: {
      main: '#ff0000',
      dark: '#cc0000',
      light: '#f5c5b0',
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
    chart: {
      barDefault: '#b3b3e6',
      barHover: '#6666cc',
      lineInactive: '#d4d4e8',
      bpmMin: '#f5c5b0',
      bpmMax: '#e74c3c',
      tooltipBg: '#333333',
      tooltipText: '#ffffff',
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
