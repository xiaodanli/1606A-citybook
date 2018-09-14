require(['page', 'config'], function(page, config) {

    page('*', config.start);
    //   /index
    page('/', '/index');
    page('/index', config.index);
    page('/detail/:fiction_id', config.detail);
    page('/search',config.search);
    page('/chapter/:fiction_id',config.chapter);

    page('*', config.script);

    page(); //开启路由

})