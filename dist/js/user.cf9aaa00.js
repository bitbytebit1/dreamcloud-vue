(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["user"],{"5c64":function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-flex",{attrs:{xs10:"",xl8:""}},[s("h1",{staticClass:"display-1 fwl"},[t._v("Index for user "+t._s(t.$route.params.user.substring(0,6)))]),s("v-container",{attrs:{"grid-list-lg":""}},[s("v-layout",{attrs:{row:"",wrap:""}},t._l(t.items,function(e){return s("v-flex",{key:e.index,attrs:{xs12:""}},[s("v-card",{attrs:{to:e.route,color:""}},[s("v-container",{attrs:{fluid:"","grid-list-lg":""}},[s("v-layout",{attrs:{row:""}},[s("v-flex",{attrs:{xs7:""}},[s("div",[s("div",{staticClass:"headline"},[t._v(t._s(e.text))])])]),s("v-flex",{attrs:{xs5:""}},[s("v-icon",{attrs:{large:""}},[t._v(t._s(e.icon))])],1)],1)],1)],1)],1)}),1)],1)],1)},a=[],o=(s("cadf"),s("551c"),s("f751"),s("097d"),{name:"UserOverview",computed:{items:function(){return[{text:"Library",route:{name:"playlistsAll",params:{user:this.$route.params.user}},icon:"account_balance"},{text:"Home",route:{name:"home",params:{user:this.$route.params.user}},icon:"home"},{text:"Playlists",route:{name:"playlistOverview",params:{user:this.$route.params.user}},icon:"list"},{text:"Subscriptions",route:{name:"userSubOverview",params:{user:this.$route.params.user}},icon:"people"},{text:"Latest from subscriptions",route:{name:"subsAll",params:{user:this.$route.params.user}},icon:"loyalty"}]}}}),i=o,u=s("2877"),n=s("6544"),l=s.n(n),c=s("b0af"),p=s("a523"),m=s("0e8f"),v=s("132d"),x=s("a722"),d=Object(u["a"])(i,r,a,!1,null,null,null);e["default"]=d.exports;l()(d,{VCard:c["a"],VContainer:p["a"],VFlex:m["a"],VIcon:v["a"],VLayout:x["a"]})}}]);