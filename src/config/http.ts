import http from 'axios'

const appID = 'PQ2epU1JRZiN9mCbY2F68kTw '
const appSecret = 'H2yBbH9gizUgN8vPiFNgXeGr'

const instance = http.create({
  baseURL: 'https://gp-server.hunger-valley.com',
  headers: {
    't-app-id': appID,
    't-app-secret': appSecret
  }
})

// 发送请求前需要在请求头中加 token 方便后端验证
instance.interceptors.request.use(
  config => {
    const xToken = localStorage.getItem('x-token')
    if (xToken) config.headers['Authorization'] = `Bearer ${xToken}`
    return config
  },
  e => {
    console.log('request error: ', e)
    return Promise.reject(e)
  }
)

// 接受响应之前设置下 token
instance.interceptors.response.use(
  res => {
    if (res.headers['x-token']) localStorage.setItem('x-token', res.headers['x-token'])
    return res
  },
  e => {
    console.log('response error: ', e)
    return Promise.reject(e)
  }
)

export default instance
