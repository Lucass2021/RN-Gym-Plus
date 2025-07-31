const {Colors} = require("./src/theme/colors.ts");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      padding: {
        7.5: "30px",
        13: "50px",
      },
      colors: Colors,
    },
  },
  plugins: [],
};
