/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./assets/js/**/*.js"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'obsidian': '#05050A',
        'obsidian-dark': '#020205',
        'obsidian-light': '#0A0A14',
        'electric-purple': '#B026FF',
        'electric-purple-dark': '#8A2BE2',
        'electric-purple-light': '#D866FF',
        'lavender': '#B4B0C5',
        'lavender-muted': '#6B6D8A',
        'gray-100': '#1A1A2E',
        'gray-200': '#2A2A40',
        'gray-300': '#3A3A55',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'sans': ['Inter', 'Roboto Mono', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 10px rgba(176, 38, 255, 0.5), 0 0 20px rgba(176, 38, 255, 0.3)',
        'neon-strong': '0 0 15px rgba(176, 38, 255, 0.8), 0 0 30px rgba(176, 38, 255, 0.5)',
        'glow': '0 0 8px rgba(176, 38, 255, 0.4)',
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(176, 38, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(176, 38, 255, 0.03) 1px, transparent 1px)",
        'dots': "radial-gradient(rgba(176, 38, 255, 0.1) 1px, transparent 1px)",
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}
