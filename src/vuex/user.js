export default {
  state: {
    view_mode: false,
    auth_state: false,
    bShowStage: true,
    settings: {
      'Night Mode': false,
      'Video': true
    }
  },
  mutations: {
    // view_mode (state, payload) {
    //   state.view_mode = payload
    // },
    view_mode_toggle (state, payload) {
      state.view_mode = !state.view_mode
    },
    bShowStage (state, payload) {
      state.bShowStage = payload
    },
    ytVideo (state, payload) {
      state.settings['Video'] = Boolean(payload)
    },
    authChange (state, payload) {
      state.auth_state = payload
    },
    changeSetting (state, payload) {
      state.settings[payload.setting] = payload.value
    }
  },
  getters: {
    view_mode: state => state.view_mode,
    bShowStage: state => state.bShowStage,
    auth_state: state => state.auth_state,
    ytVideo: state => Boolean(state.settings['Video']),
    theme: state => state.settings['Night Mode'] ? {'dark': true} : {'light': true}
  }
}
