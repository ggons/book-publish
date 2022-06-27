const { src, dest, watch, series } = require('gulp');
const ejs = require('gulp-ejs');
const browserSync = require('browser-sync').create();

function ejsTask() {
  return src('./src/html/*.html').pipe(ejs()).pipe(dest('dist/html'));
}

function styleTask() {
  return src('./src/styles/**/*').pipe(dest('dist/styles'));
}

function browsersyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });

  cb();
}

function browsersyncReload(cb) {
  browserSync.reload();
  cb();
}

function watchTask() {
  watch('*.html', browsersyncReload);
  watch(
    ['src/html/*.html', 'src/html/**/*.ejs', 'src/styles/**/*.*'],
    series(ejsTask, styleTask, browsersyncReload)
  );
}

exports.default = series(ejsTask, styleTask, browsersyncServe, watchTask);
