'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  RESTAPI_PREFIX: '"http://188.131.247.10:8079/api"',
  VBLOG_WEB_PREFIX: '"http://0.0.0.0:8000/"',
})
