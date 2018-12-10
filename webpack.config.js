var path = require("path");
var config = require("./project.config");
var webpack = require("webpack");
var MiniCssExtractPlugin  = require("mini-css-extract-plugin");

module.exports = {
  context: config.srcFullPath,
  mode: "production",
  cache: true,
  devtool: "sourcemap",
  output: {
    sourceMapFilename: "[file].map",
    hotUpdateMainFilename: "updates/[hash]/update.json",
    hotUpdateChunkFilename: "updates/[hash]/js/[id].update.js"
  },
  recordsOutputPath: path.join(__dirname, "records.json"),
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
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.styl$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "stylus-loader"]
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
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
    new MiniCssExtractPlugin({
      filename: 'app.css',
    }),
  ]
};
