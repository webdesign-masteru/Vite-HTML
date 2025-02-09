import SassGlob from 'vite-plugin-sass-glob-import';
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
    SassGlob(),
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
    assetsInlineLimit: 0,
    emptyOutDir: true,
    outDir: '../dist',
  },
  root: 'src',
  base: '',
})
