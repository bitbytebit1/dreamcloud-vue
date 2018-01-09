export default {
  state: {
    ytShowVideo: true,
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
    ytShowVideo: (state, payload) => { state.ytShowVideo = payload },
    ytObject: (state, payload) => { state.ytObject = payload },
    ytState: (state, payload) => { state.ytState = payload },
    ytDuration: (state, payload) => { state.ytDuration = payload },
    ytCurrentTime: (state, payload) => { state.ytCurrentTime = payload },
    ytStopVideo: state => { state.ytState.data === 1 && state.ytObject.stopVideo() }
  },
  getters: {
    // ytShowVideo: (state, getters) => state.ytShowVideo,
    ytShowVideo: (state, getters) => state.ytShowVideo && getters.ytVideo && getters.current_source === 'YouTube',
    ytObject: state => state.ytObject,
    ytState: state => state.ytState,
    // ytDuration: state => state.ytObject.getDuration(),
    // ytCurrentTime: state => state.ytObject.getCurrentTime()
    ytDuration: state => state.ytDuration,
    ytCurrentTime: state => state.ytCurrentTime
  }
}

