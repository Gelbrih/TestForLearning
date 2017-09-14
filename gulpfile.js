var gulp     	 = require('gulp'),
	sass    	 = require('gulp-sass'),
	bSync    	 = require('browser-sync'),
	uglify   	 = require('gulp-uglify'),
	concat       = require('gulp-concat'),
	concatCss 	 = require('gulp-concat-css'),
	rename   	 = require('gulp-rename'),
	imagemin 	 = require('gulp-imagemin'),
	pngquant 	 = require('imagemin-pngquant'),
	cache    	 = require('gulp-cache'),
	autoprefixer = require('gulp-autoprefixer'),
	iconfont 	 = require('gulp-iconfont'),
	ttf2svg      = require('gulp-ttf-svg'),
	del 		 = require('del');

var source 		 = 'app/',
    dest 		 = 'dist/';

gulp.task('browser-sync', function() { 
	bSync ({ 
		server: { 
			baseDir: source 
		},
		notify: false 
	});
});	

gulp.task('sass', function () {
	return gulp.src(source + 'sass/**/*.scss')
	.pipe(sass({outputStyle: 'expanded'}))	
	.pipe(autoprefixer({
		browsers: ['last 5 versions'],
		cascade: true           
	}))
	.pipe(gulp.dest(source + 'css'))    	
	.pipe(bSync.reload({stream:true}))
});

gulp.task('sass-libs',function(){
	return gulp.src([		
		source + 'libs/slick-carousel/slick/slick.scss',
		source + 'libs/slick-carousel/slick/slick-theme.scss',
		source + 'libs/magnific-popup/src/css/main.scss'
		])
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(concat('libs.min.css')) 
	.pipe(gulp.dest(source + 'css'))
	.pipe(bSync.reload({stream:true}))
});

gulp.task('scripts',function(){
	return gulp.src([ 
		source + 'libs/jquery/dist/jquery.min.js', 
		source + 'libs/jquery-validation/dist/jquery.validate.min.js',
		source + 'libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		source + 'libs/slick-carousel/slick/slick.min.js'
		])
	.pipe(concat('libs.min.js')) 
	.pipe(uglify()) 
	.pipe(gulp.dest(source + 'js')); 
});

gulp.task('watch', ['browser-sync','sass','sass-libs','scripts'], function(){
	gulp.watch(source + 'sass/**/*.scss',['sass']);
	gulp.watch(source + 'libs/**/*.scss',['sass-libs']);
	gulp.watch(source + '*.html',bSync.reload);
	gulp.watch(source + 'js/*.js',bSync.reload);
});

gulp.task('del', function() {
	return del.sync(dest); 
});

gulp.task('images',function(){
	return gulp.src(source + 'images/**/*')
	.pipe(cache(imagemin({ 
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest(dest + 'images')); 
});

gulp.task('svg',function(){
	gulp.src(source + 'fonts/*.ttf')
	.pipe(ttf2svg())
	.pipe(gulp.dest(source + 'fonts'));
});

gulp.task('fonts',['svg'], function() {
	gulp.src(source + 'fonts/*.ttf')	
	.pipe(iconfont({
		fontName: 'Elevate',
		prependUnicode: true,      
		formats: ['ttf', 'eot', 'woff']      
	}))
	.pipe(gulp.dest(source + 'fonts'))
});

gulp.task('build', ['del', 'images', 'sass', 'sass-libs', 'scripts'], function() {

	var buildCss = gulp.src(source + 'css/**/*')
	.pipe(gulp.dest(dest + 'css'))

	var buildFonts = gulp.src(source + 'fonts/**/*') 
	.pipe(gulp.dest(dest + 'fonts'))

	var buildJs = gulp.src(source + 'js/**/*') 
	.pipe(gulp.dest(dest + 'js'))

	var buildHtml = gulp.src(source + '*.html') 
	.pipe(gulp.dest(dest));

	var htaccess = gulp.src(source + '.htaccess')
	.pipe(gulp.dest(dest));

	var buidPhp = gulp.src(source + '*.php')
	.pipe(gulp.dest(dest));

});

gulp.task('clearCache', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);