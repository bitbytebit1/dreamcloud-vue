export default {
  state: {
    ytUseVideo: true,
    ytSwitchTime: false,
    ytObject: [],
    ytDuration: 0,
    ytCurrentTime: 0,
    ytState: {
      data: -1,
      target: {
        getCurrentTime: () => '',
        getDuration: () => '',
        pauseVideo: () => '',
        playVideo: () => ''
      }
    }
  },
  mutations: {
    ytSwitchTime: (state, payload) => { state.ytSwitchTime = payload },
    ytUseVideo: (state, payload) => { state.ytUseVideo = payload },
    ytObject: (state, payload) => { state.ytObject = payload },
    ytState: (state, payload) => { state.ytState = payload },
    ytDuration: (state, payload) => { state.ytDuration = payload },
    ytCurrentTime: (state, payload) => { state.ytCurrentTime = payload },
    ytStopVideo: state => {
      if (state.ytState === 1) {
        try { state.ytObject.stopVideo() } catch (err) {}
      }
    },
    ytToggleVideo: (state, payload) => { state.ytUseVideo = state.ytUseVideo = !state.ytUseVideo }
  },

  getters: {
    ytUseVideo: state => state.ytUseVideo,
    ytObject: state => state.ytObject,
    ytState: state => state.ytState,
    ytDuration: state => state.ytDuration,
    ytCurrentTime: state => state.ytCurrentTime,
    ytIsPlaying: state => state.ytState === 1,
    ytIsPaused: state => state.ytState === 2,
    isYT: (state, getters) => getters.current_source === 'YouTube'
    // ytDuration: state => state.ytObject.getDuration(),
    // ytCurrentTime: state => state.ytObject.getCurrentTime()
  }
}

// BUFFERING: 3
// CUED: 5
// ENDED: 0
// PAUSED: 2
// PLAYING: 1
// UNSTARTED: -1
