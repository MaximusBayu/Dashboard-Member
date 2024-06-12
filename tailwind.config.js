/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         "Header": "url('/Vector 6.png'), url('/Vector 7.png')",
      },
      backgroundPosition: {
        bottomTop: 'top, right bottom',
      },
      padding: {
        '50': '12.1rem',
      },
      backgroundSize: {
        'HeaderTop': 'contain, 1000px',
      },
    },
  },
  plugins: [],
};
