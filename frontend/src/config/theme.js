// Theme configuration for Nibaron Bazaar
export const themeConfig = {
  colors: {
    light: {
      background: {
        primary: '#fafaf6',
        secondary: '#f9f9f4',
        card: '#ffffff',
      },
      text: {
        primary: '#2a2e34',
        secondary: '#6e6e6e',
        muted: '#b0b0b0',
      },
      border: '#dcdcdc',
    },
    dark: {
      background: {
        primary: '#2a2e34',
        secondary: '#1f2329',
        card: '#3a3f47',
      },
      text: {
        primary: '#f5f5f5',
        secondary: '#b0b0b0',
        muted: '#6e6e6e',
      },
      border: '#4a4e55',
    },
    brand: {
      primary: '#68911b',
      accent: '#eab020',
      success: '#68911b',
      warning: '#eab020',
      error: '#f04e23',
    }
  },
  typography: {
    fonts: {
      heading: ['Inter', 'system-ui', 'sans-serif'],
      body: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      bengali: ['Noto Sans Bengali', 'Inter', 'sans-serif'],
    },
    scale: {
      hero: '48px',
      title: '36px',
      heading: '28px',
      subheading: '22px',
      body: '16px',
      small: '14px',
      tiny: '12px',
    }
  },
  spacing: {
    scale: [4, 8, 16, 24, 32, 48, 64, 96, 128],
    grid: {
      desktop: 1440,
      tablet: 1024,
      mobile: 375,
      padding: {
        desktop: 80,
        tablet: 60,
        mobile: 24,
      }
    }
  },
  animation: {
    duration: {
      fast: 200,
      normal: 300,
      slow: 500,
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    }
  },
  breakpoints: {
    xs: 475,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
    '3xl': 1600,
  }
};

export default themeConfig;
