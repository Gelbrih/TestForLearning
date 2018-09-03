var gulp     	 = require('gulp'),
	babel 		 = require("gulp-babel"),
	sass    	 = require('gulp-sass'),
	server    	 = require('browser-sync'),
	rsync 		 = require('gulp-rsync'),
	plumber 	 = require('gulp-plumber'),
	uglify   	 = require('gulp-uglifyjs'),
	rigger 		 = require('gulp-rigger'),
	concat       = require('gulp-concat'),
	rename   	 = require('gulp-rename'),
	imagemin 	 = require('gulp-imagemin'),
	pngquant 	 = require('imagemin-pngquant'),
	cache    	 = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	iconfont 	 = require('gulp-iconfont'),
	del 		 = require('del');

var autoprefixerList = [
	'Chrome >= 45',
	'Firefox ESR',
	'Edge >= 12',
	'Explorer >= 10',
	'iOS >= 9',
	'Safari >= 9',
	'Android >= 4.4',
	'Opera >= 30'
];

/*--------------------------------------------------------------
# Paths
--------------------------------------------------------------*/

var path = {
	build: {
		html:  		'dist/',
		styles:   	'dist/css/',
		stylesLib:  'dist/css/',
		scripts:    'dist/js/',
		scriptsLib: 'dist/js/',		
		images:   	'dist/images/',
		fonts: 		'dist/fonts/',
		php:   		'dist/',
		htaccess: 	'dist/'
	},
	src: {
		html:  		'app/*.html',
		styles: 	'app/sass/**/*.scss',
		stylesLib:  [
					'app/libs/slick-carousel/slick/slick.scss',
					'app/libs/slick-carousel/slick/slick-theme.scss',
					'app/libs/magnific-popup/src/css/main.scss'
					],
		scripts:    'app/js/**/*.js',
		scriptsLib: [
					'app/libs/jquery/dist/jquery.min.js', 
					'app/libs/jquery-validation/dist/jquery.validate.min.js',
					'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
					'app/libs/slick-carousel/slick/slick.min.js'
					],
		images: 	'app/images/**/*.*',
		fonts: 		'app/fonts/**/*.*',
		php: 		'app/*.php',
		htaccess: 	'app/.htaccess'
	},
	watch: {
		html:   	'app/*.html',
		styles: 	'app/sass/**/*.scss',
		scripts:    'app/js/**/*.js',		
		images: 	'app/images/**/*.*',
		php: 		'app/*.php'
	},
	clean:      	'dist'
};

/*--------------------------------------------------------------
# Common tasks
--------------------------------------------------------------*/

gulp.task('server', function() { 
	server ({ 
		server: { 
			baseDir: 'dist' 
		},
		notify: false 
	});
});	

gulp.task('cache', function (callback) {
	return cache.clearAll();
});	

gulp.task('default', ['watch']);

/*--------------------------------------------------------------
# Html
--------------------------------------------------------------*/

gulp.task('html', function () {
    gulp.src(path.src.html) 
    .pipe(plumber())  
    .pipe(rigger())
    .pipe(gulp.dest(path.build.html)) 
    .pipe(server.reload({stream: true})); 
});

/*--------------------------------------------------------------
# Styles
--------------------------------------------------------------*/

gulp.task('styles', function () {
	gulp.src(path.src.styles)  
	.pipe(plumber())      
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer({browsers: autoprefixerList}))
	.pipe(concat('main.min.css')) 
	.pipe(gulp.dest(path.build.styles)) 
	.pipe(server.reload({stream: true}));
});

gulp.task('stylesLib', function () {
	gulp.src(path.src.stylesLib)        
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer({browsers: autoprefixerList}))
	.pipe(concat('libs.min.css')) 
	.pipe(gulp.dest(path.build.stylesLib));
});	

/*--------------------------------------------------------------
# Scripts
--------------------------------------------------------------*/

gulp.task('scripts', function () {
	gulp.src(path.src.scripts)  
	.pipe(plumber())  
	.pipe(rigger())   
	.pipe(babel({presets: ['env']}))
	.pipe(concat('main.min.js')) 
	.pipe(uglify()) 
	.pipe(gulp.dest(path.build.scripts)) 
	.pipe(server.reload({stream: true}));
});

gulp.task('scriptsLib', function () {
	gulp.src(path.src.scriptsLib)       
	.pipe(babel({presets: ['env']}))
	.pipe(concat('libs.min.js')) 
	.pipe(uglify()) 
	.pipe(gulp.dest(path.build.scriptsLib));
});

/*--------------------------------------------------------------
# Images
--------------------------------------------------------------*/

gulp.task('images', function () {
	gulp.src(path.src.images) 
	.pipe(cache(imagemin({ 
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))   
	.pipe(gulp.dest(path.build.images)); 
});

/*--------------------------------------------------------------
# Fonts
--------------------------------------------------------------*/

gulp.task('fonts', function() {
	gulp.src(path.src.fonts)
	.pipe(iconfont({
		fontName: 'MyFont',
		prependUnicode: true,      
		formats: ['ttf', 'woff', 'woff2']      
	}))
	.pipe(gulp.dest(path.build.fonts));
});

/*--------------------------------------------------------------
# Php
--------------------------------------------------------------*/

gulp.task('php', function () {
    gulp.src(path.src.php) 
    .pipe(gulp.dest(path.build.php)) 
});

/*--------------------------------------------------------------
# Htaccess
--------------------------------------------------------------*/

gulp.task('htaccess', function () {
    gulp.src(path.src.htaccess) 
    .pipe(gulp.dest(path.build.htaccess)) 
});

/*--------------------------------------------------------------
# Watch
--------------------------------------------------------------*/

gulp.task('watch', ['server'], function() {
    gulp.watch(path.watch.html, ['html']);
    gulp.watch(path.watch.styles, ['styles']);
    gulp.watch(path.watch.scripts, ['scripts']);
    gulp.watch(path.watch.images, ['images']);
});

/*--------------------------------------------------------------
# Build
--------------------------------------------------------------*/

gulp.task('clean', function () {
    del.sync(path.clean);
});

gulp.task('build', [
    'clean',  
    'html',  
    'styles',
    'stylesLib',
    'scripts',
    'scriptsLib',
    'images',    
    'fonts',  
    'php',  
    'htaccess'    
]);

/*--------------------------------------------------------------
# Deploy
--------------------------------------------------------------*/

gulp.task('deploy', function() {
	gulp.src('dist/**')
	.pipe(rsync({
		root: 'dist/',
		hostname: 'username@yousite.com',
		destination: 'yousite/public_html/',		
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});