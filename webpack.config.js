const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: path.resolve(__dirname, 'app/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/'
  },
  mode:  process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins:[
    new HTMLWebpackPlugin({
      template: require('html-webpack-template'),
      title: 'Github Battle',
      appMountId: 'app',
      inject: false
    })
  ]
}