(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["searchpage"],{"412a":function(e,t,n){},"61be":function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-flex",{staticClass:"loading-flex mt-3",attrs:{"justify-center":"","align-center":""}},[n("div",{staticClass:"half-circle-spinner"},[n("div",{staticClass:"circle circle-1",style:e.circle1Style}),n("div",{staticClass:"circle circle-2",style:e.circle2Style})])])},s=[],a={name:"Loading",computed:{circle1Style:function(){return Object.assign({borderTopColor:this.$vuetify.theme.primary},this.circleStyle)},circle2Style:function(){return Object.assign({borderBottomColor:this.$vuetify.theme.primary},this.circleStyle)}}},r=a,l=(n("743b"),n("2877")),o=n("6544"),c=n.n(o),u=n("0e8f"),d=Object(l["a"])(r,i,s,!1,null,null,null);t["a"]=d.exports;c()(d,{VFlex:u["a"]})},"743b":function(e,t,n){"use strict";var i=n("412a"),s=n.n(i);s.a},"9c4f":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-flex",{attrs:{xs12:"",lg10:"",flexbox:"","mt-3":""}},[e.loading||e.bFailed?e._e():n("playlist",{attrs:{"show-uploaded":!0,songs:e.searchResults,"rows-per-page":"-1"},on:{conmen:function(t){return e.$emit("conmen",t)}}}),e.loading?e._e():n("infinite-loading",{ref:"infiniteLoading",attrs:{distance:210,spinner:"waveDots"},on:{infinite:e.infiniteHandler}},[n("span",{attrs:{slot:"no-more"},slot:"no-more"}),n("span",{attrs:{slot:"no-results"},slot:"no-results"})]),e.bFailed&&e.$route.params.source?n("jumbo",{attrs:{subheading:"Couldn't find '"+e.$route.params.query+"' on "+e.$route.params.source,error:"Try again"}}):e._e()],1)},s=[],a=n("75fc"),r=(n("7f7f"),n("386d"),n("28a5"),n("e166")),l=n.n(r),o=n("61be"),c=n("a1b2"),u={name:"Searchpage",props:{query:{type:String,default:""},source:{type:String,default:""}},data:function(){return{loading:!1,searchResults:[],iPage:0,bFailed:!1}},components:{"infinite-loading":l.a,loading:o["a"],jumbo:c["a"]},computed:{splitSource:function(){return this.source.split("-")}},watch:{"$route.params":{immediate:!0,handler:"searchInt"}},methods:{infiniteHandler:function(e){this.search(++this.iPage).then(function(){e.loaded()})},searchInt:function(){"searchPage"==this.$route.name&&(this.$store.dispatch("loadIndeterm",!0),this.bFailed=!1,this.search(0))},search:function(e){var t=this;return this.searchResults=e?this.searchResults:[],this.$DCAPI.searchInt(this.$route.params.query,e,this.splitSource,"",function(n){var i;(t.loading=!1,0===e&&t.$store.dispatch("loadIndeterm",!1),n.length||t.searchResults.length)?(i=t.searchResults).push.apply(i,Object(a["a"])(n)):(t.$refs.infiniteLoading.$emit("$InfiniteLoading:complete"),t.bFailed=!0)},"")}}},d=u,h=n("2877"),f=n("6544"),p=n.n(f),m=n("0e8f"),g=Object(h["a"])(d,i,s,!1,null,null,null);t["default"]=g.exports;p()(g,{VFlex:m["a"]})}}]);