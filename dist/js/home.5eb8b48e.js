(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"73cf":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-flex",{attrs:{lg10:e.viewSmall,lg12:!e.viewSmall,xs12:""}},[e.bFailed?e._e():n("div",{staticClass:"headline fwl text-xs-left pl-2 pt-2"},[e._v("Recommended")]),e.bFailed?e._e():n("playlist",{attrs:{"show-uploaded":!0,songs:e.aRecommended2,infinite:""},on:{conmen:function(t){return e.$emit("conmen",t)}}})],1)},r=[],a=n("bc3a"),o=n.n(a),s=n("a1b2"),c=n("2f62");function d(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,i)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?d(n,!0).forEach(function(t){l(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):d(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var h={name:"Home",components:{jumbo:s["a"]},props:{iLimit:{type:[Number],default:50},rowsPerPage:{type:[Number],default:100}},data(){return{bLoading:!1,bFailed:!1,iLoaded:1,aRecommended:[],bLoaded:!1,viewSmall:"home"===this.$route.name}},watch:{auth_state:{immediate:!0,handler:"bind"}},methods:{bind(){this.auth_state&&(this.bFailed=!1,this.$bindAsArray("aHistory",this.$DCFB.fbhistory.limitToLast(this.iLimit),null,this.getRecommended))},getRecommended(){if(!this.aHistory.length)return this.bLoading=!1,void this.$DCAPI.searchInt(" ",0,["YouTube"],!1,e=>{this.iLoaded++,e.length&&this.aRecommended.push(...this.$DCAPI.uniqueArray(e))},!1,50);this.bLoading=!0;var e=[];const t=this.$DCAPI.uniqueArray(this.aHistory.reverse());let n=[];for(var i=0;i<t.length-1;i++)e.push(this.$DCAPI.searchInt("",0,[t[i].source],t[i].trackID,e=>{e.length&&(n=this.$DCAPI.uniqueArray([...n,...e]),this.aRecommended.push(...n))},!0,50));n=[],o.a.all(e).then(()=>{this.aRecommended=this.$DCAPI.uniqueArray(this.aRecommended)}),this.bLoading=!1}},computed:u({},Object(c["c"])({auth_state:e=>e.user.auth_state}),{aRecommended2(){return this.bLoading?[]:this.aRecommended}})},m=h,b=n("2877"),p=n("6544"),f=n.n(p),y=n("0e8f"),g=Object(b["a"])(m,i,r,!1,null,null,null);t["default"]=g.exports;f()(g,{VFlex:y["a"]})}}]);