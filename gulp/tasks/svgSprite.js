import gulpSvgSprite from 'gulp-svg-sprite';

export const svgSprite = () => {
   return gulp.src(path.src.svgicons)
      /* .pipe(plugins.plumber(
            plugins.notify.onError({
               title: 'SvgSprive',
               message: 'Error: <%= error.message %>'
            })
         )) */
      .pipe(
         plugins.if(
            isBuild,
            gulpSvgSprite({
               mode: {
                  stack: {
                     sprite: '../icons/icons.svg',
                  }
               }
            })
         )
      )
      .pipe(
         plugins.if(
            isDev,
            plugins.if(
               isDev,
               gulpSvgSprite({
                  mode: {
                     stack: {
                        sprite: '../icons/icons.svg',
                        //create page with icons
                        example: true
                     }
                  }
               })
            )
         )
      )
      .pipe(gulp.dest(path.build.images))
}