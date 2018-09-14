define(['jquery', 'swiper', 'get', 'render', 'text!listTB', 'format', 'text!listLR'], function($, swiper, get, render, listTB, format, listLR) {
    $('body').append(listTB);
    $('body').append(listLR);

    function tabFun(index) {
        $('.tab-item').eq(index).addClass('active').siblings()
            .removeClass('active');
        if (index == 1) {
            $('.line').addClass('move');
        } else {
            $('.line').removeClass('move');
        }
    }

    //渲染书城
    function renderIndex(data) {
        var top = data.items[0].data.data;
        //swiper data
        var swiperData = top.filter(function(item) {
            return item.size != 0
        })

        render('#swiper-tpl', swiperData, '.banner');

        //banner-swiper

        new swiper('.banner-swiper');
        //classify data

        var classifyData = top.filter(function(item) {
            return item.size == 0
        })

        render('#classify-tpl', classifyData, '.classify-list');

        //hot 数据

        var hotData = data.items[1].data.data;

        render('#tb-tpl', hotData, '.hot');

        //重磅推荐

        var recommendData = data.items[2].data.data;

        var num = 5;
        var formatArr = format(recommendData, num);

        var i = 0;

        render("#recommend-tpl", formatArr[0], ".recommend-list");

        //点击换一换
        $('.change-btn').on('click', function() {
            if (i < (formatArr.length - 1)) {
                i++;
            } else {
                i = 0;
            }
            render("#recommend-tpl", formatArr[i], ".recommend-list");

        })
    }
    
    //点击switch-btn
    $('.switch-btn').on('click',function(){
        $(this).toggleClass('change-style');

        $('.shelf-list').toggleClass('change-style');
    })

    //go search

    $('.not-input').on('click',function(){
        location.href="/search";
    })

    //初始化
    var init = function(data) {
        //wrap swiper
        var wrapSwiper = new swiper('.index-wrap', {
            onSlideChangeStart: function(swiper) {
                var activeIndex = swiper.activeIndex;
                tabFun(activeIndex);
            }
        });

        //请求数据
        get(data.api[0]).then(function(res) {
            console.log(JSON.parse(res));
            var data = JSON.parse(res);
            if (data.code === 1) {
                renderIndex(data.data)
            }
        }).catch(function(error) {
            console.warn(error);
        })


        var pagenum = 1,
            limit = 10,
            total = 0;

        //loadmore数据
        getLoadmore(pagenum);

        function getLoadmore(pagenum) {
            var url = data.api[1] + '?pagenum=' + pagenum + '&limit=' + limit;
            get(url).then(function(res) {
                var loadmoreData = JSON.parse(res);
                console.log(res);
                if (loadmoreData.code === 1) {
                    total = loadmoreData.data.total;
                    render("#l-r-tpl", loadmoreData.data.target, ".loadmore", true);
                    $('.bookcity').on('scroll', loadmoreFun);
                }
            }).catch(function(error) {
                console.warn(error)
            })
        }



        //点击tab
        $('.tab-wrap').on('click', '.tab-item', function() {
            var index = $(this).index();
            wrapSwiper.slideTo(index);
            tabFun(index);
        })



        //盒子的高度

        var conHeight = $('.bookcity').height();

        function loadmoreFun() {
            var ulHeight = $('.inner-con').height();

            var maxHeight = ulHeight - conHeight;
            // console.log($(this).scrollTop());
            if ($(this).scrollTop() > maxHeight - 44) {
                if (pagenum < total) {
                    pagenum++;
                    $('.bookcity').off('scroll');
                    getLoadmore(pagenum);
                }
            }
        }
    }
    return init
})