var path = require("path");
var gulp = require("gulp");
var config = require("../project.config");

gulp.task("default", false, function () {
  gulp.tasks.help.fn();
});

gulp.task("build", "Build CSS and JS.", ['build:css', 'build:js']);

gulp.task("watch", "Perform build when sources change.", ["watch:css", "watch:js"]);
