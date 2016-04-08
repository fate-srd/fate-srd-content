(function () {

  'use strict';

  var gulp = require('gulp');
  var replace = require('gulp-replace');
  var markdown = require('gulp-markdown');
  var prettify = require('gulp-prettify');
  var dest = require('gulp-dest');
  var pandoc = require('gulp-pandoc');
  var exec = require('child_process').exec;

  gulp.task('md', function () {
    return gulp.src('docs/markdown/**.md')
      .pipe(markdown())
      .pipe(gulp.dest('docs/html'));
  });

  gulp.task('pandoc', function (cb) {
    exec('pandoc -s -S docs/markdown/atomic-robo-SRD.md -o docs/word/atomic-robo-SRD.docx');
    exec('pandoc -s -S docs/markdown/fate-accelerated-SRD.md -o docs/word/fate-accelerated-SRD.docx');
    exec('pandoc -s -S docs/markdown/fate-core-SRD.md -o docs/word/fate-core-SRD.docx');
    exec('pandoc -s -S docs/markdown/fate-system-toolkit-SRD.md -o docs/word/fate-system-toolkit-SRD.docx');
    exec('pandoc -s -S docs/markdown/frontier-spirit.md -o docs/word/frontier-spirit.docx');
    exec('pandoc -s -S docs/markdown/gods-and-monsters-SRD.md -o docs/word/gods-and-monsters-SRD.docx');
    exec('pandoc -s -S docs/markdown/sails-full-of-stars-SRD.md -o docs/word/sails-full-of-stars-SRD.docx');
    exec('pandoc -s -S docs/markdown/three-rocketeers-fate-conspiracies-SRD.md -o docs/word/three-rocketeers-fate-conspiracies-SRD.docx');
    exec('pandoc -s -S docs/markdown/three-rocketeers-no-skill-swashbuckling-SRD.md -o docs/word/three-rocketeers-no-skill-swashbuckling-SRD.docx');
  })
    


  gulp.task('replace', function(){
    gulp.src(['source/*.html'])
      // Remove specific cases (sometimes this is easier than figuring out regexp)
      .pipe(replace('<a href="NoSkill.html#_idTextAnchor002">page&#160;8</a>','page 8'))
      .pipe(replace('<!DOCTYPE html>',''))
      .pipe(replace('<html xmlns="http://www.w3.org/1999/xhtml">',''))
      .pipe(replace('<head>',''))
      .pipe(replace('</head>',''))
      .pipe(replace('<meta charset="utf-8" />',''))
      .pipe(replace(/<title>((.)*?)<\/title>/g,''))
      .pipe(replace(/<body id="(NoSkill|FrontierSpirit|Fate_Conspiracies|Sails_Full_of_Stars_SRD|GodsSRD)" lang="en-US">/g,''))
      .pipe(replace(/<link href="((.)*?).css" rel="stylesheet" type="text\/css" \/>/g,''))
      .pipe(replace('',''))
      .pipe(replace('',''))

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
      .pipe(replace(/\n\n\n/g, '\n\n'))
      .pipe(replace(/\n\n\n/g, '\n\n'))
      .pipe(replace(/\n\n\n/g, '\n\n'))
      .pipe(replace(/\n\n\n/g, '\n\n'))
      .pipe(replace(/\n\n\n/g, '\n\n'))


      // Put output in markdown folder
      .pipe(dest('docs/markdown', {ext: '.md'}))
      .pipe(gulp.dest('./'));
  });

})();
