var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var UglifyWebpack = webpack.optimize.UglifyJsPlugin;
var AotPlugin = require('@ngtools/webpack').AotPlugin;
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
  devtool: 'source-map',

  entry: {
    app: './src/main.ts'
  },

  resolve: {
      extensions: ['.js', '.ts'],
  },

  module: {
    rules: [
      { test: /\.ts$/, use: ['@ngtools/webpack'] },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                use: [
                  { loader: "style-loader" },
                  { loader: "css-loader" },
                ],
        },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        use: 'raw-loader'
      }
      
    ]
  },

  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].js'
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new AotPlugin({
      tsConfigPath: './tsconfig.json'
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
          keep_fnames: true
      },
      minimize:true
    })/*,
    new BundleAnalyzerPlugin()*/
  ]
};
