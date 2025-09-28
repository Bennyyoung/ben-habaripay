import { deep } from '@theme-ui/presets'

export const theme = {
  ...deep,
  colors: {
    ...deep.colors,
    primary: '#007bff',
    secondary: '#6c757d',
    success: '#28a745',
    warning: '#ffc107',
    danger: '#dc3545',
    light: '#f8f9fa',
    dark: '#343a40',
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  radii: {
    default: 4,
    circle: '50%',
  },
  buttons: {
    primary: {
      color: 'white',
      bg: 'primary',
      '&:hover': {
        bg: 'blue.600',
      },
    },
    secondary: {
      color: 'text',
      bg: 'secondary',
      '&:hover': {
        bg: 'gray.500',
      },
    },
  },
}