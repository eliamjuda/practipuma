const config = {
  plugins: ["@tailwindcss/postcss"],
};

import plugin from 'tailwindcss/plugin';

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
