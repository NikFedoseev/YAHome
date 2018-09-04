var gulp = require('gulp'),
	sass = require('gulp-sass'),
	BrowserSync = require('browser-sync'),
	concat = require('gulp-concat'),
	del = require('del'),
	babel = require('gulp-babel'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
	return gulp.src([
		'src/blocks/**/*.scss',
	])
	.pipe(concat('main.css'))
	.pipe(sass())
	.pipe(autoprefixer({
		browsers: ['last 3 versions',
		'> 1%',
		'ie 8',
		'ie 7']
	}))
	.pipe(gulp.dest('src/bundles'))
	.pipe(BrowserSync.reload({stream: true}))
});

gulp.task('es', function() {
	return gulp.src('src/js/**/*.js')
	.pipe(babel({
		presets: ['env']
	}))
	.pipe(concat('main.js'))
	.pipe(gulp.dest('src/bundles'))
});


gulp.task('browser-sync', function(){
	BrowserSync({
		server: {
			baseDir: 'src'
		}
	});
});


gulp.task('clean', function(){
	return del.sync('dist');
});


gulp.task('watch', ['browser-sync'], function(){
	gulp.watch('src/blocks/**/*.scss', ['sass']);
	gulp.watch('src/*html', BrowserSync.reload);
	gulp.watch('src/js/**/*js' ['es'], BrowserSync.reload);

});

gulp.task('build', ['clean', /*'img',*/ 'sass','es'], function(){
	var BuildCss = gulp.src([
		'src/css/main.css',	
		])
	.pipe(gulp.dest('dist/css'))

	var BuildFonts = gulp.src('src/fonts/**/*')
	.pipe(gulp.dest('dist/fonts'))

	var BuildJS = gulp.src('src/js/**/*')
	.pipe(gulp.dest('dist/js'))

	var BuildHTML = gulp.src('src/*.html')
	.pipe(gulp.dest('dist'));

});
