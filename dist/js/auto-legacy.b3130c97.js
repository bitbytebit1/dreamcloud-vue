(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["auto"],{b69d:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:String(t.trackID)}})},o=[];function i(t){return c(t)||s(t)||a()}function a(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function s(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function c(t){if(Array.isArray(t)){for(var e=0,r=new Array(t.length);e<t.length;e++)r[e]=t[e];return r}}var u={name:"Auto",props:{artistID:{type:[String,Number],default:""},trackID:{type:[String,Number],default:""},source:{type:String,default:""},artist:{type:String,default:""}},methods:{in:function(){var t=this;this.trackID!=this.$store.getters.current_trackID?this.$DCAPI.getSongInfo(this.trackID,this.source,function(e){t.$DCAPI.searchInt("",0,[t.source],t.trackID,function(r){r.length&&(r[0].trackID===t.trackID&&r.shift(),e=[].concat(i(e),i(r))),t.$DCPlayer.setNPlay({songs:e,current:0,path:t.$route.path}),t.$nextTick(function(){t.$store.commit("bShowStage",!0),t.$DCPlayer.ePlayer().play()})},!0,50)},""):this.$store.commit("bShowStage",!0)}},updated:function(){this.in()},beforeRouteLeave:function(t,e,r){this.$store.commit("bShowStage",!1),this.$store.getters.showPopupSetting&&this.$store.getters.current_index>-1&&this.$store.commit("show_pop",!0),r()},beforeRouteEnter:function(t,e,r){r(function(t){t.$store.commit("bShowStage",!0),t.$store.commit("show_pop",!1)})},created:function(){this.in()}},h=u,f=r("2877"),p=Object(f["a"])(h,n,o,!1,null,null,null);e["default"]=p.exports}}]);