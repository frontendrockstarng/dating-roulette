/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'hot-pink': '#FF0066',
                'electric-yellow': '#FFE500',
                'deep-burgundy': '#4A1442',
                'bright-magenta': '#E91E63',
                'sky-blue': '#00D4FF',
                'coral': '#FF6B6B',
                'lime-green': '#A0FF1F',
                'cream': '#FFF9E6',
            },
            fontFamily: {
                'sans': ['"DM Sans"', 'sans-serif'],
                'display': ['"Space Grotesk"', 'sans-serif'],
            },
            boxShadow: {
                'brutal': '8px 8px 0px #000000',
                'brutal-lg': '12px 12px 0px #000000',
                'brutal-sm': '4px 4px 0px #000000',
                'brutal-hover': '6px 6px 0px #000000',
                'brutal-active': '0px 0px 0px #000000',
            },
            borderWidth: {
                '3': '3px',
                '4': '4px',
                '6': '6px',
            }
        },
    },
    plugins: [],
}
