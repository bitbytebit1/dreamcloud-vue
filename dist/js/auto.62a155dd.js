(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["auto"],{"343b":function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:String(t.trackID)}})},r=[],s=(i("c5f6"),{name:"Auto",props:{artistID:{type:[String,Number],default:""},trackID:{type:[String,Number],default:""},source:{type:String,default:""},artist:{type:String,default:""}},methods:{in:function(){var t=this;this.trackID!=this.$store.getters.current_trackID&&"z"!==this.trackID?this.$DCAPI.getSongInfo(this.trackID,this.source,function(e){t.$DCPlayer.setNPlay(e,0),t.$store.commit("setNPlay",{songs:e,current:0,path:t.$route.path}),t.$nextTick(function(){t.$store.commit("bShowStage",!0),t.$DCPlayer.eAudio.play()})},""):this.$store.commit("bShowStage",!0)}},updated:function(){this.in()},deactivated:function(){this.$store.commit("bShowStage",!1),this.$store.commit("show_pop",!0)},activated:function(){this.$store.commit("bShowStage",!0),this.$store.commit("show_pop",!1)},created:function(){this.in(),console.log(this.$vuetify.theme.primary)}}),n=s,a=i("2877"),c=Object(a["a"])(n,o,r,!1,null,null,null);e["default"]=c.exports}}]);