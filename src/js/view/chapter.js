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
                
                var index = data.chapter_id != "null" ? data.chapter_id : chapterData.data.item.toc.length - 1;
                chapter.scrollToElement($('.chapter-list li').eq(index)[0]);
            }
        }).catch(function(error){
            console.warn(error);
        })    

        $('.icon-back').on('click',function(){
            history.go(-1);
        })

        //点击chapter-list li
        $('.chapter-list').on('click','li',function(){
            var chapter_id = $(this).attr('data-id');
            window.localStorage.setItem(data.fiction_id,chapter_id);
            location.href="/artical/"+data.fiction_id+'/'+chapter_id;
        })
    }
    return init
})