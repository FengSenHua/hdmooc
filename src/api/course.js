import {get, post} from './axiosconfig/axiosconfig'

export default {
  getTagList (params) {
    return get('/course/gettaglist', {params: params})
  },
  getCourse (params) {
    return get('/course/search', {params: params})
  },
  getCourseDetail (params) {
    return get('/course/detail', {params: params})
  },
  getCourseComment (params) {
    return get('/course/getcomment', {params: params})
  },
  addComment (params, config) {
    return post('/course/add/comment', params, config)
  },
  getFav (params, headers) {
    return get('/course/fav', {params: params, headers: headers})
  },
  addFav (params, config) {
    return post('/course/fav', params, config)
  },
  addStudentCourse (params, config) {
    return post('/course/learn', params, config)
  }
}
