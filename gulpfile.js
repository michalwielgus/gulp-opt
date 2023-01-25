import gulp from 'gulp';
import imagemin from 'gulp-imagemin';
import imageminGifsicle from 'imagemin-gifsicle';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminSvgo from 'imagemin-svgo';
import webp from 'gulp-webp';
import cssMinify from 'gulp-css-minify';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import clean from 'gulp-clean';

export const compressImages = () =>
  gulp
    .src([
      'src/**/*.jpg',
      'src/**/*.jpeg',
      'src/**/*.png',
      'src/**/*.gif',
      'src/**/*.svg',
    ])
    .pipe(
      imagemin(
        [
          imageminGifsicle({ interlaced: true }),
          imageminMozjpeg({
            quality: 75,
            progressive: true,
          }),
          imageminOptipng({ optimizationLevel: 7 }),
          imageminSvgo(),
        ],
        {
          verbose: true,
        },
      ),
    )
    .pipe(gulp.dest('dist'));
compressImages.displayName = 'images:compress';

export const convertToWebp = () =>
  gulp
    .src(['src/**/*.jpg', 'src/**/*.jpeg', 'src/**/*.png'])
    .pipe(webp())
    .pipe(gulp.dest('dist'));
convertToWebp.displayName = 'images:webp';

export const minifyCSS = () =>
  gulp.src('src/**/*.css').pipe(cssMinify()).pipe(gulp.dest('dist'));
minifyCSS.displayName = 'css:minify';

export const concatAndMinifyCSS = () =>
  gulp
    .src('src/**/*.css')
    .pipe(concat('all.min.css'))
    .pipe(cssMinify())
    .pipe(gulp.dest('dist'));
concatAndMinifyCSS.displayName = 'css:concat';

export const minifyJS = () =>
  gulp.src('src/**/*.js').pipe(uglify()).pipe(gulp.dest('dist'));
minifyJS.displayName = 'js:minify';

export const concatAndMinifyJS = () =>
  gulp
    .src('src/**/*.js')
    .pipe(concat('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
concatAndMinifyJS.displayName = 'js:concat';

export const cleanDirs = async () => {
  await gulp.src(['dist/*', 'src/*'], { read: false }).pipe(clean());
};
cleanDirs.displayName = 'clean:all';

export const cleanDistDir = async () => {
  await gulp.src(['dist/*'], { read: false }).pipe(clean());
};
cleanDistDir.displayName = 'clean:dist';

export const cleanSrcDir = async () => {
  await gulp.src(['src/*'], { read: false }).pipe(clean());
};
cleanSrcDir.displayName = 'clean:src';
