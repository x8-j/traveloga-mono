module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    'border-border',
    'bg-background',
    'outline-ring/50',
    {
      pattern:
        /^(bg|border|text|ring)-(background|border|foreground|card|card-foreground|popover|popover-foreground|primary|primary-foreground|secondary|secondary-foreground|muted|muted-foreground|accent|accent-foreground|destructive|input|ring|sidebar|sidebar-foreground|sidebar-primary|sidebar-primary-foreground|sidebar-accent|sidebar-accent-foreground)(\/\d+)?$/,
    },
  ],
  theme: {
    extend: {
      fontFamily: {
        Rubik: ['Rubik', 'sans'],
        openSans: ['Open Sans', 'sans'],
      },
      screens: {
        xl: '1440px',
      },
      colors: {
        border: 'var(--border)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        popover: 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: 'var(--destructive)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        sidebar: 'var(--sidebar)',
        'sidebar-foreground': 'var(--sidebar-foreground)',
        'sidebar-primary': 'var(--sidebar-primary)',
        'sidebar-primary-foreground': 'var(--sidebar-primary-foreground)',
        'sidebar-accent': 'var(--sidebar-accent)',
        'sidebar-accent-foreground': 'var(--sidebar-accent-foreground)',
      },
      borderRadius: {
        lg: 'var(--radius)',
      },
      keyframes: {
        scrollXS: {
          '100%': { transform: 'translateX(-98%)' },
        },
        scrollSM: {
          '100%': { transform: 'translateX(-90%)' },
        },
        scrollMD: {
          '100%': { transform: 'translateX(-80%)' },
        },
        scrollLG: {
          '100%': { transform: 'translateX(-70%)' },
        },
        scrollXL: {
          '100%': { transform: 'translateX(-60%)' },
        },
      },
      animation: {
        scrollInfiniteXS: 'scrollXS 20s linear infinite',
        scrollInfiniteSM: 'scrollSM 20s linear infinite',
        scrollInfiniteMD: 'scrollMD 20s linear infinite',
        scrollInfiniteLG: 'scrollLG 20s linear infinite',
        scrollInfiniteXL: 'scrollXL 20s linear infinite',
      },
    },
  },
  plugins: [],
};
