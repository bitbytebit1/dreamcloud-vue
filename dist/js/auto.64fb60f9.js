(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["auto"],{b69d:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:String(t.trackID)}})},i=[],o={name:"Auto",props:{artistID:{type:[String,Number],default:""},trackID:{type:[String,Number],default:""},source:{type:String,default:""},artist:{type:String,default:""}},methods:{in(){this.trackID!=this.$store.getters.current_trackID?this.$DCAPI.getSongInfo(this.trackID,this.source,t=>{this.$DCAPI.searchInt("",0,[this.source],this.trackID,e=>{e.length&&(e[0].trackID===this.trackID&&e.shift(),t=[...t,...e]),this.$DCPlayer.setNPlay({songs:t,current:0,path:this.$route.path}),this.$nextTick(()=>{this.$store.commit("bShowStage",!0),this.$DCPlayer.eAudio.play()})},!0,50)},""):this.$store.commit("bShowStage",!0)}},updated(){this.in()},beforeRouteLeave(t,e,s){this.$store.commit("bShowStage",!1),this.$store.getters.showPopupSetting&&this.$store.getters.current_index>-1&&this.$store.commit("show_pop",!0),s()},beforeRouteEnter(t,e,s){s(t=>{t.$store.commit("bShowStage",!0),t.$store.commit("show_pop",!1)})},created(){this.in()}},a=o,h=s("2877"),n=Object(h["a"])(a,r,i,!1,null,null,null);e["default"]=n.exports}}]);