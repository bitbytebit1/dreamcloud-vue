(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["history"],{"08fc":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-flex",{attrs:{xs12:"",lg10:""}},[t.bLoading||t.aHistRev.length?i("div",{staticClass:"headline fwl text-xs-left pl-2 pt-2"},[t._v("History")]):t._e(),t.bLoading||t.aHistRev.length?i("playlist",{attrs:{songs:t.aHistRev,"rows-per-page":"84"}}):t.bFailed?i("jumbo",{attrs:{title:"Here is supposed to be your history",subheading:"But it looks like you haven't listened to any music yet"}}):t._e()],1)},a=[],r=i("2909"),s=i("be94"),o=(i("cadf"),i("551c"),i("097d"),i("a1b2")),u=(i("8a7b"),i("2f62")),l={props:["user"],name:"history",components:{jumbo:o["a"]},data:function(){return{aHistory:[],bLoading:!1,bFailed:!1}},watch:{auth_state:{handler:"bind",immediate:!0}},methods:{bind:function(){var t=this;this.auth_state&&(this.$store.dispatch("loadIndeterm",!0),this.bFailed=!1,this.$bindAsArray("aHistory",this.$DCFB.history.limitToLast(200),null,function(){t.$store.dispatch("loadIndeterm",!1),t.bLoading=!1,t.bFailed=!t.aHistory.length}))}},computed:Object(s["a"])({},Object(u["b"])({auth_state:"auth_state"}),{aHistRev:function(){return this.$UTILS.uniqueArray(Object(r["a"])(this.aHistory).reverse())}})},c=l,d=(i("ac40"),i("2877")),h=i("6544"),b=i.n(h),f=i("0e8f"),p=Object(d["a"])(c,n,a,!1,null,null,null);p.options.__file="history.vue";e["default"]=p.exports;b()(p,{VFlex:f["a"]})},2909:function(t,e,i){"use strict";function n(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}function a(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function s(t){return n(t)||a(t)||r()}i.d(e,"a",function(){return s})},"4b04":function(t,e,i){},ac40:function(t,e,i){"use strict";var n=i("4b04"),a=i.n(n);a.a}}]);