(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["channelPlaylist"],{b1c9:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-flex",{key:this.$route.params.playlist,attrs:{xs12:"",lg10:"",flexbox:""}},[n("div",{staticClass:"headline fwl text-xs-center pb-2"},[t._v(t._s(t.title))]),n("playlist",{attrs:{"show-uploaded":!0,songs:t.aSongs,"rows-per-page":"250"},on:{conmen:function(e){return t.$emit("conmen",e)}}})],1)},r=[];function l(t){return o(t)||i(t)||s()}function s(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function i(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function o(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}var u={name:"ChannelPlaylist",props:{listID:{type:String,default:""},artistID:{type:[String,Number],default:""},title:{type:String,default:""},source:{type:String,default:""}},watch:{listID:{handler:"getPlaylistItems",immediate:!0}},data:function(){return{aSongs:[]}},methods:{getPlaylistItems:function(){var t=this,e=function e(n){var a=t.listID;t.$DCAPI.getChannelPlaylistItems(t.listID,t.source,50,n,function(n){var r;a===t.listID&&((r=t.aSongs).push.apply(r,l(n.data)),n.nextPage&&e(n.nextPage))})};this.aSongs=[],e("")}}},c=u,p=n("2877"),f=n("6544"),g=n.n(f),y=n("0e8f"),d=Object(p["a"])(c,a,r,!1,null,null,null);e["default"]=d.exports;g()(d,{VFlex:y["a"]})}}]);