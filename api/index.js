/*eslint-disable */
const { createProxyMiddleware } = require('http-proxy-middleware')
const config = require('../vue.config')
const proxyReqs = config.devServer.proxy

module.exports = (req, res) => {
    Object.keys(proxyReqs).forEach(key => {
        createProxyMiddleware(key, proxyReqs[key])(req, res)
    })
}