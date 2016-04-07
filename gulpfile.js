(function () {

  'use strict';

  var gulp = require('gulp');
  
  var markdown = require('gulp-markdown');
   
  gulp.task('md', function () {
    return gulp.src('markdown/**.md')
      .pipe(markdown())
      .pipe(gulp.dest('html'));
  });

})();
