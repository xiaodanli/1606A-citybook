var gulp = require('gulp');

var server = require('gulp-webserver');

var fs = require('fs');

var path = require('path');

var url = require('url');

var mock = require('./mock');
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
                    rea.end(JSON.stringify({ code: 1, data: mock(pathname) })) //  /api/index
                } else {
                    // /index   /detail  /  路由    index.html

                    // $.ajax({
                    //     url:'/view/index.html'  .css  .js
                    // })


                    // pathname = pathname === '/' ? 'index.html' : pathname;

                    pathname = /\.html|\.css|\.js$/.test(pathname) ? pathname : 'index.html';

                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})