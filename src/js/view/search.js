define(['jquery','render','get','text!labelTpl'],function($,render,get,labelTpl){
    $('body').append(labelTpl);

    var init = function(data){
        console.log(data.api.hotkey);

        var _resultList = $('.result-list');
        get(data.api.hotkey).then(function(res){
            console.log(res);
            var hotData = JSON.parse(res);
            if(hotData.code === 1){
                render('#label-tpl',hotData.data.ads,'.hot-key');
            }
        }).catch(function(error){
            console.warn(error);
        });


        $('.search-btn').on('click',function(){
            var val = $('.ipt').val();

            if(!val){
                alert("输入内容为空")
            }else{
                searchFun(val);
            }
        })

        var storage = window.localStorage;

        var history = JSON.parse(storage.getItem('history')) || [];

        if(history.length){
            render('#label-tpl',history,'.history-key');
        }

        function searchFun(val){
            var url = data.api.search + '?key='+val;
            var isHas = history.some(function(item){
                return item.ad_name == val
            });
            if(!isHas){
                history.push({ad_name:val});
                storage.setItem('history',JSON.stringify(history));
                render('#label-tpl',history,'.history-key');
            }
           
            $('.keys').hide();
            get(url).then(function(res){
                console.log(res);
                var result = JSON.parse(res);
                if(result.code === 1 && result.data.length){
                     render('#result-tpl',result.data,'.result-list'); 
                }else if(result.code === 1 && !result.data.length){
                    _resultList.html('<p>没有匹配的内容</p>');
                }
                _resultList.show();

            }).catch(function(error){
                console.warn(error);
            });
        }

        $('.ipt').on('input',function(){
            var val = $(this).val();
            if(!val){
                $('.keys').show();
                _resultList.hide();
            }
        })

        //点击label
        $('.keys').on('click','li',function(){
            var key = $(this).html();
            $('.ipt').val(key);
            searchFun(key);
        })

        //点击back
        $('.icon-back').on('click',function(){
            location.href="/";
        })
    }
    return init
})