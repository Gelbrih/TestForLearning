import gulp from "gulp";
import { path } from "./gulp/config/path.js";
import { plugins } from './gulp/config/plugins.js';

import { server } from "./gulp/tasks/server.js";
import { reset } from "./gulp/tasks/reset.js";
import { files } from "./gulp/tasks/files.js";
import { html } from "./gulp/tasks/html.js";
import { sass } from "./gulp/tasks/sass.js";
import { js } from "./gulp/tasks/js.js";
import { php } from "./gulp/tasks/php.js";
import { images } from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyles } from "./gulp/tasks/fonts.js";
import { svgSprite } from "./gulp/tasks/svgSprite.js";
import { zip } from "./gulp/tasks/zip.js";
import { ftp } from "./gulp/tasks/ftp.js";

// Global variables
global.gulp = gulp;
global.path = path;
global.plugins = plugins;
global.isBuild = process.argv.includes('--build');
global.isDev = !process.argv.includes('--build');

// Monitoring file changes
function watcher() {
	console.log('watcher off');
}

// Tasks completion
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyles);
const mainTasks = gulp.series(fonts, gulp.parallel(files, html, sass, js, php, images));

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

// Tasks
export { svgSprite };
export { dev };
export { build };
export { zip };
export { ftp };

gulp.task('default', dev);
//gulp.task('build', build);
