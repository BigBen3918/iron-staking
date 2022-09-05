const webpack = require('webpack');

module.exports = {
  webpack: function (config, env) {
    const environment = process.env.REACT_APP_ENV;
    if (environment) {
      config.plugins.unshift(
        new webpack.NormalModuleReplacementPlugin(
          /(src\/config|src\\config)\.ts/,
          `./config.${environment}.ts`,
        ),
      );
    }
    return config;
  },
};
