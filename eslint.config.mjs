import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Activa la regla para variables no utilizadas
      '@typescript-eslint/no-unused-vars': 'error',
      
      // O con opciones más específicas:
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',        // Ignora argumentos que empiecen con _
          varsIgnorePattern: '^_',        // Ignora variables que empiecen con _
          caughtErrorsIgnorePattern: '^_' // Ignora errores capturados que empiecen con _
        }
      ]
    }
  }
];

export default eslintConfig;