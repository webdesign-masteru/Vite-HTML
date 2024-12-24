import { defineConfig } from 'vite'

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
			input: {
				index: 'src/index.html',
				second: 'src/second.html', // Do not remove!
			},
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
		outDir: '../dist/',
		emptyOutDir: true,
		assetsInlineLimit: 0,
	},
	base: '',
	root: './src',
})
