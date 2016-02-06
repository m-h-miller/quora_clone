// I am using webpack for modularization & babel for ES2015+ transpiling,
// but I am assuming that Rails' asset pipeline will minify the assets.
//
// var path = require('path');
// var webpack = require('webpack');

module.exports = {
  //base path
  context: __dirname,
  //main entry point for frontend JS
  entry: './frontend/javascripts/quorum.jsx',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  },
  output: {
    path: "./app/assets/javascripts/",
    filename: "bundle.js"
  },
  devtool: "source-maps",
  resolve: {
    extensions: ["", ".js", ".jsx"]
  }
};

// config.output = {
//   //app/assets/javascripts
//   path: './app/assets/javascripts/',
//   //filename of outputted bundle
//   filename: 'bundle.js',
// };
//
// config.resolve = {
//   extensions: ['', '.js', '.jsx'],
//   modulesDirectories: [ 'node_modules' ],
// };
