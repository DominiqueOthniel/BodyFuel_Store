/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
        screens: {
          '2xl': '1400px',
        },
      },
      extend: {
        colors: {
          border: 'var(--color-border)', // gray-500 with opacity
          input: 'var(--color-input)', // white
          ring: 'var(--color-ring)', // Deep forest green
          background: 'var(--color-background)', // Warm off-white / Near black
          foreground: 'var(--color-foreground)', // Rich black / 90% white
          primary: {
            DEFAULT: 'var(--color-primary)', // Deep forest green / Lighter sage green
            foreground: 'var(--color-primary-foreground)', // white
          },
          secondary: {
            DEFAULT: 'var(--color-secondary)', // Balanced sage green / Deep forest green
            foreground: 'var(--color-secondary-foreground)', // white
          },
          accent: {
            DEFAULT: 'var(--color-accent)', // Energetic orange / Reduced saturation orange
            foreground: 'var(--color-accent-foreground)', // white
          },
          destructive: {
            DEFAULT: 'var(--color-destructive)', // red-600 / red-500
            foreground: 'var(--color-destructive-foreground)', // white
          },
          success: {
            DEFAULT: 'var(--color-success)', // emerald-600 / emerald-500
            foreground: 'var(--color-success-foreground)', // white
          },
          warning: {
            DEFAULT: 'var(--color-warning)', // amber-600 / amber-500
            foreground: 'var(--color-warning-foreground)', // white
          },
          error: {
            DEFAULT: 'var(--color-error)', // red-600 / red-500
            foreground: 'var(--color-error-foreground)', // white
          },
          muted: {
            DEFAULT: 'var(--color-muted)', // stone-100 / gray-800
            foreground: 'var(--color-muted-foreground)', // gray-500 / gray-400
          },
          card: {
            DEFAULT: 'var(--color-card)', // Pure white / Elevated dark
            foreground: 'var(--color-card-foreground)', // gray-800 / 90% white
          },
          popover: {
            DEFAULT: 'var(--color-popover)', // white / Elevated dark
            foreground: 'var(--color-popover-foreground)', // gray-800 / 90% white
          },
          'text-primary': 'var(--color-text-primary)', // Rich black / 90% white
          'text-secondary': 'var(--color-text-secondary)', // gray-500 / gray-400
        },
        borderRadius: {
          sm: 'var(--radius-sm)', // 6px
          md: 'var(--radius-md)', // 12px
          lg: 'var(--radius-lg)', // 18px
          xl: 'var(--radius-xl)', // 24px
        },
        fontFamily: {
          heading: ['Outfit', 'sans-serif'],
          body: ['Source Sans 3', 'sans-serif'],
          caption: ['Inter', 'sans-serif'],
          data: ['JetBrains Mono', 'monospace'],
        },
        fontSize: {
          'h1': ['2.75rem', { lineHeight: '1.1', fontWeight: '700' }],
          'h2': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }],
          'h3': ['1.75rem', { lineHeight: '1.3', fontWeight: '600' }],
          'h4': ['1.375rem', { lineHeight: '1.4', fontWeight: '500' }],
          'h5': ['1.125rem', { lineHeight: '1.5', fontWeight: '500' }],
          'body': ['1rem', { lineHeight: '1.6' }],
          'caption': ['0.875rem', { lineHeight: '1.45', letterSpacing: '0.025em' }],
          'data': ['0.875rem', { lineHeight: '1.5' }],
        },
        spacing: {
          '18': '4.5rem',
          '88': '22rem',
        },
        boxShadow: {
          'elevation-1': 'var(--shadow-sm)',
          'elevation-2': 'var(--shadow-md)',
          'elevation-3': 'var(--shadow-lg)',
          'elevation-4': 'var(--shadow-xl)',
        },
        transitionTimingFunction: {
          'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
          'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        },
        transitionDuration: {
          'smooth': '250ms',
        },
        keyframes: {
          'pulse-subtle': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.8' },
          },
          'slide-in-right': {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(0)' },
          },
          'slide-out-right': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(100%)' },
          },
          'fade-in': {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          'fade-out': {
            '0%': { opacity: '1' },
            '100%': { opacity: '0' },
          },
        },
        animation: {
          'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'slide-in-right': 'slide-in-right 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          'slide-out-right': 'slide-out-right 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          'fade-in': 'fade-in 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          'fade-out': 'fade-out 250ms cubic-bezier(0.4, 0, 0.2, 1)',
        },
        zIndex: {
          'navigation': '100',
          'dropdown': '110',
          'modal': '200',
          'toast': '300',
        },
      },
    },
    plugins: [],
  }