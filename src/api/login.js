import { apiRequest, post } from './index'
export function login (username, password) {
  return post('login',{
    username,
    password
  })
}
export function loginout () {
  return apiRequest({
    url: 'loginOut',
    method: 'post',
    data: {

    }
  })
}