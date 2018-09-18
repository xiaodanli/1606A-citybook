var gulp = require('gulp');

var server = require('gulp-webserver');

var fs = require('fs');

var path = require('path');

var url = require('url');

var mock = require('./mock');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var concat = require('gulp-concat');

var clean = require('gulp-clean-css');

var querystring = require('querystring');

var userlist = require('./mock/data/userlist.json');

var uglify = require('gulp-uglify');

var babel = require('gulp-babel');
console.log(mock.toString());

function serverFun(pathUrl){
    return gulp.src(pathUrl)
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;

                if (pathname === '/favicon.ico') {
                    res.end('');
                    return
                }


                // /api/index

                // /api/detail

                if(pathname === '/api/login'){
                    var arr = [];
                    req.on('data',function(chunk){
                        arr.push(chunk);
                    })

                    req.on('end',function(){
                        var params = querystring.parse(Buffer.concat(arr).toString());
                        var isHas = userlist.some(function(item){
                            return item.username == params.username && item.pwd == params.pwd
                        })
                        if(isHas){
                            res.end(JSON.stringify({code:1,msg:'登录成功'}))
                        }else{
                            res.end(JSON.stringify({code:0,msg:'登录失败'}))
                        }
                    })
                }else if (/^\/api/.test(pathname)) { //

                    /*
                    function(url) { // /api/detail
                            return resObj[/api/detail]
                        }
                    */
                    res.end(JSON.stringify({ code: 1, data: mock(req.url) })) //  /api/index
                } else {
                    // /index   /detail  /  路由    index.html

                    // $.ajax({
                    //     url:'/view/index.html'  .css  .js
                    // })


                    // pathname = pathname === '/' ? 'index.html' : pathname;

                    pathname = /\.html|\.css|\.js|\.png|\.jpg$/.test(pathname) ? pathname : 'index.html';

                    res.end(fs.readFileSync(path.join(__dirname, pathUrl, pathname)))
                }
            }
        }))
}

gulp.task('devServer', function() {
    return serverFun('src')
})


//开发环境css

gulp.task('devCss', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android>=4.0']
        }))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/*.scss', gulp.series('devCss'))
})

//开发环境

gulp.task('dev', gulp.series('devCss', 'devServer', 'watch'))


//上线环境

//线上打包css

gulp.task('buildCss',function(){
    return gulp.src('./src/css/all.css')
    .pipe(clean())
    .pipe(gulp.dest('build/css'))
})

gulp.task('copyCss',function(){
    return gulp.src('./src/css/swiper-3.4.2.min.css')
    .pipe(gulp.dest('build/css'))
})

//图片
gulp.task('copyImg',function(){
    return gulp.src('./src/imgs/*')
    .pipe(gulp.dest('build/imgs'))
})

//js

gulp.task('uglify',function(){
    return gulp.src('./src/js/{common,view,router}/*.js')
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'))
})

gulp.task('copyJs',function(){
    return gulp.src(['./src/js/**/*.js','!./src/js/{common,view,router}/*.js'])
    .pipe(gulp.dest('build/js'))
})

gulp.task('copyHtml',function(){
    return gulp.src('./src/**/*.html')
    .pipe(gulp.dest('build'))
})

gulp.task('buildServer', function() {
    return serverFun('build')
})

gulp.task('build',gulp.series('buildCss','copyCss','copyImg','uglify','copyJs','copyHtml'))




