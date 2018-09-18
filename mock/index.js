var indexJson = require('./data/bookcity.json');

var loadmore = require('./data/loadmore.json');

var hotkeyJson = require('./data/search-hot.json');

var searchJson = require('./data/search.json');

var detailJson = require('./data/352876.json');

var chapterJson = require('./data/chapter-list.json');

var articalJson1 = require('./data/artical/data1.json');
var articalJson2 = require('./data/artical/data2.json');
var articalJson3 = require('./data/artical/data3.json');
var articalJson4 = require('./data/artical/data4.json');

var url = require('url');

var resObj = {
    '/api/index': indexJson,
    '/api/hotkey':hotkeyJson,
    '/api/detail?fiction_id=352876':detailJson,
    '/api/chapter?ficiton_id=352876':chapterJson,
    '/api/artical?fiction_id=352876&chapter_id=1':articalJson1,
    '/api/artical?fiction_id=352876&chapter_id=2':articalJson2,
    '/api/artical?fiction_id=352876&chapter_id=3':articalJson3,
    '/api/artical?fiction_id=352876&chapter_id=4':articalJson4
}

module.exports = function(pathurl) { // /api/index
    var pathname = url.parse(pathurl).pathname;
    if (pathname === '/api/loadmore') { //loadmore
        var params = url.parse(pathurl, true).query,
            pagenum = params.pagenum,
            limit = params.limit;

        var total = Math.ceil(loadmore.items.length / limit);

        // (pagenum-1)*limit   pagenum*limit

        var target = loadmore.items.slice((pagenum - 1) * limit, pagenum * limit);

        return { total: total, target: target }

    }else if(pathname === '/api/search'){
        var key = url.parse(pathurl, true).query.key;

        var result = searchJson.items.filter(function(item){
            return item.title.match(key)
        })

        return result

    } else {
        return resObj[pathurl]
    }

    // resObj[/api/detail]

}