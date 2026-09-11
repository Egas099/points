import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/points/',
    server: {
        port: 3000,
        open: '/points/'
    },
    preview: {
        port: 3000,
        open: '/points/'
    },
    build: {
        outDir: 'dist'
    },
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        include: ['src/**/*.test.ts']
    }
});
