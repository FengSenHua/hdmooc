import {get} from './axiosconfig/axiosconfig'

export default {
  getBanner (params) {
    return get('/index/banner', {params: params})
  },
  getHnfList (params) {
    return get('/index/gethnflist', {params: params})
  }
}
