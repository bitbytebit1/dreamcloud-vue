(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["searchpage"],{"2d9e":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-flex",{attrs:{xs12:"",lg10:"",flexbox:"","mt-3":""}},[e.loading||e.bFailed?e._e():s("playlist",{attrs:{"show-uploaded":!0,songs:e.searchResults,"rows-per-page":"250"},on:{conmen:function(t){return e.$emit("conmen",t)}}}),e.bFailed||!e.$route.params.source?s("jumbo",{attrs:{subheading:"Couldn't find "+e.query+" on "+e.source,error:"Try again"}}):e._e()],1)},a=[],n=s("75fc"),i=(s("7f7f"),s("386d"),s("28a5"),s("e166")),o=s.n(i),l=s("61be"),c=s("a1b2"),u={name:"SearchQuery",props:{query:{type:String,default:""},source:{type:String,default:""}},data:function(){return{loading:!1,searchResults:[],iPage:0,oldQ:"zz",bFailed:!1}},components:{"infinite-loading":o.a,loading:l["a"],jumbo:c["a"]},computed:{splitSource:function(){return this.source.split("-")}},watch:{"$route.params":{immediate:!0,handler:"searchInt"}},methods:{infiniteHandler:function(e){this.search(++this.iPage).then(function(){e.loaded()})},searchInt:function(){"searchArtist"==this.$route.name&&this.oldQ!=this.query+this.source&&(this.$store.dispatch("loadIndeterm",!0),this.bFailed=!1,this.search(0))},search:function(e){var t=this;return this.searchResults=e?this.searchResults:[],this.oldQ=this.query+this.source,this.$DCAPI.searchInt(this.$route.params.query,e,this.splitSource,"",function(s){var r;(t.loading=!1,0===e&&t.$store.dispatch("loadIndeterm",!1),s.length||t.searchResults.length)?(r=t.searchResults).push.apply(r,Object(n["a"])(s)):t.bFailed=!0},"",50,!0)}}},h=u,d=s("2877"),f=s("6544"),p=s.n(f),m=s("0e8f"),g=Object(d["a"])(h,r,a,!1,null,null,null);t["default"]=g.exports;p()(g,{VFlex:m["a"]})},"412a":function(e,t,s){},"61be":function(e,t,s){"use strict";var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-flex",{staticClass:"loading-flex mt-3",attrs:{"justify-center":"","align-center":""}},[s("div",{staticClass:"half-circle-spinner"},[s("div",{staticClass:"circle circle-1",style:e.circle1Style}),s("div",{staticClass:"circle circle-2",style:e.circle2Style})])])},a=[],n=s("5176"),i=s.n(n),o={name:"Loading",computed:{circle1Style:function(){return i()({borderTopColor:this.$vuetify.theme.primary},this.circleStyle)},circle2Style:function(){return i()({borderBottomColor:this.$vuetify.theme.primary},this.circleStyle)}}},l=o,c=(s("743b"),s("2877")),u=s("6544"),h=s.n(u),d=s("0e8f"),f=Object(c["a"])(l,r,a,!1,null,null,null);t["a"]=f.exports;h()(f,{VFlex:d["a"]})},"743b":function(e,t,s){"use strict";var r=s("412a"),a=s.n(r);a.a},ab5d:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-flex",{attrs:{xs12:"",lg10:"",flexbox:"","mt-3":""}},[e.loading||e.bFailed?e._e():s("playlist",{attrs:{"show-uploaded":!0,songs:e.searchResults,"rows-per-page":"-1"},on:{conmen:function(t){return e.$emit("conmen",t)}}}),e.loading?e._e():s("infinite-loading",{ref:"infiniteLoading",attrs:{distance:210,spinner:"waveDots"},on:{infinite:e.infiniteHandler}},[s("span",{attrs:{slot:"no-more"},slot:"no-more"}),s("span",{attrs:{slot:"no-results"},slot:"no-results"})]),e.bFailed||!e.$route.params.source?s("jumbo",{attrs:{subheading:"Couldn't find '"+e.$route.params.query+"' on "+e.$route.params.source,error:"Try again"}}):e._e()],1)},a=[],n=s("75fc"),i=(s("7f7f"),s("386d"),s("28a5"),s("e166")),o=s.n(i),l=s("61be"),c=s("a1b2"),u={name:"SearchQuery",props:{query:{type:String,default:""},source:{type:String,default:""}},data:function(){return{loading:!1,searchResults:[],iPage:0,oldQ:"",bFailed:!1}},components:{"infinite-loading":o.a,loading:l["a"],jumbo:c["a"]},computed:{splitSource:function(){return this.source.split("-")}},watch:{"$route.params":{immediate:!0,handler:"searchInt"}},methods:{infiniteHandler:function(e){this.search(++this.iPage).then(function(){e.loaded()})},searchInt:function(){"searchQuery"==this.$route.name&&this.oldQ!=this.$route.params.query+this.$route.params.source&&(this.$store.dispatch("loadIndeterm",!0),this.bFailed=!1,this.search(0))},search:function(e){var t=this;return this.searchResults=e?this.searchResults:[],this.oldQ=this.$route.params.query+this.$route.params.source,this.$DCAPI.searchInt(this.$route.params.query,e,this.splitSource,"",function(s){var r;(t.loading=!1,0===e&&t.$store.dispatch("loadIndeterm",!1),s.length||t.searchResults.length)?(r=t.searchResults).push.apply(r,Object(n["a"])(s)):(t.$refs.infiniteLoading.$emit("$InfiniteLoading:complete"),t.bFailed=!0)},"")}}},h=u,d=s("2877"),f=s("6544"),p=s.n(f),m=s("0e8f"),g=Object(d["a"])(h,r,a,!1,null,null,null);t["default"]=g.exports;p()(g,{VFlex:m["a"]})}}]);