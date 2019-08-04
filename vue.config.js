module.exports = {
  devServer: {
    port: 8908,
    proxy: {
      '/api': {
        target: 'http://localhost:8888/',
        changeOrigin: true
      },
      '/plugin': {
        target: 'http://localhost:8888/',
        changeOrigin: true
      },
      '/package': {
        target: 'http://localhost:8888/',
        changeOrigin: true
      }
    }
  }
}
