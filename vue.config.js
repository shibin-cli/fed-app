module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/fed-app/' : '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "~@/styles/variables.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      '/boss': {
        target: 'http://eduboss.lagou.com',
        changeOrigin: true // 把请求头中的host配置为target
      },
      '/front': {
        target: 'http://edufront.lagou.com',
        changeOrigin: true // 把请求头中的host配置为target
      }
    }
  }
}
