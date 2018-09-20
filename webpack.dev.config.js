var path = require("path");
var _ = require("lodash");
var webpackConfig = require("./webpack.config");

module.exports = _.merge(webpackConfig, {
  mode: 'development',
  cache: true,
  devtool: "sourcemap",
  output: {
    sourceMapFilename: "[file].map",
    hotUpdateMainFilename: "updates/[hash]/update.json",
    hotUpdateChunkFilename: "updates/[hash]/js/[id].update.js"
  },
  recordsOutputPath: path.join(__dirname, "records.json")
});
