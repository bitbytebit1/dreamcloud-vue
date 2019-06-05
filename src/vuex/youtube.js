export default {
  state: {
    dcIsPlaying: false,
    dcIsLoading: false,
    ytUseVideo: false,
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
    dcIsLoading(state, payload) {
      state.dcIsLoading = payload
    },
    dcIsPlaying(state, payload) {
      state.dcIsPlaying = payload
    },
    ytUseVideo: (state, payload) => {
      state.ytUseVideo = payload
    },
    ytObject: (state, payload) => {
      state.ytObject = payload
    },
    ytState: (state, payload) => {
      state.ytState = payload
    },
    ytDuration: (state, payload) => {
      state.ytDuration = payload
    },
    ytCurrentTime: (state, payload) => {
      state.ytCurrentTime = payload
    },
    ytStopVideo: state => {
      if (state.ytState === 1) {
        if (typeof state.ytObject.stopVideo === 'function') {
          state.ytObject.stopVideo()
        }
      }
    },
    ytToggleVideo: (state) => {
      state.ytUseVideo = state.ytUseVideo = !state.ytUseVideo
    }
  },

  getters: {
    isLoading: (state, getters) => state.ytUseVideo && getters.isYT ? getters.ytIsLoading : state.dcIsLoading,
    isPlaying: (state, getters) => state.ytUseVideo && getters.isYT ? getters.ytIsPlaying : state.dcIsPlaying,
    // if (state.ytUseVideo) {
    //   return getters.ytIsLoading
    // } else {
    //   return state.dcIsLoading
    // }
    dcIsLoading: state => state.dcIsLoading,
    dcIsPlaying: state => state.dcIsPlaying,
    ytUseVideo: state => state.ytUseVideo,
    ytObject: state => state.ytObject,
    ytState: state => state.ytState,
    ytDuration: state => state.ytDuration,
    ytCurrentTime: state => state.ytCurrentTime,
    ytIsPlaying: state => state.ytState === 1,
    ytIsPaused: state => state.ytState === 2,
    ytIsLoading: (state) => state.ytState === 3,
    // ytIsLoading: (state, getters) => !getters.ytIsPlaying && !getters.ytIsPaused,
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