require.config({
    baseUrl: '/js/',
    paths: {
        //库文件
        'jquery': './libs/jquery-2.1.1.min',
        'page': './libs/page',
        'swiper': './libs/swiper.min',
        'handlebars': './libs/handlebars-v4.0.11',
        'text': './libs/text',
        'bscroll':'./libs/bscroll',

        //路由
        'router': './router/router',
        'config': './router/config',

        //common
        'get': './common/get',
        'render': './common/render',
        'format': './common/format',

        'index': './view/index',
        'detail': './view/detail',
        'search':'./view/search',
        'chapter':'./view/chapter',

        //html 模板
        'listTB': '../view/tpl/list-t-b.html',
        'listLR': '../view/tpl/list-l-r.html',
        'labelTpl':'../view/tpl/label.html'
    }
})

require(['router']);