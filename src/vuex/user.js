import router from '../router'

export default {
  state: {
    user: '',
    drawLeft: false,
    drawRight: false,
    view_mode: false,
    auth_state: false,
    bShowStage: true,
    isMobile: false,
    settings: {
      'Night Mode': false,
      'List Small': false,
      'Show Video': true,
      'Black': false,
      'Video': true
    }
  },
  mutations: {
    settings (state, payload) { state.settings = payload },
    drawLeft (state, payload) { state.drawLeft = payload },
    drawRight (state, payload) { state.drawRight = payload },
    drawRightTog (state) { state.drawRight = !state.drawRight },
    drawLeftTog (state) { state.drawLeft = !state.drawLeft },
    view_mode_toggle (state) { state.view_mode = !state.view_mode },
    bShowStage (state, payload) { state.bShowStage = payload },
    ytVideo (state, payload) { state.settings['Video'] = Boolean(payload) },
    setUser (state, payload) { state.user = payload },
    authChange (state, payload) { state.auth_state = payload },
    changeSetting (state, payload) { state.settings[payload.setting] = payload.value },
    toggleStage (state) {
      state.bShowStage = !state.bShowStage
      if (state.bShowStage) {
        router.push({name: 'stage'})
      } else {
        router.go(-1)
      }
    }
  },
  getters: {
    showVideo: state => Boolean(state.settings['Show Video']),
    listViewSmall: state => Boolean(state.settings['List Small']),
    black: state => Boolean(state.settings['Black']),
    blackClass: state => state.settings['Black'] ? 'theme-jet-black' : '',
    isAnon: state => state.user.isAnonymous,
    getUser: state => state.user,
    uid: state => state.user.uid,
    drawRight: state => state.drawRight,
    drawLeft: state => state.drawLeft,
    view_mode: state => state.view_mode,
    bShowStage: state => state.bShowStage,
    auth_state: state => state.auth_state,
    ytVideo: state => Boolean(state.settings['Video']),
    nightMode: state => Boolean(state.settings['Night Mode']),
    textColor: state => state.settings['Night Mode'] ? 'white--text' : 'black--text',
    theme: state => state.settings['Night Mode'] ? {'dark': true} : {'light': true}
  }
}
