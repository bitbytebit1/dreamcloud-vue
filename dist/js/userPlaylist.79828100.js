(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["userPlaylist"],{"7fa6":function(t,e,s){"use strict";s.r(e);var l=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-flex",{attrs:{xs12:"",lg10:"",flexbox:""}},[s("div",{staticClass:"headline fwl text-xs-left pl-2 pt-2"},[t._v(t._s(t.name))]),s("playlist",{attrs:{"show-uploaded":!0,songs:t.aSongs,infinite:""},on:{conmen:function(e){return t.$emit("conmen",e)}}})],1)},a=[],n={name:"UserPlaylist",props:{user:{type:String,default:""},playlist:{type:String,default:""},name:{type:String,default:""}},beforeRouteEnter(t,e,s){s(e=>{e.bind(t.params.user,t.params.playlist)})},beforeRouteUpdate(t,e,s){this.bind(t.params.user,t.params.playlist),s()},data(){return{aSongs:[],oldPlaylist:""}},methods:{bind(t,e){this.oldPlaylist!=e&&(this.oldPlaylist=e,this.$bindAsArray("aSongs",this.$DCFB.playlistGet(t,e),null))}}},i=n,r=s("2877"),o=s("6544"),p=s.n(o),u=s("0e8f"),d=Object(r["a"])(i,l,a,!1,null,null,null);e["default"]=d.exports;p()(d,{VFlex:u["a"]})}}]);