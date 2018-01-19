export default {
  state: {
    auth_state: false,
    settings: {
      'Night Mode': false,
      'Video': true
    }
  },
  mutations: {
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
    auth_state: state => state.auth_state,
    ytVideo: state => Boolean(state.settings['Video']),
    theme: state => state.settings['Night Mode'] ? {'dark': true} : {'light': true}
  }
}
