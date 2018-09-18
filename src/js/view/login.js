define(['jquery'],function($){
    var init = function(data){
        $('.login-btn').on('click',function(){
            let username = $('#username').val(),
                pwd = $("#pwd").val();

            if(!username || !pwd){
                alert('输入框不能为空');
            }else{
                $.ajax({
                    url:data.api,
                    dataType:'json',
                    type:'post',
                    data:{username:username,pwd:pwd},
                    success:function(res){
                        if(res.code === 1){
                            window.localStorage.setItem('code',res.code);
                            history.go(-1);
                        }else{
                            alert(res.msg);
                        }
                    },error:function(error){
                        console.warn(error)
                    }
                })
            }
        })
    }
    return init
})