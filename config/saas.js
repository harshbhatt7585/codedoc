const path = require('path');

module.exports = function override(config, env) {
  const sassLoader = {
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            includePaths: [path.join(__dirname, '../src/scss')],
          },
        },
      },
    ],
  };

  config.module.rules.push(sassLoader);

  return config;
};