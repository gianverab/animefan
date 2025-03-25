/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#6366F1',
                secondary: '#8B5CF6',
                background: '#0f172a',
                card: '#1e293b',
            },
        },
    },
    plugins: [],
}
