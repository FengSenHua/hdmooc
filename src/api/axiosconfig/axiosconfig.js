import store from '@/store'
import axios from 'axios'
// import qs from 'qs'
import {Message, Loading} from 'element-ui'

// 响应时间
axios.defaults.timeout = 5 * 1000
// 配置请求头
axios.defaults.headers.post['Content-Type'] = 'application/json'
// 静态资源
// 配置接口地址
axios.defaults.baseURL = 'http://localhost:8080/v1'

var loadingInstance

// POST传参序列化(添加请求拦截器)

axios.interceptors.request.use(
  config => {
    loadingInstance = Loading.service({
      lock: true,
      text: '数据加载中，请稍后...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
    return config
  },
  err => {
    // loadingInstance.close()
    // MessageBox.alert('登录过期需要重新登录', '提示', {
    //   confirmButtonText: '确定',
    //   callback: action => {
    //     Vue.$store.commit('logOut')
    //   }
    // })
    console.log(err)
    loadingInstance.close()
    Message.error('请求错误')
    return Promise.reject(err)
  }
)
// 返回状态判断(添加响应拦截器)
axios.interceptors.response.use(
  res => {
    if (res.status === 200) {
      loadingInstance.close()
      return res
    } else {
      loadingInstance.close()
      Message.error(res.data.msg)
    }
  },
  err => {
    const error = err.response
    loadingInstance.close()
    if (error.status === 401) {
      store.commit('logOut')
      Message.error('令牌失效，请重新登录')
    } else {
      Message.error('请求失败，请稍后再试')
    }
    return Promise.reject(err)
  }
)

// 发送请求
export function post (url, params, config) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, config)
      .then(
        res => {
          resolve(res.data)
        },
        err => {
          reject(err)
        }
      )
      .catch(err => {
        reject(err)
      })
  })
}

export function get (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
