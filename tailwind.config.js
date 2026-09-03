/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Ministry of AYUSH Design System
        ayush: {
          forest:    '#0F2E22',  // Primary header bg
          pine:      '#184E38',  // Sidebar, dividers
          herb:      '#1E6348',  // Hover states
          sage:      '#2D7A5A',  // Muted green UI elements
          leaf:      '#3B9C72',  // Success states
          mint:      '#E8F5EE',  // Light green tint
        },
        brass: {
          DEFAULT:   '#C59B27',  // Primary accent, CTAs
          light:     '#D4AF37',  // Hover accent
          dark:      '#9E7D1F',  // Active/pressed
          pale:      '#FBF4DC',  // Accent backgrounds
          border:    '#E8D98A',  // Accent borders
        },
        parchment: {
          DEFAULT:   '#F4F1EA',  // Main page background
          warm:      '#EDE9DF',  // Slightly darker parchment
          dark:      '#D8D0BE',  // Borders on parchment
        },
        surface:     '#FFFFFF',  // Cards, tables
        ink: {
          DEFAULT:   '#0F172A',  // Primary text
          muted:     '#475569',  // Secondary text
          faint:     '#94A3B8',  // Disabled / placeholder
        },
        border: {
          DEFAULT:   '#E2E8F0',  // Standard border
          strong:    '#CBD5E1',  // Emphasized border
        },
        // JRI Status colors
        quest:     '#C59B27',    // Quest mode (< 85%)
        alloc:     '#184E38',    // Allocation mode (>= 85%)
        danger:    '#DC2626',
        warn:      '#D97706',
        info:      '#2563EB',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '4px',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'xl': '10px',
        '2xl': '12px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'card-md': '0 4px 12px -2px rgba(0,0,0,0.08), 0 2px 6px -2px rgba(0,0,0,0.04)',
        'panel': '0 0 0 1px rgba(0,0,0,0.05), 0 4px 16px -4px rgba(0,0,0,0.10)',
      },
    },
  },
  plugins: [],
};
