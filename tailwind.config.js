/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // warm near-black ground, cosmic-orange accent
        obsidian: '#0A0807',
        ember: {
          DEFAULT: '#FF7A1A',
          deep: '#D9520E',
          soft: '#FFB073',
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
      },
      keyframes: {
        pulse_trace: { '0%': { backgroundPosition: '0% 0' }, '100%': { backgroundPosition: '200% 0' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
      animation: {
        trace: 'pulse_trace 2.4s linear infinite',
        marquee: 'marquee 80s linear infinite',
      },
    },
  },
  plugins: [],
};
