import api from '@/api/course'
import {timeFormat} from '@/utils/index'
export default {
  async searchCourse ({ commit }, param) {
    try {
      const data = await api.getCourse(param)
      const res = data.res
      commit('search', res)
    } catch (e) {
    }
  },
  async getComment ({ commit }, param) {
    try {
      const data = await api.getCourseComment(param)
      const res = data.res
      if (res.List) {
        res.List.forEach(item => {
          item.Created = timeFormat(item.Created)
        })
      }
      commit('comment', res)
    } catch (e) {
    }
  }
}
