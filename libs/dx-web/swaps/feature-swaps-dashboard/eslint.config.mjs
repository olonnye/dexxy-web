import nx from '@nx/eslint-plugin';
import baseConfig from '../../../../eslint.config.mjs';

export default [
    ...nx.configs['flat/react'],
    ...baseConfig,
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                // `projectService` conflicts with a `parserOptions.project` set by any config
                // merged into this one. Remove this once you know none of them set it.
                project: null,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        // Override or add rules here
        rules: {},
    },
    {
        ignores: ['**/out-tsc'],
    },
];
