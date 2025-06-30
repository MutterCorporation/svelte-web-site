import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		hmr: {
			overlay: true,
			port: 24678
		},
		fs: {
			allow: ['..']
		},
		proxy: {
			'/api': {
				target: 'http://localhost:3001',
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	},
	optimizeDeps: {
		include: ['svelte', '@sveltejs/kit']
	},
	build: {
		target: 'esnext'
	}
});
