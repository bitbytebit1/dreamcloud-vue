(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"73cf":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-flex",{attrs:{xs12:"",lg10:""}},[n("div",{staticClass:"headline fwl text-xs-left pl-2 pt-2"},[e._v("Recommended")]),n("playlist",{attrs:{"show-uploaded":!0,songs:e.aRecommended,infinite:""},on:{conmen:function(t){return e.$emit("conmen",t)}}})],1)},o=[],i=n("bc3a"),a=n.n(i),c=n("a1b2"),s=n("2f62");function u(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?u(n,!0).forEach(function(t){f(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function d(e){return p(e)||h(e)||m()}function m(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function h(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function p(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}var y={name:"Home",components:{jumbo:c["a"]},data:function(){return{iLimit:this.$vuetify.breakpoint.xsOnly?3:10,sLastTrack:"",aRecommended:[],aHistory:[],bLoaded:!1}},watch:{auth_state:{immediate:!0,handler:"bind"}},activated:function(){this.bind()},methods:{bind:function(){var e=this;this.auth_state&&this.$bindAsArray("aHistory",this.$DCFB.fbhistory.limitToLast(10),null,function(){e.aHistory[0].trackID!=e.sLastTrack?(e.aRecommended=[],e.getRecommended(),console.log("getting history")):console.log("NOT getting history")})},getRecommended:function(){var e=this;if(this.aHistory.length){for(var t=[],n=this.$DCAPI.uniqueArray(this.aHistory.reverse()).slice(0,this.iLimit),r=[],o=0;o<n.length-1;o++)t.push(this.$DCAPI.searchInt("",0,[n[o].source],n[o].trackID,function(t){var n;t.length&&(r=e.$DCAPI.uniqueArray([].concat(d(r),d(t))),(n=e.aRecommended).push.apply(n,d(r)))},!0,25));r=[],a.a.all(t).then(function(){e.aRecommended=e.$DCAPI.uniqueArray(e.aRecommended),e.sLastTrack=e.aRecommended[0].trackID})}else this.$DCAPI.searchInt(" ",0,["YouTube"],!1,function(t){var n;t.length&&(n=e.aRecommended).push.apply(n,d(e.$DCAPI.uniqueArray(t)))},!1,50)}},computed:l({},Object(s["c"])({auth_state:function(e){return e.user.auth_state}}))},b=y,g=n("2877"),O=n("6544"),v=n.n(O),w=n("0e8f"),A=Object(g["a"])(b,r,o,!1,null,null,null);t["default"]=A.exports;v()(A,{VFlex:w["a"]})}}]);