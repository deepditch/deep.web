var path = require("path");
var gulp = require("gulp"),
    del = require("del");
var config = require("../project.config");

gulp.task("clean", "Empty public js and styles folders", function (cb) {
  del([
    path.join(config.dest, config.js, "/**/*"),
    path.join(config.dest, config.styles, "/**/*")
  ], cb);
});
