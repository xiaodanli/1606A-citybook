"use strict";define(["jquery"],function(u){var o={};return function(r,n){return new Promise(function(e,t){o[r]?e(o[r]):u.ajax({url:r,dataType:"text",data:n||null,success:function(n){console.log(n),o[r]=n,e(n)},error:function(n){t(n)}})})}});