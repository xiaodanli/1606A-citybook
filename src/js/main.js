require.config({
    baseUrl: '/js/',
    paths: {
        //库文件
        'jquery': './libs/jquery-2.1.1.min',
        'page': './libs/page',
        'swiper': './libs/swiper.min',
        'handlebars': './libs/handlebars-v4.0.11',
        'text': './libs/text',

        //路由
        'router': './router/router',
        'config': './router/config',

        //common
        'get': './common/get',
        'render': './common/render',

        'index': './view/index',
        'detail': './view/detail',

        //html 模板
        'listTB': '../view/tpl/list-t-b.html'
    }
})

require(['router']);