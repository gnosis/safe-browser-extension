const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development'

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: {
    'index': 'index.js',
    'popup': 'popup.js',
    'contentscript': path.resolve(__dirname, './extension/contentscript.js'),
    'script': path.resolve(__dirname, './extension/script.js'),
    'background': path.resolve(__dirname, './extension/background.js')
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './build'),
    filename: '[name].js'
  },
  resolve: {
    symlinks: false,
    modules: [
      path.resolve(__dirname, './app/'),
      path.resolve(__dirname, './extension/'),
      path.resolve(__dirname, './node_modules/')
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [
          path.resolve(__dirname, './node_modules/')
        ],
        loader: 'babel-loader'
      },
      {
        test: /\.(css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './app/html/index.html'),
      chunks: [
        'index'
      ]
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: path.resolve(__dirname, './app/html/popup.html'),
      chunks: [
        'popup'
      ]
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './extension/manifest.json'),
        to: path.resolve(__dirname, './build/manifest.json'),
        force: true
      }
    ])
  ],
  node: {
    fs: 'empty'
  }
}