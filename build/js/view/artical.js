"use strict";define(["jquery","render","get","base64"],function(o,i,a,t){var c=o(".model"),e=o(".set-style"),n=o(".open-style");o(".artical-con").on("click",function(){c.show()}),o(".model-c").on("click",function(){c.hide(),e.hide(),n.removeClass("active")}),n.on("click",function(){e.toggle(),n.toggleClass("active")});var l=window.localStorage,r=1*l.getItem("fz")||14;o(".big-btn").on("click",function(){r<30&&(r+=2,l.setItem("fz",r),o(".artical-con p").css("fontSize",r/37.5+"rem"))}),o(".small-btn").on("click",function(){12<r&&(r-=2,l.setItem("fz",r),o(".artical-con p").css("fontSize",r/37.5+"rem"))});var s="夜间"===(l.getItem("status")||"夜间"),d=l.getItem("bg")||"#f7eee5",f=o(".icon-night");function u(t){t?(f.find("dd").text("夜间"),f.removeClass("light"),o(".artical-con").css("backgroundColor",d),l.setItem("status","夜间")):(f.find("dd").text("白天"),f.addClass("light"),o(".artical-con").css("backgroundColor","#0f1410"),l.setItem("status","白天"))}u(s),f.on("click",function(){u(s=!s)}),o(".set-bg").on("click","li",function(){d=o(this).attr("data-bg"),s&&o(".artical-con").css("backgroundColor",d),l.setItem("bg",d),o(this).addClass("active").siblings().removeClass("active")});return function(e){window.localStorage.getItem("code")||(location.href="/login");var n=e.fiction_id,t=l.getItem(n)||e.chapter_id;function c(t){var c=e.api+"?fiction_id="+n+"&chapter_id="+t;a(c).then(function(t){var c=JSON.parse(t);if(1===c.code){var e=document.createElement("script");e.src=c.data.jsonp,document.body.appendChild(e),window.duokan_fiction_chapter=function(t){var c=JSON.parse(o.base64().decode(t));i("#artical-tpl",c,".artical-con"),o(".artical-con p").css("fontSize",r/37.5+"rem")}}}).catch(function(t){console.warn(t)})}o(".cur").html(t),c(t),o(".next-btn").on("click",function(){t<4?(c(++t),o(".cur").html(t),l.setItem(n,t)):alert("已经到最后一章")}),o(".prev-btn").on("click",function(){1<t?(c(--t),o(".cur").html(t),l.setItem(n,t)):alert("已经到第一章")}),a(e.chapter_list).then(function(t){console.log(t);var c=JSON.parse(t);if(1===c.code){var e=c.data.item.toc.length;o(".total").html(e)}}).catch(function(t){console.warn(t)}),o(".go-chapter").on("click",function(){location.href="/chapter/"+n+"/"+t}),o(".back").on("click",function(){location.href="/detail/"+n})}});