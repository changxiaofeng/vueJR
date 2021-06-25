// 封装axios超时请求时间，get请求、post请求
import axios from 'axios' // 引用axios
import config from '@/api/config'
import { ElMessage } from 'element-plus'

const instance = axios.create({
  baseURL: config.baseUrl.dev,
  timeout: 60000
})
// get请求
export function get (url, params) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params: params
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// post请求
export function post (url, params) {
  return new Promise((resolve, reject) => {
    instance.post(url, params).then((response) => {
      resolve(response.data)
      // 异步执行成功后的回调
      if (response.data.STATUS === '1') {
        resolve(response.data)
      } else {
        ElMessage.error(response.data.MSG)
      }
    }).catch(err => {
      // 异步执行失败后的回调
      ElMessage.error('请求失败')
      reject(err)
    })
  })
}
