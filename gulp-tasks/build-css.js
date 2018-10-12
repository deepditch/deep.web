var path = require("path");

var gulp = require("gulp"),
  sass = require("gulp-sass"),
  prefix = require("gulp-autoprefixer"),
  sourcemaps = require('gulp-sourcemaps'),
  plumber = require('gulp-plumber');

var config = require("../project.config");

gulp.task("build:css:css", "Build and add vendor prefixes for plain CSS", function () {
  return gulp.src([path.join(config.srcFullPath, config.styles, "*.css"), 'node_modules/*/*.css'])
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(prefix("last 1 version", "> 1%", "ie 8"))
    .pipe(gulp.dest(path.join(config.destFullPath, config.styles)));
});

gulp.task("build:css:sass", "Build and add vendor prefixes for SASS styles", function () {
  return gulp.src(path.join(config.srcFullPath, config.styles, "*.scss"))
    .pipe(plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass({ errLogToConsole: true, sourcemap: true, outputStyle: "nested", includePaths: ['node_modules'] }))
    .pipe(prefix("last 1 version", "> 1%", "ie 8"))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(config.destFullPath, config.styles)));
});

gulp.task("build:css", "Build CSS, Stylus & LESS --> CSS", [
  "build:css:css",
  "build:css:sass"
]);

gulp.task("watch:css", "Perform style build when sources change", ['build:css'], function () {
  gulp.watch(path.join(config.styles, "**/*.scss"), { cwd: config.srcFullPath }, ['build:css:sass']);
});
