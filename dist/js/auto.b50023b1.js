(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["auto"],{"343b":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:String(t.trackID)}})},r=[],o={name:"Auto",props:{artistID:{type:[String,Number],default:""},trackID:{type:[String,Number],default:""},source:{type:String,default:""},artist:{type:String,default:""}},methods:{in(){this.trackID!=this.$store.getters.current_trackID&&"z"!==this.trackID?this.$DCAPI.getSongInfo(this.trackID,this.source,t=>{this.$DCPlayer.setNPlay(t,0),this.$store.commit("setNPlay",{songs:t,current:0,path:this.$route.path}),this.$nextTick(()=>{this.$store.commit("bShowStage",!0),this.$DCPlayer.eAudio.play()})},""):this.$store.commit("bShowStage",!0)}},updated(){this.in()},deactivated(){this.$store.commit("bShowStage",!1),this.$store.getters.showPopupSetting&&this.$store.state.player.current_index>-1&&this.$store.commit("show_pop",!0)},activated(){this.$store.commit("bShowStage",!0),this.$store.commit("show_pop",!1)},created(){this.in()}},a=o,h=s("2877"),n=Object(h["a"])(a,i,r,!1,null,null,null);e["default"]=n.exports}}]);