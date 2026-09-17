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
                    /*
                      there are 3 dimensions of tagging:
                      scope, dependency, and type.
                    */
                    depConstraints: [
                        // dependency tags
                        {
                            sourceTag: 'dependency:arc-public',
                            onlyDependOnLibsWithTags: ['dependency:arc-public', 'dependency:none'],
                            bannedExternalImports: [
                                'dependency:react',
                                'dependency:stencil',
                                '@fastify/*',
                                '@arc-private/*',
                            ],
                        },
                        {
                            sourceTag: 'dependency:arc-private',
                            onlyDependOnLibsWithTags: ['dependency:arc-private', 'dependency:none'],
                            bannedExternalImports: [
                                'dependency:react',
                                'dependency:stencil',
                                '@fastify/*',
                                '@arc-public/*',
                            ],
                        },
                        {
                            sourceTag: 'dependency:react',
                            onlyDependOnLibsWithTags: [
                                'dependency:arc-public',
                                'dependency:react',
                                'dependency:stencil',
                                'dependency:none',
                            ],
                            bannedExternalImports: ['@fastify/*', '@arc-private/*'],
                        },
                        {
                            sourceTag: 'dependency:fastify',
                            onlyDependOnLibsWithTags: [
                                'dependency:arc-private',
                                'dependency:fastify',
                                'dependency:none',
                            ],
                            bannedExternalImports: ['@react/*', '@stencil/*', '@arc-public/*'],
                        },
                        {
                            sourceTag: 'dependency:none',
                            onlyDependOnLibsWithTags: ['dependency:none'],
                            bannedExternalImports: [
                                '@react/*',
                                '@fastify/*',
                                '@arc-public/*',
                                '@arc-private/*',
                            ],
                        },
                        // application/scope tags
                        {
                            sourceTag: 'scope:dx-web',
                            onlyDependOnLibsWithTags: [
                                'scope:dx-web',
                                'scope:shared',
                                'dependency:arc-public',
                                'dependency:react',
                                'dependency:stencil',
                                'dependency:none',
                            ],
                            bannedExternalImports: ['@fastify/*', '@arc-private/*'],
                        },
                        {
                            sourceTag: 'scope:dx-api',
                            onlyDependOnLibsWithTags: [
                                'scope:dx-api',
                                'scope:shared',
                                'dependency:fastify',
                                'dependency:arc-private',
                                'dependency:none',
                            ],
                            bannedExternalImports: ['@fastify/*', '@stencil/*', '@arc-public/*'],
                        },
                        {
                            sourceTag: 'scope:shared',
                            onlyDependOnLibsWithTags: ['scope:shared'],
                        },
                        // type tags
                        {
                            sourceTag: 'type:app',
                            onlyDependOnLibsWithTags: [
                                'type:api',
                                'type:data',
                                'type:feature',
                                'type:interface',
                                'type:ui',
                                'type:util',
                            ],
                        },
                        {
                            sourceTag: 'type:data',
                            onlyDependOnLibsWithTags: ['type:data', 'type:interface', 'type:util'],
                        },
                        {
                            sourceTag: 'type:feature',
                            onlyDependOnLibsWithTags: [
                                'type:data',
                                'type:feature',
                                'type:interface',
                                'type:ui',
                                'type:util',
                            ],
                        },
                        {
                            sourceTag: 'type:ui',
                            onlyDependOnLibsWithTags: ['type:interface', 'type:ui', 'type:util'],
                        },
                        {
                            sourceTag: 'type:util',
                            onlyDependOnLibsWithTags: ['type:interface', 'type:util'],
                        },
                        {
                            sourceTag: 'type:interface',
                            onlyDependOnLibsWithTags: ['type:interface', 'type:util'],
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
