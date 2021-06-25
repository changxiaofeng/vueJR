module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://172.16.248.23:7089/ocr-batch/',
        changOrigin: true,
        pathRewrite: {
          '^/': '/'
        }
      }
    }
  },
  publicPath: './'
}
