/** @type {import('tailwindcss').Config} */
module.exports = {
  daisyui: {
    styled: true,
    themes: false,
    base: false,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
   darkMode: 'class',
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... },
      '3xl': '2560px',
    }
  },
  plugins: [
    // Or with a custom prefix:
    require("daisyui"),
    //require('flowbite/plugin'),
    require('@headlessui/tailwindcss')({ prefix: 'ui' }),
  ],
}
