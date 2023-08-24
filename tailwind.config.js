/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  daisyui: {
    themes: [{
      test: {
        primary: "#202829",
        secondary: "#e2212c",
        accent: "#1e6367",
        neutral: "#3d4451",
        "base-100": "#fcffff",
        "base-content": "#202829",
      },
      blueYellow: {
        primary: "#f6f338",
        secondary: "#1ecff4",
        accent: "#c1896c",
        neutral: "#3d4451",
        "base-100": "#234c74",
        "base-content": "#f6f338",
      },
      redWhite: {
        primary: "#f6f4e7",
        secondary: "#fa7685",
        accent: "#5e8834",
        neutral: "#3d4451",
        "base-100": "#442a35",
        "base-content": "#f6f4e7",
      },
    },
      "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"],
  },
  plugins: [require("daisyui"), require('@headlessui/tailwindcss')({ prefix: 'ui' })],
}

