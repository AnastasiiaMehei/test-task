const {nextui} = require("@nextui-org/react");

module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
       './src/**/**/*.{js,ts,jsx,tsx}',
       "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
         ],
         theme: {
            extend: {
              'custom-dark': '#171717',
              'custom-pink': '#FF1CF7',
              'custom-blue': '#00F0FF',
            },
          },
          darkMode: "class",
          plugins: [nextui()],
        };