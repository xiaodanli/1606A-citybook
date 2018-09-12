define(['jquery', 'get'], function($, get) {
    var config = {};

    config.start = function(ctx, next) {
        console.log(ctx);
        ctx.data = {};

        next();
    }

    config.index = function(ctx, next) {
        console.log(ctx)
            // /index
        get('/view/index.html').then(function(res) {
            $('.wrap').html(res);
            console.log(ctx);

            ctx.data.script = 'index';
            ctx.data.api = '/api/index';

            next();

        }).catch(function(error) {
            console.warn(error)
        })
    }


    config.detail = function(ctx, next) {
        get('/view/detail.html').then(function(res) {
            $('.wrap').html(res);
            ctx.data.script = 'detail';
            ctx.data.api = '/api/detail';
            console.log(ctx);
            next();
        }).catch(function(error) {
            console.warn(error)
        })
    }

    config.script = function(ctx) {
        console.log(ctx);
        console.log(ctx.data.script);
        require([ctx.data.script], function(cb) {
            cb(ctx.data);
        })
    }

    return config;
})