(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["stage"],{bcd0:function(t,e,o){"use strict";o.r(e);var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div")},s=[],r={name:"Stage",beforeRouteLeave:function(t,e,o){this.$store.commit("bShowStage",!1),this.$store.getters.showPopupSetting&&this.$store.getters.current_index>-1&&this.$store.commit("show_pop",!0),o()},beforeRouteEnter:function(t,e,o){o(function(t){t.$store.commit("bShowStage",!0),t.$store.commit("show_pop",!1)})}},i=r,c=o("2877"),u=Object(c["a"])(i,n,s,!1,null,null,null);e["default"]=u.exports}}]);