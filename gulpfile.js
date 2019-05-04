const gulp 				 = require('gulp'), 								// Главный объкт для 
			sass 				 = require('gulp-sass'), 						// Подключение SASS препроцессора
			imgemin 		 = require('gulp-imagemin'), 				// Подключение минификатопа картинок
			autoprefixer = require('gulp-autoprefixer'),		// Подключение автопрефиксов
			rename 			 = require('gulp-rename'),					// Подключение переименовование файлов
			postcss 		 = require('gulp-postcss'),					// Подключение плагина родителя для других плагинов (НЕ ИСПОЛЬЗУЕТСЯ)
			cssmin 			 = require('gulp-cssmin'), 					// Подключение минификатора	
			watchOld		 = require('gulp-watch'),						// Подключение плагина слежение (НЕ ИСПОЛЬЗУЕТСЯ)
			map 				 = require('gulp-sourcemaps'), 			// Подключение соурс карты
			browserSync	 = require('browser-sync').create(),// Подключение лайф сервера для работы
			uncss 			 = require('gulp-uncss');						// Подлкючение оптимизатора для css

function style() {
	return gulp.src('app/sass/main.sass')
	.pipe(map.init())
	.pipe(sass({outputStyle: 'expand'}).on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cssmin())
	.pipe(uncss({
		html: ['app/*.html']
	}))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(map.write('./'))
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
}

function watch() {
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	});
	gulp.watch('app/sass/main.sass', style);
	gulp.watch('app/*.html').on('change', browserSync.reload);
	gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;

			