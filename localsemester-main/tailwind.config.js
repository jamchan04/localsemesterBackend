/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#191f28",
          sub: "#6b7684",
          dark: "#e6edf3",
          brand: "#38b4ff",
        },
      },
      backgroundColor: {
        brand: {
          DEFAULT: "#ffffff",
          dark: "#0d1117",
          point: "#ededed",
        },
        card: {
          dark: "#161b22",
          hover: "#27303d",
        },
        button: {
          DEFAULT: "#38b4ff",
          hover: "#31a2e6",
          point: "#ffb703",
          pointHover: "#d69900",
        },
      },
      boxShadow: {
        "3xl": "0 10px 30px rgba(0, 0, 0, 0.5)",
        dark: "0 10px 30px rgba(80, 80, 80, 0.8)",
      },
    },
  },
  plugins: [],
};
