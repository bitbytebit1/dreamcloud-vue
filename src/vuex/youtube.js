export default {
  state: {
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
    ytObject (state, payload) {
      state.ytObject = payload
    },
    ytState (state, payload) {
      state.ytState = payload
    },
    ytDuration: (state, payload) => { state.ytDuration = payload },
    ytCurrentTime: (state, payload) => { state.ytCurrentTime = payload }
  },
  getters: {
    ytObject: state => state.ytObject,
    ytState: state => state.ytState,
    // ytDuration: state => state.ytObject.getDuration(),
    // ytCurrentTime: state => state.ytObject.getCurrentTime()
    ytDuration: state => state.ytDuration,
    ytCurrentTime: state => state.ytCurrentTime
  }
}

