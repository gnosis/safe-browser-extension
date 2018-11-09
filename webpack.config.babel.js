const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssVars = require('postcss-simple-vars')
const cssVariables = require(path.resolve(__dirname, './app/theme/variables'))
const config = require(path.resolve(__dirname, './config'))
const build = require(path.resolve(__dirname, './scripts/build'))

const envKeys = build.generateEnvVariables()
build.generateManifestFile()

const postcssPlugins = [
  cssVars({
    variables () {
      return Object.assign({}, cssVariables)
    },
    silent: true
  })
]

module.exports = {
  context: path.resolve(__dirname, 'app'),
  entry: {
    'index': 'index.js',
    'popup': 'popup.js',
    'options': 'options/options.js',
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
                plugins: postcssPlugins
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpg|svg|woff|woff2)$/,
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
    new HtmlWebpackPlugin({
      filename: 'options.html',
      template: path.resolve(__dirname, './extension/options/options.html'),
      chunks: [
        'options'
      ]
    }),
    new ExtractTextPlugin('css/[name].[contenthash:8].css'),
    new webpack.DefinePlugin(envKeys),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './config/_locales'),
        to: path.resolve(__dirname, './build/_locales'),
        force: true
      }
    ]),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, './app/assets/images/', config.getFavicon()),
        to: path.resolve(__dirname, './build/assets/images/favicon.png'),
        force: true
      }
    ])
  ],
  node: {
    fs: 'empty'
  }
}
