/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        white: "#FAFBFC",
        black: "#222526",
        main: {
          100: "#222526",
          200: "#C0D3FF",
          300: "#8CB5FC",
          400: "#589BF5",
          500: "#2583E8",
          600: "#0C69B8",
          700: "#035287",
          800: "#003957",
          900: "#001B26",
        },
        secondary: {
          100: "#FFFCF2",
          200: "#FFEEC7",
          300: "#FCD89B",
          400: "#F4BB6D",
          500: "#E69640",
          600: "#B6631E",
          700: "#863E0E",
          800: "#562207",
          900: "#260D03",
        },
        gray: {
          100: "#FAFBFC",
          200: "#E6E8ED",
          300: "#D3D6DD",
          400: "#C0C5CD",
          500: "#AEB5BD",
          600: "#8A9197",
          700: "#676D71",
          800: "#45494C",
          900: "#222526",
        },
      },
    },
  },
  plugins: [],
};
