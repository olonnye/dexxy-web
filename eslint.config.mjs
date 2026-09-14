import nx from '@nx/eslint-plugin';

export default [
    ...nx.configs['flat/base'],
    ...nx.configs['flat/typescript'],
    ...nx.configs['flat/javascript'],
    {
        ignores: [
            '**/dist',
            '**/vite.config.*.timestamp*',
            '**/vitest.config.*.timestamp*',
            '**/test-output',
            '**/out-tsc',
            '**/build',
            '**/.react-router',
        ],
    },
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
        rules: {
            '@nx/enforce-module-boundaries': [
                'error',
                {
                    enforceBuildableLibDependency: true,
                    allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?[jt]s$'],
                    depConstraints: [
                        {
                            sourceTag: 'app:react',
                            onlyDependOnLibsWithTags: ['lib:react', 'lib:shared'],
                        },
                        {
                            sourceTag: 'lib:react',
                            onlyDependOnLibsWithTags: ['lib:react', 'lib:shared'],
                        },
                        {
                            sourceTag: 'app:fastify',
                            onlyDependOnLibsWithTags: ['lib:fastify', 'lib:shared'],
                        },
                        {
                            sourceTag: 'lib:fastify',
                            onlyDependOnLibsWithTags: ['lib:fastify', 'lib:arc','lib:shared'],
                        },
                        {
                            sourceTag: 'lib:arc',
                            onlyDependOnLibsWithTags: ['lib:arc', 'lib:shared'],
                        },
                        {
                            sourceTag: 'lib:shared',
                            onlyDependOnLibsWithTags: ['lib:shared'],
                        },
                    ],
                },
            ],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                    custom: {
                        regex: '^I[A-Z]',
                        match: false,
                    },
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase'],
                },
            ],
        },
    },
    {
        files: [
            '**/*.ts',
            '**/*.tsx',
            '**/*.cts',
            '**/*.mts',
            '**/*.js',
            '**/*.jsx',
            '**/*.cjs',
            '**/*.mjs',
        ],
        // Override or add rules here
        rules: {},
    },
];
