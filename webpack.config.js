var path = require("path");
var webpack = require("webpack");
var config = require("./project.config");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: config.srcFullPath,
  mode: "production",
  entry: {
    app: "./js/app.js"
  },
  output: {
    path: path.join(config.destFullPath, config.js),
    filename: "[name].js",
    chunkFilename: "[id].js"
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"]
        })
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract(["css-loader", "stylus-loader"])
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract(["css-loader", "less-loader"])
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(["css-loader", "sass-loader"])
      },
      { test: /\.tmpl$/, loader: "raw" },
      { test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/, loader: "file" }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, "node_modules"),
      path.join(config.srcFullPath, config.js)
    ]
  },
  plugins: [
    /* Extract styles referenced in JS files into separate css file */
    new ExtractTextPlugin("[name].css", {
      allChunks: true
    })
  ]
};
