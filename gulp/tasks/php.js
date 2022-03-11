export const php = () => {
   return gulp.src(path.src.php)
      .pipe(gulp.dest(path.build.php))
}