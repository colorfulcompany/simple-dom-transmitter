const { babel } = require('@rollup/plugin-babel')
const { terser } = require('rollup-plugin-terser')

const pluginOptions = [
  babel({ exclude: 'node_modules/**' }),
  terser()
]

module.exports = {
  input: 'src/simple-dom-transmitter.js',
  output: [
    {
      file: 'dist/simple-dom-transmitter.cjs.js',
      format: 'cjs'
    },
    {
      file: 'dist/simple-dom-transmitter.umd.js',
      format: 'umd',
      name: 'SimpleDOMTransmitter'
    }
  ],
  plugins: pluginOptions
}
