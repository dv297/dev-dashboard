/* eslint-disable no-extraneous-dependencies */
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Autoprefixer = require('autoprefixer');
const CustomProperties = require('postcss-custom-properties');

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'],
    modules: [path.resolve(process.cwd(), 'aggregated-translations'), 'node_modules'],
  },
  devtool: 'source-map', // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps and
  // https://webpack.github.io/docs/configuration.html#devtool
  entry: ['babel-polyfill', path.resolve(process.cwd(), 'ClientSrc/index.jsx')],
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
    path: path.resolve(process.cwd(), 'public'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './public',
  },
  plugins: [
    // Generate CSS for dist server
    new ExtractTextPlugin('dist_style.css'),
  ],
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'url-loader?name=[name].[ext]' },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=[name].[ext]',
      },
      {
        test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream&name=[name].[ext]',
      },
      {
        test: /\.svg(\?v=\d+.\d+.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=[name].[ext]',
      },
      { test: /\.(jpe?g|png|gif)$/i, loader: 'file-loader?name=[name].[ext]' },
      { test: /\.ico$/, loader: 'file-loader?name=[name].[ext]' },
      {
        test: /.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                importLoaders: 2,
                modules: {
                  mode: 'local',
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                }
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    Autoprefixer({
                      browsers: [
                        'ie >= 10',
                        'last 2 versions',
                        'last 2 android versions',
                        'last 2 and_chr versions',
                        'iOS >= 8',
                      ],
                    }),
                    CustomProperties(),
                  ];
                },
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
    ],
  },
};
