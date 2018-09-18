define(['jquery','render','get','base64'],function($,render,get,base64){
    var _model = $('.model'),
        _setStyle = $('.set-style'),
        _openStyle = $('.open-style');

    //点击内容
    $('.artical-con').on('click',function(){
        _model.show();
    })

    //点击model-c
    $('.model-c').on('click',function(){
        _model.hide();
        _setStyle.hide();
        _openStyle.removeClass('active');
    })

    //点击字体
    _openStyle.on('click',function(){
        _setStyle.toggle();
        _openStyle.toggleClass('active');
    })

    var storage = window.localStorage;

    var maxSize = 30,  //最大字体
        minSize = 12,  //最小字体
        initSize = storage.getItem('fz')*1 || 14; //初始字体
    
       
   

    $('.big-btn').on('click',function(){
        if(initSize < maxSize){
            initSize+=2;
            storage.setItem('fz',initSize);
             $('.artical-con p').css('fontSize',(initSize/37.5)+'rem');
        }
    })

    $('.small-btn').on('click',function(){
        if(initSize > minSize){
            initSize-=2;
            storage.setItem('fz',initSize);
             $('.artical-con p').css('fontSize',(initSize/37.5)+'rem');
        }
    })

    //白天的状态 ------> 夜间的字    true
    //夜间的状态 ------> 白天的字    false

    var text = storage.getItem('status') || '夜间',
        status = text === '夜间' ? true : false,
        bg = storage.getItem('bg') || '#f7eee5';

    var _iconNight = $('.icon-night');

    setBg(status);

    function setBg(status){
        if(status){ //白天的状态
            _iconNight.find('dd').text('夜间');
            _iconNight.removeClass('light');  
            $('.artical-con').css('backgroundColor',bg);
            storage.setItem('status','夜间');
        }else{ //夜间的状态
            _iconNight.find('dd').text('白天');
            _iconNight.addClass('light');
            $('.artical-con').css('backgroundColor','#0f1410');
            storage.setItem('status','白天');
        }
    }
    //点击day
    _iconNight.on('click',function(){
        status = !status;
        setBg(status)
    })

    //点击li，设置背景
    $('.set-bg').on('click','li',function(){
        bg = $(this).attr('data-bg');
        if(status){
            $('.artical-con').css('backgroundColor',bg);
        }
        storage.setItem('bg',bg);
        $(this).addClass('active').siblings().removeClass('active');
    })

    var init = function(data){

        var code = window.localStorage.getItem('code') || 0;
        if(!code){
            location.href="/login";
        }


        var fiction_id = data.fiction_id,
            chapter_id = storage.getItem(fiction_id) || data.chapter_id;

        $('.cur').html(chapter_id);
        //获取阅读内容
        getArtical(chapter_id);

        function getArtical(chapter_id){
            var articalUrl = data.api+'?fiction_id='+fiction_id+'&chapter_id='+chapter_id;
            get(articalUrl).then(function(res){
                var articalData = JSON.parse(res);
                if(articalData.code === 1){
                    var script = document.createElement('script');
    
                    script.src = articalData.data.jsonp;
    
                    document.body.appendChild(script);
    
                    window.duokan_fiction_chapter = function(artical){
                        var articalCon = JSON.parse($.base64().decode(artical));
                        render('#artical-tpl',articalCon,'.artical-con');
                        $('.artical-con p').css('fontSize',(initSize/37.5)+'rem');
                    }
                }
            }).catch(function(error){
                console.warn(error);
            })
        }
        
        //下一章
        $('.next-btn').on('click',function(){
            if(chapter_id < 4){
                chapter_id++;
                getArtical(chapter_id);
                $('.cur').html(chapter_id);
                storage.setItem(fiction_id,chapter_id);
            }else{
                alert('已经到最后一章');
            }
        })

        //点击上一章
        $('.prev-btn').on('click',function(){
            if(chapter_id > 1){
                chapter_id--;
                getArtical(chapter_id);
                $('.cur').html(chapter_id);
                storage.setItem(fiction_id,chapter_id);
            }else{
                alert('已经到第一章');
            }
        })

        //请求章节数
        get(data.chapter_list).then(function(res){
            console.log(res);
            var chapterData = JSON.parse(res);
            if(chapterData.code === 1){
                var total = chapterData.data.item.toc.length;
                $('.total').html(total);
            }
        }).catch(function(error){
            console.warn(error);
        })

        //去目录界面
        $('.go-chapter').on('click',function(){
            location.href="/chapter/"+fiction_id+"/"+chapter_id;
        })

        //点击返回
        $('.back').on('click',function(){
            location.href="/detail/"+fiction_id;
        })
    }

    return init
})