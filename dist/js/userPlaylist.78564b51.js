(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["userPlaylist"],{"7fa6":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-flex",{attrs:{xs12:"",lg10:"",flexbox:""}},[n("div",{staticClass:"headline fwl text-xs-left pl-2 pt-2"},[t._v(t._s(t.name))]),n("playlist",{attrs:{"show-uploaded":!0,songs:t.aSongs,"rows-per-page":"40"},on:{conmen:function(e){return t.$emit("conmen",e)}}})],1)},a=[],l={name:"UserPlaylist",props:{user:{type:String,default:""},playlist:{type:String,default:""},name:{type:String,default:""}},beforeRouteEnter:function(t,e,n){n(function(e){e.bind(t.params.user,t.params.playlist)})},beforeRouteUpdate:function(t,e,n){this.bind(t.params.user,t.params.playlist),n()},data:function(){return{aSongs:[]}},methods:{bind:function(t,e){this.$bindAsArray("aSongs",this.$DCFB.playlistGet(t,e),null)}}},r=l,i=n("2877"),o=n("6544"),u=n.n(o),p=n("0e8f"),f=Object(i["a"])(r,s,a,!1,null,null,null);e["default"]=f.exports;u()(f,{VFlex:p["a"]})}}]);