const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        red: "#E50C14",
        gray: "#d1d0cf",
        white: "#ffffff",
        "dark-01": "#141414",
        "dark-02": "#191919",
        "dark-03": "rgba(20,20,20,.5)",
      },
    },
    screens: {
      mobile: "320px",
      ...defaultTheme.screens,
    },
  },
  plugins: [],
};
