var indexJson = require('./data/bookcity.json');

var detailJson = require('./data/detail.json');

var resObj = {
    '/api/index': indexJson,
    '/api/detail': detailJson
}

module.exports = function(url) { // /api/index

    // resObj[/api/detail]
    return resObj[url]
}