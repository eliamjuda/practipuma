const config = {
  plugins: ["@tailwindcss/postcss"],
};

const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.rotar-45': {
          transform: 'rotate(45deg)',
        },
      });
    }),
  ],
};

export default config;
