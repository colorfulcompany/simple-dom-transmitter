module.exports = {
  presets: [
    '@babel/preset-env'
  ],
  env: {
    test: {
      presets: [
        'power-assert'
      ]
    }
  }
}
