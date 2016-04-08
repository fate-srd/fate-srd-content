(function () {

  'use strict';

  var gulp = require('gulp');
  var replace = require('gulp-replace');
  var markdown = require('gulp-markdown');
  var prettify = require('gulp-prettify');
  var dest = require('gulp-dest');

  gulp.task('md', function () {
    return gulp.src('markdown/**.md')
      .pipe(markdown())
      .pipe(gulp.dest('final-html'));
  });

  gulp.task('replace', function(){
    gulp.src(['source/*.html'])
      // Formating
      .pipe(replace('<p class="Heading-1">','\n# '))
      .pipe(replace('<p class="CC-BY_Heading-1">','\n# '))
      .pipe(replace('<p class="Heading-2">','\n## '))
      .pipe(replace('<p class="CC-BY_Heading-2">','\n## '))
      .pipe(replace('<p class="Heading-3">','\n### '))
      .pipe(replace('<p class="CC-BY_Heading-3">','\n### '))
      .pipe(replace('<p class="Heading-3 ParaOverride-1">','\n### '))
      .pipe(replace('<p class="Heading-4">','\n#### '))
      .pipe(replace('<p class="OGL_Heading-4">','\n#### '))
      .pipe(replace('<p class="CC-BY_Heading-4">','\n#### '))
      .pipe(replace('<p class="Heading-5">','\n##### '))
      .pipe(replace('<p class="CC-BY_Heading-5">','\n##### '))
      .pipe(replace('<p class="Example-start">','\n block> '))
      .pipe(replace('<p class="Example-end">','\n block> '))
      .pipe(replace('<p class="Example-middle">','\n block> '))
      .pipe(replace('<p class="Example">','\n block> '))
      .pipe(replace('<ul>',''))
      .pipe(replace('</ul>',''))
      .pipe(replace(/<li((.|\n)*?)>/gi,'- $1'))
      .pipe(replace('</li>',''))
      .pipe(replace(/^-../g,'- '))
      .pipe(replace(/<span class="Emphasis">((.|\n)*?)<\/span>/gi,'<em>$1<\/em>'))
      .pipe(replace(/<span class="Strong">((.|\n)*?)<\/span>/gi,'<strong>$1<\/strong>'))
      .pipe(replace(/<span class="CC-BY_Strong">((.|\n)*?)<\/span>/gi,'<strong>$1<\/strong>'))
      .pipe(replace(/<span class="Book-Title">((.|\n)*?)<\/span>/gi,'<em>$1<\/em>'))
      .pipe(replace(/<span class="Term">((.|\n)*?)<\/span>/gi,'<em>$1<\/em>'))
      .pipe(replace(/<span class="CC-BY_Term">((.|\n)*?)<\/span>/gi,'<em>$1<\/em>'))
      .pipe(replace(/<span class="Aspect">((.|\n)*?)<\/span>/gi,'<aspect>$1<\/aspect>'))
      .pipe(replace(/<span class="Markup">((.|\n)*?)<\/span>/gi,'<markup>$1<\/markup>'))

      // Remove anchors
      .pipe(replace(/<a id="((.|\n)*?)"><\/a>/g,''))

      // Remove specific cases (sometimes this is easier than figuring out regexp)
      .pipe(replace('<a href="NoSkill.html#_idTextAnchor002">page&#160;8</a>','page 8'))

      // Remove class and ids
      .pipe(replace(/(class|id)=\"(.*?)\"/g, ''))
      // Remove extra spaces caused from removing classes and ids
      .pipe(replace(/\s*>/g,'>'))
      
      // Remove elements
      .pipe(replace('<p>','\n'))
      .pipe(replace('</p>',''))
      .pipe(replace(/<div((.|\n)*?)>/gi,''))
      .pipe(replace('</div>',''))
      .pipe(replace('</body>',''))
      .pipe(replace('</html>',''))

      // Remove extra space at the start of a line.
      .pipe(replace(/\t*/g, ''))

      // Add aspect class
      .pipe(replace(/<aspect>((.|\n)*?)<\/aspect>/gi,'<span class="aspect">$1<\/span>'))
      
      // Fix blockquotes
      .pipe(replace(' block> ','> '))
      
      // Fix errors
      .pipe(replace('</span><span class="aspect">',''))
      .pipe(replace('</strong><strong>',''))
      .pipe(replace('</em><em>',''))

      // Clean up newlines
      .pipe(replace(/\n\n\n/g, '\n\n'))

      // Put output in markdown folder
      .pipe(dest('markdown', {ext: '.md'}))
      .pipe(gulp.dest('./'));
  });

  // gulp.task('prettify', function() {
  //   gulp.src('source/*.html')
  //     .pipe(prettify({indent_size: 2}))
  //     .pipe(gulp.dest('prettyHTML'))
  // });

})();
