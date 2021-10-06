const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pathToIndexHtml = require.resolve("./index.html");

module.exports = {
  entry: {
    index: './init.js'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [ { from: './index.html' }]
    })
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../resources/webroot')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: "html-loader",
            options: {
              interpolate: true,
              attributes: ['object:data']
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  }
}
