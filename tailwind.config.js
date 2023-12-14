/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs", // Adjust the path based on your project structure
    "./public/**/*.js", // Include JavaScript files if needed
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
