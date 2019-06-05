import { post, get } from './axiosconfig/axiosconfig'

export default {
  login (params, config) {
    return post('/student/login', params, config)
  },
  getCaptcha (params) {
    return get('/student/captcha', {params: params})
  },
  sendRCodeEmail (params) {
    return get('/student/register/send_email', {params: params})
  },
  register (params, config) {
    return post('/student/register', params, config)
  },
  sendFCodeEmail (params) {
    return get('/student/forget/send_email/', {params: params})
  },
  deleteUser (params, config) {
    return post('/student/delete', params, config)
  },
  forgetPassword (params, config) {
    return post('/student/forget', params, config)
  },
  forgetCheckCode (params) {
    return get('/student/forget/check', {params: params})
  },
  updatePassword (params, config) {
    return post('/student/update/password', params, config)
  },
  updateUserInfo (params, config) {
    return post('/student/update/user_info', params, config)
  },
  getUserFav (params, header) {
    return get('/student/course/fav', {params: params, headers: header})
  },
  getUserCourse (params, header) {
    return get('/student/course/learn', {params: params, headers: header})
  }
}
