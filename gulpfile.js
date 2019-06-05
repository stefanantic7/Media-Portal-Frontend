const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const nunjucks = require('gulp-nunjucks');
const data = require('gulp-data');
const fs = require('fs');
const path = require('path');
const connect = require('gulp-connect');

var uglify = require('gulp-uglify');


gulp.task('sass', function() {
  return gulp.src('src/sass/style.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(postcss([ autoprefixer() ]))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./dist/css'))
});
gulp.task('minify-css', function() {
  return gulp.src(['dist/css/*.css', '!dist/css/*.min.css'])
  .pipe(cleanCSS())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('./dist/css'))
  .pipe(connect.reload());
});

gulp.task('css', gulp.series('sass','minify-css'));

gulp.task('html', function() {
  const sidebardata = JSON.parse(fs.readFileSync('src/menu.json'));
  let templatedata = {}
  templatedata["menuitems"] = sidebardata.menuitems;
  return gulp.src(['src/html/**/*.html', '!src/html/partial/**/*.html'])
  .pipe(data(() => ({name: 'Sindre'})))
  .pipe(nunjucks.compile(templatedata))
  .pipe(gulp.dest('dist'))
});
gulp.task('copy-node', function(){
  const rawdata = fs.readFileSync('vendor.json');
  const assets = JSON.parse(rawdata);
  var copytask = assets["files"];
  var prefix = "node_modules";
  var files = copytask.map(function(x){return path.join(prefix, x)});
  return gulp.src(files)
  .pipe(gulp.dest('dist/assets/vendor/'))

});
gulp.task('copy-assets', function(){
  return gulp.src("src/assets/**/*")
  .pipe(gulp.dest('dist/assets/'))

});
gulp.task('copy-vendor', function(){
  return gulp.src("src/vendor/**/*")
  .pipe(gulp.dest('dist/assets/vendor/'))

});
gulp.task('copy-scripts', function(){
  return gulp.src("src/scripts/**/*")
  .pipe(gulp.dest('dist/scripts/'))

});

gulp.task('minifyjs', function(){
  return gulp.src(["dist/scripts/**/*.js", "!dist/**/*.min.js"])
  .pipe(uglify())
  .pipe(rename({ suffix: '.min' }))
  .pipe(gulp.dest('dist/scripts/'))

});
gulp.task('scripts', gulp.series('copy-scripts','minifyjs'));
gulp.task('serve', function(){
  return connect.server({
    root: 'dist',
    livereload: true
  });
});
gulp.task('reload', function(){
  return gulp.src('./dist/**/*.*')
  .pipe(connect.reload());
});
gulp.task('watch', function(){
  gulp.watch(['src/**/*.html', 'src/menu.json'], gulp.series('html', 'reload'));
  gulp.watch('src/**/*.scss',gulp.series('css', 'reload'));
  gulp.watch('src/assets/**/*',gulp.series('copy-assets', 'reload'));
  gulp.watch('src/scripts/**/*.js',gulp.series('scripts', 'reload'));
  gulp.watch('vendor.json', gulp.series('copy-node', 'reload'));
});

gulp.task('build', gulp.parallel('html','css', 'copy-node','copy-assets', 'scripts', 'copy-vendor'));
gulp.task('default', gulp.series('build', gulp.parallel('serve','watch')));
