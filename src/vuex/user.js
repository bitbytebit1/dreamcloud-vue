export default {
  state: {
    auth_state: false,
    settings: {
      'Night Mode': false,
      'YouTube Video': true
    }
  },
  mutations: {
    authChange (state, payload) {
      state.auth_state = payload
    },
    changeSetting (state, payload) {
      state.settings[payload.setting] = payload.value
    }
  },
  getters: {
    auth_state: state => state.auth_state,
    ytVideo: (state, getters) => state.settings['YouTube Video'],
    theme: state => state.settings['Night Mode'] ? {'dark': true} : {'light': true}
  }
}
