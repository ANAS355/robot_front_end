"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[642],{6642:function(a,b,c){c.r(b),c.d(b,{Geolocation:function(){return f},GeolocationWeb:function(){return e}});var d=c(9895);class e extends d.Uw{async getCurrentPosition(a){return new Promise((b,c)=>{navigator.geolocation.getCurrentPosition(a=>{b(a)},a=>{c(a)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0},a))})}async watchPosition(a,b){let c=navigator.geolocation.watchPosition(a=>{b(a)},a=>{b(null,a)},Object.assign({enableHighAccuracy:!1,timeout:1e4,maximumAge:0},a));return`${c}`}async clearWatch(a){window.navigator.geolocation.clearWatch(parseInt(a.id,10))}async checkPermissions(){if("undefined"==typeof navigator||!navigator.permissions)throw this.unavailable("Permissions API not available in this browser");let a=await window.navigator.permissions.query({name:"geolocation"});return{location:a.state,coarseLocation:a.state}}async requestPermissions(){throw this.unimplemented("Not implemented on web.")}}let f=new e}}])