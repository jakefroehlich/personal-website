const path = require('path');

module.exports = {
    entry: path.join(__dirname, './src/client/index.jsx'),
    output: {
      path: path.join(__dirname, './dist'),
      filename: 'main.js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
          ],
        },
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
          },
          exclude: /node_modules/,
        },
        { test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          use: { 
            loader: 'url-loader?limit=100000' }
        }
      ],
    },
  };
  