"use strict";define(["jquery","swiper","get","render","text!listTB","format","text!listLR"],function(s,d,f,u,t,p,n){function m(t){s(".tab-item").eq(t).addClass("active").siblings().removeClass("active"),1==t?s(".line").addClass("move"):s(".line").removeClass("move")}s("body").append(t),s("body").append(n),s(".switch-btn").on("click",function(){s(this).toggleClass("change-style"),s(".shelf-list").toggleClass("change-style")}),s(".not-input").on("click",function(){location.href="/search"});return function(e){var n=new d(".index-wrap",{onSlideChangeStart:function(t){m(t.activeIndex)}});f(e.api[0]).then(function(t){console.log(JSON.parse(t));var n=JSON.parse(t);1===n.code&&function(t){var n=t.items[0].data.data,e=n.filter(function(t){return 0!=t.size});u("#swiper-tpl",e,".banner"),new d(".banner-swiper");var o=n.filter(function(t){return 0==t.size});u("#classify-tpl",o,".classify-list");var a=t.items[1].data.data;u("#tb-tpl",a,".hot");var i=t.items[2].data.data,c=p(i,5),l=0;u("#recommend-tpl",c[0],".recommend-list"),s(".change-btn").on("click",function(){l<c.length-1?l++:l=0,u("#recommend-tpl",c[l],".recommend-list")})}(n.data)}).catch(function(t){console.warn(t)});var o=1,a=10,i=0;function c(t){var n=e.api[1]+"?pagenum="+t+"&limit="+a;f(n).then(function(t){var n=JSON.parse(t);console.log(t),1===n.code&&(i=n.data.total,u("#l-r-tpl",n.data.target,".loadmore",!0),s(".bookcity").on("scroll",r))}).catch(function(t){console.warn(t)})}c(o),s(".tab-wrap").on("click",".tab-item",function(){var t=s(this).index();n.slideTo(t),m(t)});var l=s(".bookcity").height();function r(){var t=s(".inner-con").height()-l;s(this).scrollTop()>t-44&&o<i&&(o++,s(".bookcity").off("scroll"),c(o))}s(".icon-person").on("click",function(){var t=window.localStorage.getItem("code")||0;location.href=t?"/my":"/login"})}});