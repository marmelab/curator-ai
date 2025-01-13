import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEsLint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node },
        },
        plugins: {
            react: pluginReact,
            'react-hooks': pluginReactHooks,
        },
        rules: {
            quotes: ['error', 'single'],
            semi: ['error', 'always'],
            indent: ['error', 2],
            'no-multi-spaces': ['error'],
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },
    pluginJs.configs.recommended,
    ...tsEsLint.configs.recommended,
    pluginReact.configs.flat.recommended,
    eslintConfigPrettier,
];
