import * as nodePath from 'path';

const distFolder = './dist';
const srcFolder = './src';
const rootFolder = nodePath.basename(nodePath.resolve());

export const path = {
   src: {
      html: srcFolder + '/html/pages/*.html',
      sass: srcFolder + '/sass/main.scss',
      js: srcFolder + '/js/main.js',
      images: srcFolder + '/images/**/*.{jpg,jpeg,png,gif,webp}',
      svg: srcFolder + '/images/**/*.svg',
      svgicons: srcFolder + '/svgicons/*.svg',
      fonts: srcFolder + '/fonts/',
      files: srcFolder + '/files/*.*',
      php: srcFolder + '/php/**/*.php'
   },
   build: {
      html: distFolder,
      sass: distFolder + '/css/',
      js: distFolder + '/js/',
      images: distFolder + '/images/',
      fonts: distFolder + '/fonts/',
      files: distFolder,
      php: distFolder + '/php/'
   },
   watch: {
      html: srcFolder + '/html/**/*.html',
      sass: srcFolder + '/sass/**/*.scss',
      js: srcFolder + '/js/**/*.js',
      images: srcFolder + '/images/**/*.{jpg,jpeg,png,gif,webp,svg,ico}',
      files: srcFolder + '/files/*.*',
      php: srcFolder + '/php/**/*.php'
   },
   clean: distFolder,
   sourceFolder: srcFolder,
   buildFolder: distFolder,
   rootFolder: rootFolder,
   ftp: './'
};