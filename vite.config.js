import { defineConfig } from 'vite'
import { sync } from 'glob'

const noAttr = () => {
	return {
		transformIndexHtml(html) {
			return html.replaceAll(' crossorigin', '')
		}
	}
}

export default defineConfig({
	plugins: [
		noAttr(),
	],
	build: {
		rollupOptions: {
			input: sync('src/**/*.html'.replace(/\\/g, '/')),
			output: {
				assetFileNames: (assetInfo) => {
					let extType = assetInfo.name
					if (/css/.test(extType)) { extType = 'assets/css' }
					return assetInfo.originalFileName ?? `${extType}/[name][extname]`
				},
				chunkFileNames: 'assets/js/[name].js',
				entryFileNames: 'assets/js/[name].js',
			},
		},
		outDir: '../dist',
		emptyOutDir: true,
		assetsInlineLimit: 0,
	},
	root: 'src',
	base: '',
})
