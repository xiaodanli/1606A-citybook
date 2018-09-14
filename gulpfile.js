var gulp = require('gulp');

var server = require('gulp-webserver');

var fs = require('fs');

var path = require('path');

var url = require('url');

var mock = require('./mock');

var sass = require('gulp-sass');

var autoprefixer = require('gulp-autoprefixer');

var concat = require('gulp-concat');
console.log(mock.toString());

gulp.task('devServer', function() {
    return gulp.src('src')
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



                if (/^\/api/.test(pathname)) { //

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

                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
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