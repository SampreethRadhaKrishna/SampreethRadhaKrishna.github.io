/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // warm near-black ground, cosmic-orange accent
        obsidian: '#0A0807',
        'obsidian-deep': '#050403',
        'obsidian-lift': '#141008',
        ember: {
          DEFAULT: '#FF7A1A',
          deep: '#D9520E',
          soft: '#FFB073',
          glow: '#FFC79A',
        },
        ash: '#B8AFA6',
        'ash-dim': '#7E766E',
        bone: '#F2EDE6',
      },
      fontFamily: {
        body: ["'Inconsolata'", 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ["'Inknut Antiqua'", 'Georgia', 'serif'],
        mono: ["'JetBrains Mono'", 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 24px rgba(255, 122, 26, 0.35)',
        'glow-strong': '0 0 40px rgba(255, 122, 26, 0.55), 0 0 90px rgba(255, 122, 26, 0.25)',
      },
      keyframes: {
        blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0' } },
        rise: { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
        pulse_trace: { '0%': { backgroundPosition: '0% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        blink: 'blink 1.1s step-end infinite',
        rise: 'rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both',
        trace: 'pulse_trace 2.4s linear infinite',
      },
    },
  },
  plugins: [],
};
