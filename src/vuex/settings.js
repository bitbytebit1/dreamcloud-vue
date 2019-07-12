export default {
  state: {
    settings: {
      'Night Mode': true,
      'Show Popup': true,
      'Show Video': true,
      'Show Watch Button': true,
      'Close Menu': true,
      'Black': false,
      'Video': true
    }
  },
  getters: {
    showPopupSetting: state => Boolean(state.settings['Show Popup']),
    closeMenuOnScroll: state => Boolean(state.settings['Close Menu']),
    showWatchB: state => Boolean(state.settings['Show Watch Button']),
    ytVideo: state => Boolean(state.settings['Video']),
    black: state => Boolean(state.settings['Black']),
    blackClass: state => state.settings['Black'] ? 'theme-jet-black' : '',
    nightMode: state => Boolean(state.settings['Night Mode']),
    showVideo: state => Boolean(state.settings['Show Video']),
    textColor: state => state.settings['Night Mode'] ? 'white--text' : 'black--text',
    theme: state => state.settings['Night Mode'] ? {'dark': true} : {'light': true},
  },
  mutations: {
    showPopupSetting (state, payload) { state.settings['Show Popup'] = Boolean(payload) },
    closeMenuOnScroll (state, payload) { state.settings['Close Menu'] = Boolean(payload) },
    showWatchB (state, payload) { state.settings['Show Watch Button'] = Boolean(payload) },
    settings (state, payload) { state.settings = payload },
    showVideo (state, payload) { state.settings['Show Video'] = Boolean(payload) },
    ytVideo (state, payload) { state.settings['Video'] = Boolean(payload) },
    changeSetting (state, payload) { state.settings[payload.setting] = payload.value }
  }
}
