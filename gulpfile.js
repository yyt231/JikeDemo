/**
 * Created by Tony on 2016/12/19.
 */
//引入
var gulp = require('gulp');
var less = require('gulp-less');//转换css
var contact = require('gulp-concat');//合并文件，并重新命名
var imagemin = require('gulp-imagemin');
var minifyhtml = require('gulp-minify-html');
var runSequeue = require('run-sequence');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');
var clean = require('gulp-clean');
//源码路径
var src = './src/';
//开发路径
var dev = './dev/';
//上线路径
var realse = './release/';

//less转css
gulp.task('less', function () {
    gulp.src('./app/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./app/css/'))
})
//合并css,压缩
gulp.task('mergercss', function () {
    console.log('-------------------------------->less');
    gulp.src(src + 'css/*.css')
        .pipe(contact('main.css'))
        .pipe(minifycss())
        .pipe(gulp.dest(dev + 'css'))


})
//合并JS,压缩
gulp.task('mergerjs', function () {
    gulp.src(src + 'js/*.js')
        .pipe(contact('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dev + 'js'))

})
//
gulp.task('html', function () {
    gulp.src(src + '*.html')
        .pipe(gulp.dest(dev))
})
//图片压缩
gulp.task('imagemin', function () {
    gulp.src(src + 'img/*.{png,jpg}')
        .pipe(imagemin())
        .pipe(gulp.dest(dev + 'img'));
})
gulp.task('dev', function () {
    isDEV = true;
    runSequeue(
        'less',
        ['mergercss', 'imagemin', 'html', 'mergerjs'],
        'watch'
    );
})
//监听合并css和js
gulp.task('watch', function () {
    gulp.watch(src + '**/*.less', ['mergercss']);
    gulp.watch(src + '**/*.js', ['mergerjs'])

})


/***********************************先执行dev再 release ***********************************/

gulp.task('release', function () {
    runSequeue(
        ['minifycss', 'minifyjs', 'revimg'],
        ['replacecssimg', 'replacescriptimg'],
        'replacehtml'
    );
})
//生成json
gulp.task('minifycss', function () {
    console.log('-------------------------------->minifycss');
    return gulp.src(dev + 'css/*.css')
        .pipe(rev())
        .pipe(gulp.dest('./release/css'))
        .pipe(rev.manifest('css.json'))
        .pipe(gulp.dest('./rev/'));
})
//生成js的json文件
gulp.task('minifyjs', function () {
    return gulp.src(dev + 'js/*.js')
        .pipe(rev())
        .pipe(gulp.dest(realse + 'js'))
        .pipe(rev.manifest('scripts.json'))
        .pipe(gulp.dest('./rev/'));
})
//图片md5并json
gulp.task('revimg', function () {
    console.log('----------------------------------->>>>>>>img json')
    return gulp.src(dev + '/img/*.{png,jpg}')
        .pipe(rev())
        .pipe(gulp.dest(realse + '/img'))
        .pipe(rev.manifest('image.json'))
        .pipe(gulp.dest('./rev'));
})


//替换css中的img
gulp.task('replacecssimg', function () {
    return gulp.src(['./rev/image.json', realse + 'css/*'])
        .pipe(revCollector())
        // .pipe(minifycss())
        // .pipe(rev())
        .pipe(gulp.dest('./release/css'))
})
//替换js中的img
gulp.task('replacescriptimg', [], function () {
    return gulp.src(['./rev/image.json', realse + 'js/*'])
        .pipe(revCollector())
        // .pipe(uglify())
        // .pipe(rev())
        .pipe(gulp.dest(realse + 'js'))
})
//html替换所有的json
gulp.task('replacehtml', [], function () {
    gulp.src(['./rev/css.json','./rev/scripts.json','./rev/image.json', dev + '*.html'])
        .pipe(revCollector())
        .pipe(minifyhtml())
        .pipe(gulp.dest(realse))
})
