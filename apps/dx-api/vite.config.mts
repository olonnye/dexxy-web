/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodeExternals from 'rollup-plugin-node-externals';

export default defineConfig(() => ({
    root: import.meta.dirname,
    cacheDir: '../../node_modules/.vite/apps/dx-api',
    server: {
        port: 3306,
        host: 'localhost',
    },
    preview: {
        port: 3306,
        host: 'localhost',
    },
    plugins: [
        react(),
        // Will make sure dependencies from package.json are treated as external and not bundled
        { ...nodeExternals(), enforce: 'pre' },
    ],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [],
    // },
    build: {
        outDir: './dist',
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    test: {
        name: 'dx-api',
        watch: false,
        globals: true,
        environment: 'jsdom',
        include: ['{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        reporters: ['default'],
        coverage: {
            reportsDirectory: './test-output/vitest/coverage',
            provider: 'v8' as const,
        },
    },
}));
