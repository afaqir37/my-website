/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--bg)',
        'background-subtle': 'var(--bg-subtle)',
        foreground: 'var(--text)',
        'foreground-muted': 'var(--text-muted)',
        accent: 'var(--accent)',
        'accent-green': '#10b981',
        border: 'var(--border)',
        'border-light': '#334155',
        destructive: '#ef4444',
      },
      fontFamily: {
        serif: 'var(--serif)',
        sans: 'var(--sans)',
      },
    },
  },
  plugins: [],
}
