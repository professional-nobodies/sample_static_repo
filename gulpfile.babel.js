import gulp from 'gulp'
import eslint from 'gulp-eslint'
import csslint from 'gulp-csslint'
import htmlhint from 'gulp-htmlhint'
import browserSyncModule from 'browser-sync'

const browserSync = browserSyncModule.create();

gulp.task('eslint', () => {
  return gulp.src(['app/scripts/**/*.js','!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('csslint', () => {
  return gulp.src('app/styles/**/*.css')
    .pipe(csslint())
    .pipe(csslint.formatter())
    .pipe(csslint.failFormatter());
});

gulp.task('htmlhint', () => {
  return gulp.src('app/**/*.html')
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(htmlhint.failReporter());
});

gulp.task('serve', () => {

    browserSync.init({
      notify: false,
      // Customize the Browsersync console logging prefix
      logPrefix: 'Browsersync',
      // Run as an https by uncommenting 'https: true'
      // Note: this uses an unsigned certificate which on first access
      //       will present a certificate warning in the browser.
      https: true,
      server: ['.tmp', 'app'],
      port: 3000
    });

    gulp.watch('app/**/*.html', gulp.series('htmlhint', browserSync.reload));
    gulp.watch('app/scripts/**/*.js', gulp.series('eslint', browserSync.reload));
    gulp.watch('app/styles/**/*.css', gulp.series('csslint', browserSync.reload));
});

gulp.task('default', gulp.parallel('csslint', 'htmlhint', 'eslint'));
