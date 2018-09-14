define(['jquery'], function($) {
    var cache = {};
    var get = function(url, data) {

        //Promise   es6  承诺 ，允诺   构造函数

        //new Promise(function(reslove,reject){})

        //reslove  解决  reject 拒绝
        return new Promise(function(reslove, reject) {
            if (cache[url]) {
                reslove(cache[url]);
                return
            }
            $.ajax({
                url: url,
                dataType: 'text',
                data: data || null,
                success: function(res) { // /view/index.html
                    console.log(res);
                    cache[url] = res;
                    reslove(res);
                },
                error: function(error) {
                    reject(error);
                }
            })
        })
    }

    return get
})