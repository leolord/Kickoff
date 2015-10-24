'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence');

gulp.task('show:config',   require('./scripts/gulp/show-config.js')(gulp));

gulp.task('build:jade',    require('./scripts/gulp/build/jade.js')(gulp));
gulp.task('build:copy',    require('./scripts/gulp/build/copy.js')(gulp));
gulp.task('build:sass',    require('./scripts/gulp/build/sass.js')(gulp));
gulp.task('build:webpack', require('./scripts/gulp/build/webpack.js')(gulp));

gulp.task('clean',         require('./scripts/gulp/clean.js')(gulp));

gulp.task('start-livereload', require('./scripts/gulp/watch/start-livereload.js')(gulp));
gulp.task('watch:pre-jade',  require('./scripts/gulp/watch/pre-jade.js')(gulp));
gulp.task('watch:pre-sass',  require('./scripts/gulp/watch/pre-sass.js')(gulp));

gulp.task('watch:jade',     ['watch:pre-jade'], require('./scripts/gulp/watch/jade.js')(gulp));
gulp.task('watch:sass',     ['watch:pre-sass'], require('./scripts/gulp/watch/sass.js')(gulp));
gulp.task('watch:copy',     ['build:copy'], require('./scripts/gulp/watch/copy.js')(gulp));
gulp.task('watch:webpack',  require('./scripts/gulp/watch/webpack.js')(gulp));


gulp.task('build',   sequence(['build:webpack', 'build:sass', 'build:copy'], 'build:jade'));
gulp.task('default', sequence('clean', 'build'));
gulp.task('dev',     ['start-livereload', 'watch:sass', 'watch:webpack', 'watch:jade', 'watch:copy']);

gulp.task('page', require('./scripts/gulp/new.js')(gulp));
