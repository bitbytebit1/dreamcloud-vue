/* jshint esversion: 6 */
// Hello there creeper, gl hf
var fixLegacyPlaylist
$(document).ready(function () {
  var deleted_item_playlist = ['', ''], deleted_item_song_data, deleted_item_song_name
  var timeout, timeout2, timeout3, today = new Date()
  var searchingb = !1, search_results_ele = $('#search-results'), search_artist, jsonsearch = [], search_page = 0, search_query = '', search_source = 'All';
  var view_list = 'undefined' !== typeof Storage ? 'true' == localStorage.getItem('viewmode') : 0
  var volume = 'undefined' !== typeof Storage ? localStorage.getItem('volume') : 0.5
  var playlists = 'notloggedin', nextPageToken = '', currentTextArray = [$('#current-poster'), $('#current-details'), $('#current-artist')], jpc1 = $('#jquery_jplayer_3'), timeoutSet = false
  var bVolumeUpdated = !1
  var login = $('#user').text()
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  Objects
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  controller = {
    sPlaylistDisplay: 'x',
    sPlaylistPlaying: 'y',
    sPlaylistSearch: 'z',
    currentArray: playlist,
    currentTab: aElements.playlists,

    afterPrintJson: function () {
      $.each(localController.aFollow, function (k, v) {
        $('a[data-artist="' + encodeURIComponent(v.a) + '"]', controller.currentTab).siblings('#follow-button').attr('id', 'unfollow-button').find('i.glyphicon-pushpin').toggleClass('glyphicon-pushpin glyphicon-remove')
        })

        $.each(localController.aSongs, function (k, v) {
        $('span[data-url="' + v.mp32 + '"] i', controller.currentTab).removeClass('glyphicon-star-empty').addClass('glyphicon-star')
        })
    },

    changeView: function (tab) {
      // og("current tab - " + tab);
      this.currentTab = tab
        if (tab == aElements.playlists || tab == '#home') {
        this.currentArray = jsonsearch
        } else if (tab == aElements.playlist || tab == aElements.current) {
        // this.currentArray = jp.playlist;
        this.currentArray = DCPlayer.aPlaylist
        } else if (tab == aElements.searchResults) {
        this.currentArray = jsonsearch
        } else if (tab == aElements.playHistory) {
        this.currentArray = localController.aHistory
            this.sPlaylistDisplay = 'History';
      } else if (tab == aElements.allSongs) {
        this.currentArray = localController.aSongs
        } else if (tab == aElements.follow) {
        this.currentArray = jsonsearch
        }
      this.printCurrent()
    },

    printCurrent: function () {
      youtubeGetVideoLength()
        controller.currentTab.dchtml(printjson(controller.currentArray, (controller.currentTab == aElements.current || controller.currentTab == aElements.playlists || controller.currentTab == aElements.playlist || controller.currentTab == aElements.playHistory), controller.currentTab == aElements.follow))
        // aaarrrrgggg, but the last one right!
        $('#' + controller.currentTab[0].id + '-tab').tab('show')
        if (controller.sPlaylistDisplay == controller.sPlaylistPlaying) {
        $('.song-container.active').removeClass('active')
            $('.song-container div#' + DCPlayer.iCurrent, controller.currentTab).parents('.song-container').addClass('active')
        }
      if (controller.currentTab == aElements.current || location.hash.indexOf('url') > -1) {
        aElements.stageContainerParent.removeClass('hidden-stage')
        } else if (!isMobile) {
        aElements.stageContainerParent.addClass('hidden-stage')
        }
      aElements.tabContent.show()
        if (search_page === 0) {
        window.scrollTo(0, 0)
        }
      // window.scrollTo(0, aElements.stageContainerParent.height() + 7);
      controller.afterPrintJson()
        // });

    }
  }

  localController = {
    bStorage: (typeof (Storage) !== 'undefined'),
    aSongs: [],
    aSearches: (typeof (Storage) !== 'undefined' && localStorage.getItem('searches') !== null ? JSON.parse(localStorage.getItem('searches')) : []),
    aHistory: (typeof (Storage) !== 'undefined' && localStorage.getItem('history') !== null ? JSON.parse(localStorage.getItem('history')) : []),
    aFollow: [],
    allGet: function () {
      return $.getJSON('./php/all-user-songs.php', function (data) {
        var a = {},
          b = []
          $.each(data, function (key, val) {
          if (val != 'null')
            {$.each(JSON.parse(val), function(key2, val2) {
                      a[val2.title] = val2; //sorts out duplicates the easy way...stupid way?
                  });}
        })
          $.each(a, function (key, val) {
          b.push(val)
          })
          localController.aSongs = b

      })
    },
    printSearches: function () {
      a = '<table class="tablesorter table table-hover table-condensed sortable-table"><thead><tr><th width="50px"></th><th width="150px"><a class="tablesortheader" href="#">Source</a></th><th><a class="tablesortheader" href="#">Query</a></th><th>Follow</th></tr></thead><tbody>'
      if (this.aSearches.length > 0)
        {$.each(this.aSearches, function(key, val) {
              a += '<tr data-hash="' + val.h + '" class="search-query" style="cursor: pointer;"><td><button data-id="' + key + '" type="button" class="close search-remove" data-dismiss="alert">×</button></td><td>' + val.s + '</td><td>' + val.q + '</td><td><span id="follow-button" data-hash="' + encodeURIComponent(JSON.stringify(val)) + '" class="hb hb-xs "><i class="glyphicon glyphicon-heart"></i></span></td></tr>';
          });}
      a += '</tbody></table>';
      aElements.searchHistory.dchtml(a)
      $('#search-history .tablesorter').tablesorter({
        sortList: [
          [0, 0],
          [0, 0]
        ]
      })

      controller.currentTab = aElements.searchResults
      aElements.search_history_tab.tab('show')
    },
    removeSearch: function (i) {
      this.aSearches.splice(i, 1)
      this.printSearches()
      if (this.bStorage)
        {localStorage.setItem('searches', JSON.stringify(this.aSearches));}
    },
    saveSearch: function (q, artist, source, windowHash) {
      if (this.aSearches.length > 1)
        {$.each(this.aSearches, function(key, val) {
              if (val.h == windowHash){
                windowHash = false;
                return false;
              }

          });}
      if (!windowHash || q === '')
        {return;}
      this.aSearches.unshift({
        q: q,
        a: artist,
        s: source,
        h: windowHash
      })
      if (this.bStorage)
        {localStorage.setItem('searches', JSON.stringify(this.aSearches));}
    },

    printHistory: function () {
      if (this.aHistory === null)
        {return;}
      controller.changeView(aElements.playHistory)
    },
    removeHistory: function (i) {
      this.aHistory.splice(i, 1)
      this.printHistory()
      if (this.bStorage)
        {localStorage.setItem('history', JSON.stringify(this.aHistory));}
    },
    savePlay: function (json) {
      if (JSON.stringify(json) === JSON.stringify(this.aHistory[0]))
        {return;}
      this.aHistory.unshift(json)
      if (controller.sPlaylistPlaying == 'History') {
        DCPlayer.iCurrent += 1
      }
      if (this.bStorage)
        {localStorage.setItem('history', JSON.stringify(this.aHistory));}
    },

    printFollow: function () {
      var bShowMore = $('#siderbar-table-container').hasClass('showMore')
      // this.aFollow = this.aFollow.sort(function (a, b) {
      // return b.q.toLowerCase() < a.q.toLowerCase() ? 1 : b.q.toLowerCase() > a.q.toLowerCase() ? -1 : 0;
      // });
      var a = '<div id="siderbar-table-container" class="' + (bShowMore ? 'showMore' : 'showLess') + '"><table id="subscriptions-table" style="margin-bottom: 0px;" class="table table-hover table-condensed sortable-table showLess"><thead><tr><th style="width: 100%;"><h5 class="text-info">Subscriptions</h5></th><th></th></tr></thead><tbody>'
      if (this.aFollow.length > 0)
        {$.each(this.aFollow, function(key, val) {
              a += '<tr class="subscriptions-show' + (controller.sPlaylistPlaying == val.q ? " primary" : "") + '" data-subscription-hash="'+ encodeURIComponent(val.h) + '" data-subscription-artist="'+ val.a + '" id="' + key + '">'+
              '<td><img class="img-responsive" src="'+ "" +'">'+
              '<button data-hash="' + encodeURIComponent(JSON.stringify({h: val.h})) + '" id="unfollow-button" type="button" class="close" data-dismiss="alert">\u00d7</button>'+
              '<h5>' + val.q + '</h5></td></tr>';
          });}
      else {
        a += '<tr><td>0 subscriptions</td></tr>'
      }
      a += '</tbody></table></div>'
      if (this.aFollow.length > 6) {
        a += '<div id="sidebar-show-more" class="text-center" style="cursor:pointer;margin-top: 5px;border-top:solid #464545 2px;">' + (bShowMore ? 'SHOW LESS' : 'SHOW MORE') + '</div>'
      }
      var aHtml = aElements.userSubscriptions.dchtml(a)
      aElements.subscriptionsTable = $('table#subscriptions-table', aHtml)
      youTubeGetArtistImg(this.aFollow)
      return (a)
    },
    removeFollow: function (hash) {
      var hash1 = JSON.parse(decodeURIComponent(hash)).h
      var i, j = this.aFollow.length
      for (i = 0; i <= j; i++) {
        if (hash1 == this.aFollow[i].h) {
          this.aFollow.splice(i, 1)
              break;
        }
      }
      $('[data-subscription-hash="' + encodeURIComponent(hash1) + '"]').remove()
      // localStorage.setItem('follow', JSON.stringify(this.aFollow));
      $.post('/r3/php/setsubscriptions.php', {
        t: JSON.stringify(this.aFollow)
      })
      localController.printFollow()
    },
    saveFollow: function (json) {
      json = JSON.parse(decodeURIComponent(json))

      //legacy fix
      json.s = fixSourceCase(json.s)

      if (JSON.stringify(json) === JSON.stringify(this.aFollow[0]))
        {return;}

      this.aFollow.unshift(json)

      aElements.subscriptionsTable.prepend('<tr class="subscriptions-show' + (controller.sPlaylistPlaying == this.aFollow[0].q ? ' primary' : '') + '" data-subscription-hash="' + encodeURIComponent(this.aFollow[0].h) + '" data-subscription-artist="' + this.aFollow[0].a + '" id="' + 0 + '"><td><img class="img-responsive"><button data-hash="' +
      encodeURIComponent(JSON.stringify({h: this.aFollow[0].h})) +
      '" id="unfollow-button" type="button" class="close"data-dismiss="alert">\u00d7</button><h5>' + this.aFollow[0].q + '</h5></td></tr>')

      youTubeGetArtistImg([this.aFollow[0]])

      //Renumber dom elements =\
      $.each($('tr.subscriptions-show', aElements.subscriptionsTable), function (k, v) {
        v.id = k
      })

      $.post('/r3/php/setsubscriptions.php', {
        t: JSON.stringify(this.aFollow)
      })
    },
    unfollowButton: function (e) {
      var hash = $(e.target).parents('.song-container,.subscriptions-show').find('#unfollow-button').attr('data-hash')
      $.each(localController.aFollow, function (k, v) {
        $('[data-artist="' + encodeURIComponent(v.a) + '"]').siblings('#unfollow-button').attr('id', 'follow-button').find('i.glyphicon-remove').toggleClass('glyphicon-remove glyphicon-pushpin')
      })
      localController.removeFollow(hash)
      localController.printFollow()
      e.stopPropagation()
      return false
    },

    printSidebar: function () {
      this.printFollow()
      this.printSidebarItems()
      return this.printPlaylists()
    },
    printSidebarItems: function () {
      aElements.userNav.dchtml('<table style="margin-bottom: 0px;margin-top: 5px;" class="table table-condensed table-hover" id="table-searches"><thead></thead><tbody><tr id="all-tab"><td><h5>All songs</h5></td></tr><tr id="current-nav"><td><h5>Current</h5></td></tr><tr id="follow-tab-nav"><td><h5>Following</h5></td></tr><tr id="history-tab"><td><h5>History</h5></td></tr><tr id="search-tab" style="border-bottom: 1pt solid #464545;"><td><h5>Searches</h5></td></tr></tbody></table>')
    },
    printPlaylists: function () {
      return $.getJSON('http://dream.tribe.nu/r3/php/playlists.php', function (data) {
        playlists = data
        if (typeof data === 'undefined' || !data.length) {
          aElements.playlists.dchtml('<div class="jumbotron"><div class="text-center"><h1>&gt;_&lt;</h1><h2>Save a playlist first!</h2></div></div>')
          // cleartimeout(timeout);
          // aElements.stageContainerParent.addClass("hidden-stage");
          return;
        }
        var table = '<div class="sidebar-table-container"><table class="table table-hover table-condensed tablesorter showMore" id="tableplaylists"><thead><tr><th style="width: 100%;"><h5 class="text-info">Playlists</h5></th><th></th></tr></thead><tbody>'
        $.each(data, function (key, val) {
          table += '<tr class="playlist-show' + (controller.sPlaylistPlaying == val ? ' primary' : '') + '" id="' + val + '"><td><button data-title="' + val + '" id="playlist-remove" type="button" class="close" data-dismiss="alert">\u00d7</button><h5>' + val + '</h5></td></tr>'
        })
        table += '</tbody></table></div>';
        // if (data.length > 0){
        //   table += '<div id="sidebar-show-more" class="text-center" style="cursor:pointer;margin-top: 5px;border-top:solid #464545 2px;">SHOW LESS  </div>';
        // }
        $(navBarContainer + ' #user-playlists').dchtml(table)
      })
    },

    setActiveTab: function (element) {
      $('tr.active').removeClass('active')
      $(element).addClass('active')

      // window.scrollTo(0, aElements.stageContainerCurrent.height()+11);
    },
    setPlayingTab: function () {
      $('#table-searches tr.info, #subscriptions-table tr.info, #tableplaylists tr.info').removeClass('info')
      $('#table-searches tr.active, #subscriptions-table tr.active, #tableplaylists tr.active').toggleClass('active info')
    }
  }

  DCPlayer = {
    pPlaybar: aElements.dc_prog,
    pCurrentTime: $('#jp_container_3 .jp-current-time'),
    iProgress: '',
iDuration: '',
    bMuted: false,
bPlaying: false,
bEmbedded: false,
bShuffle: false,
    aPlaylist: [], aOld: [],
    scWidget: '',
ytWidget: '',
    iCurrent: '',
iCurrentOld: '',
    sCurrent: '',
sCurrentSource: '',
    iVol: volume,
iVolOld: '',
    mute: function (bMute) {
      DCPlayer.volumeChange()
    },
    next: function () {
      DCPlayer.iCurrent += 1
      DCPlayer.playSong(DCPlayer.iCurrent)
    },
    pause: function () {
      if (!jpc1.data().jPlayer.status.paused) {
        return jpc1.jPlayer('pause')
      }
      switch (DCPlayer.sCurrentSource) {
        case 'soundcloud':
          DCPlayer.scWidget.pause()
        break;
        case 'mixcloud':
          break
        case 'youtube':
          aElements.ytframe[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*')
        break;
        default:
      }
    },
    play: function () {
      var src = aElements.jquery_jplayer_3.find('#jp_audio_0')[0].src
      if (src !== 'about:blank' && src !== '') {
        return jpc1.jPlayer('play')
      }
      switch (DCPlayer.sCurrentSource) {
        case 'soundcloud':
          DCPlayer.scWidget.play()
        break;
        case 'mixcloud':
          break
        case 'youtube':
          aElements.ytframe[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*')
        break;
        default:
      }
    },
    playSong: function (iSong) {
      // aElements.dc_vol.simpleSlider("setValue", volume);
      DCPlayer.iCurrent = iSong
      if (DCPlayer.aPlaylist[DCPlayer.iCurrent].source.toLowerCase() == 'mixcloud' || DCPlayer.aPlaylist[DCPlayer.iCurrent].source.toLowerCase() == 'soundcloud') {
        DCPlayer.playFallback()
        return;
      }
      if (!isMobile) {
        insertYT(DCPlayer.aPlaylist[this.iCurrent])
      }else {
        DCPlayer.playFallback()
      }
    },
    playFallback: function () {
      clearInterval(timeout3)
      jpc1.jPlayer('setMedia', this.aPlaylist[this.iCurrent])
      jpc1.jPlayer('play')
      updateCurrentSongElements(this.aPlaylist[this.iCurrent])
      try { DCPlayer.ytWidget.stopVideo()} catch (e) {}
      aElements.dcFrame.attr({src: ''}).hide()
      aElements.ytframe.hide()
      aElements.player_img.attr('src', this.aPlaylist[this.iCurrent].poster).show()
    },
    prev: function () {
      DCPlayer.iCurrent -= 1
      DCPlayer.playSong(DCPlayer.iCurrent)
    },
    progress: function (iProg) {
      DCPlayer.pPlaybar.simpleSlider('setValue', iProg / 100)
      DCPlayer.pCurrentTime.text(secondstominutes(Math.floor(DCPlayer.iProgress)))
    },
    seekTo: function (iTime) {
      if (!jpc1.data().jPlayer.status.paused) {
        return jpc1.jPlayer('play', iTime)
      }
      switch (DCPlayer.sCurrentSource) {
        case 'soundcloud':
        // milliseconds
          DCPlayer.scWidget.seekTo(iTime * 1000)
        break;
        case 'mixcloud':
          break
        case 'youtube':
        // seconds
          DCPlayer.ytWidget.seekTo(iTime)
        break;
        default:
      }
    },
    setDuration: function (iSeconds) {
      DCPlayer.iDuration = iSeconds
      aElements.jpDuration.text(secondstominutes(Math.round(iSeconds)))
    },
    setPlaying: function (aJson, iPlaying) {
      // clearInterval(timeout3);
      DCPlayer.iCurrent = iPlaying
      DCPlayer.aPlaylist = aJson
      // jp.playlist = aJson;
      DCPlayer.sCurrentSource = DCPlayer.aPlaylist[this.iCurrent].source.toLowerCase()
      localController.setPlayingTab()
      // $("#jp_container_3 .jp-seek-bar").width("100%");
    },
    toggleMute: function () {
      DCPlayer.bMuted = !DCPlayer.bMuted
      if (DCPlayer.bMuted) {
        aElements.jp_play.addClass('jp-mute').removeClass('jp-unmute')
        DCPlayer.iVolOld = DCPlayer.iVol
        DCPlayer.volumeChange(0)
      } else {
        aElements.jp_play.addClass('jp-unmute').removeClass('jp-mute')
        DCPlayer.volumeChange(DCPlayer.iVolOld)
      }
    },
    togglePlay: function (bool) {
      DCPlayer.bPlaying = bool
      if (bool) {
        aElements.jp_play.addClass('jp-pause').removeClass('jp-play')
      } else {
        aElements.jp_play.addClass('jp-play').removeClass('jp-pause')
      }
    },
    toggleShuffle: function () {
    //   console.log("shuffle");
      DCPlayer.bShuffle = !DCPlayer.bShuffle
      aElements.shuffle_button.toggleClass('jp-shuffle jp-shuffle-off')
      if (DCPlayer.bShuffle) {
        DCPlayer.aOld = DCPlayer.aPlaylist
        DCPlayer.iCurrentOld = DCPlayer.iCurrent
        DCPlayer.iCurrent = 0
        DCPlayer.aPlaylist = shuffle(DCPlayer.aPlaylist)
      } else{
        DCPlayer.aPlaylist = DCPlayer.aOld
        DCPlayer.iCurrent = DCPlayer.iCurrentOld
      }

      DCPlayer.playSong(DCPlayer.iCurrent)
      if (controller.sPlaylistDisplay == controller.sPlaylistPlaying) {
        controller.currentArray = DCPlayer.aPlaylist
        controller.printCurrent()
      }
    },
    volumeChange: function (v) {
      aElements.dc_vol.simpleSlider('setValue', v)
      DCPlayer.volumeSet(v)
    },
    volumeSet: function (iVol) {
      localStorage.setItem('volume', iVol)
      DCPlayer.iVol = iVol
      if (!jpc1.data().jPlayer.status.paused) {
        return jpc1.jPlayer('volume', iVol)
      }
      switch (this.sCurrentSource) {
        case 'soundcloud':
          DCPlayer.scWidget.setVolume(iVol)
        break;
        case 'mixcloud':
          break
        case 'youtube':
          DCPlayer.ytWidget.setVolume(iVol * 100)
        break;
        default:
      }
    }
  }

  jp = new jPlayerPlaylist({jPlayer: '#jquery_jplayer_3', cssSelectorAncestor: '#jp_container_3'}, [], {
    loadstart: function (event) {
      if (!aElements.prog_dragger.length) {
        aElements.prog_dragger = $('div.dc-prog-container div.dragger')
      }
      clearInterval(timeout3)
      timeoutSet = false
      aElements.prog_dragger.hide()
      aElements.progress.show()
    },
    timeupdate: function (event) {
      DCPlayer.iProgress = event.jPlayer.status.currentTime
      DCPlayer.progress((DCPlayer.iProgress / DCPlayer.iDuration) * 100)
    },
    loadeddata: function (event) {
      DCPlayer.setDuration(event.jPlayer.status.duration)
      aElements.progress.hide()
      aElements.prog_dragger.show()
    },
    ended: function (event) {
      jpc1.jPlayer('clearMedia')
      DCPlayer.next()
    },
    error: function (event) {
      // count to five
      this.error_count = (this.error_count < 5 ? ++this.error_count : 1)
      aElements.prog_dragger.show()
      if (this.error_count != 3) {
        jp.play()
      } else {
        jpc1.jPlayer('clearMedia')
        DCPlayer.next()
      }
      // if(event.jPlayer.error.type === "e_url"){
    },
    swfPath: './js/',
    supplied: 'mp3',
    wmode: 'window',
    preload: 'auto',
    // volume: (isMobile? volume : parseFloat(0.8)),
    playlistOptions: {
      enableRemoveControls: !0,
      autoPlay: 1,
      displayTime: 0,
      addTime: 0,
      shuffleTime: 0
    }
  })

  jpc1.bind($.jPlayer.event.play, function (event) {
    DCPlayer.togglePlay(1)
    if (!isMobile) {
      DCPlayer.volumeChange(DCPlayer.iVol)
    }
  })
  jpc1.bind($.jPlayer.event.pause, function (event) {
    DCPlayer.togglePlay(0)
  })
  // $(jpc1).bind($.jPlayer.event.volumechange, function(event) {
  // });

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  Hotkey binds
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  $(document).keydown(function(e){
   if($("input").is(":focus")){
     return;
   }
   switch(e.which) {
       case 32: // Space
       if(aElements.jp_play.hasClass("jp-play")){
         DCPlayer.play();
       }else{
         DCPlayer.pause();
       }
       break;

       case 37: // Left
       if(e.ctrlKey){
         DCPlayer.prev();
       }else{
         DCPlayer.seekTo(DCPlayer.iProgress -= 9);
       }
       break;

       case 38: // Up
       DCPlayer.volumeChange(Math.min(1, +DCPlayer.iVol + 0.1));
       break;

       case 39: // Right
       if(e.ctrlKey){
         DCPlayer.next();
       }else{
         DCPlayer.seekTo(DCPlayer.iProgress += 9);
       }

       break;

       case 40: // Down
       DCPlayer.volumeChange(Math.max(0, +DCPlayer.iVol - 0.1));
       break;

       default:  // exit this handler for other keys
   }
  })

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  Header controls
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  aElements.navbar_header.on('click', '#create', function () {
    $('#modal-create').modal()
  })
  aElements.navbar_header.on('click', '#login', function () {
    $('#modal-login').modal()
  })
  aElements.navbar_header.on('click', '#logout', function () {
    location.href = 'php/logout.php';
  })
  aElements.navbar_header.on('click', '.navbar-brand', function (e) {
    e.preventDefault()
    // console.log("yolo");
      localController.printSidebar()
      if (isMobile) {
      aElements.mobileHomeTab.tab('show')
          aElements.stageContainerParent.addClass('hidden-stage')
          window.scrollTo(0, 0)
          history.pushState(null, null, '#mobile-home')
      } else if (controller.currentTab == aElements.playlists) {
      localController.printPlaylists()
      }
    controller.currentTab = aElements.home
      return false
  })
  aElements.navbar_header.on('keyup', '#searchi', function (e) {
    if (e.keyCode == 13) {
      // og"yellow")
      firstsearch($(this).val())
          aElements.searchInput.autocomplete('close')
      }
    e.stopPropagation()
  })
  aElements.navbar_header.on('click', '.sources', function (e) {
    // og"yellow")
    $(this).find('input').prop('checked', true)
      aElements.buttonSource.dchtml('<img src="http://dream.tribe.nu/r3/php/favicon.php?q=' + $('input[type=radio]:checked').val() + '">')
      firstsearch(aElements.searchInput.val(), true)
      e.stopPropagation()
      return false
  })
  aElements.navbar_header.on('click', 'input[type=radio]', function (e) {
    $(this).find('input').prop('checked', true)
      aElements.buttonSource.dchtml('<img src="http://dream.tribe.nu/r3/php/favicon.php?q=' + $('input[type=radio]:checked').val() + '">')
      firstsearch(aElements.searchInput.val(), true)
      e.stopPropagation()
  })
  $('.navbar-collapse ul li a:not(.dropdown-toggle)').bind('click', function () {
    $('.navbar-toggle:visible').click()
  })

  aElements.followTab.on('hidden.bs.tab', function (e) {
    // console.log("cleared follow");
    aElements.follow.dchtml('')
  })
  aElements.playHistoryTab.on('hidden.bs.tab', function (e) {
    // console.log("cleared playHistory");
    aElements.playHistory.dchtml('')
  })
  aElements.playlistTab.on('shown.bs.tab', function (e) {
    if (jp.playlist.length > 0) {
      controller.changeView(aElements.playlist)
          controller.printCurrent()
      } else {
      aElements.playlist.dchtml('<div class="jumbotron"><div class="text-center"><h1>^_^\'</h1><h2>Add something to the playlist!</h2></div></div>')
      }
  })
  aElements.searchInput.autocomplete({
    select: function (event, ui) {
      firstsearch(ui.item.value)
      },
    source: function (query, response) {
      $.getJSON('http://suggestqueries.google.com/complete/search?callback=?', {
        'hl': 'id',
        'jsonp': 'suggestCallBack',
        'q': aElements.searchInput.val(),
        'ds': 'yt',
        'client': 'youtube'
      })
          suggestCallBack = function (data) {
        var suggestions = []
              $.each(data[1], function (key, val) {
          suggestions.push(val[0])
              })
              suggestions.length = 10
              response(suggestions)
          };
    },
    delay: 0
  })

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  sidebar-nav
  //  All,Current ,Follow, History, Search History
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  aElements.sidebarNav.on('click', '#all-tab', function (e, p) {
    if (typeof p === 'undefined' || p === true)
      {history.pushState(null, null, "#/all-songs");}
    localController.setActiveTab(this)
        loading(true)
        localController.allGet().done(function () {
      loading(false)
          controller.changeView(aElements.allSongs)
        })
  })
  aElements.sidebarNav.on('click', '#current-nav', function () {
    controller.sPlaylistDisplay = controller.sPlaylistPlaying
      localController.setActiveTab($(this))
      controller.changeView(aElements.current)
  })
  aElements.sidebarNav.on('click', '#follow-tab-nav', function (e, bHistory) {
    loading(true)
      localController.setActiveTab(this)
      if (typeof bHistory === 'undefined' || bHistory === true)
      {history.pushState(null, null, "#/follow");}
    var aAjax1 = []
      jsonsearch = []
      controller.sPlaylistDisplay = 'Following';
    $.each(localController.aFollow, function (key, val) {
      aAjax1.push(search(val.q, 0, val.s, val.a, true))
      })
      $.when.apply($, aAjax1).always(function () {
      loading(false)
          jsonsearch = jsonsearch.sort(function (a, b) {
        a = new Date(a.created)
              b = new Date(b.created)
              return a > b ? -1 : a < b ? 1 : 0
          })
          controller.changeView(aElements.follow)
      })
  })
  aElements.sidebarNav.on('click', '#history-tab', function (e, p) {
    aElements.stageContainerParent.addClass('hidden-stage')
      localController.printHistory()
      localController.setActiveTab(this)
      if (typeof p === 'undefined' || p === true)
      {history.pushState(null, null, "#/history");}
  })
  aElements.sidebarNav.on('click', '#search-tab', function (e, p) {
    // og(p.param1)
    aElements.stageContainerParent.addClass('hidden-stage')
      localController.printSearches()
      localController.setActiveTab(this)
      if (typeof p === 'undefined' || p === true)
      {history.pushState(null, null, "#/searches");}
  })
  aElements.sidebarNav.on('click', '.playlist-show', function () {
    localController.setActiveTab(this)
      playlistShow($(this)[0].id)
  })
  aElements.sidebarNav.on('click', '#playlist-remove', function (e) {
    e.stopPropagation()
      var id = $(this).attr('data-title')
      $('.undo-playlist-alert').remove()
      aElements.tabContent.prepend('<div class="undo-playlist-alert alert alert-warning alert-dismissible" role="alert" style="margin-left: 15px"\t><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Warning!</strong> Deleted "' + id + '", <a id="undo-playlist-button" href="#"><b>undo</b></a>?</div>').hide().slideDown('slow')
      $('.undo-song-alert').fadeTo(8000, 500).slideUp(500, function () {
      $('.undo-song-alert').slideUp(500)
      })
      var url = 'http://dream.tribe.nu/r3/php/playlist.php?q=' + id
      $.getJSON(url, function (data) {
      deleted_item_playlist[0] = data
          deleted_item_playlist[1] = id
          $.post('http://dream.tribe.nu/r3/php/delete-playlist.php', {
        n: id
      }, function () {
        localController.printPlaylists()
          })
      })
      return !1
  })
  aElements.sidebarNav.on('click', '.subscriptions-show', function (e) {
    localController.setActiveTab(this)
      var id = this.id
      firstsearch(localController.aFollow[id].q, 1, localController.aFollow[id].a, localController.aFollow[id].s)
      return false
  })
  aElements.sidebarNav.on('click', '#sidebar-show-more', function (e) {
    $(e.target).siblings().toggleClass('showMore showLess')
    $(e.target).text($(e.target).text() == 'SHOW MORE' ? 'SHOW LESS' : 'SHOW MORE')
  })
  aElements.sidebarNav.on('click', '#siderbar-table-container th', function () {
    // trigger show more footer click
    $(this).parents('div').eq(0).siblings().trigger('click')
  })
  aElements.sidebarNav.on('click', '#unfollow-button', localController.unfollowButton)
  aElements.tabContent.on('click', '#unfollow-button', localController.unfollowButton)

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  Playlist controls
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  aElements.modal.on('click', '#modal-add-button', function () {
    var id = $(this).attr('mp3id')
      var name = $('#add-name').val()
      if (name == controller.sPlaylistPlaying)
      {jp.add(controller.currentArray[id]);}

    if (name == controller.sPlaylistDisplay) {
      controller.currentArray.push(controller.currentArray[id])
          controller.printCurrent()
      }

    var a = $.getJSON('http://dream.tribe.nu/r3/php/playlist.php?q=' + name, function (data) {
      data.push(controller.currentArray[id])
          postplaylist(name, data).done(function () {
        localController.printPlaylists(false)
          })
          $('#modal-add').modal('hide')
      })
      return !1
  })
  aElements.modal.on('change', '#modal-add-select', function () {
    $('#add-name').val(this.value)
  })
  aElements.modal.on('click', '#modal-add-all-button', function () {
    $('#modal-add-all').modal('hide')
      var songs = '';
    var name = $('#add-all-name').val()
      var a = $.getJSON('http://dream.tribe.nu/r3/php/playlist.php?q=' + name, function (data) {
      songs = controller.currentArray
          data = data.concat(songs)
          if (name == controller.sPlaylistDisplay) {
        aElements.playlists.dchtml(printjson(songs, 1))
              controller.afterPrintJson()
              $('#playlists #' + DCPlayer.iCurrent).parent().parent().addClass('primary')
          }
      postplaylist(name, data)
          localController.printPlaylists(1)
      })
      return !1
  })
  aElements.modal.on('change', '#modal-add-all-select', function () {
    $('#add-all-name').val(this.value)
  })
  aElements.modal.on('click', '#savemodal', function () {
    var a = $('#modal-playlist-select')
      a.dchtml('<option value="Create new">Create new</option>')
      $.each(playlists, function (key, val) {
      a.append('<option value="' + val + '">' + val + '</option>')
      })
      // $('#modal-playlists').on('shown.bs.modal', function () {
      // alert("1")
      // if(isMobile)
      // $('#modal-add-select').focus()
      // $("#modal-add-select").click()
      // })

      $('#modal-playlists').modal()


  })
  aElements.modal.on('click', '#save-playlist', function () {
    var a = $('#playlist-name').val()
      controller.sPlaylistDisplay = a
      $.post('http://dream.tribe.nu/r3/php/save.php', {
      t: jp.playlist,
      n: a
    }, function () {
      $('#modal-playlists').modal('hide')
          aElements.playlistTab.trigger('click')
          $('#playlist > h3').text(a)
          localController.printPlaylists()
      })
  })

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  Playlist header controls
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  aElements.searchResults.on('click', '.sort', sortResults)
  aElements.tabContent.on('click', '.sort', sortResults)
  aElements.tabContent.on('click', '#undo-playlist-button', function (e) {
    e.stopPropagation()
      postplaylist({
      t: deleted_item_playlist[0],
      n: deleted_item_playlist[1]
    }).done(function () {
      localController.printPlaylists()
          $('.undo-playlist-alert').remove()
      })
      return false
  })
   aElements.tabContent.on('click', '#load', function () {
    search_page += 1
      search(search_query, search_page, search_source, search_artist)
  })
  aElements.tabContent.on('click', '#add-all', function () {
    var a = $('#modal-add-all-select')
      a.dchtml('<option value="">Create new</option>')
      $.each(playlists, function (key, val) {
      a.append('<option value="' + val + '">' + val + '</option>')
      })
      $('#modal-add-all').modal()
      return !1
  })
  aElements.tabContent.on('click', '#dlall', function () {
    $('.dl', controller.currentTab).trigger('click')
      return !1
  })

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  Stage controls
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  aElements.stageContainerCurrent.on('dblclick', '#stage-show-more, #stage-description', function (e) {
    og('yo 2')
    e.stopPropagation()
    return false
  })
  aElements.stageContainerCurrent.on('click', '#play-current', function () {
    DCPlayer.iCurrent = parseInt($(this).parents('div:first')[0].id)
      DCPlayer.playFallback()
      return !1
    })
  aElements.stageContainerCurrent.on('click', '#stage-show-more, #stage-description', function (e) {
    if (e.target.id == 'yt-time' || e.target.contains(getSelection().anchorNode) && getSelection().toString().length > 0 && $('#stage-show-more').text() == 'SHOW LESS') {
      return
      }
    $('#stage-description').toggleClass('showMore showLess')
      $('#stage-show-more').text($('#stage-show-more').text() == 'SHOW MORE' ? 'SHOW LESS' : 'SHOW MORE')
  })
  aElements.stageContainerCurrent.on('click', '#yt-time', function (event) {
    var seconds = $(this).text().split(':').reverse().reduce(function (prev, curr, i) { return prev + curr * Math.pow(60, i)}, 0)
    var src = aElements.jquery_jplayer_3.find('#jp_audio_0')[0].src
    if (src !== 'about:blank' && src !== '') {
      $(jpc1).jPlayer('play', seconds)
    } else{
      DCPlayer.ytWidget.seekTo(seconds)
    }
    event.preventDefault()
    return !1
  })

  aElements.stageContainerCurrent.on('click', '#link', function (e) {
    if (isMobile) {
    //   console.log("sharing");
      share($(this)[0].href)
    }else {
      copyToClipboard($(this)[0].href)
    }
    e.preventDefault()
  })


  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  Song controls
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  aElements.tabContent.on(isMobile ? 'dblclick' : 'click', '.song-container', function () {
    var json = controller.currentArray[$(this).find('div.dc-controls')[0].id]
      // If YouTube Playlist
      if (typeof json.playlistID === 'string' && json.playlistID !== '0') {
      youTubeGetPlaylist(json.playlistID).done(function (data) {
        controller.sPlaylistDisplay = json.title
          jsonsearch = data
          controller.changeView(aElements.searchResults)
        })
        return false
      }
    if (isMobile || json.source.toLowerCase() == 'mixcloud' || json.source.toLowerCase() == 'soundcloud')
      {$(this).find("a#play").trigger("click");}
    else
      {$(this).find("a#watch").trigger("click");}
    // $(".jp-seek-bar").width("100%").addClass("jp-seeking-bg");
    return false
  })

  aElements.tabContent.on('click', '.song-title', function (e) {
    var a = $(this).parents('.song-container').find('.btn-group,.btn-group-vertical')[0].id
      controller.sPlaylistPlaying = controller.sPlaylistDisplay
      DCPlayer.iCurrent = a
      DCPlayer.setPlaying(controller.currentArray, a)
      // history.pushState(null, null, "#/url/" + controller.currentArray[$(this).parents(".song-container").find(".btn-group,.btn-group-vertical")[0].id].mp32);
      youTubeGetRelated(controller.currentArray[$(this).parents('.song-container').find('.btn-group,.btn-group-vertical')[0].id])
      e.stopPropagation()
      return !1
    })
  aElements.tabContent.on('click', '#follow-button', function (e) {
    localController.saveFollow($(this).attr('data-hash'))
      $.each(localController.aFollow, function (k, v) {
      $('[data-artist="' + encodeURIComponent(v.a) + '"]').siblings('#follow-button').attr('id', 'unfollow-button').find('i.glyphicon-pushpin').toggleClass('glyphicon-pushpin glyphicon-remove')
      })
      e.stopPropagation()
      return false
  })
  aElements.tabContent.on('click', '#save-song', function (e) {
    var tmp = (e.target.id == 'save-song' ? $('i', e.target) : $(e.target))
    tmp.toggleClass('glyphicon-star glyphicon-star-empty')
    var a = $.getJSON('http://dream.tribe.nu/r3/php/playlist.php?q=11111111', function (data) {
      if (tmp.hasClass('glyphicon-star')) {
        data.unshift(controller.currentArray[$(e.target).parents('.song-container').find('.dc-controls')[0].id])
        postplaylist('11111111', data)
      }else {
        // Remove song from db
        var a = controller.currentArray[$(e.target).parents('.song-container').find('.dc-controls')[0].id].mp32
        for (var i = 0; i < data.length; i++) {
          if (data[i].mp32 == a) {
            data.splice(i, 1)
            break;
          }
        }
        localController.aSongs = data
        postplaylist('11111111', data).done(function () {
          if (aElements.allSongs.hasClass('active')) {
            controller.changeView(controller.currentTab)
            controller.printCurrent()
          }
        })
      }
    })
    return false
  })
  aElements.tabContent.on('click', '.artist', function (e) {
    og($(this).attr('href'))
      location.hash = $(this).attr('href')
      return !1
  })

  aElements.tabContent.on('click', '#add', function () {
    if (playlists == 'notloggedin') {
      jp.add(jsonsearch[$(this).parents('div:first')[0].id], !jp.playlist.length)
          return !1
      }
    var a = $('#modal-add-select')
      $('#modal-add-button').attr('mp3id', $(this).parents('div:first')[0].id)
      a.dchtml('<option value="">Create new</option>')
      $.each(playlists, function (key, val) {
      a.append('<option value="' + val + '">' + val + '</option>')
      })

      $('#modal-add').modal()
      return !1
  })
  aElements.tabContent.on('click', '#play', function () {
    localController.setPlayingTab()
      controller.sPlaylistPlaying = controller.sPlaylistDisplay

      DCPlayer.setPlaying(controller.currentArray, parseInt($(this).parents('div:first')[0].id))
      DCPlayer.playFallback()

      return !1
  })
  aElements.tabContent.on('click', '#dl', function (e) {
    d = controller.currentArray[$(this).parents('div:first')[0].id]
    $('<iframe>', {
      src: 'http://dream.tribe.nu/r3/off/dl.php?q=' + encodeURIComponent(d.mp32) + '&t=' + encodeURIComponent(d.title) + '%20' + encodeURIComponent(d.artist),
      name: $(this).parents('div:first')[0].id,
      style: 'display:none',
      id: 'dlframe'
    }).appendTo('.tab-content')
    e.stopPropagation()
    return 1
  })
  aElements.tabContent.on('click', '#watch', function () {
    var a = parseInt($(this).parents('div:first')[0].id)
      controller.sPlaylistPlaying = controller.sPlaylistDisplay
      DCPlayer.setPlaying(controller.currentArray, a)
      insertYT(controller.currentArray[a])
      // $(this).attr("id", "close").find("i").toggleClass("glyphicon-eye-open glyphicon-eye-close");
      return !1
  })
  aElements.tabContent.on('click', '#close', function () {
    var a
      $(this).attr('id', 'watch').find('i').toggleClass('glyphicon-eye-close glyphicon-eye-open')
      if (view_list) {
      a = aElements.dcFrame
          a.parent().attr('colspan', 1).prev().show().find('.poster').show().parent().next().attr('height', '100%')
          a.remove()
      } else {
      a = aElements.dcFrame
          a.siblings('.poster').show()
          a.remove()
      }
    return !1
  })
  aElements.tabContent.on('click', '#link', function (e) {
    if (isMobile) {
      share($(this)[0].href)
    } else{
      copyToClipboard($(this)[0].href)
    }
    // copyToClipboard(window.location.href.split("3/#")[0] + "?url=" + controller.currentArray[parseInt($(this).parents("div:first")[0].id)].mp32);
    e.preventDefault()
    return !1
  })
  aElements.tabContent.on('click', '#dl-video', function (e) {
    d = controller.currentArray[$(this).parents('div:first')[0].id]
    $('<iframe>', {
      src: 'http://dream.tribe.nu/r3/off/ytdl.php?q=' + encodeURIComponent(d.mp32), // "&t=" + encodeURIComponent(d.title) + "%20" + encodeURIComponent(d.artist)
      name: $(this).parents('div:first')[0].id,
      style: 'display:none',
      id: 'dlframe'
    }).appendTo('.tab-content')
    e.stopPropagation()
    return 1
  })

  aElements.tabContent.on('click', '#remove', function () {
    a = $(this).parents('div:first')[0].id
      deleted_item_song_data = clone(controller.currentArray)
      deleted_item_song_name = controller.sPlaylistDisplay
      $('.undo-song-alert').remove()
      aElements.tabContent.prepend('<div class="undo-song-alert alert alert-warning alert-dismissible" role="alert" style="margin-left: 15px"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>Deleted ' + deleted_item_song_data[a].title + ' by ' + deleted_item_song_data[a].artist + '" from ' + controller.sPlaylistDisplay + ', <a id="undo-song-button" href="#"><b>undo</b></a>?</div>').hide().slideDown('slow')

      // $("#undo-song-alert-text").dchtml('Deleted ' + deleted_item_song_data[a].title + " by " + deleted_item_song_data[a].artist + '" from ' + controller.sPlaylistDisplay + ', <a id="undo-song-button" href="#"><b>undo</b></a>?')
      // $(".undo-song-alert").show();
      $('.undo-song-alert').fadeTo(8000, 500).slideUp(500, function () {
      $('.undo-song-alert').slideUp(500)
      })
      $(this).parents('.song-container').hide()
      if (controller.currentTab == aElements.playHistory) {
      localController.removeHistory(a)
      } else if (aElements.playlist.hasClass('active')) {
      DCPlayer.aPlaylist.splice(a, 1)
          controller.changeView(aElements.playlist)
      } else if (controller.currentTab == aElements.current) {
      controller.currentArray.splice(a, 1)
          DCPlayer.aPlaylist.splice(a, 1)
          controller.changeView(aElements.playlist)
      } else {
      controller.currentArray.splice(a, 1)
          controller.printCurrent()
          postplaylist(controller.sPlaylistDisplay, controller.currentArray)
      }
    return false
  })
  aElements.tabContent.on('click', '#undo-song-button', function () {
    controller.currentArray = clone(deleted_item_song_data)
      controller.sPlaylistDisplay = deleted_item_song_name
      if (controller.sPlaylistDisplay !== 'History')
      {postplaylist(controller.sPlaylistDisplay, controller.currentArray);}
    controller.printCurrent()
      $('#undo-close').click()
      return false
  })

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // Footer controls
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  aElements.playback_buttons.on('click', '.jp-volume-bar', function (e) {
    var $bar = $(e.currentTarget),
      offset = $bar.offset(),
      x = e.pageX - offset.left,
      w = $bar.width()
      DCPlayer.volumeChange(x / w)
      // e.stopPropagation()
  })
  aElements.playback_buttons.on('click', '.jp-next', DCPlayer.next)
  aElements.playback_buttons.on('click', '.jp-play', DCPlayer.play)
  aElements.playback_buttons.on('click', '.jp-pause', DCPlayer.pause)
  aElements.playback_buttons.on('click', '.jp-previous', DCPlayer.prev)
  aElements.playback_buttons.on('click', '.jp-mute, .jp-unmute', function () {
    DCPlayer.toggleMute(0)
  })
  aElements.playback_buttons.on('click', '.jp-volume-max', function () {
    DCPlayer.volumeChange(1)
  })
  aElements.playback_buttons.on('click', '.jp-progress, #waveform', function (e) {
    var $bar = $(e.currentTarget),
      offset = $bar.offset(),
      x = e.pageX - offset.left,
      w = $bar.width()
      // $("#jp_container_3 .jp-play-bar").width(x + "px");

      // this.pPlaybar.simpleSlider("setValue", volume/ 100);
      DCPlayer.seekTo(DCPlayer.iDuration * x / w)
  })
  aElements.playback_buttons.on('click', '#shuffle-button', DCPlayer.toggleShuffle)
  aElements.playback_buttons.on('slider:ready slider:changed', '.dc-vol',
    function (event, data) {
      DCPlayer.volumeSet(data.value.toFixed(3))
  })
  aElements.playback_buttons.on('slider:ready slider:changed', '.dc-prog',
    function (event, data) {
      if (data.trigger == 'domDrag') {
        DCPlayer.seekTo(DCPlayer.iDuration * (data.value.toFixed(3)))
      }
    })
  aElements.playback_buttons.on('click', '#current-poster', function (e) {
    window.scrollTo(0, 0)

    // aElements.stageContainerParent.removeClass("hidden-stage");
    // location.hash = $("#current-details").attr("href");
    if (aElements.stageContainerParent.hasClass('hidden-stage')) {
      // aElements.tabContent.hide();
      aElements.stageContainerParent.removeClass('hidden-stage')
      window.scroll(0, 0)
    } else {
      aElements.stageContainerParent.addClass('hidden-stage')
      // aElements.tabContent.show();
    }
  })
  aElements.playback_buttons.on('click', '#current-details', function (e) {
    var a = $(this).attr('data-href')
    youTubeResolveURL(a, false)
    e.stopPropagation()
    e.preventDefault()
    return false
  })
  aElements.playback_buttons.on('click', '#view-btn', function () {
    view_list = !view_list
    controller.printCurrent()

    if (typeof Storage !== 'undefined') {
      localStorage.setItem('viewmode', view_list)
    }
    $(this).find('i').toggleClass('glyphicon-list-alt glyphicon-list-th')

  })

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  Search history controls
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  aElements.tabContent.on('click', '.search-query', function () {
    location.hash = $(this).attr('data-hash')
  })
  aElements.tabContent.on('click', '.search-remove', function (e) {
    // og"id " + $(this).attr("data-id"))
    localController.removeSearch(parseInt($(this).attr('data-id')))
      e.stopPropagation()
      return false
  })

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  Playlist functions
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function playlistShow (name, bHistory, sUsername) {
    loading(true)
      if (typeof bHistory === 'undefined') {
      bHistory = true
      }
    if (typeof sUsername === 'undefined') {
      sUsername = login
      }
    if (bHistory) {
      history.pushState(null, null, '#/' + encodeURIComponent(sUsername) + '/' + encodeURIComponent(name))
      }
    var url = 'http://dream.tribe.nu/r3/php/playlist.php?q=' + name + '&user=' + sUsername
      return $.getJSON(url, function (data) {
      loading(false)
          jsonsearch = data
          controller.sPlaylistDisplay = name
          controller.changeView(login !== '' ? aElements.playlists : aElements.home)
          // window.scrollTo(0, 0);
      })

  }
  function postplaylist (name, data) {
    return $.post('http://dream.tribe.nu/r3/php/save.php', {
      t: data,
      n: name
    })
  }
  function saveplaylist (name, data) {
    postplaylist(name, data).done(function () {
      localController.printPlaylists()
      })
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  Search function
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function firstsearch (q, bHistory, artist, source) {
    if (typeof source === 'undefined') {
      search_source = $('input[type=radio]:checked').val()
      }else {
      search_source = source
      }
    jsonsearch = []
      search_artist = artist
      search_page = 0
      search_query = q
      controller.sPlaylistDisplay = q
      if (typeof bHistory === 'undefined') {
      bHistory = true
      }
    if (typeof artist !== 'undefined' && bHistory)
      {history.pushState(null, null, "#/artist/" + search_source + "/" + encodeURI(q) + "/" + encodeURI(artist));}
    else if (bHistory && location.hash != '#/search/' + search_source + '/' + encodeURI(q))
      {history.pushState(null, null, "#/search/" + search_source + "/" + encodeURI(q));}
    // window.scrollTo(0, 0);
    // timeout = setTimeout(function() {
    //     $("#loading-tab").tab("show");
    // }, 250);
    loading(true)

      localController.saveSearch(q, artist, search_source, location.hash)
      return search(search_query, search_page, search_source, search_artist)
  }
  function search (q, page, source, artist, bUpdateSearchResults) {
    searchingb = true
      var ajax
      switch (source.toLowerCase()) {
      case 'all':
        ajax = $.when(bc(q, page, artist), mc(q, page, artist), sc(q, page, artist), yt(q, page, artist), vim(q, page, artist))
              break;
      case 'bandcamp':
        ajax = bc(q, page, artist)
              break;
      case 'mixcloud':
        ajax = mc(q, page, artist)
              break;
      case 'soundcloud':
        ajax = sc(q, page, artist)
              break;
      case 'youtube':
        ajax = yt(q, page, artist)
              break;
      case 'vimeo':
        ajax = vim(q, page, artist)
              break;
      case 'vk':
        ajax = vk(q, page, artist)
              break;
    }
    ajax.always(function () {
      loading(false)
      })
      if (typeof bUpdateSearchResults === 'undefined') {
      ajax.always(updateSearchResults)
          return ajax
      } else {
      return ajax
      }
  }
  function bc (q, page, artist) {
    if (login != 'guest')
      {return $.ajax();}
    if (nextPageToken == -1 && page !== 0) {
      nextPageToken = '';
      return $.ajax()
      }
    nextPageTokenString = (page > 0 ? '&start=' + nextPageToken : '')
      var a
      if (typeof (artist) !== 'undefined')
      {a = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBQqRsMlrhofGJfnBsCObwPdRq5nh581gg&cx=011672944433831995538:aawwgyzxh1g&q=site:" + artist + "/track/*" + nextPageTokenString;}
    else
      {a = "https://www.googleapis.com/customsearch/v1?key=AIzaSyBQqRsMlrhofGJfnBsCObwPdRq5nh581gg&cx=011672944433831995538:aawwgyzxh1g&q=" + q + " site:*.bandcamp.com/track" + nextPageTokenString;}

    return $.getJSON(a, function(bc_data) {
          try {
              var z = 1;
              if (typeof(bc_data.queries.nextPage) == "undefined") {
                  nextPageToken = -1;
              } else {
                  nextPageToken = bc_data.queries.nextPage[0].startIndex;
              }
              $.each(bc_data.items, function(key, val) {
                  jsonsearch.push({
                      artist: val.pagemap.musicrecording[0].byartist,
                      artistID: val.displayLink,
                      description: val.snippet,
                      created: parseDate(val.pagemap.musicrecording[0].datepublished),
                      duration: secondstominutes(val.pagemap.musicrecording[0].duration),
                      mp3: "http://dream.tribe.nu/r3/off/?q=" + val.link,
                      mp32: val.link,
                      poster: val.pagemap.cse_image[0].src,
                      posterLarge: val.pagemap.cse_image[0].src,
                      source: "Bandcamp",
                      title: val.pagemap.musicrecording[0].name,
                      embeddedPlayerURL: val.pagemap.metatags[0]["og:video"]
                  });
              });
          } catch (e) {
              og("Failed to parse bandcamp - " + e);
              
          }
      })
  }
  function mc (q, page, artist) {
    var a
      if (typeof (artist) !== 'undefined')
      {a = "http://api.mixcloud.com/" + artist + "/cloudcasts?limit=12&offset=" + 8 * page + "&callback=?";}
    else
      {a = "http://api.mixcloud.com/search/?type=cloudcast&limit=12&q=" + q + "&offset=" + 8 * page + "&callback=?";}

    return $.getJSON(a, function (mc_data) {
      try {
        $.each(mc_data.data, function (key, val) {
          jsonsearch.push({
            artist: val.user.name,
            artistID: val.user.username,
            duration: secondstominutes(val.audio_length),
            created: parseDate(val.created_time),
            mp3: 'http://dream.tribe.nu/r3/off/?q=' + val.url,
            mp32: val.url,
            poster: val.pictures.large,
            posterLarge: val.pictures.extra_large,
            source: 'Mixcloud',
            title: val.name
          })
              })
          } catch (e) {
        og('failed to parse bc search results' + e)
          }
    })
  }
  function sc (q, page, artist, related) {
    var a
      if (typeof (related) !== 'undefined') {
      a = 'https://api.soundcloud.com/tracks/' + artist + '/related?client_id=***REMOVED***';
    } else if (typeof (artist) !== 'undefined') {
      a = 'http://api.soundcloud.com/users/' + artist + '/tracks.json?&client_id=***REMOVED***&limit=12&offset=' + 12 * page
      } else {
      a = 'http://api.soundcloud.com/tracks.json?q=' + encodeURIComponent(q) + '&client_id=***REMOVED***&limit=12&offset=' + 12 * page
      }
    return $.getJSON(a, function(sc_data) {
          try {
              var img,
                  img2;
              $.each(sc_data, function(key, val) {
                  if (!val.artwork_url) {
                      val.artwork_url = val.user.avatar_url;
                  }
                  img = val.artwork_url.replace("i1", "i2").replace("-large", "-t300x300");
                  img2 = val.artwork_url.replace("-large", "-t500x500");
                  jsonsearch.push({
                      artist: val.user.username,
                      artistID: val.user_id,
                      created: parseDate(val.created_at),
                      description: val.description,
                      duration: secondstominutes(Math.floor(val.duration / 1E3)),
                      mp3: val.stream_url + "?client_id=***REMOVED***",
                      // mp3: "http://dream.tribe.nu/r3/off/?q=" + val.permalink_url,
                      mp32: val.permalink_url,
                      poster: img,
                      posterLarge: img2,
                      source: "Soundcloud",
                      title: val.title,
                      trackID: val.id
                  });
              });
          } catch (e) {
              og("failed to parse sc results" + e);
              
          }
      })
  }
  function yt (q, page, artist, related) {
    if (search_page === 0) {
      nextPageTokenString = '';
    } else {
      nextPageTokenString = '&pageToken=' + nextPageToken
      }
    var a
      if (typeof related !== 'undefined') {
      a = 'https://www.googleapis.com/youtube/v3/search?safeSearch=none&part=snippet&maxResults=20&relatedToVideoId=' + artist + '&type=video&key=***REMOVED***';
    } else if (typeof artist === 'undefined') {
      a = 'https://www.googleapis.com/youtube/v3/search?safeSearch=none&part=snippet&maxResults=12&type=video,playlist&q=' + q + '&key=***REMOVED***' + nextPageTokenString
      } else {
      a = 'https://www.googleapis.com/youtube/v3/search?safeSearch=none&part=snippet&order=date&maxResults=12&type=video&channelId=' + artist + '&key=***REMOVED***' + nextPageTokenString
      }
    return $.getJSON(a, function(yt_data) {
          try {
              $.each(yt_data.items, function(key, val) {
                  z = "https://www.youtube.com/watch?v=" + val.id.videoId;
                  jsonsearch.push({
                      artist: val.snippet.channelTitle,
                      artistID: val.snippet.channelId,
                      created: parseDate(val.snippet.publishedAt),
                      description: val.snippet.description,
                      mp3: "http://dream.tribe.nu/r3/off/?q=" + z,
                      mp32: z,
                      poster: val.snippet.thumbnails.high.url,
                      posterLarge: val.snippet.thumbnails.high.url,
                      source: "YouTube",
                      title: val.snippet.title,
                      trackID: val.id.videoId,
                      playlistID : (val.id.kind == "youtube#playlist" ? val.id.playlistId : 0)
                  });
              });
              nextPageToken = yt_data.nextPageToken;
          } catch (e) {
              nextPageToken = "";
              
          }
      })
  }
  function vim (q, page, artist) {
    if (typeof artist === 'undefined')
      {url = 'https://api.vimeo.com/videos?page=' + (page + 1) + '&per_page=12&query=' + q + '&sort=relevant&access_token=***REMOVED***';}
    else
      {url = 'https://api.vimeo.com/users/' + artist + '/videos?page=' + (page + 1) + '&per_page=12&sort=date&access_token=***REMOVED***';}
    return $.getJSON(url, function (data) {
      $.each(data.data, function (key, val) {
        jsonsearch.push({
          artist: val.user.name,
          artistID: val.user.uri.replace(/\/users\/(.*?)/ig, 'user'),
          created: parseDate(val.user.created_time),
          description: val.description,
          duration: secondstominutes(val.duration),
          mp3: 'http://dream.tribe.nu/r3/off/?q=' + val.link,
          mp32: val.link,
          poster: val.pictures.sizes[2].link,
          posterLarge: ('undefined' === typeof val.pictures.sizes[4] ? val.pictures.sizes[2].link : val.pictures.sizes[4].link),
          source: 'vimeo',
          title: val.name
        })
          })
      })
  }
  function vk (q, page, artist) {
    // if (typeof artist === "undefined")
    //     url = 'https://api.vimeo.com/videos?page=' + (page + 1) + '&per_page=12&query=' + q + '&sort=relevant&access_token=***REMOVED***';
    // else
    // url = 'https://api.vimeo.com/users/' + artist + '/videos?page=' + (page + 1) + '&per_page=12&sort=date&access_token=***REMOVED***';
    url = 'https://api.datmusic.xyz/search?q=' + q + '&page=' + page 
      return $.getJSON(url, function (data) {
      $.each(data.data, function (key, val) {
        jsonsearch.push({
          artist: val.artist,
          artistID: val.artist,
          // created: parseDate(val.user.created_time),
          // description: val.description,
          duration: secondstominutes(val.duration),
          mp3: 'http://dream.tribe.nu/r3/off/?q=' + val.stream,
          mp32: val.stream,
          poster: '',
          posterLarge: '',
          source: 'vk',
          title: val.title
        })
          })
      })
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  json to html
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function printjson (json, playlist, bFollow) {
    // if(bFollow){
    // return json2list2(json, playlist, bFollow)
    if (view_list) {
      return json2list(json, playlist, bFollow)
      } else {
      return json2column(json, playlist, bFollow)
      }
  }
  function json2list (json, playlist, bFollow) {
    var a = '',
      b, c, songButtons
      a += '<div class="row"><div class="col-lg-10 col-lg-offset-1">'
      // a += '<div id="stage-container-current"></div>'
      if (playlist) {
      // <h4 style="margin-top: 0px;">' + controller.sPlaylistDisplay + '</h4>
      a += '<div class="well well-sm text-center">' +
                  '<a type="a" id="add-all" class="btn btn-sm btn-primary">Add all</a>' +
                  '<a type="a" id="dlall" class="btn btn-sm btn-primary">Download all</a>' +
                  '<div class="btn-group">' +
                  '<button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort<span class="caret"></span></button>' +
                  '<ul class="dropdown-menu dropdown-menu-right">' +
                    '<li><a class="sort">Artist</a></li><li><a class="sort">Date</a></li><li><a class="sort">Title</a></li><li><a class="sort">Source</a></li></ul></div>' +
                '</div>'
        songButtons = ({ url }) => `
              <a title="Add to playlist" type="a" id="add" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-plus"></i></a>
              <a title="Play MP3" type="a" href="${url}" id="play" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-play"></i></a>
              <a title="Remove from playlist" type="a" id="remove" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-remove"></i></a>
              <a title="Download MP3" type="a" download id="dl" class="btn btn-primary btn-sm dl"><i class="glyphicon glyphicon-download-alt"></i></a>
              <a title="Download Video" type="a" id="dl-video" class="btn btn-primary btn-sm dl"><i class="glyphicon glyphicon glyphicon-film"></i></a>
              <a title="Show embedded player" type="a" id="watch" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-eye-open"></i></a>
              <a title="Copy link to clipboard" type="a" href="${url}" id="link" class="btn btn-primary btn-sm dl"><i class="glyphicon glyphicon-link"></i></a>`
                // b = '<a type="a" id="add" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-plus"></i></a>' + '<a type="a" id="play" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-play"></i></a>' + '<a type="a" id="remove" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-remove"></i></a>' + '<a type="a" download id="dl" class="btn btn-primary btn-sm dl"><i class="glyphicon glyphicon-download-alt"></i></a><a type="a" id="watch" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-eye-open"></i></a>';
      } else {
      a += '<div class="well well-sm text-center"><a type="a" id="add-all" class="btn btn-sm btn-primary">Add all</a><a type="a" id="dlall" class="btn btn-sm btn-primary">Download all</a><a class="btn btn-sm btn-primary" type="a" id="load">Load more</a><div class="btn-group"><button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort<span class="caret"></span></button><ul class="dropdown-menu dropdown-menu-right"><li><a class="sort">Artist</a></li><li><a class="sort">Date</a></li><li><a class="sort">Title</a></li><li><a class="sort">Source</a></li></ul></div></div>'
          songButtons = ({ url }) => `
          <a title="Add to playlist" type="a" id="add" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-plus"></i></a>
          <a title="Play MP3" type="a" href="?url=${url}" id="play" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-play"></i></a>
          <a title="Download MP3" type="a" id="dl" class="btn btn-primary btn-sm dl"><i class="glyphicon glyphicon-download-alt"></i></a>
          <a title="Download Video" type="a" id="dl-video" class="btn btn-primary btn-sm dl"><i class="glyphicon glyphicon glyphicon-film"></i></a>
          <a title="Copy link to clipboard" type="a" href="${url}" id="link" class="btn btn-primary btn-sm dl"><i class="glyphicon glyphicon-link"></i></a>
          <a title="Show embedded player" type="a" id="watch" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-eye-open"></i></a>`
      }
    a += '<table class="tablesorter table table-hover table-condensed sortable-table"><thead><tr><th id="playlist-header"></th><th></th>' + (!isMobile ? '<th style="width:60px"></th>' : '') + '</tr></thead><tbody>'

      $.each(json, function (key, val) {
      if (val)
        {a +=
              '<tr class="song-container"><td><img class="img-responsive poster" src="' + val.poster + '" alt=""></td>'+
                '<td><h4 class="song-title">' + val.title + '</h4>'+
                  '<p><a class="artist" data-artist="' + val.artistID + '" href="#/artist/' + val.source + '/' + encodeURIComponent(val.artist) + '/' + val.artistID + '">' + val.artist + '</a>'+
                  '<span id="follow-button" data-hash="' + encodeURIComponent(JSON.stringify({q: val.artist, a: val.artistID, s: val.source, h: "#/" + val.source + "/" + val.artist + "/" + val.artistID})) + '" class="" style="margin-left:10px"><i class="glyphicon glyphicon-pushpin"></i></span>'+
                  '<span data-url="' + val.mp32 + '" id="save-song"><i class="glyphicon glyphicon-star-empty"></i></span><br/>' +
                  '<span class="song-duration">'+
                    (typeof val.duration !== "undefined" ?  val.duration : 'XX:XX') +
                  '</span>' +
                  '<div class="song-date">'+
                    (typeof val.created !== 'undefined' ? calcDate(today, new Date(val.created)) :"") +
                  '</div>' +
                  '<div class="song-description">'+
                    (typeof val.description !== "undefined" && val.description !== null ? '<p class="hidden-xs comment more">' + val.description.replace(/\n/ig, "<br/>") + "</p>" : "") +
                  '</div>' +
                  (isMobile ?
                    '<div id="' + key + '" class="dc-controls btn-group">' +
                      (typeof val.playlistID == "string" && val.playlistID !== "0" ? "" : songButtons({"url": val.mp32})) +
                    "</div>"
                    : ""
                  ) +
                  '</td>'+
                  (!isMobile ?
                    '<td class="first-td">'+
                    '<div id="' + key + '" class="dc-controls btn-group-vertical">' +
                      (typeof val.playlistID == "string" && val.playlistID !== "0" ? "" : songButtons({"url": val.mp32})) +
                    "</div>"+
                    "</td>" : ""
                  ) +
                  "</tr>";}
    })
      a += '</tbody></table></div></div>';
    return a
  }
  function json2column (json, playlist, bFollow) {
    var a = '',
      b, c, songButtons
      if (bFollow)
      {c = ["unfollow-button", "glyphicon glyphicon-remove"];}
    else
      {c = ["follow-button", "glyphicon glyphicon-pushpin"];}
    a += '<div class="row"><div class="col-lg-10 col-lg-offset-1">'
      a += '<div id="stage-container-current"></div>'

      if (playlist) {
      a += '<div class="well well-sm text-center"><a type="a" id="add-all" class="btn btn-sm btn-primary">Add all</a><a type="a" id="dlall" class="btn btn-sm btn-primary">Download all</a><div class="btn-group"><button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort<span class="caret"></span></button><ul class="dropdown-menu dropdown-menu-right"><li><a class="sort">Artist</a></li><li><a class="sort">Date</a></li><li><a class="sort">Title</a></li><li><a class="sort">Source</a></li></ul></div></div>'
        songButtons = ({ url }) =>
        `<button style="margin-top:1px" type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="glyphicon glyphicon-cog"></i></button>
          <ul class="dropdown-menu">
          <li><a title="Add to playlist" type="a" id="add"><i class="glyphicon glyphicon-plus"></i></a></li>
          <li><a title="Play MP3" type="a" href="?url=${url}"  id="play"><i class="glyphicon glyphicon-play"></i></a></li>
          <li><a title="Download MP3" type="a" id="dl" class=" dl"><i class="glyphicon glyphicon-download-alt"></i></a></li>
          <li><a title="Download Video" type="a" id="dl-video"><i class="glyphicon glyphicon glyphicon-film"></i></a></li>
          <li><a title="Remove from playlist" type="a" id="remove"><i class="glyphicon glyphicon-remove"></i></a></li>
          <li><a title="Show embedded player" type="a" id="watch"><i class="glyphicon glyphicon-eye-open"></i></a></li>
          <li><a title="Copy link to clipboard" type="a" href="${url}" id="link"><i class="glyphicon glyphicon-link"></i></a></li>`
      } else {
      a += '<div class="well well-sm text-center"><a type="a" id="add-all" class="btn btn-sm btn-primary">Add all</a><a type="a" id="dlall" class="btn btn-sm btn-primary">Download all</a><a class="btn btn-sm btn-primary" type="a" id="load">Load more</a><div class="btn-group"><button type="button" class="btn btn-sm btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Sort<span class="caret"></span></button><ul class="dropdown-menu dropdown-menu-right"><li><a class="sort">Artist</a></li><li><a class="sort">Date</a></li><li><a class="sort">Title</a></li><li><a class="sort">Source</a></li></ul></div></div>'
        songButtons = ({ url }) =>
        `<button style="margin-top:1px"type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="glyphicon glyphicon-cog"></i></button><ul class="dropdown-menu">
          <li><a title="Add to playlist" type="a" id="add"><i class="glyphicon glyphicon-plus"></i></a></li>
          <li><a title="Play MP3" type="a" href="?url=${url}"  id="play"><i class="glyphicon glyphicon-play"></i></a></li>
          <li><a title="Download MP3" type="a" id="dl" class=" dl"><i class="glyphicon glyphicon-download-alt"></i></a></li>
          <li><a title="Download Video" type="a" id="dl-video"><i class="glyphicon glyphicon glyphicon-film"></i></a></li>
          <li><a title="Show embedded player" type="a" id="watch"><i class="glyphicon glyphicon-eye-open"></i></a></li>
          <li><a title="Copy link to clipboard" type="a" href="${url}" id="link"><i class="glyphicon glyphicon-link"></i></a></li>`
      }
    $.each(json, function (key, val) {
      try {
        a += '<div class="song-container col-lg-3 col-sm-4 col-xs-12 clear-L-R">' +
              '<div style="position:absolute" id="' + key + '" class="btn-group dc-controls">' +
                (typeof val.playlistID === 'string' && val.playlistID !== '0' ? '' : songButtons({url: val.mp32}) +
                '<li><a href="' + val.mp32 + '" id="source" target="_blank" class=""><img target="_blank" href="' + val.mp32 + '"id="favicon" src="http://dream.tribe.nu/r3/php/favicon.php?q=' + val.source + '"></a></li>') + '</ul id="' + key + '"></div>' +
              '<div><img src="' + (typeof val.posterLarge === 'undefined' ? val.poster : val.posterLarge) + '" class="poster img-responsive clear-L-R" alt=""></div>' +
              '<div class="col-xs-12 caption caption-text">' +
              '<div class="song-title" style="">' + val.title + '</div>' +
              '<span class="song-duration">' + (typeof val.duration !== 'undefined' ? val.duration + ' - ' : 'XX:XX - ') + '</span>' +
              '<span class="song-date">' + (typeof val.created !== 'undefined' ? calcDate(today, new Date(val.created)) : '') + '</span>' +
              '<div><a data-artist="' + val.artistID + '" class="artist" href="#/artist/' + val.source + '/' + encodeURIComponent(val.artist) + '/' + val.artistID + '">' + val.artist + '</a><span id="follow-button" style="margin-left:10px" data-hash="' + encodeURIComponent(JSON.stringify({
            q: val.artist,
            a: val.artistID,
            s: val.source,
            h: '#/' + val.source + '/' + val.artist + '/' + val.artistID
          })) + '" class=" "><i class="glyphicon glyphicon-pushpin"></i></span>' +
              '<span data-url="' + val.mp32 + '" id="save-song"><i class="glyphicon glyphicon-star-empty"></i></span></div>' +
              '</div></div>'
          if ((key + 1) % 4 === 0)
          {a += '<div class="clearfix visible-lg-block"></div>';}
        else if ((key + 1) % 3 === 0)
          {a += '<div class="clearfix visible-md-block"></div>';}
        c = ''
          } catch (e) {

      } finally {

      }
    })
      return a

  }
  function updateSearchResults () {
    searchingb = false
      controller.changeView(aElements.searchResults)
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  Song functions
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function insertYT (song) {
    clearInterval(timeout3)
      localController.savePlay(song)
      jpc1.jPlayer('clearMedia')
      aElements.progress.hide()

      // aElements.stageContainerParent.addClass("hidden-stage");
      try { DCPlayer.ytWidget.stopVideo()} catch (e) {}
    aElements.ytframe.hide()
      aElements.dcFrame.attr({src: ''}).hide()
      aElements.player_img.attr({src: ''})

      // $("#jp_container_3 .jp-seek-bar").width("100%");//.addClass("jp-seeking-bg");
      a = function () {
      if (song.source.toLowerCase() == 'youtube') {
        try {
          DCPlayer.ytWidget.loadVideoById(youTubeGetID(song.mp32))
            aElements.ytframe.show()
          } catch (e) {
          og('yt fallback!')
            aElements.ytframe.hide('')
            DCPlayer.playFallback()
          } finally {
        }
      } else {
        aElements.ytframe.hide()
          aElements.dcFrame.show().attr('src', song.embed)
          try { DCPlayer.ytWidget.stopVideo()} catch (e) {}
      }
    }
      var src1
      if (song.mp32.indexOf('bandcamp') > -1) {
      if (song.embeddedPlayerURL === undefined) {
        return og('no bancamp player')
          }
      song.embed = 'http://bandcamp.com/EmbeddedPlayer/track=' + song.embeddedPlayerURL
          updateCurrentSongElements(song)
      } else if (song.mp32.indexOf('mixcloud') > -1) {
      song.embed = 'https://www.mixcloud.com/widget/iframe/?feed=' + song.mp32 + '&light=1&autoplay=1';
      a()
          updateCurrentSongElements(song)
          onMixcloudIframeAPIReady()
      } else if (song.mp32.indexOf('soundcloud') > -1) {
      song.embed = 'https://w.soundcloud.com/player/?url=' + encodeURIComponent(song.mp32) + '&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&visual=true';
      a()
          updateCurrentSongElements(song)
          onSouncloudIframeAPIReady()
      } else if (song.mp32.indexOf('youtube') > -1) {
      song.embed = 'http://www.youtube.com/embed/' + youTubeGetID(song.mp32) + '?autoplay=1&enablejsapi=1&controls=1 ';
      a()
          updateCurrentSongElements(song)
          // onYouTubeIframeAPIReady();

      } else if (song.mp32.indexOf('vimeo') > -1) {
      song.embed = 'https://player.vimeo.com/video/' + song.mp32.match(/.com\/(.+)/)[1]
          a()
          updateCurrentSongElements(song)
      }
  }
  function hatetrack (val, bCurrent) {
    var a = ''
      a += '<div class="well">'
      a += '<div id="stage-controls">'
      a += '<div class="btn-group' + (isMobile ? '-vertical' : '') + ' pull-right dc-controls" id="' + DCPlayer.iCurrent + '">' +
                '<a type="a" id="add" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-plus"></i></a>' +
                '<a type="a" id="save-song" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-star-empty"></i></a>' +
                '<a type="a" id="play-current" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-music"></i></a>' +
                '<a type="a" download id="dl" class="btn btn-primary btn-sm dl"><i class="glyphicon glyphicon-download-alt"></i></a>' +
                '<a href="?url=' + val.mp32 + '" type="a" id="link" class="btn btn-primary btn-sm"><i class="glyphicon glyphicon-link"></i></a><a target="_blank" href="' + val.mp32 + '" type="a" id="link" class="btn btn-primary btn-sm"><img href="' + val.mp3 + '" target="_blank" id="favicon" src="http://dream.tribe.nu/r3/php/favicon.php?q=' + val.source + '"></a>' +
              '</div>'
      a += '<div id="stage-title"><h3 title="' + val.title + '">' + val.title + '</h3></div>'
      a += '<div id="stage-artist">' +
              '<h4>' +
                '<a data-artist="' + val.artistID + '" class="artist" href="#/artist/' +
                val.source + '/' + encodeURIComponent(val.artist) + '/' + val.artistID + '">' +
                val.artist +
                '</a>' +
              '<span id="follow-button" style="margin-left:10px" data-hash="' +
              encodeURIComponent(JSON.stringify({q: val.artist, a: val.artistID, s: val.source, h: '#/' + val.source + '/' + val.artist + '/' + val.artistID})) + '" class=" "><i class="glyphicon glyphicon-pushpin"></i></span>' +
            '</h4></div>'
      a += '<div id="stage-created">' +
              (typeof val.created !== 'undefined' ? '<b>Published ' + calcDate(today, new Date(val.created)) + '</b>' : '') +
              (typeof val.duration !== 'undefined' ? '<br><span><i class="glyphicon glyphicon-time"></i>  ' + val.duration + '</span>' : '') +
            '</div>'
      a += '</div>'
      // a += '</div>';

      //If has description
      a +=
      '<div id="stage-description" class="stage-description showMore">' +
          (typeof val.description !== 'undefined' ? val.description.replace(/\n/ig, '<br/>') : '') +
          '<div id="stage-show-more" class="stage-footer text-center" style="cursor:pointer;margin-top: 5px;margin-bottom:-15px;border-top:solid #464545 4px;">SHOW LESS</div>' +
          '</div>' +
      '</div>'
      return a
  }
  function updateCurrentSongElements (song) {
    aElements.dc_prog.simpleSlider('setValue', 0)
      localController.savePlay(song)
      if (controller.sPlaylistDisplay == controller.sPlaylistPlaying) {
      controller.currentTab.find('.song-container.active').removeClass('active') //.find(".morelink:first").click();
          controller.currentTab.find('div#' + DCPlayer.iCurrent).parents('.song-container').addClass('active')
      }
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: song.title,
        artist: song.artist,
        artwork: [
          { src: song.poster, sizes: '96x96', type: 'image/png' },
          { src: song.poster, sizes: '128x128', type: 'image/png' },
          { src: song.poster, sizes: '192x192', type: 'image/png' },
          { src: song.poster, sizes: '256x256', type: 'image/png' },
          { src: song.poster, sizes: '384x384', type: 'image/png' },
          { src: song.poster, sizes: '512x512', type: 'image/png' }
        ]
      })
      }
    aElements.stageContainerCurrent.dchtml(hatetrack(song, DCPlayer.iCurrent)) // store the new element

      currentTextArray[0].attr('src', song.poster)
      currentTextArray[1].text(song.title).attr('href', '?url=' + song.mp32).attr('data-href', song.mp32)
      currentTextArray[2].text(song.artist).attr('href', '#/artist/' + fixSourceCase(song.source) + '/' + encodeURIComponent(song.artist) + '/' + song.artistID)
      if (song.mp32.indexOf('youtube') > -1) {
      $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + youTubeGetID(song.mp32) + '&fields=items/snippet/title,items/snippet/description&key=***REMOVED***', function (data) {
        aElements.stageContainerCurrent.find('#stage-description').dchtml(data.items[0].snippet.description.replace(/\n/g, '<br>').replace(/(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)([0-5]?\d)/g, '<a href="" id="yt-time">$&</a>'))
              aElements.stageContainerCurrent.find('#stage-description').linkify()
          })
      }
    controller.afterPrintJson()
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  YouTube Functions
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function youTubeResolveURL (sURL, bPlay, hCallback, bGetRelated = true) {
    var json, ajax
      if (sURL.indexOf('youtube') > -1) {
      $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + youTubeGetID(sURL) + '&key=***REMOVED***', function (val) {
        val = val.items[0]
              z = 'https://www.youtube.com/watch?v=' + val.id
              json = {
          artist: val.snippet.channelTitle,
          artistID: val.snippet.channelId,
          created: parseDate(val.snippet.publishedAt),
          description: val.snippet.description,
          mp3: 'http://dream.tribe.nu/r3/off/?q=' + z,
          mp32: z,
          poster: val.snippet.thumbnails.high.url,
          posterLarge: val.snippet.thumbnails.high.url,
          source: 'YouTube',
          title: val.snippet.title,
          trackID: val.id
        }
              if (bGetRelated) {
          youTubeGetRelated(json, bPlay)
              }else {
          hCallback(json)
              }
      })
      }
    if (sURL.indexOf('soundcloud') > -1) {
      ajax = $.getJSON('https://api.soundcloud.com/resolve.json?url=' + encodeURIComponent(sURL) + '&client_id=***REMOVED***').always(function (val) {
        // ogval)
        if (!val.artwork_url) {
          val.artwork_url = val.user.avatar_url
              }
        img = val.artwork_url.replace('i1', 'i2').replace('-large', '-t300x300')
              img2 = val.artwork_url.replace('-large', '-t500x500')
              json = {
          artist: val.user.username,
          artistID: val.user_id,
          created: parseDate(val.created_at),
          description: val.description,
          duration: secondstominutes(Math.floor(val.duration / 1E3)),
          mp3: val.stream_url + '?client_id=***REMOVED***',
          // mp3: "http://dream.tribe.nu/r3/off/?q=" + val.permalink_url,
          mp32: val.permalink_url,
          poster: img,
          posterLarge: img2,
          source: 'Soundcloud',
          title: val.title,
          trackID: val.id
        }
              if (bGetRelated) {
          youTubeGetRelated(json, bPlay)
              }else {
          hCallback(json)
              }
      })
      }
    return ajax
  }
  function youTubeGetArtistImg (song) {
    var aYT1 = [], sYT = '', k = 0
    var passIDYT = function (data) {
      for (var i in data.items) {
        showImg('[data-subscription-artist="' + data.items[i].id + '"] img', data.items[i].snippet.thumbnails.default.url)
        }
    }
    var passIDSC = function (data) {
      showImg('[data-subscription-artist="' + data.id + '"] img', data.avatar_url)
    };
    showImg = function (sSelector, sImg) {
      $(sSelector).attr('src', sImg)
    };
    var time = function (a, b) {
      return function () {
        if (!$('[data-subscription-hash="' + encodeURIComponent(a) + '"] img').length) {
          setTimeout(time(a, b), 50)
        }
        showImg('[data-subscription-hash="' + encodeURIComponent(a) + '"] img', 'http://dream.tribe.nu/r3/php/favicon.php?q=' + b)
      };
    }

    for (var j = 0; j < song.length; j++) {
      if (song[j].s.toLowerCase().indexOf('youtube') > -1 && typeof song[j].a !== 'undefined') {
        k += 1
        sYT += song[j].a + ',';
        if (k % 25 === 0 && aYT1.length > 2 || j + 1 == song.length) {
          $.getJSON('https://www.googleapis.com/youtube/v3/channels?part=snippet&id=' + sYT + '&fields=items%2Fid,items%2Fsnippet%2Fthumbnails%2Fdefault&key=***REMOVED***').done(passIDYT)
          sYT = '';
        }
      } else if (song[j].s.toLowerCase().indexOf('soundcloud') > -1 && typeof song[j].a !== 'undefined') {
        $.getJSON('http://api.soundcloud.com/users/' + song[j].a + '?client_id=***REMOVED***').done(passIDSC)
      } else{
        setTimeout(time(song[j].h, song[j].s), 25)
      }
    }
  }
  function youTubeGetID (text) {
    var re = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig
      return text.replace(re, '$1')
  }
  function youTubeGetPlaylist (sID) {
    var dfd1 = jQuery.Deferred()
    $.getJSON('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&key=***REMOVED***&playlistId=' + sID,function (yt_data) {
      try {
          var aJson = [];
          $.each(yt_data.items, function(key, val) {
              z = "https://www.youtube.com/watch?v=" + val.snippet.resourceId.videoId;
              if(typeof val.snippet.thumbnails !== "undefined"){
                aJson.push({
                    artist: val.snippet.channelTitle,
                    artistID: val.snippet.channelId,
                    created: parseDate(val.snippet.publishedAt),
                    description: val.snippet.description,
                    mp3: "http://dream.tribe.nu/r3/off/?q=" + z,
                    mp32: z,
                    poster: val.snippet.thumbnails.high.url,
                    posterLarge: val.snippet.thumbnails.high.url,
                    source: "YouTube",
                    title: val.snippet.title,
                    trackID: val.snippet.resourceId.videoId,
                });
              }
          });
          dfd1.resolve(aJson);
      } catch (e) {
          nextPageToken = "";
          
      }
    })
    return dfd1.promise()
  }
  function youTubeGetRelated (json, bPlay) {
    var ajax
      jsonsearch = []
      var cb1 = function () {
      if (bPlay) {
        controller.sPlaylistPlaying = json.title
          jsonsearch.unshift(json)
          cb2()
        }
      controller.sPlaylistDisplay = json.title
        controller.changeView(aElements.searchResults)
      };
    var cb2 = function () {
      DCPlayer.setPlaying(jsonsearch, 0)
        DCPlayer.playSong(0)
      };
    if (json.mp32.indexOf('soundcloud') > -1) {
      $.getJSON('https://api.soundcloud.com/resolve.json?url=' + encodeURIComponent(json.mp32) + '&client_id=***REMOVED***').always(function () {
        ajax = sc(0, 0, json.trackID, 1).done(function () {
          cb1()
              })
          })
      } else if (json.mp32.indexOf('youtube') > -1) {
      ajax = yt(0, 0, json.trackID, 1).done(function () {
        cb1()
          })
      }
    return ajax
  }
  function youtubeGetVideoLength () {
    var f = function (aID) {
      // console.log(Object.keys(aID).length);
      $.getJSON('https://www.googleapis.com/youtube/v3/videos?id=' + Object.keys(aID).join(',') + '&part=contentDetails&key=***REMOVED***', function (data) {
        $.each(data.items, function (key, cur) {
          controller.currentArray[aID[cur.id]].duration = convertISODurationToHMS(cur.contentDetails.duration)
            controller.currentTab.find('div.dc-controls#' + aID[cur.id]).parents('.song-container').find('span.song-duration').html(controller.currentArray[aID[cur.id]].duration +
            (view_list ? '' : ' - '))
        })
      })
    };
    var aYTID = []

    for (var i = 0; i < controller.currentArray.length; i++) {
      if (controller.currentArray[i].source.toLowerCase() == 'youtube' && typeof controller.currentArray[i].duration === 'undefined') {
        aYTID[controller.currentArray[i].trackID] = i
      }
      if (Object.keys(aYTID).length > 0 && (Object.keys(aYTID).length % 50 === 0 || i == controller.currentArray.length - 1)) {
        f(aYTID)
        aYTID = []
      }
    }
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  Embedded Player
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function onYouTubeIframeAPIReady () {
    var dfd = jQuery.Deferred()
    DCPlayer.ytWidget = new YT.Player('ytframe', {
      height: '390',
      playerVars: { 'autoplay': 1, 'controls': 0 },
      events: {
        'onReady': function () {
          dfd.resolve('ytReady')
              aElements.ytframe = $('#ytframe')
              // aElements.stageContainerParent.removeClass("hidden-stage");
            },
        'onStateChange': function (event) {
          switch (event.data) {
            case YT.PlayerState.ENDED:
              clearInterval(timeout3)

                        // og("clearing progress timer");
                        DCPlayer.next()
                        DCPlayer.togglePlay(0)
                        break;
            case YT.PlayerState.PAUSED:
              clearInterval(timeout3)
                        og('clearing progress timer')
                        DCPlayer.togglePlay(0)
                        break;
            case YT.PlayerState.PLAYING:
              DCPlayer.togglePlay(1)
                        DCPlayer.setDuration(DCPlayer.ytWidget.getDuration())
                        DCPlayer.volumeChange(DCPlayer.iVol)
                        clearInterval(timeout3)
                        timeout3 = setInterval(function () {
                DCPlayer.iProgress = DCPlayer.ytWidget.getCurrentTime()
                          DCPlayer.progress((DCPlayer.iProgress / DCPlayer.iDuration) * 100)
                        }, 250)
                        break;
            default:
              break
                }
        },
        'onError': function (event) {
          og('yt error')
                DCPlayer.playFallback()
            }
      }
    })

    return dfd.promise()
  }
  function onSouncloudIframeAPIReady () {
    setTimeout(function () {
      DCPlayer.scWidget = SC.Widget('dc-frame')
          DCPlayer.scWidget.bind(SC.Widget.Events.READY, function (e) {
        DCPlayer.volumeChange(DCPlayer.iVol)

              DCPlayer.scWidget.getDuration(function (e) {
          DCPlayer.setDuration(Math.floor(e / 1000))
              })

              DCPlayer.scWidget.bind(SC.Widget.Events.FINISH, function (e) {
          // og"soundcloud ended");
          DCPlayer.next()
              })

              DCPlayer.scWidget.bind(SC.Widget.Events.PLAY, function (e) {
          DCPlayer.togglePlay(1)
              })

              DCPlayer.scWidget.bind(SC.Widget.Events.PAUSE, function (e) {
          DCPlayer.togglePlay(0)
              })

              DCPlayer.scWidget.bind(SC.Widget.Events.PLAY_PROGRESS, function (e) {
          DCPlayer.iProgress = e.currentPosition / 1000
                  DCPlayer.progress(e.relativePosition * 100)
              })

          })
      }, 1000)
  }
  function onMixcloudIframeAPIReady () {
    var widget = Mixcloud.PlayerWidget(aElements.dcFrame[0])
      widget.ready.then(function () {
      widget.events.pause.on(function () {
        DCPlayer.next()
          })
      })


  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //  Misc functions
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  function checkSourceRadio (a) {
    a = a.toLowerCase()
      a = 'vimeo' == a ? 5 : 'all' == a ? 0 : 'bandcamp' == a ? 1 : 'mixcloud' == a ? 2 : 'soundcloud' == a ? 3 : 'youtube' == a && (4)
      $("input[type=radio]:eq('" + a + "')").prop('checked', true)

  }
  function fixSourceCase (a) {
    return ('all' == a ? 'All' : 'bandcamp' == a ? 'Bandcamp' : 'mixcloud' == a ? 'Mixcloud' : 'soundcloud' == a ? 'Soundcloud' : 'youtube' == a ? 'YouTube' : 'vimeo' == a ? 'Vimeo' : a)
  }
  function calcDate (a, b) {
    var z = Math.floor(a.getTime() - b.getTime()),
      h = Math.floor(z / 36e5),
      mn = Math.floor(z / 36e5 / 60),
      d = Math.floor(z / 864E5),
      m = Math.floor(d / 31),
      w = Math.floor(d / 7),
      y = Math.floor(m / 12)
          // og(mn)
      // if (!d)
          // return h;
      if (d == 1)
      {return "Yesterday";}

    a = (y > 0 ? [y, ' year'] : (m > 0 ? [m, ' month'] : (w > 0 ? [w, ' week'] : (d > 1 ? [d, ' day'] : (h > 0 ? [h, ' hour'] : [mn, ' minute'])))))
      return a[0] + a[1] + (a[0] > 1 ? 's' : '') + ' ago';
  }
  function parseDate (str) {
    str = str.match(/^(\d{4})\/?-?(0[1-9]|1[0-2])\/?-?(0[1-9]|[12]\d|3[01])/)
      if (str) {
      str[0] = new Date(+str[1], +str[2] - 1, +str[3])
          if (str[0].getMonth() === +str[2] - 1) {
        return str[0]
          }
    }
    return undefined
  }
  function convertISODurationToHMS (s) {
    var T = 'date'
    var d = 8.64e7
    var h = d / 24
    var m = h / 60
    var multipliers = {date: {y: d * 365.25, m: d * (365 * 4 + 1) / 48, d: d},
      time: {h: h, m: m, s: 1000}}
    var re = /[^a-z]+|[a-z]/gi

    // Tokenise with match, then process with reduce
    var time = s.toLowerCase().match(/p|t|\d+\.?\d*[ymdhs]/ig).reduce(function (ms, v) {
      if (v == 'p') return ms
      if (v == 't') {
        T = 'time'
        return ms
      }
      var b = v.match(re)
      return ms + b[0] * multipliers[T][b[1]]
    }, 0)

    // Converting ms to h:mm:ss should be a separate function
    return ((time / h | 0) > 0 ? (time / h | 0) + ':' : '') + ('0' + ((time % h / m) | 0)).slice(-2) + ':' + ('0' + (time % m / 1000).toFixed(3)).slice(-6).slice(0, -4)
  }
  function og (d) {
    //   console.log(d);
  }
  function str_pad_left (string, pad, length) {
    return ((new Array(length + 1)).join(pad) + string).slice(-length)
  }
  function secondstominutes (time) {
    return str_pad_left(Math.floor(time / 60), '0', 2) + ':' + str_pad_left(time - Math.floor(time / 60) * 60, '0', 2)
  }
  function clone (obj) {
    var copy
      if (obj === null || 'object' !== typeof obj) {
      return obj
      }
    if (obj instanceof Date) {
      copy = new Date()
          copy.setTime(obj.getTime())
          return copy
      }
    if (obj instanceof Array) {
      copy = []
          for (var i = 0, len = obj.length; i < len; i++) {
        copy[i] = clone(obj[i])
          }
      return copy
      }
    if (obj instanceof Object) {
      copy = {}
          for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) {
          copy[attr] = clone(obj[attr])
              }
      }
      return copy
      }
    throw new Error("Unable to copy obj! Its type isn't supported.")
  }
  function debounce (fn, delay) {
    var timer = null
      return function () {
      var context = this,
        args = arguments
          clearTimeout(timer)
          timer = setTimeout(function () {
        fn.apply(context, args)
          }, delay)
      };
  }
  function shuffle (sourceArray) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
      var j = i + Math.floor(Math.random() * (sourceArray.length - i))

          var temp = sourceArray[j]
          sourceArray[j] = sourceArray[i]
          sourceArray[i] = temp
      }
    return sourceArray
  }
  function loading (bSet) {
    clearTimeout(this.id)
    if (bSet) {
      this.id = setTimeout(function () {
        $('div#loading-tab').addClass('active')
      }, 250)
    } else {
      $('div#loading').removeClass('active')
      clearTimeout(this.id)
    }
  }
  function sortResults (e) {
    var z = $(e.target).text()
    if (z == 'Artist') {
      controller.currentArray = controller.currentArray.sort(function (a, b) {
        return b.artist < a.artist ? 1 : b.artist > a.artist ? -1 : 0
      })
      controller.printCurrent()
    } else if (z == 'Date') {
      controller.currentArray = controller.currentArray.sort(function (a, b) {
        a = new Date(a.created)
          b = new Date(b.created)
          return a > b ? -1 : a < b ? 1 : 0
      })
      controller.printCurrent()
    } else if (z == 'Title') {
      controller.currentArray = controller.currentArray.sort(function (a, b) {
        return b.title < a.title ? 1 : b.title > a.title ? -1 : 0
      })
      controller.printCurrent()
    } else if (z == 'Source') {
      controller.currentArray = controller.currentArray.sort(function (a, b) {
        return b.source < a.source ? 1 : b.source > a.source ? -1 : 0
      })
      controller.printCurrent()
    }
  }
  function copyToClipboard (sTxt) {
    var $temp = $('<input>')
    $('body').append($temp)
    $temp.val(sTxt).select()
    document.execCommand('copy')
    $temp.remove()
  }
  function share (sURL) {
    $('<iframe>', {
      src: 'whatsapp://send?text=http://dream.tribe.nu/r3?url=' + sURL,
      style: 'display:none',
      id: 'whatsapp'
    }).appendTo('body')
  }

  $.fn.dchtml = function (sHtml) {
    this[0].innerHTML = sHtml
    return this
  };

  $(window).scroll(function () {
    if (!searchingb && controller.currentTab == aElements.searchResults && $(window).scrollTop() + $(window).height() >= $(document).height() - 400 && aElements.searchResults.is(':visible')) {
      search_page += 1
          search(search_query, search_page, search_source, search_artist)
      }
  })

  //History functions
  window.addEventListener('popstate', function (e) {
    handlePopState(location.hash, false)
  })

  function handlePopState (sHash, bHistory) {
    var a
      if (sHash == '#playlists') {
      if (isMobile) {
        aElements.stageContainerParent.removeClass('hidden-stage')
            window.scrollTo(0, 0)
          }
      $('#playlists-tab').tab('show')
          return $.Deferred().promise()
      } else if (sHash == '#mobile-home') {
      aElements.mobileHomeTab.tab('show')
      } else if (sHash == '#search-results') {
      $('[href=' + sHash + ']').tab('show')
      } else if (sHash.indexOf('#/search/') > -1) {
      a = location.hash.split(/#\/.*?\/(.*?)\/(.*?)/)
          a[3] = decodeURIComponent(a[3])
          // checkSourceRadio(a[1]);
          aElements.searchInput.val(a[3])
          return firstsearch(a[3], bHistory, undefined, a[1], a[3])
      } else if (sHash.indexOf('#/artist') > -1) {
      a = location.hash.split(/#\/artist\/(.*?)\/(.*?)\/(.*?)/)
          // checkSourceRadio(a[1]);
          return firstsearch(decodeURIComponent(a[2]), bHistory, a[4], a[1])
      } else if (sHash.indexOf('#/searches') > -1) {
      return $('#search-tab').trigger('click', bHistory)
      } else if (sHash.indexOf('#/history') > -1) {
      $('#history-tab').trigger('click', bHistory)
      } else if (sHash.indexOf('#/follow') > -1) {
      $('#follow-tab-nav').trigger('click', bHistory)
      } else if (sHash.indexOf('#/all-songs') > -1) {
      $('#all-tab').trigger('click', bHistory)
      } else if (sHash.indexOf('#/url/') > -1) {
      a = sHash.split(/#\/url\/(.*?)/)
          og('Resolving ' + a[2])
          youTubeResolveURL(a[2], true)
      } else if (sHash.split(/#\/(.*?)\/(.*?)/).length > 1) {
      og('Loading user playlist')
          a = location.hash.split(/#\/(.*?)\/(.*?)/)
          return playlistShow(decodeURIComponent(a[3]), bHistory, decodeURIComponent(a[1]))
      } else {
      og('oops no hash')
      }

    // jp.setPlaylist(controller.currentArray)
  }
  // Entry point
  onYouTubeIframeAPIReady().done(function () {
    $.getJSON('/r3/php/getsubscriptions.php').always(function (data) {
      if (data.length > 0)
        {localController.aFollow = JSON.parse(data);}

      if (location.hash !== '') {
        if (isMobile) {
          $('#playlists-tab').tab('show')
            }

        if (login !== '') {
          localController.printSidebar().done(function () {
            handlePopState(location.hash, true) //.done(function
                    localController.allGet().done(function () {
              controller.afterPrintJson()
                    })

                })
            } else {
          handlePopState(location.hash, true)
            }
      } else {
        if (!isMobile) {
          // $("#loading-tab").tab("show");
        } else {
          aElements.mobileHomeTab.tab('show')
              history.pushState(null, null, '#mobile-home')
            }

        if (login !== '') {
          localController.printSidebar()
              localController.allGet()
            }
      }
    })

  })
  if (!isMobile) {
    aElements.dc_vol.simpleSlider('setValue', volume)
  }
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', DCPlayer.play)
    navigator.mediaSession.setActionHandler('pause', function () {
      DCPlayer.pause()
    })
    navigator.mediaSession.setActionHandler('seekbackward', function () {
      DCPlayer.seekTo(DCPlayer.iProgress -= 10)
    })
    navigator.mediaSession.setActionHandler('seekforward', function () {
      DCPlayer.seekTo(DCPlayer.iProgress += 10)
    })
    navigator.mediaSession.setActionHandler('previoustrack', DCPlayer.prev)
    navigator.mediaSession.setActionHandler('nexttrack', DCPlayer.next)
  }

  fixLegacyPlaylist = function (json) {
    var ret = [], aAjax = []
    $.each(json, function (k, v) {
      aAjax.push(youTubeResolveURL(v.mp32, false, function (data) {
        ret[k] = data
      }), false)
    })
    $.when.apply($, aAjax).always(function () {
      postplaylist(controller.sPlaylistDisplay, ret).done(function () {
        // console.log("Fixed!");
      })
    })
  };
})
