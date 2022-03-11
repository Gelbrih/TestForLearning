
import webpack from 'webpack-stream';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';

export const js = () => {
   return gulp.src(path.src.js, { sourcemaps: isDev })
      .pipe(plugins.plumber(
         plugins.notify.onError({
            title: 'JS',
            message: 'Error: <%= error.message %>'
         })
      ))
      .pipe(webpack({
         mode: isBuild ? 'production' : 'development',
         output: {
            filename: 'main.min.js'
         }
      }))
      .pipe(babel({
         presets: ['@babel/env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest(path.build.js))
      .pipe(plugins.browsersync.stream())
}