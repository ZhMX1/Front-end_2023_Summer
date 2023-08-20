const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,

  // 配置跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://10.251.253.227:8001', // 代理的目标地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/api' // 将 /proxyApi 替换为 /api
        }
      }
    }
  },
})
