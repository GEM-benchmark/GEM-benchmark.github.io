const env = require('./env-config')

module.exports = {
  'presets': [
    'next/babel',
    'rsuite'
  ],
  'plugins': [
    ['transform-define', env]
  ]
}