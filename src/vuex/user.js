import router from '../router'

export default {
  state: {
    user: '',
    drawLeft: false,
    drawRight: false,
    view_mode: 1, // 0 GRID, 1 LIST1, 2 LIST2
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
  getters: {
    isMobile: state => state.isMobile,
    auth_state: state => state.auth_state,
    black: state => Boolean(state.settings['Black']),
    blackClass: state => state.settings['Black'] ? 'theme-jet-black' : '',
    bShowStage: state => state.bShowStage,
    drawLeft: state => state.drawLeft,
    drawRight: state => state.drawRight,
    getUser: state => state.user,
    isAnon: state => state.user.isAnonymous,
    listViewSmall: state => Boolean(state.settings['List Small']),
    nightMode: state => Boolean(state.settings['Night Mode']),
    showVideo: state => Boolean(state.settings['Show Video']),
    textColor: state => state.settings['Night Mode'] ? 'white--text' : 'black--text',
    theme: state => state.settings['Night Mode'] ? {'dark': true} : {'light': true},
    uid: state => state.user.uid,
    view_mode: state => state.view_mode,
    ytVideo: state => Boolean(state.settings['Video'])
  },
  mutations: {
    isMobile (state, payload) { state.isMobile = payload },
    settings (state, payload) { state.settings = payload },
    drawLeft (state, payload) { state.drawLeft = payload },
    drawRight (state, payload) { state.drawRight = payload },
    drawRightTog (state) { state.drawRight = !state.drawRight },
    drawLeftTog (state) { state.drawLeft = !state.drawLeft },
    view_mode_toggle (state) { 
      if (state.view_mode < 2) {
        state.view_mode++ 
      } else {
        state.view_mode = 0
      }
    },
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
  }
}
