import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import plugin from 'tailwindcss/plugin';

// Plugin personalizado para rotar elementos
const rotatePlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotar-45': {
      transform: 'rotate(45deg)',
    },
  });
});

export default {
  plugins: [
    tailwindcss,      // TailwindCSS estándar
    autoprefixer,     // Autoprefixer (para compatibilidad con navegadores)
    rotatePlugin,     // Tu plugin personalizado
  ],
};