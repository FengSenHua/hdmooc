export default {
  setUserAndToken (state, payload) {
    state.user = payload
    try {
      localStorage.user = JSON.stringify(payload)
    } catch (e) {
    }
  },
  updateUserInfo (state, payload) {
    Object.assign(state.user.userInfo, payload)
    try {
      localStorage.user = state.user
    } catch (e) {
    }
  },
  logOut (state) {
    state.user = ''
    try {
      localStorage.removeItem('user')
    } catch (e) {
    }
  },
  setLoginDialogVisible (state, payload) {
    state.loginDialogVisible = payload
  },
  setRegisterDialogVisible (state, payload) {
    state.registerDialogVisible = payload
  },
  search (state, payload) {
    state.courseList = payload
  },
  comment (state, payload) {
    state.commentList = payload
  },
  setVideoUrl (state, payload) {
    state.videoUrl = payload
  }
}
