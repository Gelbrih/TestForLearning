export const server = () => {
   plugins.browsersync.init({
      server: {
         baseDir: path.build.html
      },
      notify: false,
      port: 3000,
   });
}