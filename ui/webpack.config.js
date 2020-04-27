const path = require('path');
module.exports = {
  mode: 'development',
  entry: { app: ['./src/App.jsx'] },
  output: {
    //filename: 'app.bundle.js',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
      use: [
      {
        loader: 'babel-loader',
        // options :  {
        //   presets  :  [ 'es2015', 'stage-2' ] // stage-2 if required
        // } 
      }
    ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      name: 'vendor',
      chunks: 'all',
    },
  },
  devtool: 'source-map'
};