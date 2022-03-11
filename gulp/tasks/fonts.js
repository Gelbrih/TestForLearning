import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const otfToTtf = () => {
    return gulp.src(path.src.fonts + '*.otf')
        /* .pipe(plugins.plumber(
              plugins.notify.onError({
                 title: 'Fonts',
                 message: 'Error: <%= error.message %>'
              })
           )) */
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(gulp.dest(path.src.fonts))
}

export const ttfToWoff = () => {
    return gulp.src(path.src.fonts + '*.ttf')
        /* .pipe(plugins.plumber(
              plugins.notify.onError({
                 title: 'Fonts',
                 message: 'Error: <%= error.message %>'
              })
           )) */
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(gulp.dest(path.build.fonts))
        .pipe(gulp.src(path.src.fonts + '*.ttf'))
        .pipe(ttf2woff2())
        .pipe(gulp.dest(path.build.fonts))
}

export const fontsStyles = () => {
    let fontsFile = path.sourceFolder + '/sass/base/_fonts.scss';
    // Check if font files exist
    fs.readdir(path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            // Check if 'fonts.scss' exist
            //if (!fs.existsSync(fontsFile)) {
            // if not, create
            fs.writeFile(fontsFile, '', cb);
            let newFileOnly; // font uniqueness check
            for (let i = 0; i < fontsFiles.length; i++) {
                // writing fonts to the style file
                const fontFileName = fontsFiles[i].split('.')[0];

                if (newFileOnly !== fontFileName) {
                    let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;
                    let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

                    if (fontWeight.toLowerCase() === 'thin') {
                        fontWeight = 100;
                    } else if (fontWeight.toLowerCase() === 'extralight') {
                        fontWeight = 200;
                    } else if (fontWeight.toLowerCase() === 'light') {
                        fontWeight = 300;
                    } else if (fontWeight.toLowerCase() === 'medium') {
                        fontWeight = 500;
                    } else if (fontWeight.toLowerCase() === 'semibold') {
                        fontWeight = 600;
                    } else if (fontWeight.toLowerCase() === 'bold') {
                        fontWeight = 700;
                    } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                        fontWeight = 800;
                    } else if (fontWeight.toLowerCase() === 'black') {
                        fontWeight = 900;
                    } else {
                        fontWeight = 400;
                    }

                    fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                    newFileOnly = fontFileName;
                }
            }
            //} else {
            //    console.log("Файл 'fonts.scss' существует. Для обновление необходимо его удалить.");
            //}
        }
    });

    return gulp.src(path.sourceFolder);
    function cb() { }
}