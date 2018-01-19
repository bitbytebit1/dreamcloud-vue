export default {
  state: {
    ytUseVideo: false,
    // ytShowVideo: true,
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
    ytUseVideo: (state, payload) => { state.ytUseVideo = payload },
    // ytShowVideo: (state, payload) => { state.ytShowVideo = payload },
    ytObject: (state, payload) => { state.ytObject = payload },
    ytState: (state, payload) => { state.ytState = payload },
    ytDuration: (state, payload) => { state.ytDuration = payload },
    ytCurrentTime: (state, payload) => { state.ytCurrentTime = payload },
    ytStopVideo: state => {
      if (state.ytState.data === 1) {
        try { state.ytObject.stopVideo() } catch (err) {}
      }
    },
    ytToggleVideo: (state, getters) => {
      state.ytUseVideo = state.ytUseVideo = !state.ytUseVideo
    }
  },

  getters: {
    // ytShowVideo: (state, getters) => state.ytShowVideo,
    ytUseVideo: state => state.ytUseVideo,
    // ytShowVideo: state => state.ytShowVideo, // && getters.ytUseVideo && getters.current_source === 'YouTube'
    ytObject: state => state.ytObject,
    ytState: state => state.ytState,
    // ytDuration: state => state.ytObject.getDuration(),
    // ytCurrentTime: state => state.ytObject.getCurrentTime()
    ytDuration: state => state.ytDuration,
    ytCurrentTime: state => state.ytCurrentTime,
    isYT: (state, getters) => getters.current_source === 'YouTube'
  },
  actions: {
    toggleYT ({ commit, state, getters }) {
      // if (!getters.ytUseVideo) {
      // commit('changeSetting', {'setting': 'Video', 'value': !getters.ytUseVideo})
      // }
      if (!getters.ytShowVideo) {
        commit('ytShowVideo', !getters.ytShowVideo)
        commit('ytUseVideo', !getters.ytShowVideo)
      } else {
        commit('ytStopVideo')
      }
    }
  }
}

