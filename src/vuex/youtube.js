export default {
  state: {
    ytUseVideo: true,
    ytSwitchTime: false,
    ytObject: [],
    ytState: {
      data: -1,
      target: {
        getCurrentTime: () => '',
        getDuration: () => '',
        pauseVideo: () => '',
        playVideo: () => ''
      }
    },
    ytDuration: 0,
    ytCurrentTime: 0
  },
  mutations: {
    ytSwitchTime: (state, payload) => { state.ytSwitchTime = payload },
    ytUseVideo: (state, payload) => { state.ytUseVideo = payload },
    ytObject: (state, payload) => { state.ytObject = payload },
    ytState: (state, payload) => { state.ytState = payload },
    ytDuration: (state, payload) => { state.ytDuration = payload },
    ytCurrentTime: (state, payload) => { state.ytCurrentTime = payload },
    ytStopVideo: state => {
      if (state.ytState.data === 1) {
        try { state.ytObject.stopVideo() } catch (err) {}
      }
    },
    ytToggleVideo: (state, payload) => {
      state.ytUseVideo = state.ytUseVideo = !state.ytUseVideo
    }
  },

  getters: {
    ytUseVideo: state => state.ytUseVideo,
    ytObject: state => state.ytObject,
    ytState: state => state.ytState,
    // ytDuration: state => state.ytObject.getDuration(),
    // ytCurrentTime: state => state.ytObject.getCurrentTime()
    ytDuration: state => state.ytDuration,
    ytCurrentTime: state => state.ytCurrentTime,
    ytIsPlaying: state => state.ytState === 1,
    isYT: (state, getters) => getters.current_source === 'YouTube'
  }
}

// BUFFERING: 3
// CUED: 5
// ENDED: 0
// PAUSED: 2
// PLAYING: 1
// UNSTARTED: -1
