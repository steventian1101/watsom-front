/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        site_light: {"100":"#0057ff"},
        site_dark: {"100":"#222"}
      },
    },
  },
  plugins: [
    // eslint-disable-next-line global-require
    require('flowbite/plugin'),
  ],
}
