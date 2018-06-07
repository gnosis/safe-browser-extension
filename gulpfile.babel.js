// Define variables.
import gulp         from 'gulp';
import sourcemaps   from 'gulp-sourcemaps';
import buffer       from 'gulp-buffer';
import uglify       from 'gulp-uglify';
import tap          from 'gulp-tap';
import browserify   from 'browserify';
import babel        from 'babelify';
import autoprefixer from 'autoprefixer';
import browserSync  from 'browser-sync';
import cleancss     from 'gulp-clean-css';
import concat       from 'gulp-concat';
import del          from 'del';
import gutil        from 'gulp-util';
import imagemin     from 'gulp-imagemin';
import notify       from 'gulp-notify';
import postcss      from 'gulp-postcss';
import rename       from 'gulp-rename';
import run          from 'gulp-run';
import runSequence  from 'run-sequence';
import sass         from 'gulp-ruby-sass';
import minify       from 'gulp-minify';

// paths
const pathSCSS = './assets/scss/'
const pathCSS = './assets/css/'
const pathJS = './assets/js/'

// Uses Sass compiler to process styles, adds vendor prefixes, minifies, then
// outputs file to the appropriate location.
// gulp.task('build:styles:main', function() {
gulp.task('build:styles:main', () => {
    return sass(pathSCSS + 'global.scss', {
        style: 'compressed',
        trace: true,
        loadPath: [pathSCSS]
    }).pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
        .pipe(cleancss())
        .pipe(gulp.dest(pathCSS))
        .pipe(browserSync.stream())
        .on('error', gutil.log);
});

// Builds all styles.
gulp.task('build:styles', ['build:styles:main']);

gulp.task('clean:styles', function(callback) {
    del([
        pathCSS + 'global.css'
    ]);
    callback();
});

// Concatenates and uglifies global JS files and outputs result to the
// appropriate location.
gulp.task('build:scripts:global', () => {
    return gulp.src(pathJS + 'src/source.js',{ read: false })
    .pipe(tap((file) => {
      file.contents = browserify(file.path, {
        debug: true
      }).transform(babel)
      .bundle();
    }))
    .pipe(buffer())
    // .pipe(sourcemaps.init({ loadMaps: true }))
    // .pipe(uglify())
    // .pipe(sourcemaps.write(pathJS))
    .pipe(rename("main.js"))
    .pipe(gulp.dest(pathJS))
    .on('error', gutil.log);
});

gulp.task('clean:scripts', function(callback) {
    del([
        pathJS + 'main.js'
    ]);
    callback();
});

// Builds all scripts.
gulp.task('build:scripts', ['build:scripts:global']);

gulp.task('clean', ['clean:styles', 'clean:scripts']);

// Builds site anew.
gulp.task('build', function(callback) {
    runSequence('clean', ['build:scripts', 'build:styles'],
        callback);
});

// Default Task: builds site.
gulp.task('default', ['build']);

// gulp.task('build:scripts:watch', ['build:scripts'], function(callback) {
//     browserSync.reload();
//     callback();
// });

gulp.task('build:watch', ['build', ], function(callback) {
    browserSync.reload();
    callback();
});

// Static Server + watching files.
// Note: passing anything besides hard-coded literal paths with globs doesn't
// seem to work with gulp.watch().
gulp.task('serve', ['build'], function() {

    browserSync.init({
        server: {
          baseDir: "./",
          serveStaticOptions: {
            extensions: ["html"]
          }
        },
        ghostMode: false, // Toggle to mirror clicks, reloads etc. (performance)
        logFileChanges: true,
        logLevel: 'debug',
        open: false        // Toggle to automatically open page when starting.
    });

    // Watch .scss files; changes are piped to browserSync.
    gulp.watch('assets/scss/**/*.scss', ['clean:styles', 'build:styles']);

    gulp.watch('assets/js/src/*.js', ['clean:scripts', 'build:scripts']);

    // Watch html and markdown files.
    gulp.watch(['*.html'], ['build:watch']);

    // // Watch RSS feed XML files.
    // gulp.watch('**.xml', ['build:watch']);

    // // Watch data files.
    // gulp.watch('_data/**.*+(yml|yaml|csv|json)', ['build:watch']);

    // Watch favicon.png.
    // gulp.watch('favicon.png', ['build:watch']);
});

// Updates Ruby gems
gulp.task('update:bundle', function() {
    return gulp.src('')
        .pipe(run('bundle install'))
        .pipe(run('bundle update'))
        .pipe(notify({ message: 'Bundle Update Complete' }))
        .on('error', gutil.log);
});