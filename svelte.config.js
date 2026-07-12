import adapterAuto from '@sveltejs/adapter-auto';
import adapterVercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		// Na Vercel usa adapter-vercel; localmente (Windows) evita falha de symlink (EPERM).
		adapter: process.env.VERCEL ? adapterVercel() : adapterAuto()
	}
};

export default config;
