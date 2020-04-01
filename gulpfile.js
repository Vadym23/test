const gulp = require('gulp');
const del = require('del');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const cssFiles = [
    './node_modules/normalize.css/normalize.css',
    './src/css/style.css'
];


function htmls() {
    return gulp.src('./src/*.html')
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream());
}

function styles() {
    return gulp.src(cssFiles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

function imgs() {
    return gulp.src('./src/img/**/*')
        .pipe(gulp.dest('./build/img'))
        .pipe(browserSync.stream());
}

function watch() {
        browserSync.init({
            server: {
                baseDir: "./build/"
            }
        });


    gulp.watch('./src/css/**/*.css', styles);
    gulp.watch('./src/img/**/*', imgs);
    gulp.watch("./src/**/*.html", htmls);
}

function clean () {
    return del(['build/*'])
}

gulp.task('htmls', htmls);
gulp.task('styles', styles);
gulp.task('watch', watch);
gulp.task('clean', clean);

gulp.task('build', gulp.series(clean,
        gulp.parallel(htmls, styles, imgs)
    ));
gulp.task('dev', gulp.series('build', 'watch'));
