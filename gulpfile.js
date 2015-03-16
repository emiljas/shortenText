var gulp = require("gulp");
var karma = require('karma').server;
var jshint = require('gulp-jshint');

var clientFiles = [
  "src/client/**/*.js",
  "test/client/**/*.js"
];

gulp.task("clientTest", function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    action: 'run'
  }, done);
});

gulp.task('clientLint', function() {
  return gulp.src(clientFiles)
     .pipe(jshint())
     .pipe(jshint.reporter('default'));
});

gulp.task("watch", function() {
  gulp.watch(clientFiles, ["clientLint", "clientTest"]);
});
