(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["artist"],{"0d39":function(t,a,e){},"20fd":function(t,a,e){"use strict";var s=e("d9f6"),i=e("aebd");t.exports=function(t,a,e){a in t?s.f(t,a,i(0,e)):t[a]=e}},"318c":function(t,a,e){"use strict";var s=e("38bc"),i=e.n(s);i.a},"38bc":function(t,a,e){},"549b":function(t,a,e){"use strict";var s=e("d864"),i=e("63b6"),r=e("241e"),n=e("b0dc"),o=e("3702"),l=e("b447"),c=e("20fd"),u=e("7cd6");i(i.S+i.F*!e("4ee1")(function(t){Array.from(t)}),"Array",{from:function(t){var a,e,i,d,f=r(t),m="function"==typeof this?this:Array,p=arguments.length,h=p>1?arguments[1]:void 0,v=void 0!==h,b=0,g=u(f);if(v&&(h=s(h,p>2?arguments[2]:void 0,2)),void 0==g||m==Array&&o(g))for(a=l(f.length),e=new m(a);a>b;b++)c(e,b,v?h(f[b],b):f[b]);else for(d=g.call(f),e=new m;!(i=d.next()).done;b++)c(e,b,v?n(d,h,[i.value,b],!0):i.value);return e.length=b,e}})},"54a1":function(t,a,e){e("6c1c"),e("1654"),t.exports=e("95d5")},"6a4b":function(t,a,e){},"75fc":function(t,a,e){"use strict";var s=e("a745"),i=e.n(s);function r(t){if(i()(t)){for(var a=0,e=new Array(t.length);a<t.length;a++)e[a]=t[a];return e}}var n=e("774e"),o=e.n(n),l=e("c8bb"),c=e.n(l);function u(t){if(c()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return o()(t)}function d(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function f(t){return r(t)||u(t)||d()}e.d(a,"a",function(){return f})},"774e":function(t,a,e){t.exports=e("d2d5")},"95d5":function(t,a,e){var s=e("40c3"),i=e("5168")("iterator"),r=e("481b");t.exports=e("584a").isIterable=function(t){var a=Object(t);return void 0!==a[i]||"@@iterator"in a||r.hasOwnProperty(s(a))}},c8bb:function(t,a,e){t.exports=e("54a1")},d045:function(t,a,e){"use strict";var s=e("6a4b"),i=e.n(s);i.a},d2d5:function(t,a,e){e("1654"),e("549b"),t.exports=e("584a").Array.from},e548:function(t,a,e){"use strict";var s=e("0d39"),i=e.n(s);i.a},fd68:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-flex",{staticClass:"mt-3",attrs:{xs12:"",lg10:""}},[e("artist-info",{key:t.artistID,ref:"artistInfo",attrs:{artistID:t.artistID,source:t.source,artist:t.artist}}),e("v-tabs",{ref:"tabs",model:{value:t.tab,callback:function(a){t.tab=a},expression:"tab"}},[e("v-tabs-slider",{attrs:{color:"primary"}}),e("v-tab",{attrs:{disabled:!t.searchResults.length}},[t._v("\n      Uploads ("+t._s(t.searchResults.length)+") \n    ")]),e("v-tab",{attrs:{disabled:!t.aPlaylists.length}},[t._v("\n      Playlists ("+t._s(t.aPlaylists.length)+")\n    ")]),e("v-tab",{attrs:{disabled:!t.aSubs.length}},[t._v("\n      Following ("+t._s(t.aSubs.length)+")\n    ")])],1),e("v-tabs-items",{model:{value:t.tab,callback:function(a){t.tab=a},expression:"tab"}},[e("v-tab-item",[e("playlist",{attrs:{songs:t.searchResults,rowsPerPage:"84"}})],1),e("v-tab-item",[e("playlists",{attrs:{aPlaylist:t.aPlaylists}})],1),e("v-tab-item",[e("subscriptions",{attrs:{aSubs:t.aSubs}})],1)],1)],1)},i=[],r=e("75fc"),n=(e("386d"),function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-flex",{attrs:{xs12:""}},[e("v-card",[e("v-card-title",{staticClass:"ma-0 pa-0"},[e("v-flex",{attrs:{xs12:""}},[e("v-text-field",{ref:"search",staticClass:"mr-4 ml-4 mb-3",attrs:{id:"flr-txt",color:"primary",label:"Filter",clearable:"","single-line":"","hide-details":""},on:{focus:function(a){t.filterHasFocus=!0},blur:function(a){t.filterHasFocus=!1},keyup:function(a){if(!("button"in a)&&t._k(a.keyCode,"enter",13,a.key,"Enter"))return null;t.$UTILS.closeSoftMobi()}},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}})],1)],1),e("v-container",{staticClass:"pa-0",attrs:{"grid-list-lg":"",fluid:""}},[t.$store.getters.auth_state?e("v-data-iterator",{attrs:{items:t.aSubs,search:t.search,"rows-per-page-items":t.rowsPerPageItems,"custom-filter":function(t,a,e){return a=a.toString().toLowerCase(),t.filter(function(t){return e(t["artist"],a)})},pagination:t.pagination,"content-tag":"v-layout",row:"",wrap:""},on:{"update:pagination":function(a){t.pagination=a}},scopedSlots:t._u([{key:"item",fn:function(a){return e("v-flex",{staticClass:"artist-card",attrs:{xs12:"",sm6:"",md4:"",lg12:""}},[e("v-card",{staticClass:"pointer dc-crd",attrs:{to:{name:"artist",params:{source:a.item.source,artist:a.item.artist,artistID:a.item.artistID}}}},[e("v-layout",{attrs:{row:""}},[e("v-flex",{attrs:{xs2:""}},[e("v-img",{staticClass:"fillPlace",attrs:{src:a.item.img,"lazy-src":a.item.img}},[e("v-layout",{staticClass:"grey--text",attrs:{slot:"placeholder","fill-height":"","align-center":"","justify-center":"","ma-0":""},slot:"placeholder"})],1)],1),e("v-flex",{attrs:{xs8:""}},[e("div",{staticClass:"h200 text-xs-left pl-4 pr-4"},[e("div",{staticClass:"headline"},[t._v(t._s(a.item.artist))]),e("div",{staticClass:"grey--text"},[t._v("Uploads "+t._s(a.item.numberOfSongs))]),e("div",{},[t._v(t._s(a.item.description))])])])],1)],1)],1)}}])}):t._e()],1)],1)],1)}),o=[],l={name:"UserSubOverview",props:{aSubs:{type:Array,default:function(){return[]}}},data:function(){return{filterHasFocus:!1,search:"",active:!0,rowsPerPageItems:[24,50,100,{text:"All",value:-1}],pagination:{rowsPerPage:24}}}},c=l,u=(e("e548"),e("2877")),d=e("6544"),f=e.n(d),m=e("b0af"),p=e("12b2"),h=e("a523"),v=e("c377"),b=e("0e8f"),g=e("adda"),x=e("a722"),y=e("2677"),_=Object(u["a"])(c,n,o,!1,null,null,null);_.options.__file="subscriptions.vue";var w=_.exports;f()(_,{VCard:m["a"],VCardTitle:p["a"],VContainer:h["a"],VDataIterator:v["a"],VFlex:b["a"],VImg:g["a"],VLayout:x["a"],VTextField:y["a"]});var C=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-flex",{attrs:{xs12:"",lg12:""}},[e("v-card",{attrs:{flat:""}},[e("v-card-title",{staticClass:"ma-0 pa-0"},[e("v-flex",{attrs:{xs12:""}},[e("v-text-field",{ref:"search",staticClass:"mr-4 ml-4 mb-3",attrs:{id:"flr-txt",color:"primary",label:"Filter",clearable:"","single-line":"","hide-details":""},on:{focus:function(a){t.filterHasFocus=!0},blur:function(a){t.filterHasFocus=!1},keyup:function(a){if(!("button"in a)&&t._k(a.keyCode,"enter",13,a.key,"Enter"))return null;t.$UTILS.closeSoftMobi()}},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}})],1)],1),e("v-container",{staticClass:"pa-0",attrs:{"grid-list-lg":"",fluid:""}},[e("v-data-iterator",{attrs:{items:t.aPlaylist,search:t.search,"rows-per-page-items":t.rowsPerPageItems,"custom-filter":function(t,a,e){return a=a.toString().toLowerCase(),t.filter(function(t){return e(t["title"],a)})},"content-tag":"v-layout",row:"",wrap:"","pagination.sync":"pagination","hide-actions":""},scopedSlots:t._u([{key:"item",fn:function(a){return a.item.numberOfSongs?e("v-flex",{attrs:{xs12:"",sm6:"",md4:"",lg3:""}},[e("v-card",{staticClass:"pointer dc-crd",attrs:{to:{name:"channelPlaylist",params:{listID:a.item.listID,artistID:a.item.artistID,title:a.item.title,source:a.item.source}}}},[e("v-img",{attrs:{"aspect-ratio":"YouTube"===a.item.source?16/9:"1",src:a.item.img,"lazy-src":a.item.img}},[e("span",{staticClass:"songLeng"},[t._v(t._s(a.item.numberOfSongs))])]),e("v-card-text",{staticClass:"text-xs-center subheading"},[t._v(t._s(a.item.title))])],1)],1):t._e()}}])})],1)],1)],1)},I=[],P=(e("cadf"),e("551c"),e("097d"),{name:"PlaylistOverview",props:{aPlaylist:{type:Array,default:function(){return[]}}},data:function(){return{filterHasFocus:!1,search:"",active:!0,rowsPerPageItems:[{text:"All",value:-1}],pagination:{rowsPerPage:"All"}}},created:function(){}}),S=P,A=(e("d045"),e("99d9")),k=Object(u["a"])(S,C,I,!1,null,null,null);k.options.__file="playlists.vue";var D=k.exports;f()(k,{VCard:m["a"],VCardText:A["b"],VCardTitle:p["a"],VContainer:h["a"],VDataIterator:v["a"],VFlex:b["a"],VImg:g["a"],VTextField:y["a"]});var $=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-layout",{staticClass:"ma-0 pa-0 pb-2",attrs:{id:"artistInfo",row:"",wrap:""}},[e("v-flex",{staticStyle:{"min-width":"180px"},attrs:{xs12:"",lg1:""}},[e("v-flex",{staticClass:"pt-2",attrs:{xl12:""}},[e("v-avatar",{attrs:{size:"100px"}},[e("img",{attrs:{src:t.info.img}})])],1),e("v-flex",{staticClass:"mt-4 pt-2",attrs:{xl12:""}},[e("subscribe-button",{attrs:{artistID:t.artistID,source:t.source,artist:t.artist,img:t.info.img}})],1)],1),e("v-flex",{attrs:{id:"artist-right",xs12:"",lg10:""}},[e("router-link",{staticClass:"noDeco pointer",attrs:{to:{name:"artist",params:{source:t.source,artist:t.artist,artistID:t.artistID}}}},[e("v-flex",{class:"xs"===t.$vuetify.breakpoint.name?"headline fwl":"headline fwl text-xs-left pl-2 pt-2",attrs:{xs12:"",lg10:""}},[t._v("\n        "+t._s(t.artist)+"\n      ")])],1),e("v-layout",{attrs:{row:"",wrap:"",alignContentStart:""}},[e("v-flex",{class:"xs"===t.$vuetify.breakpoint.name?"headline":"headline text-xs-left",attrs:{xs12:""}},[e("v-layout",{attrs:{row:"",wrap:"",alignContentStart:""}},t._l(t.items,function(a){return a.data?e("div",{key:a.name,staticClass:"text-xs-left fl-r pr-3",attrs:{xs4:""}},[e("v-tooltip",{attrs:{left:""}},[e("div",{attrs:{slot:"activator"},slot:"activator"},[e("v-btn",{attrs:{icon:"",disabled:""}},[e("v-icon",[t._v("\n                    "+t._s(a.icon)+"\n                  ")])],1),e("span",{staticClass:"body-2 grey--text"},[t._v("\n                  "+t._s(a.data)+"\n                ")])],1),e("span",[t._v(t._s(a.name))])])],1):t._e()}),0)],1),e("v-flex",{staticClass:"text-xs-left preline wordbreak ma-0 pa-0 px-2",staticStyle:{width:"100%"},attrs:{id:"desc",xs12:""}},[t.info.description?e("div",{staticClass:"subheading fwl text-xs-left preline wordbreak",class:t.descClass,attrs:{id:"descCont"}},[t._v(t._s(t.info.description))]):t._e()]),e("v-flex",{staticClass:"text-xs-left",attrs:{xs12:""}},[e("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.descHeight>63,expression:"descHeight > 63"}],staticClass:"text-xs-left",attrs:{flat:"",small:"",block:""},on:{click:function(a){t.bHide=!t.bHide}}},[t._v(t._s(t.bHide?"SHOW MORE":"SHOW LESS"))])],1)],1)],1)],1)},V=[],T=(e("a481"),e("c5f6"),e("162d")),H={name:"ArtistInfo",props:{artistID:{type:[String,Number],default:""},source:{type:String,default:""},artist:{type:String,default:""}},components:{"subscribe-button":T["a"]},data:function(){return{bHide:!1,descHeight:0,info:{created:"",description:"",img:"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",followers_count:"",last_modified:"",title:"",track_count:""}}},computed:{debugLink:function(){return'{ artist: "'+this.artist+'", source: "'+this.source+'", artistID: "'+this.artistID+'", img: "'+this.info.img+'" },\n\n'},descClass:function(){return this.bHide?"chop":""},items:function(){return[{icon:"music_note",name:"Tracks",data:this.info.track_count},{icon:"star",name:"Followers",data:this.info.followers_count},{icon:"update",name:"Last updated",data:this.info.last_modified?this.$DCAPI.calcDate(new Date,this.info.last_modified):""},{icon:"date_range",name:"Created",data:this.info.created?this.$DCAPI.calcDate(new Date,this.info.created):""}]}},methods:{getDescHeight:function(){return document.getElementById("desc").clientHeight}},mounted:function(){var t=this;this.$DCAPI.getArtistInfo(this.artistID,this.source).then(function(a){t.source.toLowerCase().indexOf("youtube")>-1?(t.info.created=a.data.items[0].snippet.publishedAt,t.info.description=a.data.items[0].snippet.description,t.info.img=a.data.items[0].snippet.thumbnails.high.url,t.info.title=a.data.items[0].snippet.title,t.info.followers_count=a.data.items[0].statistics.subscriberCount,t.info.track_count=a.data.items[0].statistics.videoCount):t.source.toLowerCase().indexOf("soundcloud")>-1?(t.info.created="",t.info.description="",t.info.img=a.data.avatar_url.replace("large","t500x500"),t.info.followers_count=a.data.followers_count,t.info.last_modified=a.data.last_modified,t.info.title=a.data.username,t.info.track_count=a.data.track_count):t.source.toLowerCase().indexOf("mixcloud")>-1?(t.info.created=a.data.created,t.info.description=a.biog,t.info.img=a.data.pictures.medium,t.info.followers_count=a.data.followers_count,t.info.last_modified=a.data.updated_time,t.info.title=a.data.username,t.info.track_count=a.data.cloudcast_count):t.source.toLowerCase().indexOf("bandcamp")>-1&&(t.info.created=a.data.created,t.info.img=a.data.img,t.info.last_modified=a.data.last,t.info.track_count=a.data.tracks),t.$nextTick(function(){t.descHeight=t.getDescHeight(),t.descHeight>50&&(t.bHide=!0)})})}},O=H,F=(e("318c"),e("8212")),L=e("8336"),E=e("132d"),R=e("3a2f"),j=Object(u["a"])(O,$,V,!1,null,null,null);j.options.__file="artist-info.vue";var B=j.exports;f()(j,{VAvatar:F["a"],VBtn:L["a"],VFlex:b["a"],VIcon:E["a"],VLayout:x["a"],VTooltip:R["a"]});var U={name:"Artist",props:{artistID:{type:String,default:""},source:{type:String,default:""},artist:{type:String,default:""}},components:{"artist-info":B,subscriptions:w,playlists:D},data:function(){return{sTokenSubs:"",sTokenPlaylists:"",aPlaylists:[],aSubs:[],searchResults:[],iPage:0,tab:null}},watch:{"$route.params":{immediate:!0,handler:"_search"}},methods:{getSubs:function(t,a){var e=this;this.aSubs=[],this.sTokenSubs="";var s=function s(){e.$DCAPI.getChannelSubscriptions(t,a,50,e.sTokenSubs,function(a){t===e.$route.params.artistID&&(e.aSubs=e.aSubs.concat(a.data),e.aSubs.length<150&&e.$refs.tabs.callSlider(),a.nextPage&&(e.sTokenSubs=a.nextPage,s()))})};s()},getPlaylists:function(t,a){var e=this;this.aPlaylists=[],this.sTokenPlaylists="";var s=function s(){e.$DCAPI.getChannelPlaylists(t,a,50,e.sTokenPlaylists,function(a){t===e.$route.params.artistID&&(e.aPlaylists=e.aPlaylists.concat(a.data),e.aPlaylists.length<150&&e.$refs.tabs.callSlider(),a.nextPage&&(e.sTokenPlaylists=a.nextPage,s()))})};s()},_search:function(){var t=this;this.$route.params.artistID&&this.$route.params.source&&(this.tab=0,this.aPlaylists=[],this.aSubs=[],this.$store.dispatch("loadIndeterm",!0),this.search(this.$route.params.artistID,this.$route.params.source).then(function(){t.getPlaylists(t.$route.params.artistID,t.$route.params.source),t.getSubs(t.$route.params.artistID,t.$route.params.source)}))},search:function(t,a){var e=this,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return t=t||this.artistID,a=a||this.source,this.searchResults=s?this.searchResults:[],this.$DCAPI.searchInt("",s,[a],t,function(a){if(a.length){var i;if(t===e.$route.params.artistID)(i=e.searchResults).push.apply(i,Object(r["a"])(a)),e.searchResults.length<150&&e.$refs.tabs.callSlider(),e.searchResults=e.$DCAPI.uniqueArray(e.searchResults),e.search(e.query,e.source,++e.iPage);0===s&&e.$store.dispatch("loadIndeterm",!1)}},"")}}},z=U,M=e("71a3"),q=e("c671"),J=e("fe57"),N=e("aac8"),W=e("9a96"),G=Object(u["a"])(z,s,i,!1,null,null,null);G.options.__file="artist.vue";a["default"]=G.exports;f()(G,{VFlex:b["a"],VTab:M["a"],VTabItem:q["a"],VTabs:J["a"],VTabsItems:N["a"],VTabsSlider:W["a"]})}}]);