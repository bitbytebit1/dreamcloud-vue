(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["searchQuery"],{"412a":function(e,t,n){},"61be":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-flex",{staticClass:"loading-flex mt-3",attrs:{"justify-center":"","align-center":""}},[n("div",{staticClass:"half-circle-spinner"},[n("div",{staticClass:"circle circle-1",style:e.circle1Style}),n("div",{staticClass:"circle circle-2",style:e.circle2Style})])])},i=[],s={name:"Loading",computed:{circle1Style:function(){return Object.assign({borderTopColor:this.$vuetify.theme.primary},this.circleStyle)},circle2Style:function(){return Object.assign({borderBottomColor:this.$vuetify.theme.primary},this.circleStyle)}}},a=s,o=(n("743b"),n("2877")),l=n("6544"),c=n.n(l),u=n("0e8f"),f=Object(o["a"])(a,r,i,!1,null,null,null);t["a"]=f.exports;c()(f,{VFlex:u["a"]})},"743b":function(e,t,n){"use strict";var r=n("412a"),i=n.n(r);i.a},ab5d:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-flex",{attrs:{xs12:"",lg10:"",flexbox:"","mt-3":""}},[e.loading||e.bFailed?e._e():n("playlist",{attrs:{"show-uploaded":!0,songs:e.searchResults,infinite:""},on:{conmen:function(t){return e.$emit("conmen",t)}}}),e.loading?e._e():n("infinite-loading",{ref:"infiniteLoading",attrs:{distance:800,spinner:"waveDots"},on:{infinite:e.infiniteHandler}},[n("span",{attrs:{slot:"no-more"},slot:"no-more"}),n("span",{attrs:{slot:"no-results"},slot:"no-results"})]),e.bFailed||!e.$route.params.source?n("jumbo",{attrs:{subheading:"Couldn't find '"+e.$route.params.query+"' on "+e.$route.params.source,error:"Try again"}}):e._e()],1)},i=[],s=n("e166"),a=n.n(s),o=n("61be"),l=n("a1b2");function c(e){return h(e)||f(e)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function f(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function h(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}var d={name:"SearchQuery",props:{query:{type:String,default:""},source:{type:String,default:""}},data:function(){return{loading:!0,searchResults:[],iPage:0,oldQ:"",bFailed:!1,infState:""}},components:{"infinite-loading":a.a,loading:o["a"],jumbo:l["a"]},beforeRouteUpdate:function(e,t,n){this.searchInt(e.params.query,e.params.source),n()},beforeRouteEnter:function(e,t,n){n(function(t){t.searchInt(e.params.query,e.params.source)})},methods:{infiniteHandler:function(e){this.infState=e,this.search(this.query,this.source,++this.iPage).then(function(){e.loaded()})},searchInt:function(e,t){this.oldQ!=e+t&&("function"==typeof this.infState.reset&&this.infState.reset(),this.bFailed=!1,this.search(e,t,0))},search:function(e,t,n){var r=this;return this.searchResults=n?this.searchResults:[],this.oldQ=e+t,this.$DCAPI.searchInt(e,n,t.split("-"),"",function(e){if(e.length||r.searchResults.length)if(e.length){var t;(t=r.searchResults).push.apply(t,c(e)),r.loading=!1}else r.infState.complete();else r.infState.complete(),r.bFailed=!0},"")}}},p=d,m=n("2877"),y=n("6544"),b=n.n(y),g=n("0e8f"),v=Object(m["a"])(p,r,i,!1,null,null,null);t["default"]=v.exports;b()(v,{VFlex:g["a"]})}}]);