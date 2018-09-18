define(['jquery','text!labelTpl','get','render','text!listTB'], function($,labelTpl,get,render,listTB) {
    $('body').append(labelTpl);
    $('body').append(listTB);
    var init = function(data) {
        //请求详情
        get(data.api).then(function(res){
            var detailData = JSON.parse(res);
            console.log(detailData);
            render("#detail-tpl",detailData.data.item,'.detail-top');
            var typeArr = [];
            detailData.data.item.tags.forEach(function(item){
                typeArr.push({ad_name:item})
            })
            render("#label-tpl",typeArr,'.type');
            render("#tb-tpl",detailData.data.related,'.other');
            //点击阅读
            $('.read-btn').on('click',function(){
                var code = window.localStorage.getItem('code') || 0;
                if(code){
                    location.href="/artical/"+data.fiction_id+'/1';
                }else{
                    location.href="/login";
                }
            })
        }).catch(function(error){
            console.log(error);
        })
        $('.icon-back').on('click',function(){
            location.href="/";
        })

    }
    return init
})