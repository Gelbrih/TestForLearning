import del from "del";
import gulpZip from 'gulp-zip';

export const zip = () => {
   del(path.rootFolder + '.zip');

   return gulp.src(path.buildFolder + '/**/*.*')
      /* .pipe(plugins.plumber(
           plugins.notify.onError({
              title: 'Zip',
              message: 'Error: <%= error.message %>'
           })
        )) */
      .pipe(gulpZip(path.rootFolder + '.zip'))
      .pipe(gulp.dest('./'))
}