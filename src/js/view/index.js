define(['jquery', 'swiper', 'get', 'render', 'text!listTB'], function($, swiper, get, render, listTB) {
    console.log(listTB);
    $('body').append(listTB);

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

        render()

        function format(data, num) {
            var target = [];
            var len = Math.ceil(data.length / num);

            for (var i = 0; i < len; i++) {
                target.push(data.splice(0, num));
            }

            return target

        }


        // 

        // [{
        //         title: "1"
        //     },
        //     {
        //         title: "1"
        //     },
        //     {
        //         title: "1"
        //     }
        // ]

        // format(2)  []

        // format(3)  []

        // []

        // [
        //     [
        //         {},
        //         {},
        //      {},
        // {}

        //     ],
        //     [
        //         {},
        //         {}
        //     ]
        // ]


        // <ul>
        //     {{#each this}}
        //     <li>
        //         {{#each this}}
        //         <dl>
        //             <dt></dt>
        //             <dd></dd>
        //         </dl>
        //         {{/each}}

        //     </li>
        //     {{/each}}

        // </ul>


    }
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
        get(data.api).then(function(res) {
            console.log(JSON.parse(res));
            var data = JSON.parse(res);
            if (data.code === 1) {
                renderIndex(data.data)
            }
        }).catch(function(error) {
            console.warn(error);
        })



        //点击tab
        $('.tab-wrap').on('click', '.tab-item', function() {
            var index = $(this).index();
            wrapSwiper.slideTo(index);
            tabFun(index);
        })



        //盒子的高度

        var conHeight = $('.bookcity').height();
        $('.bookcity').on('scroll', function() {
            var ulHeight = $('.inner-con').height();

            var maxHeight = ulHeight - conHeight;
            // console.log($(this).scrollTop());
            if ($(this).scrollTop() > maxHeight - 44) {
                console.log("加载更多")
            }
        })
    }
    return init
})