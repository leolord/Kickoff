'use strict';

var gulp = require('gulp');
var sequence = require('gulp-sequence');

gulp.task('show:config',   require('./scripts/gulp/show-config.js')());

gulp.task('build:jade',    require('./scripts/gulp/jade.js')(gulp));
gulp.task('build:copy',    require('./scripts/gulp/copy.js')(gulp));
gulp.task('build:sass',    require('./scripts/gulp/sass.js')(gulp));
gulp.task('build:webpack', require('./scripts/gulp/webpack.js')(gulp));
gulp.task('clean',         require('./scripts/gulp/clean.js')());
gulp.task('dev',           require('./scripts/gulp/dev.js'));

gulp.task('build',   sequence(['build:webpack', 'build:sass', 'build:copy'], 'build:jade'));
gulp.task('default', sequence('clean', 'build'));

gulp.task('page', require('./scripts/gulp/new.js')(gulp));
