(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["trending"],{"5fb6":function(t,n,e){"use strict";var r=e("c798"),a=e.n(r);a.a},"8afe":function(t,n,e){"use strict";function r(t){if(Array.isArray(t)){for(var n=0,e=new Array(t.length);n<t.length;n++)e[n]=t[n];return e}}function a(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function s(t){return r(t)||a(t)||i()}e.d(n,"a",function(){return s})},c798:function(t,n,e){},e8f3:function(t,n,e){"use strict";e.r(n);var r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-flex",{staticClass:"pt-3",attrs:{xs12:"",lg10:""}},[e("v-tabs",{attrs:{dark:"","slider-color":"primary"},model:{value:t.tab,callback:function(n){t.tab=n},expression:"tab"}},[e("v-tab",{attrs:{ripple:""}},[t._v("\n      All\n    ")]),e("v-tab",{attrs:{ripple:""}},[t._v("\n      SoundCloud\n    ")]),e("v-tab",{attrs:{ripple:""}},[t._v("\n      YouTube\n    ")])],1),e("playlist",{attrs:{"show-uploaded":!0,"sort-by":null,songs:t.songs,"rows-per-page":"-1"}})],1)},a=[],i=e("8afe"),s=(e("cadf"),e("551c"),e("097d"),{name:"Trending",data:function(){return{tab:0,yt:[],sc:[]}},methods:{getYT:function(){var t=this;this.$DCAPI.getTrendingYT().then(function(n){t.yt=n.data})},getSC:function(){var t=this;this.$DCAPI.getTrendingSC().then(function(n){t.sc=n.data})}},computed:{songs:function(){return 0==this.tab?this.all:1==this.tab?this.sc:2==this.tab?this.yt:void 0},all:function(){for(var t=Object(i["a"])(this.sc),n=0;n<this.yt.length-1;n++)t.splice(n+1,0,this.yt[n]);return t}},created:function(){this.getYT(),this.getSC()}}),o=s,c=(e("5fb6"),e("2877")),u=e("71a3"),l=e("fe57"),f=e("0e8f"),p=Object(c["a"])(o,r,a,!1,null,null,null);p.options.__file="trending.vue";n["default"]=p.exports;p.options.components=Object.assign({VTab:u["a"],VTabs:l["a"],VFlex:f["a"]},p.options.components)}}]);