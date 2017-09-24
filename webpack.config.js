const path = require('path');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer-stylus');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const rootResolve = pathname => path.resolve(__dirname, './src', pathname);

module.exports = {
  entry: [
    rootResolve('app.js'),
  ],
  output: {
    path: rootResolve('build'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: rootResolve('index_template.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file',
      query: {
        name: '[name].[ext]?[hash]',
      },
    }, {
      test: /\.styl$/,
      use: [
        'style-loader?sourceMap',
        'css-loader?sourceMap', {
          loader: 'stylus-loader',
          options: {
            use: [autoprefixer({
              browsers: ['last 2 versions'],
              remove: false,
            })],
            ident: 'autoprefixer',
          },
        },
      ],
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader?name=[name].[ext]',
    }],
    noParse: /node_modules\/dist/,
  },
  resolve: {
    alias: {
      '@': rootResolve('.'),
    },
    extensions: ['*', '.js', '.styl', '.svg'],
    modules: [
      rootResolve('.'),
      'node_modules',
    ],
  },
};
