import axios from 'axios'

import store from '../store'
import {
  getToken,
  removeToken
} from '@/utils/auth'

// 创建axios实例
console.log(process.env)
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 10 * 1000 // 请求超时时间, 10秒
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  err => {
    console.dir(err);
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = `${err.response.data.message}`
          break

        case 401:
          //重新登录
          removeToken();

          err.message = `${err.response.data.message}`
          break

        case 403: //没有权限
          err.message = `${err.response.data.message}`
          break

        case 404:
          if (err.response.data.message) {
            err.message = `${err.response.data.message}，请检查！`;
          } else {
            err.message = `请求地址出错: ${err.response.config.url}`
          }
          break

        case 405:
          err.message = `方法错误: ${err.response.data.message}`
          break

        case 406: //请求格式错误
          err.message = '请求超时'
          break

        case 408:
          err.message = '请求超时'
          break

        case 410:
          //用户请求的资源被永久删除，且不会再得到的
          err.message = '请求超时'
          break

        case 422:
          //当创建一个对象时，发生一个验证错误。
          err.message = '请求超时'
          break

        case 500:
          err.message = `${err.response.data.message}`
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break
      }
    }
    console.log(err.message)
    return Promise.reject(err.response)
  }
)
export default service
