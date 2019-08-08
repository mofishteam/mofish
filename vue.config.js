module.exports = {
  productionSourceMap: false,
  configureWebpack: (config) => {
    config.devtool = 'source-map'
  },
  devServer: {
    port: 8908,
    proxy: {
      '/api': {
        target: 'http://localhost:8992/',
        changeOrigin: true
      },
      '/plugin': {
        target: 'http://localhost:8992/',
        changeOrigin: true
      },
      '/package': {
        target: 'http://localhost:8992/',
        changeOrigin: true
      }
    }
  }
}
