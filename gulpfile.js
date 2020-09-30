const gulp = require('gulp');
const concat = require('gulp-concat');
const autopref = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const babel = require("gulp-babel");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');


const src = {
    
    js: './src/js/**/*',
    css: './src/sass/**/*',
    img: './src/img/**/*',
    lib: './src/lib/**/*',
    fonts: './src/fonts/**/*',

}

// WATCH
function presass() {
    return gulp.src('./src/sass/main.sass')
    .pipe(
        sass({
            outputStyle: "expanded"
        })
    )
    .pipe(autopref())
    .pipe(sourcemaps.init())
    .pipe(concat(`style.css`))
        .pipe(gulp.dest('./build/css/'))
    .pipe(cleanCSS({
        level: 2 
    }))
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
    .pipe(sourcemaps.write('/srcmaps/'))
    .pipe(gulp.dest('./build/css/'))
    .pipe(browserSync.stream())
}

function scripts() {
    return gulp.src(src.js)

    .pipe(babel())
    .on('error', console.error.bind(console))
    .pipe(concat(`script.js`))
        .pipe(gulp.dest('./build/js/'))
    .pipe(uglify({
        toplevel: true
    }))
        .pipe(
            rename({
                extname: ".min.js"
            })
        )

    .pipe(gulp.dest(`./build/js/`))
    .pipe(browserSync.stream())
}

function library(cb) {
    gulp.src(src.lib)
        .pipe(gulp.dest('./build/lib'))
    cb()
}

function fonts(cb) {
    gulp.src(['./src/fonts/*.ttf'])
        .pipe(ttf2woff())
        .pipe(gulp.dest('./build/fonts/'));
    return gulp.src(['./src/fonts/*.ttf'])
        .pipe(ttf2woff2())
        .pipe(gulp.dest('./build/fonts/'));
    return gulp.src(src.fonts)
        .pipe(gulp.dest('./build/fonts'))
    cb()
}


function compress (cb) {
  return gulp.src(src.img)
  .pipe(imagemin({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    interlaced: true,
    optimizationlevel: 3
  }))
  .pipe(gulp.dest(`./build/img/`))
  .pipe(browserSync.stream())
cb()
}

function clean() {
    return del(['build/css/*','build/fonts/*','build/img/*','build/js/*'])
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    // SASS
    gulp.watch(src.css, presass)
    gulp.watch(src.img, compress)
    gulp.watch(src.js, scripts)
    gulp.watch(src.lib, library)
    gulp.watch(src.fonts, fonts)
    gulp.watch("./*.html").on('change', browserSync.reload);
}


//gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, gulp.parallel(fonts, presass, scripts, compress, library)));

gulp.task('watch', gulp.series(clean, gulp.parallel(fonts, presass, scripts, compress, library), watch));

gulp.task('dev', gulp.series('build', 'watch'));

gulp.task('clean', clean);
gulp.task('compress', compress);
gulp.task('devsass', presass);
gulp.task('devscripts', scripts);
gulp.task('fonts', fonts);