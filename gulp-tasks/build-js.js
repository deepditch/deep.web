var path = require("path");

var gulp = require("gulp"),
  _ = require("lodash"),
  gutil = require("gulp-util"),
  webpack = require("webpack");

var webpackConfig = require("../webpack.config");
var config = require("../project.config");

gulp.task("build:js", "Build js from sources", function (callback) {
  var webpackConf = _.cloneDeep(webpackConfig);

  webpack(webpackConf, function (err, stats) {
    if (err) {
      throw new gutil.PluginError("build:js", err);
    }
    gutil.log("[build:js]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("watch:js", "Perform js build when sources change", ['build:js'], function () {
  gulp.watch(path.join(config.js, "**/*"), {cwd: config.srcFullPath}, ['build:js']);
});
