(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["history"],{"08fc":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-flex",{attrs:{xs12:"",lg10:""}},[t.bLoading||t.aHistRev.length?s("div",{staticClass:"headline fwl text-xs-left pl-2 pt-2"},[t._v("History")]):t._e(),t.bLoading||t.aHistRev.length?s("playlist",{attrs:{songs:t.aHistRev,"rows-per-page":"84"}}):t.bFailed?s("jumbo",{attrs:{title:"Here is supposed to be your history",subheading:"But it looks like you haven't listened to any music yet"}}):t._e()],1)},i=[],n=s("75fc"),o=s("cebc"),r=s("a1b2"),l=(s("8a7b"),s("2f62")),u={props:["user"],name:"history",components:{jumbo:r["a"]},data:function(){return{aHistory:[],bLoading:!1,bFailed:!1}},watch:{auth_state:{handler:"bind",immediate:!0}},methods:{bind:function(){var t=this;this.auth_state&&(this.$store.dispatch("loadIndeterm",!0),this.bFailed=!1,this.$bindAsArray("aHistory",this.$DCFB.history.limitToLast(200),null,function(){t.$store.dispatch("loadIndeterm",!1),t.bLoading=!1,t.bFailed=!t.aHistory.length}))}},computed:Object(o["a"])({},Object(l["b"])({auth_state:"auth_state"}),{aHistRev:function(){return this.$UTILS.uniqueArray(Object(n["a"])(this.aHistory).reverse())}})},d=u,h=s("2877"),c=s("6544"),b=s.n(c),p=s("0e8f"),y=Object(h["a"])(d,a,i,!1,null,null,null);e["default"]=y.exports;b()(y,{VFlex:p["a"]})}}]);