(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["searchQuery"],{"28a5":function(e,t,i){"use strict";var n=i("aae3"),r=i("cb7c"),s=i("ebd6"),a=i("0390"),l=i("9def"),o=i("5f1b"),c=i("520a"),u=i("79e5"),h=Math.min,d=[].push,f="split",p="length",g="lastIndex",m=4294967295,v=!u(function(){RegExp(m,"y")});i("214f")("split",2,function(e,t,i,u){var b;return b="c"=="abbc"[f](/(b)*/)[1]||4!="test"[f](/(?:)/,-1)[p]||2!="ab"[f](/(?:ab)*/)[p]||4!="."[f](/(.?)(.?)/)[p]||"."[f](/()()/)[p]>1||""[f](/.?/)[p]?function(e,t){var r=String(this);if(void 0===e&&0===t)return[];if(!n(e))return i.call(r,e,t);var s,a,l,o=[],u=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),h=0,f=void 0===t?m:t>>>0,v=new RegExp(e.source,u+"g");while(s=c.call(v,r)){if(a=v[g],a>h&&(o.push(r.slice(h,s.index)),s[p]>1&&s.index<r[p]&&d.apply(o,s.slice(1)),l=s[0][p],h=a,o[p]>=f))break;v[g]===s.index&&v[g]++}return h===r[p]?!l&&v.test("")||o.push(""):o.push(r.slice(h)),o[p]>f?o.slice(0,f):o}:"0"[f](void 0,0)[p]?function(e,t){return void 0===e&&0===t?[]:i.call(this,e,t)}:i,[function(i,n){var r=e(this),s=void 0==i?void 0:i[t];return void 0!==s?s.call(i,r,n):b.call(String(r),i,n)},function(e,t){var n=u(b,e,this,t,b!==i);if(n.done)return n.value;var c=r(e),d=String(this),f=s(c,RegExp),p=c.unicode,g=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(v?"y":"g"),y=new f(v?c:"^(?:"+c.source+")",g),x=void 0===t?m:t>>>0;if(0===x)return[];if(0===d.length)return null===o(y,d)?[d]:[];var $=0,w=0,S=[];while(w<d.length){y.lastIndex=v?w:0;var C,I=o(y,v?d:d.slice(w));if(null===I||(C=h(l(y.lastIndex+(v?0:w)),d.length))===$)w=a(d,w,p);else{if(S.push(d.slice($,w)),S.length===x)return S;for(var R=1;R<=I.length-1;R++)if(S.push(I[R]),S.length===x)return S;w=$=C}}return S.push(d.slice($)),S}]})},"412a":function(e,t,i){},"61be":function(e,t,i){"use strict";var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-flex",{staticClass:"loading-flex mt-3",attrs:{"justify-center":"","align-center":""}},[i("div",{staticClass:"half-circle-spinner"},[i("div",{staticClass:"circle circle-1",style:e.circle1Style}),i("div",{staticClass:"circle circle-2",style:e.circle2Style})])])},r=[],s={name:"Loading",computed:{circle1Style:function(){return Object.assign({borderTopColor:this.$vuetify.theme.primary},this.circleStyle)},circle2Style:function(){return Object.assign({borderBottomColor:this.$vuetify.theme.primary},this.circleStyle)}}},a=s,l=(i("743b"),i("2877")),o=i("6544"),c=i.n(o),u=i("0e8f"),h=Object(l["a"])(a,n,r,!1,null,null,null);t["a"]=h.exports;c()(h,{VFlex:u["a"]})},"743b":function(e,t,i){"use strict";var n=i("412a"),r=i.n(n);r.a},aae3:function(e,t,i){var n=i("d3f4"),r=i("2d95"),s=i("2b4c")("match");e.exports=function(e){var t;return n(e)&&(void 0!==(t=e[s])?!!t:"RegExp"==r(e))}},ab5d:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("v-flex",{attrs:{xs12:"",lg10:"",flexbox:"","mt-3":""}},[e.loading||e.bFailed?e._e():i("playlist",{attrs:{"show-uploaded":!0,songs:e.searchResults,"rows-per-page":"-1"},on:{conmen:function(t){return e.$emit("conmen",t)}}}),e.loading?e._e():i("infinite-loading",{ref:"infiniteLoading",attrs:{distance:210,spinner:"waveDots"},on:{infinite:e.infiniteHandler}},[i("span",{attrs:{slot:"no-more"},slot:"no-more"}),i("span",{attrs:{slot:"no-results"},slot:"no-results"})]),e.bFailed||!e.$route.params.source?i("jumbo",{attrs:{subheading:"Couldn't find '"+e.$route.params.query+"' on "+e.$route.params.source,error:"Try again"}}):e._e()],1)},r=[],s=i("75fc"),a=(i("7f7f"),i("386d"),i("28a5"),i("e166")),l=i.n(a),o=i("61be"),c=i("a1b2"),u={name:"SearchQuery",props:{query:{type:String,default:""},source:{type:String,default:""}},data:function(){return{loading:!1,searchResults:[],iPage:0,oldQ:"",bFailed:!1}},components:{"infinite-loading":l.a,loading:o["a"],jumbo:c["a"]},computed:{splitSource:function(){return this.source.split("-")}},watch:{"$route.params":{immediate:!0,handler:"searchInt"}},methods:{infiniteHandler:function(e){this.search(++this.iPage).then(function(){e.loaded()})},searchInt:function(){"searchQuery"==this.$route.name&&this.oldQ!=this.$route.params.query+this.$route.params.source&&(this.$store.dispatch("loadIndeterm",!0),this.bFailed=!1,this.search(0))},search:function(e){var t=this;return this.searchResults=e?this.searchResults:[],this.oldQ=this.$route.params.query+this.$route.params.source,this.$DCAPI.searchInt(this.$route.params.query,e,this.splitSource,"",function(i){var n;(t.loading=!1,0===e&&t.$store.dispatch("loadIndeterm",!1),i.length||t.searchResults.length)?(n=t.searchResults).push.apply(n,Object(s["a"])(i)):(t.$refs.infiniteLoading.$emit("$InfiniteLoading:complete"),t.bFailed=!0)},"")}}},h=u,d=i("2877"),f=i("6544"),p=i.n(f),g=i("0e8f"),m=Object(d["a"])(h,n,r,!1,null,null,null);t["default"]=m.exports;p()(m,{VFlex:g["a"]})}}]);