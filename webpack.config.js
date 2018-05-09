const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssVars = require('postcss-simple-vars')
const cssVariables = require(path.resolve(__dirname, './app/theme/variables'))

const nodeEnv = process.env.NODE_ENV || 'development'

const postcssPlugins = [
  cssVars({
    variables(){
      return Object.assign({}, cssVariables)
    },
    silent: true,
  }),
]

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: {
    'index': 'index.js',
    'popup': 'popup.js',
    'contentscript': path.resolve(__dirname, './extension/contentscript.js'),
    'script': path.resolve(__dirname, './extension/script.js'),
    'background': path.resolve(__dirname, './extension/background.js'),
    'firebase-messaging-sw': path.resolve(__dirname, './extension/firebase-messaging-sw.js')
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
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
                camelCase: true,
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: postcssPlugins,
              }
            }
          ]
        })
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
    new ExtractTextPlugin('css/[name].[contenthash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv)
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './extension/manifest.json'),
        to: path.resolve(__dirname, './build/manifest.json'),
        force: true
      },
      {
        from: path.resolve(__dirname, './extension/options/'),
        to: path.resolve(__dirname, './build/options/'),
        force: true
      }
    ])
  ],
  node: {
    fs: 'empty'
  }
}
