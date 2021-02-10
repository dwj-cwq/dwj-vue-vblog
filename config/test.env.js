'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  RESTAPI_PREFIX: '"http://127.0.0.1:8079/api"',
  VBLOG_WEB_PREFIX: '"http://0.0.0.0:8000/"',
})
