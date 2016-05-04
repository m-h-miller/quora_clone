module.exports = {
  context: __dirname,
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
