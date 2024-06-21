import gulp from 'gulp';
import concat from 'gulp-concat';
import prefix from 'gulp-autoprefixer';
import replace from 'gulp-replace';
import browserSync from 'browser-sync';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

//Tasks
export const css = () => gulp
.src('styles/main.scss')
.pipe(prefix('last 2 version'))
.pipe(replace('/*!#','/*'))
.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
.pipe(replace('"\{\{', '{{'))
.pipe(replace('\}\}"', '}}'))
.pipe(concat('a--main.min.css.liquid'))
.pipe(replace('/*!--',''))
.pipe(replace('--*/',''))
.pipe(gulp.dest('theme-files/assets'))
.pipe(browserSync.stream());

export const fontawesome = () => gulp
.src('styles/font-awesome-pro.scss')
.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
.pipe(concat('a--fontawesome-all.css'))
.pipe(replace('../webfonts/',''))
.pipe(gulp.dest('theme-files/assets'))
.pipe(browserSync.stream());


//server init
export const server = () => {
    browserSync.init({
        notify:true
    });
    gulp.watch('styles/**/*.scss', css);
    gulp.watch('styles/**/*.scss', fontawesome);
}

export default gulp.series(css, fontawesome, server);