'use strict';

var	gulp        	= require('gulp');
var	sass        	= require('gulp-sass');
var	browserSync		= require('browser-sync');
var	concat      	= require('gulp-concat');
var	uglify      	= require('gulp-uglify');
var	cleanCSS    	= require('gulp-clean-css');
var	rename      	= require('gulp-rename');
var	autoprefixer	= require('gulp-autoprefixer');
var	notify      	= require("gulp-notify");
var	imagemin    	= require('gulp-imagemin');
var pngquant    	= require('imagemin-pngquant');
var cache       	= require('gulp-cache');
var	del         	= require('del');
var	svgstore		= require('gulp-svgstore');
var	svgmin			= require('gulp-svgmin');
var	path			= require('path');
var	posthtml		= require('gulp-posthtml');
var	include			= require('posthtml-include');
var	cheerio 		= require('gulp-cheerio');
var htmlmin 		= require('gulp-htmlmin');
var webp 			= require('gulp-webp');

// Включение browser-sync
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'build' // Путь к папке в которой запускается browser-sync
		},
		port: 8080,
    open: true,
    notify: false
	});
});

// Конвертация SCSS в CSS
gulp.task('sass', function() {
	return gulp.src('source/scss/**/*.scss') // Берем все .scss файлы в данной папке
	.pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
	.pipe(autoprefixer(['last 2 versions'])) // Расставляем префиксы к свойствам
	.pipe(gulp.dest('build/css/')) // Кладем в папку сборки
	.pipe(rename({suffix: '.min', prefix : ''})) // Добавляем префикс к файлу
	.pipe(cleanCSS()) // Минифицируем файл
	.pipe(gulp.dest('build/css/')) // Кладем минифицированный .css файл в папку сборки
	.pipe(browserSync.reload({stream: true})); // Обновляем страницу
});

// Обработка изображений
gulp.task('img', function() {
  return gulp.src('source/img/**/*') // Берем все файлы из папки img
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	})))
	.pipe(gulp.dest('build/img')) // Кладем обработанные изображения в папку сборки
	.pipe(webp()) // Создаем webp версии всех .png, .jpg, .tiff изображений
	.pipe(gulp.dest('build/img')) // Кладем webp версии изображений в папку сборки
	.pipe(browserSync.reload({stream: true})); // Обновляем страницу
});

//Обработка фотографий
gulp.task('img-photos', function() {
	return gulp.src('source/photos/**/*.jpg') // Берем все файлы jpg из папки photo
	  .pipe(cache(imagemin({
		  interlaced: true,
		  progressive: true,
		  svgoPlugins: [{removeViewBox: false}],
		  use: [pngquant()]
	  })))
	  .pipe(gulp.dest('build/photos')) // Кладем обработанные изображения в папку сборки
	  .pipe(webp()) // Создаем webp версии всех .png, .jpg, .tiff изображений
	  .pipe(gulp.dest('build/photos')) // Кладем webp версии изображений в папку сборки
	  .pipe(browserSync.reload({stream: true})); // Обновляем страницу
  });

// Объединяем файлы js
gulp.task('concat', function(cb) {
	return gulp.src([
		'source/libs/jquery/jquery-3.4.1.min.js',
		'source/js/script.js' // Всегда в конце
		])
	.pipe(concat('script.min.js')) // Название собраного .js-файла
	.pipe(uglify())
	.pipe(gulp.dest('build/js'))
	.pipe(browserSync.reload({stream: true}));
	cb();
});

// Очистка папки сборки
gulp.task('clean', function () {
	return del ('build'); // Удаляем всю папку со сборкой
});

// Перенос файлов в папку сборки
gulp.task('copy', function() {
	return gulp.src([
		'source/fonts/**/*.{woff,woff2}', // Все файлы шрифтов
    'source/*.ico', // Все файлы .ico
    'source/server/**/*.*',
    'source/server.php'
    ], {
		base: 'source' // Указываем исходную папку, для того чтобы весь путь к файлу не затерся
    })
    .pipe(gulp.dest('build')); // Кладем в папку сборки
});

// Обновление html-файлов
gulp.task('html', function() {
	return gulp.src('source/*.html') // Берем все html файлы в папке исходников
	.pipe(gulp.dest('build')) // Кладем их в папку со сборкой
});

// Обновление js-файлов
gulp.task('js', function() {
	return gulp.src('source/js/*.js') // Берем все js файлы в папке исходников
	// .pipe(uglify()) // Минифицируем
	.pipe(gulp.dest('build/js/')) // Кладем их в папку со сборкой
	.pipe(browserSync.reload({stream: true})); // Обновляем страницу
});

// Создание svg спрайта
gulp.task('sprite', function () {
    return gulp
        .src('source/img/sprite/*.svg') // Берем все .svg файлы из папки img/sprite исходников
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true // Минифицирем их
                    }
                }]
            }
		}))
		.pipe(cheerio({
            run: function ($) {
				$('[fill]').removeAttr('fill'); // Убираем цвет иконки
				$('[stroke]').removeAttr('stroke'); // Убираем обводку иконки
				$('[style]').removeAttr('style'); // Убираем стили иконки
            },
            parserOptions: { xmlMode: true }
		}))
		// здесь может понадобиться плагин replace, если cherrio будет менять знак ">"
        .pipe(svgstore()) // Собираем их в страйт
        .pipe(gulp.dest('build/img/')); // Кладем в папку сборки
});

// Обрабртка .html файлов
gulp.task('posthtml', function () {
	return gulp.src('source/*.html') // Берем все файлы .html в папке исходников
		.pipe(posthtml([
			include() // Вставляем вместо тега <include> содержимое указзанное в атрибуте src тега <include> (svg спрайт)
		]))
		.pipe(htmlmin({ collapseWhitespace: true })) // Минифицируем все .html файлы
		.pipe(gulp.dest('build')); // Кладем в папку сборки
});


// Отслеживаем за изменениями
gulp.task('watch', function(cb) {
	gulp.parallel('browser-sync')(cb); // Запускаем browser-sync
	gulp.watch('source/sass/**/*.scss', gulp.series('sass')); // При сохранении любого .scss файла выполнить таск 'sass'
	gulp.watch(['source/libs/**/*.js', 'source/js/*.js'], gulp.series('js')); // При сохранении любого .js файла выполнить таск 'js'
	gulp.watch('source/**/*.html', gulp.series('posthtml')); // При сохранении любого .html файла выполнить таск 'posthtml'
	gulp.watch('source/img/**/*', gulp.series('sprite', 'posthtml', 'img')); // При изменении (добавлении и удалении) любого изображения из папки исходников выполнить таск 'img', также пересобирает svg спрайт
	gulp.watch('source/img/**/*', gulp.series('img-photos'));
	gulp.watch('source/**/*').on('change', browserSync.reload); // При изменении любого .html файла обновить страницу
});

// Сборка проекта
gulp.task('build', gulp.series(
	'clean', // Очищаем папку сборки
	'img', // Обработка изображении и помещение их в папку сборки
	'img-photos', // Обрабртка фоторграфий и помещение их в папку сборки
	'copy', // Копируем файлы ненуждающиеся в обработке
	'sass', // Конвертируем SCSS в CSS, расставляем префиксы, минифицируем и кладем их в папку сборки
	'js', // Минифицируем все js файлы и помещаем их в папку сборки
	'sprite', // Собираем svg sprite
	'posthtml', // Минифицируем все .html файлы, вставлем svg спрайт в разметку
	// 'html',  Перемещаем файлы HTML в папку сборки
	function(cb) {
    cb();
}));

gulp.task('default', gulp.series('build', 'watch'));
