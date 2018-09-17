const rewireStyledComponents = require('react-app-rewire-styled-components')
const { injectBabelPlugin } = require('react-app-rewired')

module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env)
  if (env === 'production') {
    config = injectBabelPlugin('babel-plugin-ksx-remove-data-test-id', config)
  }
  return config
}
