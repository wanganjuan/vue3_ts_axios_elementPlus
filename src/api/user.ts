import axios from './axios'
import {HttpResponse} from './common'

// 登录参数
/**
 * @interface loginParams -登录参数
 * @property {string} loginName - 用户名
 * @property {string} password - 密码
 */
interface LoginParams {
  loginName: string,
  password: string
}

// 登陆
export function login (param:LoginParams): Promise<HttpResponse> {
  const url = '/users/login'
  return axios.post(url, param)
}

// 获得当前用户信息
export function getCurrentUserInfo (): Promise<HttpResponse> {
  const url = '/users/current'
  return axios.get(url)
}
// 登出
export function logout (): Promise<HttpResponse> {
  const url = '/users/logout'
  return axios.post(url)
}