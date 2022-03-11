export const files = () => {
   return gulp.src(path.src.files)
      .pipe(gulp.dest(path.build.files))
}