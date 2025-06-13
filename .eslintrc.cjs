module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: ['node_modules/', 'dist/', 'public/'],
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', 'airbnb-base'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.vue'],
      },
    },
    'import/core-modules': ['vite', '@vitejs/plugin-vue'],
  },
  plugins: ['vue'],
  rules: {
    'max-len': ['error', { code: 150, ignoreUrls: true }],
    'implicit-arrow-linebreak': 'off',
    'no-console': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'vue/multi-word-component-names': 'off',
  },
};
