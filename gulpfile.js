const gulp = require('gulp');
const replace = require('gulp-replace');
const markdown = require('gulp-markdown');
const dest = require('gulp-dest');
const htmlsplit = require('gulp-htmlsplit');
const tap = require('gulp-tap');
const path = require('path');
const toMarkdown = require('gulp-to-markdown');

(() => {
  let i = 0;
  let filename;
  let splitDest;

  //  Formats most of the WOA files into Markdown.
  gulp.task('make-woa-md', () => {
    const worldsOfAdventure = [
      'source/atomic-robo-SRD.html',
      'source/fate-accelerated-SRD.html',
      'source/fate-system-toolkit-SRD.html',
      'source/frontier-spirit.html',
      'source/gods-and-monsters-SRD.html',
      'source/sails-full-of-stars-SRD.html',
      'source/three-rocketeers-fate-conspiracies-SRD.html',
      'source/three-rocketeers-no-skill-swashbuckling-SRD.html',
      'source/venture-city.html',
      'source/fate-adversary-toolkit.html',
    ];
    gulp
      .src(worldsOfAdventure)
      // Remove specific cases (sometimes this is easier than figuring out regexp)
      .pipe(replace('<a href="NoSkill.html#_idTextAnchor002">page&#160;8</a>', 'page 8'))
      .pipe(replace('<!DOCTYPE html>', ''))
      .pipe(replace('<html xmlns="http://www.w3.org/1999/xhtml">', ''))
      .pipe(replace('<head>', ''))
      .pipe(replace('</head>', ''))
      .pipe(replace('<meta charset="utf-8" />', ''))
      .pipe(replace(/<title>((.)*?)<\/title>/g, ''))
      .pipe(
        replace(
          /<body id="(NoSkill|FrontierSpirit|Fate_Conspiracies|Sails_Full_of_Stars_SRD|GodsSRD|Open_Source_Chunk)" lang="en-US">/g,
          '',
        ),
      )
      .pipe(replace(/<link href="((.)*?).css" rel="stylesheet" type="text\/css" \/>/g, ''))
      .pipe(replace('xml:lang="en-US" xmlns:xml="http://www.w3.org/XML/1998/namespace"', ''))
      .pipe(replace('', ''))

      // Formating
      .pipe(replace('<p class="Heading-1">', '\n# '))
      .pipe(replace('<p class="CC-BY_Heading-1">', '\n# '))
      .pipe(replace('<p class="Heading-2">', '\n## '))
      .pipe(replace('<p class="CC-BY_Heading-2">', '\n## '))
      .pipe(replace('<p class="Heading-3">', '\n### '))
      .pipe(replace('<p class="CC-BY_Heading-3">', '\n### '))
      .pipe(replace('<p class="Heading-3 ParaOverride-1">', '\n### '))
      .pipe(replace('<p class="Heading-4">', '\n#### '))
      .pipe(replace('<p class="OGL_Heading-4">', '\n#### '))
      .pipe(replace('<p class="CC-BY_Heading-4">', '\n#### '))
      .pipe(replace('<p class="Heading-5">', '\n##### '))
      .pipe(replace('<p class="CC-BY_Heading-5">', '\n##### '))
      .pipe(replace('<p class="Example-start">', '\n block> '))
      .pipe(replace('<p class="Example-end">', '\n block> '))
      .pipe(replace('<p class="Example-middle">', '\n block> '))
      .pipe(replace('<p class="Example">', '\n block> '))

      // War of Ashes
      // .pipe(replace(/[;](\n)/g,''))
      .pipe(replace(/(font-size|margin-(top|right|bottom|left)):\d{0,9}.\d{0,9}pt;/g, ''))
      .pipe(replace(/margin-(top|right|bottom|left):(.\d{0,9}|\d{0,9})in;/g, ''))
      .pipe(replace(/text-indent:.\d{0,9}in;/g, ''))
      .pipe(replace('mso-pagination:none;', ''))
      .pipe(replace('mso-layout-grid-align:none;', ''))
      .pipe(replace('text-autospace:none', ''))
      .pipe(replace('font-variant:small-caps', ''))
      .pipe(replace(/style=\"\ntext-autospace:\nnone\"/g, ''))
      .pipe(replace(/style=\"\nmso-layout-grid-align:\nnone;\"/g, ''))
      // .pipe(replace(/style=";\n"/g,''))

      // .pipe(replace(/<h([123456])>/gi,function(match){
      //   console.log('Match found ' + match)
      // }))
      .pipe(replace('<h1', '#'))
      .pipe(replace('<h2', '##'))
      .pipe(replace('<h3', '###'))
      .pipe(replace('<h4', '####'))
      .pipe(replace('<h5', '#####'))
      .pipe(replace('<h6', '######'))
      .pipe(replace('<ul>', ''))
      .pipe(replace('</ul>', ''))
      .pipe(replace(/<\s*li[^>]*>(.*?)<\s*\/\s*li>/g, '- $1'))
      .pipe(replace(/^-../g, '- '))
      .pipe(replace(/<span class="Emphasis">((.|\n)*?)<\/span>/gi, '<em>$1</em>'))
      .pipe(replace(/<span class="Strong">((.|\n)*?)<\/span>/gi, '<strong>$1</strong>'))
      .pipe(replace(/<span class="CC-BY_Strong">((.|\n)*?)<\/span>/gi, '<strong>$1</strong>'))
      .pipe(replace(/<span class="Book-Title">((.|\n)*?)<\/span>/gi, '<em>$1</em>'))
      .pipe(replace(/<span class="Term">((.|\n)*?)<\/span>/gi, '<em>$1</em>'))
      .pipe(replace(/<span class="CC-BY_Term">((.|\n)*?)<\/span>/gi, '<em>$1</em>'))
      .pipe(replace(/<span class="Book-Title">((.|\n)*?)<\/span>/gi, '<em>$1</em>'))
      .pipe(replace(/<span class="Aspect">((.|\n)*?)<\/span>/gi, '<aspect>$1</aspect>'))
      .pipe(replace(/<span class="Markup">((.|\n)*?)<\/span>/gi, '<markup>$1</markup>'))
      .pipe(replace('&nbsp;', ' '))

      // Remove id and style
      .pipe(replace(/(id|style)=\"(.*?)\"/g, ''))

      // Remove unique elements in core file
      .pipe(replace(/ char-style-override-(\d)/g, ''))

      // Remove anchors
      .pipe(replace(/<a id="((.|\n|)*?)"><\/a>/g, 'foo'))
      .pipe(replace(/<a href="#((.|\n)*?)">((.|\n)*?)<\/a>/g, ''))
      .pipe(replace('<a></a>', ''))

      // Remove class and ids
      .pipe(replace(/(class)=\"(.*?)\"/g, ''))
      // Remove extra spaces caused from removing classes and ids
      .pipe(replace(/\s*>/g, '>'))
      // Remove empty <span>
      .pipe(replace(/<span>((.|\n)*?)<\/span>/gi, '$1'))

      // Remove elements
      .pipe(replace('<p>', '\n'))
      .pipe(replace('</p>', ''))
      .pipe(replace(/<div((.|\n)*?)>/gi, ''))
      .pipe(replace('</div>', ''))
      .pipe(replace('</body>', ''))
      .pipe(replace('</html>', ''))
      .pipe(replace(/<a><\/a>/g, ''))

      // Remove extra space at the start of a line.
      .pipe(replace(/\t*/g, ''))

      // Add aspect class
      .pipe(replace(/<aspect>((.|\n)*?)<\/aspect>/gi, '<em class="aspect">$1</em>'))

      // Fix blockquotes
      .pipe(replace(' block> ', '> '))

      // Fix errors
      .pipe(replace('</span><em class="aspect">', ''))
      .pipe(replace('</strong><strong>', ''))
      .pipe(replace('</em><em>', ''))

      // Clean up newlines
      .pipe(replace(/\n\n\n/g, '\n\n'))
      .pipe(replace(/\n\n\n/g, '\n\n'))
      .pipe(replace(/\n\n\n/g, '\n\n'))
      .pipe(replace(/\n\n\n/g, '\n\n'))
      .pipe(replace(/\n\n\n/g, '\n\n'))
      .pipe(replace(/\n\n\n/g, '\n\n'))

      // Put output in markdown folder
      .pipe(dest('docs/markdown', { ext: '.md' }))
      .pipe(gulp.dest('./'));
  });

  //  Formats most of the WOA files into Markdown.
  gulp.task('make-adversary-md', () => {
    const adversary = ['source/fate-adversary-toolkit.html'];
    gulp
      .src(adversary)
      // Remove specific cases (sometimes this is easier than figuring out regexp)
      .pipe(replace('<a href="NoSkill.html#_idTextAnchor002">page&#160;8</a>', 'page 8'))
      .pipe(replace('<!DOCTYPE html>', ''))
      .pipe(replace('<html xmlns="http://www.w3.org/1999/xhtml">', ''))
      .pipe(replace('<head>', ''))
      .pipe(replace('</head>', ''))
      .pipe(replace('<meta charset="utf-8" />', ''))
      .pipe(replace(/<title>((.)*?)<\/title>/g, ''))
      .pipe(
        replace(
          /<body id="(NoSkill|FrontierSpirit|Fate_Conspiracies|Sails_Full_of_Stars_SRD|GodsSRD|Open_Source_Chunk)" lang="en-US">/g,
          '',
        ),
      )
      .pipe(replace(/<link href="((.)*?).css" rel="stylesheet" type="text\/css" \/>/g, ''))
      .pipe(replace('xml:lang="en-US" xmlns:xml="http://www.w3.org/XML/1998/namespace"', ''))
      .pipe(replace('', ''))

      // Formating
      .pipe(replace('<p class="Heading-1">', '\n# '))
      .pipe(replace('<p class="CC-BY_Heading-1">', '\n# '))
      .pipe(replace('<p class="Heading-2">', '\n## '))
      .pipe(replace('<p class="CC-BY_Heading-2">', '\n## '))
      .pipe(replace('<p class="Heading-3">', '\n### '))
      .pipe(replace('<p class="CC-BY_Heading-3">', '\n### '))
      .pipe(replace('<p class="Heading-3 ParaOverride-1">', '\n### '))
      .pipe(replace('<p class="Heading-4">', '\n#### '))
      .pipe(replace('<p class="OGL_Heading-4">', '\n#### '))
      .pipe(replace('<p class="CC-BY_Heading-4">', '\n#### '))
      .pipe(replace('<p class="Heading-5">', '\n##### '))
      .pipe(replace('<p class="CC-BY_Heading-5">', '\n##### '))
      .pipe(replace('<p class="Example-start">', '\n block> '))
      .pipe(replace('<p class="Example-end">', '\n block> '))
      .pipe(replace('<p class="Example-middle">', '\n block> '))
      .pipe(replace('<p class="Example">', '\n block> '))

      // War of Ashes
      // .pipe(replace(/[;](\n)/g,''))
      .pipe(replace(/(font-size|margin-(top|right|bottom|left)):\d{0,9}.\d{0,9}pt;/g, ''))
      .pipe(replace(/margin-(top|right|bottom|left):(.\d{0,9}|\d{0,9})in;/g, ''))
      .pipe(replace(/text-indent:.\d{0,9}in;/g, ''))
      .pipe(replace('mso-pagination:none;', ''))
      .pipe(replace('mso-layout-grid-align:none;', ''))
      .pipe(replace('text-autospace:none', ''))
      .pipe(replace('font-variant:small-caps', ''))
      .pipe(replace(/style=\"\ntext-autospace:\nnone\"/g, ''))
      .pipe(replace(/style=\"\nmso-layout-grid-align:\nnone;\"/g, ''))
      // .pipe(replace(/style=";\n"/g,''))

      // .pipe(replace(/<h([123456])>/gi,function(match){
      //   console.log('Match found ' + match)
      // }))
      .pipe(replace('<h1>', '\n# '))
      .pipe(replace('<h2>', '\n## '))
      .pipe(replace('<h3>', '\n### '))
      .pipe(replace('<h4>', '\n#### '))
      .pipe(replace('<h5>', '\n##### '))
      .pipe(replace('<h6>', '\n###### '))
      .pipe(replace('</h1>', ''))
      .pipe(replace('</h2>', ''))
      .pipe(replace('</h3>', ''))
      .pipe(replace('</h4>', ''))
      .pipe(replace('</h5>', ''))
      .pipe(replace('</h6>', ''))
      .pipe(replace('<ul>', ''))
      .pipe(replace('</ul>', ''))
      .pipe(replace(/<\s*li[^>]*>(.*?)<\s*\/\s*li>/g, '- $1'))
      .pipe(replace(/^-../g, '- '))
      .pipe(replace(/<span class="Emphasis">((.|\n)*?)<\/span>/gi, '<em>$1</em>'))
      .pipe(replace(/<span class="Strong">((.|\n)*?)<\/span>/gi, '<strong>$1</strong>'))
      .pipe(replace(/<span class="CC-BY_Strong">((.|\n)*?)<\/span>/gi, '<strong>$1</strong>'))
      .pipe(replace(/<span class="Book-Title">((.|\n)*?)<\/span>/gi, '<em>$1</em>'))
      .pipe(replace(/<span class="Term">((.|\n)*?)<\/span>/gi, '<em>$1</em>'))
      .pipe(replace(/<span class="CC-BY_Term">((.|\n)*?)<\/span>/gi, '<em>$1</em>'))
      .pipe(replace(/<span class="Book-Title">((.|\n)*?)<\/span>/gi, '<em>$1</em>'))
      .pipe(replace(/<span class="Aspect">((.|\n)*?)<\/span>/gi, '<aspect>$1</aspect>'))
      .pipe(replace(/<span class="Markup">((.|\n)*?)<\/span>/gi, '<markup>$1</markup>'))
      .pipe(replace('&nbsp;', ' '))

      // Remove id and style
      .pipe(replace(/(id|style)=\"(.*?)\"/g, ''))

      // Remove unique elements in core file
      .pipe(replace(/ char-style-override-(\d)/g, ''))

      // Remove anchors
      .pipe(replace(/<a id="((.|\n|)*?)"><\/a>/g, 'foo'))
      .pipe(replace(/<a href="#((.|\n)*?)">((.|\n)*?)<\/a>/g, ''))
      .pipe(replace('<a></a>', ''))

      // Remove class and ids
      .pipe(replace(/(class)=\"(.*?)\"/g, ''))
      // Remove extra spaces caused from removing classes and ids
      .pipe(replace(/\s*>/g, '>'))
      // Remove empty <span>
      .pipe(replace(/<span>((.|\n)*?)<\/span>/gi, '$1'))

      // Remove elements
      .pipe(replace('<p>', '\n'))
      .pipe(replace('</p>', ''))
      .pipe(replace(/<div((.|\n)*?)>/gi, ''))
      .pipe(replace('</div>', ''))
      .pipe(replace('</body>', ''))
      .pipe(replace('</html>', ''))
      .pipe(replace(/<a><\/a>/g, ''))

      // Remove extra space at the start of a line.
      .pipe(replace(/\t*/g, ''))

      // Add aspect class
      .pipe(replace(/<aspect>((.|\n)*?)<\/aspect>/gi, '<em class="aspect">$1</em>'))

      // Fix blockquotes
      .pipe(replace(' block> ', '> '))

      // Fix errors
      .pipe(replace('</span><span class="aspect">', ''))
      .pipe(replace('</strong><strong>', ''))
      .pipe(replace('</em><em>', ''))
      .pipe(replace('<a>', ''))
      .pipe(replace('</a>', ''))
      .pipe(replace('<li>', '- '))
      .pipe(replace('</li>', ''))

      // Clean up newlines
      .pipe(replace(/\n\n\n/g, '\n\n'))
      .pipe(replace(/\n\n\n/g, '\n\n'))
      .pipe(replace(/\n\n\n/g, '\n\n'))
      .pipe(replace(/\n\n\n/g, '\n\n'))
      .pipe(replace(/\n\n\n/g, '\n\n'))
      .pipe(replace(/\n\n\n/g, '\n\n'))
      .pipe(replace(/ {2}/g, ''))

      // Put output in markdown folder
      .pipe(dest('docs/markdown', { ext: '.md' }))
      .pipe(gulp.dest('./'));
  });

  // Formats the War of Ashes content into markdown
  gulp.task('make-warofashes-md', () => {
    gulp
      .src(['source/war-of-ashes.html'])
      .pipe(replace(/style=\"[^\"]*\"/g, ''))
      .pipe(replace(/class=\"[^\"]*\"/g, ''))

      // Put output in markdown folder
      .pipe(dest('docs/markdown', { ext: '.md' }))
      .pipe(gulp.dest('./'));
  });

  // Formats the Fate Condensed content into markdown
  gulp.task('make-condensed-md', () => gulp.src('source/Fate-Condensed-SRD-CC-BY.html')
    .pipe(replace(/style=\"[^\"]*\"/g, ''))
    .pipe(toMarkdown())
    .pipe(gulp.dest('./docs/markdown')));

  //  Takes Markdown files and turns them into HTML
  gulp.task('make-html', () => gulp
    .src('docs/markdown/**.md')
    .pipe(markdown())
    .pipe(gulp.dest('docs/html')));

  //  This splits html when it encounters an h1
  //  The assumption is that this starts new chapters.
  gulp.task('split-html', () => {
    gulp
      .src('docs/html/**.html')
      .pipe(
        tap((file, t) => {
          filename = path.basename(file.path);
          filename = filename.replace('.html', '');
          splitDest = 'for-import/';
          return filename, splitDest;
        }),
      )
      // Insert breaks before the <h1>s.
      .pipe(
        replace(/<h1 id="((.)*?)">((.|\n)*?)<\/h1>/g, (match, offset, p1, p2, p3) => {
          i++; // Start the count at 1. :-)
          return `<!-- split ${filename}-${i}-${offset}.html --><h1>${p2}</h1>`;
        }),
      )
      .pipe(htmlsplit())
      .pipe(gulp.dest(() => splitDest));
  });
})();
