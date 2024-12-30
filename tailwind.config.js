const {nextui} = require("@nextui-org/react");

module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
       './src/**/**/*.{js,ts,jsx,tsx}',
       "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
         ],
         theme: {
            extend: {
              colors: {
              'custom-white': '#a1a1aa',
              'custom-white-light': '#fff',
              'custom-dark': '#1E1E1E',
              'custom-grey': '#ff6efd',
              'custom-pink': '#FF1CF7',
              'custom-blue': '#00F0FF',
              'custom-green': '#14ff52',
              'custom-red': '#f41c1c',
              'custom-sky-blue': '#0070f3',
              }
         
            },
          },
          darkMode: "class",
          plugins: [nextui()],
        };