const gulp = require('gulp');
const pug = require('gulp-pug');
const prettyHtml = require('gulp-pretty-html');
const server = require("browser-sync").create();

gulp.task('pug', function() {
  return gulp.src("./*.pug")
      .pipe(pug())
      .pipe(gulp.dest("./"))
});

gulp.task('pretty', function () {
  return gulp.src('./*.html')
      .pipe(prettyHtml({
        indent_size: 2,
        unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br']
      }))
      .pipe(gulp.dest('./'));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("server", function () {
  server.init({
    server: "./",
  });

  gulp.watch("./*.pug", gulp.series("build", "refresh"));
});

gulp.task("build", gulp.series(
  "pug",
  "pretty"
));


gulp.task("start", gulp.series(
  "build",
  "server"
));
