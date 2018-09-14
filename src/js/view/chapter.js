define(['jquery','render','get','bscroll'],function($,render,get,bscroll){
    var init = function(data){
        var chapter = new bscroll('.chapter-con',{
            click:true
        })
        get(data.api).then(function(res){
            console.log(res);
            var chapterData = JSON.parse(res);
            if(chapterData.code === 1){
                render('#chapter-tpl',chapterData.data.item.toc,'.chapter-list');
                chapter.refresh();
                var index = chapterData.data.item.toc.length - 1;
                chapter.scrollToElement($('.chapter-list li').eq(index)[0]);
            }
        }).catch(function(error){
            console.warn(error);
        })    

        $('.icon-back').on('click',function(){
            location.href="/detail/"+data.fiction_id;
        })
    }
    return init
})