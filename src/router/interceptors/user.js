import store from '@/store/'

export default function checkUser (to, from, next) {
  const {state} = store
  if (to.matched.some(record => record.meta.requiresUser)) {
    if (state.user.token) {
      next()
    } else {
      next('/')
    }
  } else {
    next()
  }
}
