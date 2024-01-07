const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devBuild = process.env.NODE_ENV === 'dev';

module.exports = {
  entry: [path.resolve('./src/scripts/core/gameCoordinator.js')].concat(glob.sync('./src/style/**/*.scss')),
  resolve: {
    preferRelative: true
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: devBuild ? 'development' : 'production',
  devtool: devBuild ? 'source-map' : undefined,
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [

    new CopyWebpackPlugin({
        patterns: [{
            from: 'src/style',
            to: 'style',
            globOptions: {
                ignore: ['**/scss/**']
            }
        },
        { from: 'src/favicon.ico', to: 'favicon.ico' },
]
    }),
    new MiniCssExtractPlugin({
      filename: 'style/style.css',
    }),
    new CleanWebpackPlugin(),
     new HtmlWebpackPlugin({
        template: 'src/index.html',
    }),
  ],
  devServer: {
      static: './build'
  }
};