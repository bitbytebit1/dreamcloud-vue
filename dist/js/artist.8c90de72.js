(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["artist"],{"0d39":function(t,a,e){},"318c":function(t,a,e){"use strict";var s=e("38bc"),i=e.n(s);i.a},"38bc":function(t,a,e){},"6a4b":function(t,a,e){},d045:function(t,a,e){"use strict";var s=e("6a4b"),i=e.n(s);i.a},e548:function(t,a,e){"use strict";var s=e("0d39"),i=e.n(s);i.a},fd68:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-flex",{staticClass:"mt-3",attrs:{xs12:"",lg10:""}},[e("artist-info",{key:t.artistID,ref:"artistInfo",attrs:{artistID:t.artistID,source:t.source,artist:t.artist}}),e("v-tabs",{ref:"tabs",model:{value:t.tab,callback:function(a){t.tab=a},expression:"tab"}},[e("v-tabs-slider",{attrs:{color:"primary"}}),e("v-tab",{attrs:{disabled:!t.searchResults.length}},[t._v("\n      Uploads ("+t._s(t.searchResults.length)+") \n    ")]),e("v-tab",{attrs:{disabled:!t.aPlaylists.length}},[t._v("\n      Playlists ("+t._s(t.aPlaylists.length)+")\n    ")]),e("v-tab",{attrs:{disabled:!t.aSubs.length}},[t._v("\n      Following ("+t._s(t.aSubs.length)+")\n    ")])],1),e("v-tabs-items",{model:{value:t.tab,callback:function(a){t.tab=a},expression:"tab"}},[e("v-tab-item",[e("playlist",{attrs:{songs:t.searchResults,rowsPerPage:"84"},on:{conmen:function(a){return t.$emit("conmen",a)}}})],1),e("v-tab-item",[e("playlists",{attrs:{aPlaylist:t.aPlaylists}})],1),e("v-tab-item",[e("subscriptions",{attrs:{aSubs:t.aSubs}})],1)],1)],1)},i=[],r=e("75fc"),n=(e("386d"),e("7f7f"),e("c5f6"),function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-flex",{attrs:{xs12:""}},[e("v-card",[e("v-card-title",{staticClass:"ma-0 pa-0"},[e("v-flex",{attrs:{xs12:""}},[e("v-text-field",{ref:"search",staticClass:"mr-4 ml-4 mb-3",attrs:{id:"flr-txt",color:"primary",label:"Filter",clearable:"","single-line":"","hide-details":""},on:{focus:function(a){t.filterHasFocus=!0},blur:function(a){t.filterHasFocus=!1},keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.$UTILS.closeSoftMobi()}},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}})],1)],1),e("v-container",{staticClass:"pa-0",attrs:{"grid-list-lg":"",fluid:""}},[t.$store.getters.auth_state?e("v-data-iterator",{attrs:{items:t.aSubs,search:t.search,"rows-per-page-items":t.rowsPerPageItems,"custom-filter":function(t,a,e){return a=a.toString().toLowerCase(),t.filter(function(t){return e(t["artist"],a)})},pagination:t.pagination,"content-tag":"v-layout",row:"",wrap:""},on:{"update:pagination":function(a){t.pagination=a}},scopedSlots:t._u([{key:"item",fn:function(a){return e("v-flex",{staticClass:"artist-card",attrs:{xs12:"",sm6:"",md4:"",lg12:""}},[e("v-card",{staticClass:"pointer dc-crd",attrs:{to:{name:"artist",params:{source:a.item.source,artist:a.item.artist,artistID:a.item.artistID}}}},[e("v-layout",{attrs:{row:""}},[e("v-flex",{attrs:{xs2:""}},[e("v-img",{staticClass:"fillPlace",attrs:{src:a.item.img,"lazy-src":a.item.img}},[e("v-layout",{staticClass:"grey--text",attrs:{slot:"placeholder","fill-height":"","align-center":"","justify-center":"","ma-0":""},slot:"placeholder"})],1)],1),e("v-flex",{attrs:{xs8:""}},[e("div",{staticClass:"h200 text-xs-left pl-4 pr-4"},[e("div",{staticClass:"headline"},[t._v(t._s(a.item.artist))]),e("subscribe-button",{attrs:{artistID:a.item.artistID,source:a.item.source,artist:a.item.artist,img:a.item.img}}),e("div",{staticClass:"grey--text"},[t._v("Uploads "+t._s(a.item.numberOfSongs))]),e("div",{},[t._v(t._s(a.item.description))])],1)])],1)],1)],1)}}],null,!1,3052016756)}):t._e()],1)],1)],1)}),l=[],o=e("162d"),c={name:"UserSubOverview",props:{aSubs:{type:Array,default:function(){return[]}}},components:{subscribeButton:o["a"]},data:function(){return{filterHasFocus:!1,search:"",active:!0,rowsPerPageItems:[24,50,100,{text:"All",value:-1}],pagination:{rowsPerPage:24}}}},u=c,d=(e("e548"),e("2877")),f=e("6544"),m=e.n(f),p=e("b0af"),h=e("12b2"),b=e("a523"),g=e("c377"),v=e("0e8f"),x=e("adda"),y=e("a722"),_=e("2677"),C=Object(d["a"])(u,n,l,!1,null,null,null),w=C.exports;m()(C,{VCard:p["a"],VCardTitle:h["a"],VContainer:b["a"],VDataIterator:g["a"],VFlex:v["a"],VImg:x["a"],VLayout:y["a"],VTextField:_["a"]});var I=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-flex",{attrs:{xs12:"",lg12:""}},[e("v-card",{attrs:{flat:""}},[e("v-card-title",{staticClass:"ma-0 pa-0"},[e("v-flex",{attrs:{xs12:""}},[e("v-text-field",{ref:"search",staticClass:"mr-4 ml-4 mb-3",attrs:{id:"flr-txt",color:"primary",label:"Filter",clearable:"","single-line":"","hide-details":""},on:{focus:function(a){t.filterHasFocus=!0},blur:function(a){t.filterHasFocus=!1},keyup:function(a){return!a.type.indexOf("key")&&t._k(a.keyCode,"enter",13,a.key,"Enter")?null:t.$UTILS.closeSoftMobi()}},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}})],1)],1),e("v-container",{staticClass:"pa-2",attrs:{"grid-list-lg":"",fluid:""}},[e("v-data-iterator",{attrs:{items:t.aPlaylist,search:t.search,"rows-per-page-items":t.rowsPerPageItems,"custom-filter":function(t,a,e){return a=a.toString().toLowerCase(),t.filter(function(t){return e(t["title"],a)})},"content-tag":"v-layout",row:"",wrap:"","pagination.sync":"pagination"},scopedSlots:t._u([{key:"item",fn:function(a){return a.item.numberOfSongs?e("v-flex",{attrs:{xs12:"",sm6:"",md4:"",lg3:""}},[e("v-card",{staticClass:"pointer dc-crd",attrs:{to:{name:"channelPlaylist",params:{listID:a.item.listID,artistID:a.item.artistID,title:a.item.title,source:a.item.source}}}},[e("v-img",{attrs:{"aspect-ratio":"YouTube"===a.item.source?16/9:"1",src:a.item.img,"lazy-src":a.item.img}},[e("span",{staticClass:"songLeng"},[t._v(t._s(a.item.numberOfSongs))])]),e("v-card-text",{staticClass:"text-xs-center subheading"},[t._v(t._s(a.item.title))])],1)],1):t._e()}}],null,!0)})],1)],1)],1)},P=[],S={name:"PlaylistOverview",props:{aPlaylist:{type:Array,default:function(){return[]}}},data:function(){return{filterHasFocus:!1,search:"",active:!0,rowsPerPageItems:[{text:"All",value:-1}],pagination:{rowsPerPage:"All"}}},created:function(){}},k=S,D=(e("d045"),e("99d9")),A=Object(d["a"])(k,I,P,!1,null,null,null),$=A.exports;m()(A,{VCard:p["a"],VCardText:D["b"],VCardTitle:h["a"],VContainer:b["a"],VDataIterator:g["a"],VFlex:v["a"],VImg:x["a"],VTextField:_["a"]});var V=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-layout",{staticClass:"ma-0 pa-0 pb-2",attrs:{id:"artistInfo",row:"",wrap:""}},[e("v-flex",{staticStyle:{"min-width":"180px"},attrs:{xs12:"",lg1:""}},[e("v-flex",{staticClass:"pt-2",attrs:{xl12:""}},[e("v-avatar",{attrs:{size:"100px"}},[e("img",{attrs:{src:t.info.img}})])],1),e("v-flex",{staticClass:"mt-4 pt-2",attrs:{xl12:""}},[e("subscribe-button",{attrs:{artistID:t.artistID,source:t.source,artist:t.artist,img:t.info.img}})],1)],1),e("v-flex",{attrs:{id:"artist-right",xs12:"",lg10:""}},[e("router-link",{staticClass:"noDeco pointer",attrs:{to:{name:"artist",params:{source:t.source,artist:t.artist,artistID:t.artistID}}}},[e("v-flex",{class:"xs"===t.$vuetify.breakpoint.name?"headline fwl":"headline fwl text-xs-left pl-2 pt-2",attrs:{xs12:"",lg10:""}},[t._v("\n        "+t._s(t.artist)+"\n      ")])],1),e("v-layout",{attrs:{row:"",wrap:"",alignContentStart:""}},[e("v-flex",{class:"xs"===t.$vuetify.breakpoint.name?"headline":"headline text-xs-left",attrs:{xs12:""}},[e("v-layout",{attrs:{row:"",wrap:"",alignContentStart:""}},t._l(t.items,function(a){return e("div",{key:a.name,staticClass:"text-xs-left fl-r pr-3",attrs:{xs4:""}},[a.data?e("v-tooltip",{attrs:{left:""}},[e("div",{attrs:{slot:"activator"},slot:"activator"},[e("v-btn",{attrs:{icon:"",disabled:""}},[e("v-icon",[t._v("\n                    "+t._s(a.icon)+"\n                  ")])],1),e("span",{staticClass:"body-2 grey--text"},[t._v("\n                  "+t._s(a.data)+"\n                ")])],1),e("span",[t._v(t._s(a.name))])]):t._e()],1)}),0)],1),e("v-flex",{staticClass:"text-xs-left preline wordbreak ma-0 pa-0 px-2",staticStyle:{width:"100%"},attrs:{id:"desc",xs12:""}},[t.info.description?e("div",{staticClass:"subheading fwl text-xs-left preline wordbreak",class:t.descClass,attrs:{id:"descCont"}},[t._v(t._s(t.info.description))]):t._e()]),e("v-flex",{staticClass:"text-xs-left",attrs:{xs12:""}},[e("v-btn",{directives:[{name:"show",rawName:"v-show",value:t.descHeight>63,expression:"descHeight > 63"}],staticClass:"text-xs-left",attrs:{flat:"",small:"",block:""},on:{click:function(a){t.bHide=!t.bHide}}},[t._v(t._s(t.bHide?"SHOW MORE":"SHOW LESS"))])],1)],1)],1)],1)},T=[],H=(e("a481"),{name:"ArtistInfo",props:{artistID:{type:[String,Number],default:""},source:{type:String,default:""},artist:{type:String,default:""}},components:{"subscribe-button":o["a"]},data:function(){return{bHide:!1,descHeight:0,info:{created:"",description:"",img:"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",followers_count:"",last_modified:"",title:"",track_count:""}}},computed:{descClass:function(){return this.bHide?"chop":""},items:function(){return[{icon:"music_note",name:"Tracks",data:this.info.track_count},{icon:"star",name:"Followers",data:this.info.followers_count},{icon:"update",name:"Last updated",data:this.info.last_modified?this.$DCAPI.calcDate(new Date,this.info.last_modified):""},{icon:"date_range",name:"Created",data:this.info.created?this.$DCAPI.calcDate(new Date,this.info.created):""}]}},methods:{getDescHeight:function(){return document.getElementById("desc").clientHeight}},mounted:function(){var t=this;setTimeout(function(){t.$DCAPI.getArtistInfo(t.artistID,t.source).then(function(a){t.source.toLowerCase().indexOf("youtube")>-1?(t.info.created=a.data.items[0].snippet.publishedAt,t.info.description=a.data.items[0].snippet.description,t.info.img=a.data.items[0].snippet.thumbnails.high.url,t.info.title=a.data.items[0].snippet.title,t.info.followers_count=a.data.items[0].statistics.subscriberCount,t.info.track_count=a.data.items[0].statistics.videoCount):t.source.toLowerCase().indexOf("soundcloud")>-1?(t.info.created="",t.info.description="",t.info.img=a.data.avatar_url.replace("large","t500x500"),t.info.followers_count=a.data.followers_count,t.info.last_modified=a.data.last_modified,t.info.title=a.data.username,t.info.track_count=a.data.track_count):t.source.toLowerCase().indexOf("mixcloud")>-1?(t.info.created=a.data.created,t.info.description=a.biog,t.info.img=a.data.pictures.medium,t.info.followers_count=a.data.followers_count,t.info.last_modified=a.data.updated_time,t.info.title=a.data.username,t.info.track_count=a.data.cloudcast_count):t.source.toLowerCase().indexOf("bandcamp")>-1&&(t.info.created=a.data.created,t.info.img=a.data.img,t.info.last_modified=a.data.last,t.info.track_count=a.data.tracks),t.$nextTick(function(){t.descHeight=t.getDescHeight(),t.descHeight>50&&(t.bHide=!0)})})},250)}}),O=H,F=(e("318c"),e("8212")),L=e("8336"),E=e("132d"),R=e("3a2f"),j=Object(d["a"])(O,V,T,!1,null,null,null),B=j.exports;m()(j,{VAvatar:F["a"],VBtn:L["a"],VFlex:v["a"],VIcon:E["a"],VLayout:y["a"],VTooltip:R["a"]});var U={name:"Artist",props:{artistID:{type:[String,Number],default:""},source:{type:String,default:""},artist:{type:[String],default:""}},components:{"artist-info":B,subscriptions:w,playlists:$},data:function(){return{sTokenSubs:"",sTokenPlaylists:"",aPlaylists:[],aSubs:[],searchResults:[],iPage:0,tab:null}},watch:{"$route.params":{immediate:!0,handler:"_search"}},methods:{getSubs:function(t,a){var e=this;this.aSubs=[],this.sTokenSubs="";var s=function s(){e.$DCAPI.getChannelSubscriptions(t,a,50,e.sTokenSubs,function(a){t===e.$route.params.artistID&&(e.aSubs=e.aSubs.concat(a.data),e.aSubs.length<150&&e.$refs.tabs.callSlider(),a.nextPage&&(e.sTokenSubs=a.nextPage,s()))})};s()},getPlaylists:function(t,a){var e=this;this.aPlaylists=[],this.sTokenPlaylists="";var s=function s(){e.$DCAPI.getChannelPlaylists(t,a,50,e.sTokenPlaylists,function(a){t===e.$route.params.artistID&&(e.aPlaylists=e.aPlaylists.concat(a.data),e.aPlaylists.length<150&&e.$refs.tabs.callSlider(),a.nextPage&&(e.sTokenPlaylists=a.nextPage,s()))})};s()},_search:function(){var t=this;this.$route.params.artistID&&this.$route.params.source?(this.aPlaylists=[],this.aSubs=[],this.$store.dispatch("loadIndeterm",!0),this.search(this.$route.params.artistID,this.$route.params.source).then(function(){t.getPlaylists(t.$route.params.artistID,t.$route.params.source),t.getSubs(t.$route.params.artistID,t.$route.params.source)})):console.log("artist",this.$route.name)},search:function(t,a){var e=this,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return t=t||this.artistID,a=a||this.source,this.searchResults=s?this.searchResults:[],this.$DCAPI.searchInt("",s,[a],t,function(a){if(a.length){var i;if(t===e.$route.params.artistID)(i=e.searchResults).push.apply(i,Object(r["a"])(a)),e.searchResults.length<150&&e.$refs.tabs.callSlider(),e.searchResults=e.$DCAPI.uniqueArray(e.searchResults),e.search(e.query,e.source,++e.iPage);0===s&&e.$store.dispatch("loadIndeterm",!1)}},"",50)}}},z=U,M=e("71a3"),N=e("c671"),q=e("fe57"),J=e("aac8"),W=e("9a96"),G=Object(d["a"])(z,s,i,!1,null,null,null);a["default"]=G.exports;m()(G,{VFlex:v["a"],VTab:M["a"],VTabItem:N["a"],VTabs:q["a"],VTabsItems:J["a"],VTabsSlider:W["a"]})}}]);