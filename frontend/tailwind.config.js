/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light mode colors
        background: {
          DEFAULT: '#fafaf6',
          secondary: '#f9f9f4',
        },
        // Dark mode colors will be handled via CSS variables
        primary: {
          50: '#f0f9e8',
          100: '#ddf2c8',
          200: '#c7e894',
          300: '#a9db56',
          400: '#8bc926',
          500: '#68911b', // Main primary color
          600: '#527616',
          700: '#3f5a12',
          800: '#324710',
          900: '#2a3c0f',
        },
        accent: {
          50: '#fef9e7',
          100: '#fdf0c4',
          200: '#fce085',
          300: '#face46',
          400: '#f7bd1c',
          500: '#eab020', // Main accent color
          600: '#d19016',
          700: '#ae6f15',
          800: '#8f5718',
          900: '#764818',
        },
        text: {
          primary: '#2a2e34',
          secondary: '#6e6e6e',
          inverse: '#f5f5f5',
          muted: '#b0b0b0',
        },
        card: {
          DEFAULT: '#ffffff',
          dark: '#3a3f47',
        },
        border: {
          DEFAULT: '#dcdcdc',
          dark: '#4a4e55',
        },
        success: '#68911b',
        warning: '#eab020',
        error: '#f04e23',
        // Glass effect colors
        glass: {
          light: 'rgba(255, 255, 255, 0.7)',
          dark: 'rgba(58, 63, 71, 0.7)',
          border: 'rgba(255, 255, 255, 0.3)',
          'border-dark': 'rgba(255, 255, 255, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
        bengali: ['Noto Sans Bengali', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['48px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'title': ['36px', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading': ['28px', { lineHeight: '1.3' }],
        'subheading': ['22px', { lineHeight: '1.4' }],
        'body': ['16px', { lineHeight: '1.5' }],
        'small': ['14px', { lineHeight: '1.4' }],
        'tiny': ['12px', { lineHeight: '1.3' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      backdropBlur: {
        '20': '20px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-hover': '0 16px 48px rgba(104, 145, 27, 0.2)',
        'primary': '0 8px 24px rgba(104, 145, 27, 0.4)',
        'glow': '0 0 0 4px rgba(104, 145, 27, 0.1)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
      animation: {
        'float': 'float 20s infinite ease-in-out',
        'shimmer': 'shimmer 2s infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'fade-in': 'fadeIn 0.4s ease-in-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(20px, -30px) rotate(5deg)' },
          '50%': { transform: 'translate(-15px, -60px) rotate(-3deg)' },
          '75%': { transform: 'translate(30px, -40px) rotate(7deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(104, 145, 27, 0.5)' },
          '100%': { boxShadow: '0 0 40px rgba(104, 145, 27, 0.8)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}

