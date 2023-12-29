import gulp from 'gulp';
import * as sassImported from 'sass'
import gulpSass from 'gulp-sass'
import autoPrefixer from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

browserSync.create();

const sass = gulpSass(sassImported)

// função que compila os arquivos .scss para .css e adiciona os prefixos para os navegadores até as 2 últimas versões
function compilaSass() {
  return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(autoPrefixer({
      overrideBrowserslist: ['last 2 versions'],
      cascade: false,
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
}

gulp.task('sass', compilaSass);

function pluginsCSS() {
  return gulp.src('css/lib/*.css')
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream())
}

gulp.task('pluginscss', pluginsCSS)

function concatJs() {
  return gulp.src('js/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}

gulp.task('alljs', concatJs);

function pluginsJs() {
  return gulp
    .src(['./js/lib/aos.min.js','./js/lib/swiper.min.js'])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream())
}

gulp.task('pluginjs', pluginsJs)

// função de execução do browserSync
function browser() {
  browserSync.init({
    server: {
      baseDir: './',
    }
  })
}

gulp.task('browser-sync', browser);

// função que monitora as alterações nos arquivos de .scsss e .html
function watch() {
  gulp.watch('scss/*.scss', compilaSass)
  gulp.watch('css/lib/*.css', pluginsCSS)
  gulp.watch('*.html').on('change', browserSync.reload)

  gulp.watch('js/scripts/*js', concatJs)
  gulp.watch('js/lib/*.js', pluginsJs)
}

gulp.task('watch', watch)

// tarefa que executa as funções em paralelo ao rodar o gulp direto.
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'alljs', 'pluginjs', 'pluginscss'))