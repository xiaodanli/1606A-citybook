"use strict";define(["jquery","render","get","bscroll"],function(o,a,t,c){return function(e){var n=new c(".chapter-con",{click:!0});t(e.api).then(function(t){console.log(t);var c=JSON.parse(t);if(1===c.code){a("#chapter-tpl",c.data.item.toc,".chapter-list"),n.refresh();var i="null"!=e.chapter_id?e.chapter_id:c.data.item.toc.length-1;n.scrollToElement(o(".chapter-list li").eq(i)[0])}}).catch(function(t){console.warn(t)}),o(".icon-back").on("click",function(){history.go(-1)}),o(".chapter-list").on("click","li",function(){var t=o(this).attr("data-id");window.localStorage.setItem(e.fiction_id,t),location.href="/artical/"+e.fiction_id+"/"+t})}});