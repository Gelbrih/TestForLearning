import { configFTP } from '../config/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

export const ftp = () => {
   configFTP.log = util.log;
   const ftpConnect = vinylFTP.create(configFTP);
   return gulp.src(path.buildFolder + '/**/*.*')
      .pipe(plugins.plumber(
         plugins.notify.enError({
            title: 'FTP',
            message: 'Error: <%= error.message %>'
         })
      ))
      .pipe(ftpConnect.dest(`/${path.ftp}/${path.rootFolder}`))
}