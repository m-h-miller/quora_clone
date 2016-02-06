var path = require('path');
var webpack = require('webpack');

var config = module.exports = {
  //base path
  context: __dirname,
  //main entry point for frontend JS
  entry: './frontend/javascripts/quorum.js.jsx',
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
};

config.output = {
  //app/assets/javascripts
  path: './app/assets/javascripts/',
  //filename of outputted bundle
  filename: 'bundle.js',
};

config.resolve = {
  extensions: ['', '.js', '.jsx'],
  modulesDirectories: [ 'node_modules' ],
};
