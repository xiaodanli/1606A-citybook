require.config({
    baseUrl: '/js/',
    paths: {
        //库文件
        'jquery': './libs/jquery-2.1.1.min',
        'page': './libs/page',

        //路由
        'router': './router/router',
        'config': './router/config',

        'get': './common/get',

        'index': './view/index',
        'detail': './view/detail'
    }
})

require(['router']);