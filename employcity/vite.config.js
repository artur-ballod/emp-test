import { defineConfig } from 'vite';
import path from 'path';
import { viteConvertPugInHtml } from '@mish.dev/vite-convert-pug-in-html';
import viteImagemin from 'vite-plugin-imagemin';
import imagePresets from 'vite-plugin-image-presets';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons-ng';

export default defineConfig({
	root: 'src',
	server: {
		port: 3001,
	},

	// base: '/emp-test/',

	plugins: [
		viteConvertPugInHtml(),
		imagePresets({
			default: {
				sizes: [1, 2],
				formats: {
					webp: { quality: 80 },
					original: {},
				},
			},
		}),

		viteImagemin({
			gifsicle: { optimizationLevel: 7 },
			optipng: { optimizationLevel: 7 },
			pngquant: { quality: [0.7, 0.9] },
			mozjpeg: { quality: 80 },
			svgo: {
				plugins: [
					{ name: 'removeViewBox', active: false },
					{ name: 'removeEmptyAttrs', active: false },
				],
			},

			webp: { quality: 80 },
		}),

		createSvgIconsPlugin({
			iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
		}),
	],

	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
          @import "@/scss/_variables.scss";
		  @import "@/scss/_functions.scss";
          @import "@/scss/_mixins.scss";
        `,
			},
		},

		lightningcss: {
          targets: 'current',
        },
	},

	build: {
		cssMinify: 'lightningcss',
		outDir: '../dist',
		assetsDir: 'assets',
	},
});