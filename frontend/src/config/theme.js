// Theme configuration for Nibaron Bazaar - Light Theme Only
export const themeConfig = {
  colors: {
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
      caption: '12px',
    },
    weight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.07)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
    glass: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  animations: {
    duration: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    }
  }
};

export default themeConfig;
