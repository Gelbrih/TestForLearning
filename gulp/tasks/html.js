import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";

export const html = () => {
   return gulp.src(path.src.html)
      /* .pipe(plugins.plumber(
            plugins.notify.onError({
               title: 'Html',
               message: 'Error: <%= error.message %>'
            })
         )) */
      .pipe(fileinclude())
      .pipe(plugins.replace(/@images\//g, 'images/'))
      .pipe(plugins.if(
         isBuild,
         webpHtmlNosvg()
      ))
      .pipe(gulp.dest(path.build.html))
      .pipe(plugins.browsersync.stream())
}