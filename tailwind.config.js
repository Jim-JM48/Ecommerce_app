/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            screens: {
                'vs':'359px',
            }
        },
    },
    plugins: [],
};
