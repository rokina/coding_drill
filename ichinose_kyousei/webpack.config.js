const webpack = require('webpack');
const uglifyjs = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'development',
  cache: true,
  entry: {
    'bundle': './dev/js/main.js'
  },
  output: {
    path: `${__dirname}/html/assets/js`,
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ['env', {'modules': false}]
              ]
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [
      '.js'
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new uglifyjs({
      sourceMap: true,
      uglifyOptions: {
        mangle: false,
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    })
  ],
  devtool: 'source-map'
};
