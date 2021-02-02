'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  RESTAPI_PREFIX: '"http://188.131.247.10:8079/api"', // 民生内部
  VBLOG_WEB_PREFIX: '"http://127.0.0.1:8000/"',
})