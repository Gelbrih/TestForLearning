import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const baseSass = gulpSass(dartSass);

export const sass = () => {
   return gulp.src(path.src.sass, { sourcemaps: isDev })
      /* .pipe(plugins.plumber(
              plugins.notify.onError({
                 title: 'SCSS',
                 message: 'Error: <%= error.message %>'
              })
          )) */
      .pipe(plugins.replace(/@images\//g, 'images/'))
      .pipe(baseSass({
         outputStyle: 'expanded' // 'compressed'
      }))
      .pipe(plugins.if(
         isBuild,
         groupCssMediaQueries()
      ))
      .pipe(plugins.if(
         isBuild,
         webpcss({
            webpClass: '.webp',
            noWebpClass: '.no-webp'
         })
      ))
      .pipe(plugins.if(
         isBuild,
         autoprefixer({
            grid: true,
            overrideBrowserslist: ["last 3 versions"]
         })
      ))
      // create unminified css file
      .pipe(plugins.if(
         isDev,
         gulp.dest(path.build.sass)
      ))
      .pipe(cleanCss())
      .pipe(rename({
         extname: '.min.css'
      }))
      .pipe(gulp.dest(path.build.sass))
      .pipe(plugins.browsersync.stream())
}