import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const images = () => {
    return gulp.src(path.src.images)
        /* .pipe(plugins.plumber(
              plugins.notify.onError({
                 title: 'Images',
                 message: 'Error: <%= error.message %>'
              })
           )) */
        .pipe(plugins.if(
            isBuild,
            plugins.newer(path.build.images)
        ))
        .pipe(plugins.if(
            isBuild,
            webp()
        ))
        .pipe(plugins.if(
            isBuild,
            gulp.dest(path.build.images)
        ))
        .pipe(plugins.if(
            isBuild,
            gulp.src(path.src.images)
        ))
        .pipe(plugins.if(
            isBuild,
            plugins.newer(path.build.images)
        ))
        .pipe(plugins.if(
            isBuild,
            imagemin({
                progressive: true,
                svgoPlugins: [{ removeViewBox: false }],
                interlaced: true,
                optimizationLevel: 3 // from 0 to 7
            })
        ))
        .pipe(gulp.dest(path.build.images))
        .pipe(gulp.src(path.src.svg))
        .pipe(gulp.dest(path.build.images))
        .pipe(plugins.browsersync.stream())
}