export default {
  state: {
    settings: {
      'Night Mode': true,
      'List Small': false,
      'Show Video': true,
      'Show Watch Button': true,
      'Black': false,
      'Video': true
    }
  },
  getters: {
    showWatchB: state => Boolean(state.settings['Show Watch Button']),
    ytVideo: state => Boolean(state.settings['Video']),
    black: state => Boolean(state.settings['Black']),
    blackClass: state => state.settings['Black'] ? 'theme-jet-black' : '',
    listViewSmall: state => Boolean(state.settings['List Small']),
    nightMode: state => Boolean(state.settings['Night Mode']),
    showVideo: state => Boolean(state.settings['Show Video']),
    textColor: state => state.settings['Night Mode'] ? 'white--text' : 'black--text',
    theme: state => state.settings['Night Mode'] ? {'dark': true} : {'light': true},
  },
  mutations: {
    showWatchB (state, payload) { state.settings['Show Watch Button'] = Boolean(payload) },
    settings (state, payload) { state.settings = payload },
    showVideo (state, payload) { state.settings['Show Video'] = Boolean(payload) },
    ytVideo (state, payload) { state.settings['Video'] = Boolean(payload) },
    changeSetting (state, payload) { state.settings[payload.setting] = payload.value }
  }
}
