'use strict';
// var config = require('./config.json');
var gulp= require('gulp');
var $ = require('gulp-load-plugins')();
var imageminPngquant = require('imagemin-pngquant');
var imageminMozjpeg = require('imagemin-mozjpeg');

//Event
gulp.task('compass',function(){
    gulp.src('scss/*.scss')
    	.pipe($.plumber()) // if error will not stop gulp
		.pipe($.compass({
			sourcemap: true,
			time: true,
			css: 'website/css',
			sass: 'scss',
			style: 'compressed'
		}))    
		.pipe(gulp.dest('website/css'))
		.pipe($.connect.reload());
});
gulp.task('js',function(){
    gulp.src('js/*.js')
    	.pipe($.plumber())
    	.pipe($.uglify())
	    .pipe(gulp.dest('website/js'))
		.pipe($.connect.reload());
});
gulp.task('connect', function() {
  $.connect.server({
  	root: 'D:/YiHsien/chinesechess/website/',
  	livereload: true
  });
});
gulp.task('imageminJPG', function () {
	gulp.src('org_images/*.jpg')
		.pipe($.plumber())
		.pipe($.changed('website/images'))	
		.pipe(imageminMozjpeg({quality: 90})())
		.pipe(gulp.dest('website/images'));
});
gulp.task('imageminPNG', function () {
	gulp.src('org_images/*.png')
		.pipe($.plumber())
		.pipe($.changed('website/images'))	
		.pipe(imageminPngquant({quality: '90'})())
		.pipe(gulp.dest('website/images'));
});
gulp.task('uploadHTML', function () {
	gulp.src('html/*.html')
		.pipe($.changed('website'))
		.pipe(gulp.dest('website'))
		.pipe($.connect.reload());
});
gulp.task('del',function(){
	require('del')('node_modules');
});

//AddListener
gulp.task('default',['connect'], function() {
	gulp.watch(['scss/*.scss'],['compass']);
	gulp.watch(['js/*.js'],['js']);
	gulp.watch(['org_images/*.jpg'],['imageminJPG']);
	gulp.watch(['org_images/*.png'],['imageminPNG']);
	gulp.watch(['html/*.html'],['uploadHTML']);
});
